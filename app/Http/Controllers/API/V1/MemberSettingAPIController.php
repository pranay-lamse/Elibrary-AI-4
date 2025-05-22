<?php

namespace App\Http\Controllers\API\V1;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\MemberSettingRepositoryInterface;

/**
 * Class MemberSettingAPIController
 */
class MemberSettingAPIController extends AppBaseController
{
    /**
     * @var MemberSettingRepositoryInterface
     */
    private $memberSettingRepository;

    public function __construct(MemberSettingRepositoryInterface $memberSettingRepository)
    {
        $this->memberSettingRepository = $memberSettingRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $result = $this->memberSettingRepository->all([['member_id' => Auth::id()]]);

        return $this->sendResponse($result, 'Member settings retrieved successfully');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        $input = $request->all();

        try {
            $settings = $this->memberSettingRepository->createOrUpdate($input);

            return $this->sendResponse($settings, 'Settings updated successfully.');
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), 500);
        }
    }
}
