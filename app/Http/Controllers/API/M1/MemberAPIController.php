<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ChangePasswordRequest;
use App\Http\Requests\API\UpdateMemberProfileRequest;
use App\Models\Address;
use App\Models\Member;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\User;
use Auth;
use Hash;
use DB;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    public function fcmToken(Request $request)
    {
        /** @var Member $member */
        $fcmToken = $request->fcmToken;
        $user = Auth::user();

        if(isset($fcmToken))
        {
            DB::table('members')->where('id', $user->id)->update(['fcm_token' => $fcmToken]);
            $message = true;
        }else{
            $message = false;
        }


        return $this->sendResponse($message, 'FcmToken Updated successfully.');
    }



    /**
     * @param  UpdateMemberProfileRequest  $request
     * @param  MemberRepositoryInterface  $memberRepository
     *
     * @return JsonResponse
     */
    public function updateMemberProfile(
        UpdateMemberProfileRequest $request,
        MemberRepositoryInterface $memberRepository
    ) {
        try {
            $input = $request->all();
            unset($input['email']);

            /** @var User $user */
            $user = Auth::user();

            $member = Auth::user();
            $updateMember = $memberRepository->updateMemberProfile($input, Auth::id());
            $result = $updateMember->toArray();

            /** @var Address $address */
            $address = $member->address;
            unset($result['address']);
            if (! empty($address)) {
                $address = $address->apiM1AddressObj();
                $result = array_merge($result, $address);
            }

            return $this->sendResponse($result, 'Member profile updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /**
     * @param  ChangePasswordRequest  $request
     *
     * @return JsonResponse
     */
    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $input = $request->all();

            /** @var User $user */
            $user = Auth::user();

            if (! Hash::check($input['current_password'], $user->password)) {
                return $this->sendError('Invalid current password');
            }

            $user->password = Hash::make($input['password']);
            $user->save();

            return $this->sendSuccess('Password changed successfully');
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
}
