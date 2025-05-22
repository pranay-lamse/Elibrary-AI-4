<?php

namespace App\Http\Controllers\API\V1;

use Config;
use App\User;
use App\User2;
use App\User3;
use Exception;
use Carbon\Carbon;
use App\Models\Member;
use App\Models\Member2;
use App\Models\Member3;
use App\Mail\MailSender;
use Illuminate\Http\Request;
use App\Models\MembershipPlan;
use App\Models\MembershipPlan2;
use App\Models\MembershipPlan3;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Crypt;
use App\Repositories\MemberRepository;
use App\Repositories\MemberRepository2;
use App\Repositories\MemberRepository3;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\AppBaseController;
use App\Exceptions\ApiOperationFailedException;
use App\Http\Requests\API\ResetPasswordRequest;
use App\Http\Requests\API\ResetPasswordLinkRequest;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface2;
use App\Repositories\Contracts\MemberRepositoryInterface3;
use App\Repositories\Contracts\AccountRepositoryInterface2;
use App\Repositories\Contracts\AccountRepositoryInterface3;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class MemberAuthController
 */
class MemberAuthController extends AppBaseController
{
    /** @var MemberRepository */
    private $memberRepository;
    private $memberRepository2;
    private $memberRepository3;

    /** @var AccountRepositoryInterface */
    private $accountRepo;
    private $accountRepo2;
    private $accountRepo3;

    public function __construct(
        MemberRepositoryInterface $memberRepo,
        AccountRepositoryInterface $accountRepo,
        MemberRepositoryInterface2 $memberRepo2,
        AccountRepositoryInterface2 $accountRepo2,

        MemberRepositoryInterface3 $memberRepo3,
        AccountRepositoryInterface3 $accountRepo3
    ) {
        $this->memberRepository = $memberRepo;
        $this->accountRepo = $accountRepo;

        $this->memberRepository2 = $memberRepo2;
        $this->accountRepo2 = $accountRepo2;

        $this->memberRepository3 = $memberRepo3;
        $this->accountRepo3 = $accountRepo3;
    }

    /**
     * @param  Request  $request
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'email'      => 'required|unique:members|max:255',
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'password'   => 'required|string|max:255|min:8',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors()->first();
            return $this->sendError($errors, 422);
        }
        $input['is_active'] = 0;
        $input['activation_code'] = uniqid();
        $member = $this->memberRepository->storeMember($input)->toArray();
        $data['name'] = $member["first_name"] . " " . $member['last_name'];
        $data['email'] = $member["email"];
        if (isset($member)) {
            Mail::to($member["email"])->send(new MailSender('emails.mail-user-registeration', 'Welcome to ' . env('LIBRARY_NAME'), $data));
            Mail::to($data["email"])->send(new MailSender('emails.mail-user-activation', 'Registration Pending Approval', $data));
        }
        Mail::to('ashish.gurao@veerit.com')->send(new MailSender('emails.mail-admin-activation', 'New Member Registration - Activation Required', $data));
        return $this->sendResponse($data, "Account registered successfully. Request email has been sent for approval");
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse|RedirectResponse|Redirector
     */
    public function verifyAccount(Request $request)
    {
        $url = config('app.url');
        $token = $request->get('token', null);
        if (empty($token)) {
            return Redirect::to($url . '/#lms/login?success=0&msg=token not found.');
        }

        try {
            $token = Crypt::decrypt($token);
            list($memberId, $activationCode) = $result = explode('|', $token);
            if (count($result) < 2) {
                return Redirect::to($url . '/#lms/login?success=0&msg=token not found.');
            }

            /** @var Member $member */
            $member = Member::whereActivationCode($activationCode)->findOrFail($memberId);
            if (empty($member)) {
                return Redirect::to($url . '/#lms/login?success=0&msg=This account activation token is invalid.');
            }
            $member->is_active = 1;
            $member->email_verified_at = Carbon::now();
            $member->save();

            return Redirect::to($url . '/#lms/login?success=1&msg=Your account has been activated successfully.');
        } catch (Exception $e) {
            return Redirect::to($url . '/#lms/login?success=0&msg=Something went wrong.');
        }
    }

    /**
     * @param  ResetPasswordLinkRequest  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function sendResetPasswordLink(ResetPasswordLinkRequest $request)
    {
        $url = $request->get('url');
        $data = [];
        /** @var User $member */
        $member = Member::whereEmail($request->get('email'))->first();
        if (!$member) {
            throw new UnprocessableEntityHttpException('Given Email does not exist in our system.');
        }
        $key = $member->email . '|' . date('Y-m-d H:i:s');
        $token = Crypt::encrypt($key);
        $encodedToken = urlencode($token);
        $data['token'] = $encodedToken;
        $data['link'] = $url . '?token=' . $encodedToken;
        $data['first_name'] = $member->first_name;
        $data['last_name'] = $member->last_name;
        $data['email'] = $member->email;

        $this->accountRepo->sendResetPasswordLinkMail($data);

        return $this->sendSuccess('Password reset link sent successfully.');
    }

    /**
     * @param  ResetPasswordRequest  $request
     *
     * @return bool|JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $input = $request->all();
        $token = Crypt::decrypt($input['token']);
        list($email, $registerTime) = explode('|', $token);

        $member = Member::whereEmail($email)->first();
        if (!$member) {
            return $this->sendError('User with given email not available.');
        }

        //check activated link has expired in 1 hour
        if ((strtotime(date('Y-m-d H:i:s')) - strtotime($registerTime)) / (60 * 60) > 1) {
            return $this->sendError('The activate link has expired.');
        }

        $member->update(['password' => Hash::make($input['password'])]);

        return $this->sendSuccess('Password updated successfully.');
    }

    public function isMember(Request $request)
    {
        $input = $request->all();

        $memberId = $request->id;

        $member = Member::where('id', $memberId)->first() ?? "N/A";


        $member2 = Member2::whereEmail($member->email)->first() ?? "N/A";

        $member3 = Member3::whereEmail($member->email)->first() ?? "N/A";

        $data = [$member, $member2, $member3];


        return $this->sendResponse($data, 'Member retrieved successfully.');
    }

    public function registerMemberToLibrary(Request $request)
    {
        $library_id = $request->library_id;
        $member_id = Auth::user();




        $email = $member_id['email'];
        $first_name = $member_id['first_name'];
        $last_name = $member_id['last_name'];

        $input = [
            'email'      => $email,
            'first_name' => $first_name,
            'last_name'  => $last_name,
            'password'   => 'Pass@123',
        ];

        $input['is_active'] = 1;
        $input['activation_code'] = uniqid();

        $site_name = Config::get('app.site_url');
        $member_details = Member::where('id', $member_id->id)->first();


        $member_email = $member_details->email;
        if ($site_name == "http://dindayalupadhyay.smartcitylibrary.com") {


            if ($library_id == 222) {
                $member_details = Member2::where('email', $member_email)->first();

                if(isset($member_details->id))
                {
                    return $this->sendResponse(true, 'Member Registered successfully.');
                }else{
                    $member = $this->memberRepository2->storeMember($input);
                }

            } elseif ($library_id == 333) {

                $member_details = Member3::where('email', $member_email)->first();

                if(isset($member_details->id))
                {
                    return $this->sendResponse(true, 'Member Registered successfully.');
                }else{
                    $member = $this->memberRepository3->storeMember($input);
                }

            } else {
                /* $member = $this->memberRepository2->storeMember($input); */
            }
        } elseif ($site_name == "http://kundanlalgupta.smartcitylibrary.com") {

            if ($library_id == 111) {

                $member_details = Member2::where('email', $member_email)->first();

                if(isset($member_details->id))
                {
                    return $this->sendResponse(true, 'Member Registered successfully.');
                }else{
                    $member = $this->memberRepository2->storeMember($input);
                }

            } elseif ($library_id == 333) {

                $member_details = Member3::where('email', $member_email)->first();

                if(isset($member_details->id))
                {
                    return $this->sendResponse(true, 'Member Registered successfully.');
                }else{
                    $member = $this->memberRepository3->storeMember($input);
                }

            } else {
                /* $member = $this->memberRepository2->storeMember($input); */
            }
        } elseif ($site_name == "http://rashtramatakasturba.smartcitylibrary.com") {

            if ($library_id == 111) {

                $member_details = Member2::where('email', $member_email)->first();

                if(isset($member_details->id))
                {
                    return $this->sendResponse(true, 'Member Registered successfully.');
                }else{
                    $member = $this->memberRepository2->storeMember($input);
                }



            } elseif ($library_id == 222) {

                $member_details = Member3::where('email', $member_email)->first();

                if(isset($member_details->id))
                {
                    return $this->sendResponse(true, 'Member Registered successfully.');
                }else{
                    $member = $this->memberRepository3->storeMember($input);
                }

            } else {
                /* $member = $this->memberRepository2->storeMember($input); */
            }
        } else {

        }



        return $this->sendResponse($member, 'Member Registered successfully.');
    }
}
