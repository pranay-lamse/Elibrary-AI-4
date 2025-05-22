<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

/**
 * Class SettingAPIController
 */
class SettingAPIController extends AppBaseController
{
    /**
     * @return JsonResponse
     */
    public function index()
    {
        $settings = Setting::whereIn('key', ['language'])->get();

        return $this->sendResponse($settings->toArray(), 'Settings retrieved successfully.');
    }
}
