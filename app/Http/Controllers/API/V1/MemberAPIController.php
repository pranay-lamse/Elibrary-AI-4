<?php

namespace App\Http\Controllers\API\V1;

use URL;
use Mail;
use App\User;
use Exception;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AppBaseController;
use App\Exceptions\ApiOperationFailedException;
use App\Http\Requests\API\ChangePasswordRequest;
use App\Http\Requests\API\UpdateMemberProfileRequest;
use App\Repositories\Contracts\MemberRepositoryInterface;

/**
 * Class MemberController
 */
class MemberAPIController extends AppBaseController
{
    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function getLoggedInMemberDetails(Request $request)
    {
        /** @var Member $member */
        $member = $request->user();
        $member->address;

        return $this->sendResponse($member, 'Member details retrieved successfully.');
    }

    /**
     * @param  UpdateMemberProfileRequest  $request
     * @param  MemberRepositoryInterface  $memberRepository
     *
     * @throws Exception
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function updateMemberProfile(
        UpdateMemberProfileRequest $request,
        MemberRepositoryInterface $memberRepository
    ) {
        $input = $request->all();
        unset($input['email']);

        /** @var User $user */
        $user = Auth::user();

        $updateMember = $memberRepository->update($input, Auth::id());

        return $this->sendResponse($updateMember->toArray(), 'Member profile updated successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function removeImage(Request $request)
    {
        /** @var Member $member */
        $member = $request->user();
        $member->deleteMemberImage();

        return $this->sendSuccess('Member image removed successfully.');
    }

    /**
     * @param  ChangePasswordRequest  $request
     *
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        $input = $request->all();

        /** @var User $user */
        $user = Auth::user();

        if (!Hash::check($input['current_password'], $user->password)) {
            return $this->sendError('Invalid current password');
        }

        $user->password = Hash::make($input['password']);
        $user->save();

        return $this->sendSuccess('Password changed successfully');
    }
}
