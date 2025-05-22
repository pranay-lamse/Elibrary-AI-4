<?php

namespace App\Repositories;

use App\Models\MembershipPlan;
use App\Models\Subscription;
use App\Models\Transaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class StripeRepository
 */
class StripeRepository 
{

    /**
     * @param $sessionId
     *
     * @throws \Stripe\Exception\ApiErrorException
     * @throws \JsonException
     *
     */
    public function paymentSuccess($sessionId)
    {
        $stripeSecretKey = getSettingValueByKey('stripe_secret');
        Stripe::setApiKey($stripeSecretKey);
        $sessionData = \Stripe\Checkout\Session::retrieve($sessionId);
        $stripeID = $sessionData->id;
        $paymentStatus = $sessionData->payment_status;
        $amount = (getSettingValueByKey('currency') != 'JPY') ? $sessionData->amount_total / 100 : $sessionData->amount_total;
        $data = json_decode($sessionData->client_reference_id);
        try {
            DB::beginTransaction();
            $user = Auth::user();
            $transactionData = [
                'member_id'      => $data->member_id,
                'transaction_id' => $stripeID,
                'plan_id'        => $data->plan_id,
                'payment_mode'   => Transaction::TYPE_STRIPE,
                'amount'         => $amount,
                'status'         => $paymentStatus,
                'meta'           => $sessionData->toArray(),
            ];
            $transaction = Transaction::create($transactionData);
            /** @var MembershipPlan $membershipPlan */
            $membershipPlan = MembershipPlan::whereId($data->plan_id)->firstOrFail();
            if($membershipPlan->frequency == MembershipPlan::YEARLY_FREQUENCY)
            {
                $endDate =  Carbon::now()->addYear();
            }else{
                $endDate = Carbon::now()->addMonth();
            }
            $subscriptionData = [
                'member_id'      => $data->member_id,
                'plan_id'        => $data->plan_id,
                'transaction_id' => $transaction->id,
                'plan_amount'    => $transaction->amount,
                'plan_frequency' => $membershipPlan->frequency,
                'start_date'     => Carbon::now(),
                'end_date'       => $endDate,
                'status'        => Subscription::ACTIVE,
            ];
            $sub = Subscription::create($subscriptionData);

            Subscription::where('member_id', $data->member_id)
                ->where('id', '!=', $sub->id)
                ->update(['status' => Subscription::INACTIVE]);
            
            DB::commit();
            
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}
