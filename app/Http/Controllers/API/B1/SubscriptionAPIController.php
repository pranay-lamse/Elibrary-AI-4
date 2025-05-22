<?php

namespace App\Http\Controllers\API\B1;

use App\Http\Controllers\AppBaseController;
use App\Models\MembershipPlan;
use App\Models\Subscription;
use App\Models\Transaction;
use App\Repositories\SubscriptionRepository;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class SubscriptionAPIController
 */
class SubscriptionAPIController extends AppBaseController
{
    /** @var SubscriptionRepository */
    private $subscriptionRepository;

    public function __construct(SubscriptionRepository $subscriptionRepo)
    {
        $this->subscriptionRepository = $subscriptionRepo;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $input = $request->except(['skip', 'limit']);
        $subscriptions = $this->subscriptionRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit'),
            $request->get('type')
        );

        return $this->sendResponse(
            $subscriptions->toArray(),
            'Subscriptions retrieved successfully.',
            ['totalRecords' => $this->subscriptionRepository->all($input)->count()]
        );
    }

    public function update($id, Request  $request)
    {

        $subscription = $this->subscriptionRepository->findOrFail($id);

        $input = $request->all();

        $subscription->update($input);

        return $this->sendSuccess('Subscription Updated successfully');
    }

    /**
     * @param $id
     * @param Request $request
     *
     *
     * @return JsonResponse
     */
    public function CreateOfflineSubscription($id, Request $request)
    {
        /*  DB::beginTransaction(); */

        $plan = MembershipPlan::whereId($id)->firstOrFail();

        $data = [
            'member_id'         => $request->memberId,
            'transaction_id'    => uniqueTransactionId(),
            'plan_id'           => $plan->id,
            'plan_amount'       => $plan->price,
            'plan_frequency'    => $plan->frequency,
            'notes'             => $request->get('notes'),
            'reference'         => $request->get('reference'),
            'start_date'        => Carbon::now(),
            'end_date'          => $plan->frequency == MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : Carbon::now()->addMonth(),
            'status'            => Subscription::ACTIVE,
            'type'              => Subscription::OFFLINE,
        ];

        Subscription::create($data);

        $user = Auth::user();
        $transactionData = [
            'member_id'      => $request->memberId,
            'plan_id'        => $plan->id,
            'payment_mode'   => Transaction::TYPE_OFFLINE,
            'amount'         => $plan->price,
            'status'         => 'unpaid',
        ];
        $transaction = Transaction::create($transactionData);

        /*  DB::commit(); */

        return $this->sendSuccess('Subscription Created successfully');
    }

    /**
     * @param Request $request
     *
     *
     * @return JsonResponse
     */
    public function getOfflineSubscriptions(Request $request): JsonResponse
    {
        $input = $request->except(['skip', 'limit']);
        $subscriptions = $this->subscriptionRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit'),
            $request->get('type'),
        );

        return $this->sendResponse(
            $subscriptions->toArray(),
            'Subscriptions retrieved successfully.',
            ['totalRecords' => $subscriptions->count()]
        );
    }


    /**
     * @param $id
     *
     *
     * @return JsonResponse
     */
    public function changeStatus($id)
    {
        $subscription = Subscription::findOrFail($id);
        $status = !$subscription->status;
        $subscription->update(['status' => $status]);

        return $this->sendSuccess('Status updated successfully.');
    }
}
