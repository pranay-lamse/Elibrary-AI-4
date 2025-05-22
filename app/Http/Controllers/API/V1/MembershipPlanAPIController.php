<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Models\Subscription;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class MembershipPlanController
 */
class MembershipPlanAPIController extends AppBaseController
{
    /** @var MembershipPlanRepositoryInterface */
    private $membershipPlanRepository;
    // protected $auth;

    public function __construct(MembershipPlanRepositoryInterface $membershipPlanRepo)
    {
        $this->membershipPlanRepository = $membershipPlanRepo;
    }

    /**
     * Display a listing of the MembershipPlan.
     * GET|HEAD /membershipPlans
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $membershipPlans = $this->membershipPlanRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $frequency = $request->get('frequency');
        if ($frequency) {
            $membershipPlans = $membershipPlans->where('frequency', $frequency);
        }

        return $this->sendResponse($membershipPlans->toArray(), 'Membership Plans retrieved successfully.');
    }

    public function details(Request $request)
    {
        $membership = Auth::user()->subscription;
        // $membership = auth()->user();
        if (!empty($membership)) {
            $membership->load('subscriptionPlan');
        }

        return $this->sendResponse($membership, 'Membership retrieved successfully');
        if (Auth::check()) {
        } else {
            return $this->sendResponse(null, 'Member is not authenticated.');
        }

        // $membership = Auth::user();
    }
}
