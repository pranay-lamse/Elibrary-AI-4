<?php

namespace App\Http\Controllers\API\B1;

use Exception;
use App\Models\Member;
use App\Mail\MailSender;
use App\Models\IssuedBook;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use App\Imports\ImportMember;
use App\Exports\MembersExport;
use App\Models\MembershipPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateMemberRequest;
use App\Http\Requests\API\UpdateMemberRequest;
use App\Exceptions\ApiOperationFailedException;
use App\Repositories\Contracts\MemberRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class MemberController
 */
class MemberAPIController extends AppBaseController
{
    /** @var MemberRepositoryInterface */
    private $memberRepository;

    public function __construct(MemberRepositoryInterface $memberRepo)
    {
        $this->memberRepository = $memberRepo;
    }

    /**
     * Display a listing of the Member.
     * GET|HEAD /members
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $members = $this->memberRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $input['withCount'] = 1;

        return $this->sendResponse(
            $members->toArray(),
            [
                'message' => 'Members retrieved successfully.',
                'totalRecords' => $this->memberRepository->all($input)
            ]
        );
    }

    /**
     * Store a newly created Member in storage.
     * POST /members
     * @param  CreateMemberRequest  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function store(CreateMemberRequest $request)
    {
        $input = $request->all();

        $this->memberRepository->store($input);

        return $this->sendResponse(Member::all(), 'Member saved successfully.');
    }

    /**
     * Display the specified Member.
     * GET|HEAD /members/{id}
     *
     * @param  Member  $member
     *
     * @return JsonResponse
     */
    public function show(Member $member)
    {
        $member->address;

        return $this->sendResponse($member->toArray(), 'Member retrieved successfully.');
    }

    /**
     * Update the specified Member in storage.
     * PUT/PATCH /members/{id}
     *
     * @param  Member  $member
     * @param  UpdateMemberRequest  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function update(Member $member, UpdateMemberRequest $request)
    {
        $member = Member::with(['address'])->findOrFail($member->id);

        $input = $request->all();

        $member = $this->memberRepository->update($input, $member->id);

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    /**
     * Remove the specified Member from storage.
     * DELETE /members/{id}
     *
     * @param  Member  $member
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(Member $member)
    {
        $member->deleteMemberImage();
        $member->delete();

        return $this->sendResponse($member, 'Member deleted successfully.');
    }

    /**
     * @param  Member  $member
     *
     * @return JsonResponse
     */
    public function updateStatus(Member $member)
    {
        $member->is_active = ($member->is_active) ? 0 : 1;
        $member->save();
        if ($member->is_active) {
            $data['email'] = $member->email;
            $data['name'] = $member->first_name . " " . $member->last_name;
            Mail::to("ashish.gurao@veerit.com")->send(new MailSender('emails.mail-user-activated', 'Registration Approved', $data));
        }
        $member->address;

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    public function updateBookStatus(Member $member)
    {
        $member->is_active = ($member->is_active) ? 0 : 1;
        $member->save();


        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }


    public function updateEbookStatus(Member $member)
    {
        $member->is_active = ($member->is_active) ? 0 : 1;
        $member->save();

        $member->address;

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }


    public function updateLibraryStatus(Member $member)
    {
        $member->is_active = ($member->is_active) ? 0 : 1;
        $member->save();

        $member->address;

        return $this->sendResponse($member->toArray(), 'Member updated successfully.');
    }

    /**
     * @param  Member  $member
     *
     * @return JsonResponse
     */
    public function removeImage(Member $member)
    {
        $member->deleteMemberImage();

        return $this->sendSuccess('Member image removed successfully.');
    }

    /**
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getLoggedInMemberDetails(Request $request)
    {
        $member = $request->user();

        return $this->sendResponse($member, 'Member details retrieved successfully.');
    }

    /**
     * @param  Member  $member
     * @param  int  $status
     *
     * @return JsonResponse
     */
    public function isAllowToReserveOrIssueBook(Member $member, $status)
    {
        if (!in_array($status, [IssuedBook::STATUS_ISSUED, IssuedBook::STATUS_RESERVED])) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        $isAllow = $this->memberRepository->isAllowToReserveOrIssueBook($member->id, $status);

        return $this->sendResponse($isAllow, 'Books count retrieved successfully.');
    }

    /**
     * @param  Member  $member
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function sendReActivationMail(Member $member)
    {
        $name = $member->first_name . ' ' . $member->last_name;
        $key = $member->id . '|' . $member->activation_code;
        $code = Crypt::encrypt($key);

        $data['link'] = URL::to('/api/v1/activate-member?token=' . $code);
        $data['username'] = $name;
        $data['logo_url'] = getLogoURL();

        try {
            Mail::send(
                'emails.account_re_activation',
                ['data' => $data],
                function (Message $message) use ($member) {
                    $message->subject('Activate your account');
                    $message->to($member->email);
                }
            );
            return $this->sendSuccess('Re-activation email send successfully.');
        } catch (Exception $e) {
            throw new Exception('Unable to send confirmation mail : ' . $e->getMessage());
        }
    }

    public function importMembers(Request $request)
    {
        try {
            /** @var UploadedFile $file */
            $file = $request->file('file');

            $extension = $file->getClientOriginalExtension();
            if (!in_array($extension, ['xlsx', 'xls'])) {
                throw new ApiOperationFailedException('File must be xlsx or xls. Received: ' . htmlspecialchars(strip_tags($extension)));
            }
            $path = 'members/' . time() . '.' . $extension;
            $filePath = public_path('uploads/') . $path;
            // move_uploaded_file($file->getRealPath(), $filePath);
            $readerType = ($extension == 'xlsx' ? \Maatwebsite\Excel\Excel::XLSX : \Maatwebsite\Excel\Excel::XLS);

            \Maatwebsite\Excel\Facades\Excel::import(new ImportMember, $request->file('file')->store($path), 'local', $readerType);

            // Delete file from system
            // File::delete($filePath);

            return $this->sendResponse($path, 'Members Imported successfully.');
        } catch (Exception $e) {
            // Delete file from system
            // File::delete($filePath);
            throw new ApiOperationFailedException($e->getMessage());
        }
    }

    public function exportMembers()
    {
        $filename = 'exports/Members-' . time() . '.xlsx';
        /*  $data = Excel::load('file.csv', false, 'ISO-8859-1'); */
        Excel::store(new MembersExport, $filename, config('filesystems.default'));
        $path = Storage::disk(config('filesystems.default'))->url($filename);

        return $this->sendResponse($path, 'Members exported successfully.');
    }
}
