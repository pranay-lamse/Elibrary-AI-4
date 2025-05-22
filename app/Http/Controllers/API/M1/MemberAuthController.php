<?php

namespace App\Http\Controllers\API\M1;

use App\Exceptions\ApiOperationFailedException;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ResetPasswordRequest;
use App\Models\Member;
use App\Models\MembershipPlan;
use App\Repositories\Contracts\AccountRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\Repositories\MemberRepository;
use App\User;
use Carbon\Carbon;
use Crypt;
use Exception;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use URL;
use Validator;

/**
 * Class MemberAuthController
 */
class MemberAuthController extends AppBaseController
{
    /** @var MemberRepository */
    private $memberRepository;

    /** @var AccountRepositoryInterface */
    private $accountRepo;

    public function __construct(
        MemberRepositoryInterface $memberRepo,
        AccountRepositoryInterface $accountRepo
    ) {
        $this->memberRepository = $memberRepo;
        $this->accountRepo = $accountRepo;
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
        try {
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

            $input['activation_code'] = uniqid();
            $input['email_verified_at'] = Carbon::now();
            $input['is_active'] = true;
            $member = $this->memberRepository->registerMember($input, false);

            $token = $member->createToken('member_token')->plainTextToken;

            return $this->sendResponse(['token' => $token, 'user' => $member], 'Registered successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @param  Request  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function sendResetPasswordLink(Request $request)
    {
        try {
            if (empty($request->get('email'))) {
                throw new UnprocessableEntityHttpException('Email field is required.');
            }

            $data = [];
            /** @var User $member */
            $member = Member::whereEmail($request->get('email'))->first();
            if (! $member) {
                throw new UnprocessableEntityHttpException('Given Email does not exist in our system.');
            }
            $key = $member->email.'|'.date('Y-m-d H:i:s');
            $token = Crypt::encrypt($key);
            $encodedToken = urlencode($token);
            $data['token'] = $encodedToken;
            $data['link'] = URL::to("//token=$encodedToken");
            $data['first_name'] = $member->first_name;
            $data['last_name'] = $member->last_name;
            $data['email'] = $member->email;

            $this->accountRepo->sendResetPasswordLinkMail($data);

            return $this->sendSuccess('Password reset link sent successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @param  ResetPasswordRequest  $request
     *
     * @return bool|JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        try {
            $input = $request->all();
            $token = Crypt::decrypt($input['token']);
            list($email, $registerTime) = explode('|', $token);

            $member = Member::whereEmail($email)->first();
            if (! $member) {
                return $this->sendError('User with given email not available.');
            }

            //check activated link has expired in 1 hour
            if ((strtotime(date('Y-m-d H:i:s')) - strtotime($registerTime)) / (60 * 60) > 1) {
                return $this->sendError('The activate link has expired.');
            }

            $member->update(['password' => Hash::make($input['password'])]);

            return $this->sendSuccess('Password updated successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @return JsonResponse
     */
    public function logout()
    {
        \Auth::logout();

        return $this->sendSuccess('Logout successfully.');
    }
}
