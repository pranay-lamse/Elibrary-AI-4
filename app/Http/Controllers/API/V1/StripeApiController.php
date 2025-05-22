<?php

namespace App\Http\Controllers\API\V1;

use Carbon\Carbon;
use Stripe\Stripe;
use App\Models\Transaction;
use App\Models\Subscription;
use App\Models\MembershipPlan;

use App\Models\Transaction2;
use App\Models\Subscription2;
use App\Models\MembershipPlan2;

use App\Models\Transaction3;
use App\Models\Subscription3;
use App\Models\MembershipPlan3;

use App\Models\Member;
use App\Models\Member2;
use App\Models\Member3;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Repositories\StripeRepository;
use Illuminate\Support\Facades\Session;
use Stripe\Exception\ApiErrorException;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\AppBaseController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Config;

/**
 * Class StripeApiController
 */
class StripeApiController extends AppBaseController
{
    /**
     * @var StripeRepository
     */
    private $stripeRepository;

    public function __construct(StripeRepository $stripeRepository)
    {
        $this->stripeRepository = $stripeRepository;
    }

    /**
     * @param $id
     *
     * @throws ApiErrorException
     *
     * @throws \JsonException
     * @return JsonResponse
     */
    public function createSession($id): JsonResponse
    {
        /** @var MembershipPlan $plan */
        $plan = MembershipPlan::whereId($id)->firstOrFail();
        $user = Auth::user();
        $stripeKey = getSettingValueByKey('stripe_secret');
        Stripe::setApiKey($stripeKey);
        $data = [
            'plan_id' => $plan->id,
            'member_id' => $user->id,
        ];
        $session = \Stripe\Checkout\Session::create([
            'payment_method_types'       => ['card'],
            'customer_email'             => $user->email,
            'line_items'                 => [
                [
                    'price_data'  => [
                        'product_data' => [
                            'name' => 'BILL OF PLAN ' . $plan->name,
                        ],
                        'unit_amount'  => (getSettingValueByKey('currency') != 'JPY') ? $plan->price * 100 : $plan->price,
                        'currency'     => getSettingValueByKey('currency'),
                    ],
                    'quantity'    => 1,
                    'description' => 'BILL OF PLAN ' . $plan->name,
                ],
            ],
            'billing_address_collection' => 'auto',
            'client_reference_id'        => json_encode($data, JSON_THROW_ON_ERROR),
            'mode'                       => 'payment',
            'success_url'                => url('api/v1/payment-success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url'                 => url('api/v1/failed-payment?error=payment_cancelled'),
        ]);
        $result = [
            'sessionId' => $session['id'],
        ];

        return $this->sendResponse($result, 'Session created successfully.');
    }

    /**
     * @param Request $request
     *
     * @throws ApiErrorException
     * @throws \JsonException
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function paymentSuccess(Request $request): \Illuminate\Http\RedirectResponse
    {
        $sessionId = $request->get('session_id');
        $this->stripeRepository->paymentSuccess($sessionId);

        return redirect(url("/#/lms/books"));
    }

    /**
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleFailedPayment(): \Illuminate\Http\RedirectResponse
    {

        return redirect(url("/#/lms/books"));
    }

    public function RazorPay(Request $request)
    {
        $plan = MembershipPlan::whereId($request->id)->firstOrFail();
        $memberId = Auth::id();


        if(isset($request->plan_amount))
        {

            $plan_amount = $request->plan_amount;
        }else{
            $plan_amount = 0;

        }

        /*  E-Book Reading  */
        if($plan->id == 5)
        {


            if(isset($request->checkbox1) && $request->checkbox1 != 0){

                $book_status_created_at = Carbon::now()->addYear();
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = '';
                $checkbox1_status = null;
            }

            if(isset($request->checkbox2) && $request->checkbox2 != 0  ){

                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = '';
                $checkbox2_status = null;
            }


            if(isset($request->checkbox3) && $request->checkbox3 != 0){

                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }

            //default set


        }


        /*  end  E-Book Reading end  */

        /*  Library Access Reading  */
        if($plan->id == 4)
        {


            if(isset($request->checkbox1) && !empty($request->checkbox1) && $request->checkbox1 == true && $request->checkbox1 != 0){

                $book_status_created_at = Carbon::now()->addYear();
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = '';
                $checkbox1_status = null;
            }

            if(isset($request->checkbox2) && !empty($request->checkbox2) && $request->checkbox2 == true && $request->checkbox2 != 0){

                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }

            if(isset($request->checkbox3) && !empty($request->checkbox3) && $request->checkbox3 == true && $request->checkbox3 != 0){

                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = '';
                $checkbox3_status = null;
            }

            //default set


        }


        /*    Library Access Reading end  */

        /*  Regular Membership Reading  */
        if($plan->id == 6)
        {


            if(isset($request->checkbox1)  && $request->checkbox1 != 0){

                $book_status_created_at = Carbon::now()->addYear();
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = Carbon::now()->addYear();
                $checkbox1_status = 1;
            }

            if(isset($request->checkbox2) && $request->checkbox2 != 0 ){

                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = '';
                $checkbox2_status = null;
            }

            if(isset($request->checkbox3) && $request->checkbox3 != 0){

                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = '';
                $checkbox3_status = null;
            }

            //default set


        }


        /*    Regular Membership Reading end  */


        /*  Lifetime membership Reading  */
        if($plan->id == 3)
        {


            if(isset($request->checkbox1)  && $request->checkbox1 != 0){

                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }

            if(isset($request->checkbox2) && $request->checkbox2 != 0 ){

                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = '';
                $checkbox2_status = null;
            }

            if(isset($request->checkbox3) && $request->checkbox3 != 0){

                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = '';
                $checkbox3_status = null;
            }

            //default set


        }


        /*    Lifetime membership Reading end  */

        /* logic goes here start  */

        $libraryIdNew = $request->libraryIdNew;
        $currenturl = Config::get('app.site_url');

        if ($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com') {


            if ($libraryIdNew == 222){

                $member_details = Member::where('id', $memberId)->first();
                $member_email = $member_details->email;


                $member_details = Member2::where('email', $member_email)->first();
                $memberId = $member_details->id;

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription2::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                ];
                $transaction = Transaction2::create($transactionData);


            }elseif ($libraryIdNew == 333) {

                $member_details = Member::where('id', $memberId)->first();
                $member_email = $member_details->email;


                $member_details = Member3::where('email', $member_email)->first();
                $memberId = $member_details->id;

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,

                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription3::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                ];
                $transaction = Transaction3::create($transactionData);

            }else{

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                ];
                $transaction = Transaction::create($transactionData);

            }


        } elseif ($currenturl == 'http://kundanlalgupta.smartcitylibrary.com') {

           if ($libraryIdNew == 111){
            $member_details = Member::where('id', $memberId)->first();
                $member_email = $member_details->email;


                $member_details = Member2::where('email', $member_email)->first();
                $memberId = $member_details->id;

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription2::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                ];
                $transaction = Transaction2::create($transactionData);


            }elseif ($libraryIdNew == 333) {

                $member_details = Member::where('id', $memberId)->first();
                $member_email = $member_details->email;


                $member_details = Member3::where('email', $member_email)->first();
                $memberId = $member_details->id;

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription3::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
                ];
                $transaction = Transaction3::create($transactionData);

            }else{
                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
                ];
                $transaction = Transaction::create($transactionData);

            }



        } elseif ($currenturl == 'http://rashtramatakasturba.smartcitylibrary.com') {


            if ($libraryIdNew == 111){

                $member_details = Member::where('id', $memberId)->first();
                $member_email = $member_details->email;


                $member_details = Member2::where('email', $member_email)->first();
                $memberId = $member_details->id;

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription2::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
                ];
                $transaction = Transaction2::create($transactionData);

            }elseif ($libraryIdNew == 222) {

                $member_details = Member::where('id', $memberId)->first();
                $member_email = $member_details->email;


                $member_details = Member3::where('email', $member_email)->first();
                $memberId = $member_details->id;

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription3::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
                ];
                $transaction = Transaction3::create($transactionData);

            }else{

                $data = [
                    'member_id'         => $memberId,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan_amount,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'notes'             => $request->get('notes'),
                    'reference'         => $request->get('reference'),
                    'start_date'        => Carbon::now(),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                    'book_status'         => $checkbox1_status,
                    'library_status'         => $checkbox2_status,
                    'ebook_status'         => $checkbox3_status,
                    'book_status_created_at'         => $book_status_created_at ,
                    'library_status_created_at'         => $library_status_created_at,
                    'ebook_status_created_at'         => $ebook_status_created_at,
                    'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


                ];

                Subscription::create($data);

                $user = Auth::user();

                $transactionData = [
                    'member_id'      => $memberId,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan_amount,
                    'payment_response'         => $request->payment_response,
                    'status'         => 'paid',
                    'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
                ];
                $transaction = Transaction::create($transactionData);

            }



        } else {

            $data = [
                'member_id'         => $memberId,
                'transaction_id'    => uniqueTransactionId(),
                'plan_id'           => $plan->id,
                'plan_amount'       => $plan_amount,
                'deposit'           => $plan->deposit,
                'renewal_price'     => $plan->renewal_price,
                'plan_frequency'    => $plan->frequency,
                'notes'             => $request->get('notes'),
                'reference'         => $request->get('reference'),
                'start_date'        => Carbon::now(),
                'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
                'status'            => Subscription::ACTIVE,
                'type'              => Subscription::RAZORPAY,
                'book_status'         => $checkbox1_status,
                'library_status'         => $checkbox2_status,
                'ebook_status'         => $checkbox3_status,
                'book_status_created_at'         => $book_status_created_at ,
                'library_status_created_at'         => $library_status_created_at,
                'ebook_status_created_at'         => $ebook_status_created_at,
                'trial_ends_at' => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),


            ];

            Subscription::create($data);

            $user = Auth::user();

            $transactionData = [
                'member_id'      => $memberId,
                'plan_id'        => $plan->id,
                'payment_mode'   => Transaction::TYPE_RAZORPAY,
                'amount'         => $plan_amount,
                'payment_response'         => $request->payment_response,
                'status'         => 'paid',
                'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
            ];
            $transaction = Transaction::create($transactionData);


        }


        /* logic goes here end  */



        /*  DB::commit(); */

        return $this->sendSuccess(['sessionId' => Session::getId(), "user" => $user], 'Subscription Created successfully');
    }

    public function RazorPay2(Request $request)
    {
        $plan = MembershipPlan::whereId($request->id)->firstOrFail();
        $memberId = Auth::id();

        $data = array();

        // Assuming you receive the image file as 'pdf_preview_file' in the request
            $pdfPreviewFile = $request->file('pdf_preview_file');



            // Handle the file upload
            if ($pdfPreviewFile) {


                // Store the file in the 'public' disk under the 'pdfs' directory
                $path = $pdfPreviewFile->store('bpl_image', 'public');

                // Save the file path in the database
                $data['pdf_preview_file'] = $path;




            }

            if(true)
        {
            if(isset($request->checkbox1) && $request->checkbox1 != 0 ){

                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }

            if(isset($request->checkbox2) && $request->checkbox2 != 0 ){

                $library_status_created_at = '3024-03-01 11:34:58';
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = '3024-03-01 11:34:58';
                $checkbox2_status = 1;
            }

            if(isset($request->checkbox3)  && $request->checkbox3 != 0){

                $ebook_status_created_at = '3024-03-01 11:34:58';
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = '3024-03-01 11:34:58';
                $checkbox3_status = 1;
            }

            //default set


        }



        if(isset($request->plan_amount))
        {

            $plan_amount = $request->plan_amount;
        }else{
            $plan_amount = 0;

        }

        $data += [
            'member_id'         => $memberId,
            'transaction_id'    => uniqueTransactionId(),
            'plan_id'           => $plan->id,
            'plan_amount'       => $plan_amount,
            'deposit'           => $plan->deposit,
            'renewal_price'     => $plan->renewal_price,
            'plan_frequency'    => $plan->frequency,
            'notes'             => $request->get('notes'),
            'reference'         => $request->get('reference'),
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
            'status'            => Subscription::ACTIVE,
            'type'              => Subscription::RAZORPAY,
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

        ];

        Subscription::create($data);

        $user = Auth::user();

        $transactionData = [
            'member_id'      => $memberId,
            'plan_id'        => $plan->id,
            'payment_mode'   => Transaction::TYPE_RAZORPAY,
            'amount'         => $plan_amount,
            'payment_response'         => $request->payment_response,
            'status'         => 'paid',
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
        ];
        $transaction = Transaction::create($transactionData);

        /*  DB::commit(); */

        return $this->sendSuccess(['sessionId' => Session::getId(), "user" => $user], 'Subscription Created successfully');
    }

    public function RazorPayBackend2(Request $request)
    {
        $plan = MembershipPlan::whereId($request->id)->firstOrFail();
        $memberId = $request->memberId;

        $data = array();

        // Assuming you receive the image file as 'pdf_preview_file' in the request
            $pdfPreviewFile = $request->file('pdf_preview_file');



            // Handle the file upload
            if ($pdfPreviewFile) {


                // Store the file in the 'public' disk under the 'pdfs' directory
                $path = $pdfPreviewFile->store('bpl_image', 'public');

                // Save the file path in the database
                $data['pdf_preview_file'] = $path;




            }

            if(true)
        {
            if(isset($request->checkbox1) && $request->checkbox1 != 0 ){

                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }

            if(isset($request->checkbox2) && $request->checkbox2 != 0 ){

                $library_status_created_at = '3024-03-01 11:34:58';
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = '3024-03-01 11:34:58';
                $checkbox2_status = 1;
            }

            if(isset($request->checkbox3)  && $request->checkbox3 != 0){

                $ebook_status_created_at = '3024-03-01 11:34:58';
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = '3024-03-01 11:34:58';
                $checkbox3_status = 1;
            }

            //default set


        }



        if(isset($request->plan_amount))
        {

            $plan_amount = $request->plan_amount;
        }else{
            $plan_amount = 0;

        }

        $data += [
            'member_id'         => $memberId,
            'transaction_id'    => uniqueTransactionId(),
            'plan_id'           => $plan->id,
            'plan_amount'       => $plan_amount,
            'deposit'           => $plan->deposit,
            'renewal_price'     => $plan->renewal_price,
            'plan_frequency'    => $plan->frequency,
            'notes'             => $request->get('notes'),
            'reference'         => $request->get('reference'),
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
            'status'            => Subscription::ACTIVE,
            'type'              => Subscription::RAZORPAY,
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

        ];

        Subscription::create($data);

        $user = Auth::user();

        $transactionData = [
            'member_id'      => $memberId,
            'plan_id'        => $plan->id,
            'payment_mode'   => Transaction::TYPE_RAZORPAY,
            'amount'         => $plan_amount,
            'payment_response'  => $request->payment_response,
            'status'         => 'paid',
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
        ];
        $transaction = Transaction::create($transactionData);

        /*  DB::commit(); */

        return $this->sendSuccess(['sessionId' => Session::getId(), "user" => $user], 'Subscription Created successfully');
    }

    public function RazorPay3(Request $request)
    {
        $plan = MembershipPlan::whereId($request->id)->firstOrFail();
        $memberId = Auth::id();

        $data = array();


        if(true)
        {
            if(isset($request->checkbox1 )  && $request->checkbox1 != 'undefined' && $request->checkbox1 != 0){

                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }

            if(isset($request->checkbox2) && $request->checkbox2 != 'undefined' && $request->checkbox2 != 0){

                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = '';
                $checkbox2_status = null;
            }

            if(isset($request->checkbox3) && $request->checkbox3 != 'undefined' && $request->checkbox3 != 0){

                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = '';
                $checkbox3_status = null;
            }

            //default set


        }

        if(isset($request->plan_amount))
        {

            $plan_amount = $request->plan_amount;
        }else{
            $plan_amount = 0;

        }

        $data += [
            'member_id'         => $memberId,
            'transaction_id'    => uniqueTransactionId(),
            'plan_id'           => $plan->id,
            'plan_amount'       => $plan_amount,
            'deposit'           => $plan->deposit,
            'renewal_price'     => $plan->renewal_price,
            'plan_frequency'    => $plan->frequency,
            'notes'             => $request->get('notes'),
            'reference'         => $request->get('reference'),
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
            'status'            => Subscription::ACTIVE,
            'type'              => Subscription::RAZORPAY,
            'second_member_name'         => $request->get('memberOne'),
            'third_member_name'         => $request->get('memberTwo'),
            'forth_member_name'         => $request->get('memberThree'),
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

        ];

        Subscription::create($data);

        $user = Auth::user();

        $transactionData = [
            'member_id'      => $memberId,
            'plan_id'        => $plan->id,
            'payment_mode'   => Transaction::TYPE_RAZORPAY,
            'amount'         => $plan_amount,
            'payment_response'         => $request->payment_response,
            'status'         => 'paid',
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
        ];
        $transaction = Transaction::create($transactionData);

        /*  DB::commit(); */

        return $this->sendSuccess(['sessionId' => Session::getId(), "user" => $user], 'Subscription Created successfully');
    }

    public function RazorPaySecond3(Request $request)
    {
        $plan = MembershipPlan::whereId($request->id)->firstOrFail();
        $memberId = Auth::id();

        $data = array();


        if(true)
        {
            if(isset($request->checkbox1 ) && $request->checkbox1 != 0){

                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }else{
                $book_status_created_at = '3024-03-01 11:34:58';
                $checkbox1_status = 1;
            }

            if(isset($request->checkbox2) && $request->checkbox2 != 0 ){

                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }else{
                $library_status_created_at = '';
                $checkbox2_status = null;
            }

            if(isset($request->checkbox3) && $request->checkbox3 != 0){

                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }else{
                $ebook_status_created_at = '';
                $checkbox3_status = null;
            }

            //default set


        }

        if(isset($request->plan_amount))
        {

            $plan_amount = $request->plan_amount;
        }else{
            $plan_amount = 0;

        }

        $data += [
            'member_id'         => $memberId,
            'transaction_id'    => uniqueTransactionId(),
            'plan_id'           => $plan->id,
            'plan_amount'       => $plan_amount,
            'deposit'           => $plan->deposit,
            'renewal_price'     => $plan->renewal_price,
            'plan_frequency'    => $plan->frequency,
            'notes'             => $request->get('notes'),
            'reference'         => $request->get('reference'),
            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth(),
            'status'            => Subscription::ACTIVE,
            'type'              => Subscription::RAZORPAY,
            'second_member_name'         => $request->get('memberOne'),
            'third_member_name'         => $request->get('memberTwo'),
            'forth_member_name'         => $request->get('memberThree'),
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

        ];

        Subscription::create($data);

        $user = Auth::user();

        $transactionData = [
            'member_id'      => $memberId,
            'plan_id'        => $plan->id,
            'payment_mode'   => Transaction::TYPE_RAZORPAY,
            'amount'         => $plan_amount,
            'payment_response'         => $request->payment_response,
            'status'         => 'paid',
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
        ];
        $transaction = Transaction::create($transactionData);

        /*  DB::commit(); */

        return $this->sendSuccess(['sessionId' => Session::getId(), "user" => $user], 'Subscription Created successfully');
    }

    public function RazorPay4(Request $request)
    {
        $plan = MembershipPlan::whereId($request->id)->firstOrFail();

        if($request->member_id && !empty($request->member_id))
        {
            $memberId = $request->member_id;

        }else{
            $memberId = Auth::id();

        }

        $data = array();


        if(true)
        {
            if(isset($request->checkbox1) && $request->checkbox1 != 0 ){

                $book_status_created_at = Carbon::now()->addYear();
                $checkbox1_status = 1;
            }

            if(isset($request->checkbox2)  && $request->checkbox2 != 0 ){

                $library_status_created_at = Carbon::now()->addMonth();
                $checkbox2_status = 1;
            }

            if(isset($request->checkbox3)  && $request->checkbox3 != 0){

                $ebook_status_created_at = Carbon::now()->addMonth();
                $checkbox3_status = 1;
            }

            //default set


        }

        if(isset($request->plan_amount))
        {

            $plan_amount = $request->plan_amount;
        }else{
            $plan_amount = 0;

        }
      $get_subscription_value =   Subscription::where('id', $request->subscription_id)->first();

      if(isset($checkbox1_status))
      {
        $final_value_checkbox1_status = $checkbox1_status;
      }else{
        $final_value_checkbox1_status = $get_subscription_value->book_status;
      }

      if(isset($checkbox2_status))
      {
        $final_value_checkbox2_status = $checkbox2_status;
      }else{
        $final_value_checkbox2_status = $get_subscription_value->library_status;
      }

      if(isset($book_status_created_at))
      {
        $final_value_book_status_created_at = $book_status_created_at;
      }else{
        $final_value_book_status_created_at = $get_subscription_value->book_status_created_at;
      }

      if(isset($checkbox3_status))
      {
        $final_value_checkbox3_status = $checkbox3_status;
      }else{
        $final_value_checkbox3_status = $get_subscription_value->ebook_status;
      }

      if(isset($library_status_created_at))
      {
        $final_value_library_status_created_at = $library_status_created_at;
      }else{
        $final_value_library_status_created_at = $get_subscription_value->library_status_created_at;
      }

      if(isset($ebook_status_created_at))
      {
        $final_value_ebook_status_created_at = $ebook_status_created_at;
      }else{
        $final_value_ebook_status_created_at = $get_subscription_value->ebook_status_created_at;
      }

        $data += [

            'member_id'         => $get_subscription_value->member_id ,
            'transaction_id'    => $get_subscription_value->transaction_id ,
            'plan_id'           => $get_subscription_value->plan_id ,
            'plan_amount'       => $get_subscription_value->plan_amount ,
            'deposit'           => $get_subscription_value->deposit ,
            'renewal_price'     => $get_subscription_value->renewal_price ,
            'plan_frequency'    => $get_subscription_value->plan_frequency ,
            'notes'             => $get_subscription_value->notes ,
            'reference'         => $get_subscription_value->reference ,
            'start_date'        => $get_subscription_value->start_date ,
            'end_date'          => $get_subscription_value->end_date ,
            'status'            => $get_subscription_value->status ,
            'type'              => $get_subscription_value->type ,

            'book_status'         => $final_value_checkbox1_status,
            'library_status'         => $final_value_checkbox2_status,
            'ebook_status'         => $final_value_checkbox3_status,
            'book_status_created_at'         => $final_value_book_status_created_at ,
            'library_status_created_at'         => $final_value_library_status_created_at,
            'ebook_status_created_at'         => $final_value_ebook_status_created_at,

        ];



        Subscription::where('id', $request->subscription_id)
        ->update($data);

        $user = Auth::user();

        $transactionData = [
            'member_id'      => $memberId,
            'plan_id'        => $plan->id,
            'payment_mode'   => Transaction::TYPE_RAZORPAY,
            'amount'         => $plan_amount,
            'payment_response'         => $request->payment_response,
            'status'         => 'paid',
            'book_status'         => $checkbox1_status,
            'library_status'         => $checkbox2_status,
            'ebook_status'         => $checkbox3_status,
            'book_status_created_at'         => $book_status_created_at ,
            'library_status_created_at'         => $library_status_created_at,
            'ebook_status_created_at'         => $ebook_status_created_at,

            'start_date'        => Carbon::now(),
            'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::now()->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? '3024-03-01 11:34:58' : Carbon::now()->addMonth()
        ];
        $transaction = Transaction::create($transactionData);

        /*  DB::commit(); */

        return $this->sendSuccess(['sessionId' => Session::getId(), "user" => $user], 'Subscription Created successfully');
    }
}
