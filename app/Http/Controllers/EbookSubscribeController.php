<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EbookLimitModel;
use App\Models\EbookLimitModel2;
use App\Models\EbookLimitModel3;
use App\Models\EbookSubscription;
use App\Models\EbookSubscription2;
use App\Models\EbookSubscription3;
use App\Models\Member;
use App\Models\Member2;
use App\Models\Member3;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use App\Models\User;
use App\Models\User2;
use App\Models\User3;

class EbookSubscribeController extends Controller
{
    public function index(Request $request)
    {
        $member_id  = $request->id;
        if(isset($member_id))
        {
            $member_email = Member::where('id', $member_id)->first();
        }else{
            $member_email = '';
        }
        if(isset($member_email))
        {
            $member_id_second = Member2::where('email',$member_email->email)->first();
            $member_id_third = Member3::where('email',$member_email->email)->first();

            if(isset($member_id_second))
            {
               $member_id_second_id =   $member_id_second->id;
            }else{
               $member_id_second_id =   '';
            }

            if(isset($member_id_third))
            {
               $member_id_third_id = $member_id_third->id;
            }else{
               $member_id_third_id ='';
            }
        }else{
            $member_id_second_id =   '';
             $member_id_third_id ='';
        }



        $esub1 = EbookSubscription::with('items.book')->where('member_id', $member_id)->get()->toArray();
        $esub2 = EbookSubscription2::with('items.book')->where('member_id', $member_id_second_id)->get()->toArray();
        $esub3 = EbookSubscription3::with('items.book')->where('member_id', $member_id_third_id)->get()->toArray();



        $esub = array_merge($esub1, $esub2, $esub3);



        $transformedData = [];

        foreach ($esub as $item) {

            foreach ($item['items'] as $bookItem) {
                $transformedData[] = [
                    'id' => $bookItem['id'],
                    'name' => $bookItem['book']['name'],
                    'status' => $bookItem['status'],
                    'format' => $bookItem['format'],
                    'isbn_no' => $bookItem['book']['isbn'],
                    'edition' => $bookItem['edition'],
                    "language_name" =>  $bookItem['language_id'],
                    "authors" => $bookItem['book']['authors_name'],
                    'book_code' => $bookItem['book_code'],
                    'e_book_url' => $bookItem['e_book_url'],
                    'file_name' => $bookItem['file_name'],
                    'library_id' => $item['library_id'],
                    'image_path' => $bookItem['book']['image_path'],
                    'created_on' => $item['created_at'],
                ];
            }
        }


        $amount = array_map(function ($item) {
            return $item["amount"];
        }, $esub);

        return response()->json([
            'data' => $transformedData,
            'message' => "Ebook Subscription Fetched Successfully",
            'totalAmount' => array_sum($amount),
            'member' => Auth::user()
        ]);
    }

    public function subscribe(Request $request)
    {
        $user = Auth::user();
        $user_email = $user['email'];
        $request['email'] = $user_email;
        $library_id = $request->library_id;
        $site_name = Config::get('app.site_url');
        if ($site_name == "http://dindayalupadhyay.smartcitylibrary.com") {

             /* logic to get correct member_id  */

             $member_id  = $request->member_id;

             if(isset($member_id))
             {
                 $member_email = Member::where('id', $member_id)->first();
             }else{
                 $member_email = '';
             }

             if(isset($member_email))
             {
                 $member_id_second = Member2::where('email',$member_email->email)->first();
                 $member_id_third = Member3::where('email',$member_email->email)->first();

                 if(isset($member_id_second))
                 {
                    $member_id_second_id =   $member_id_second->id;
                 }else{
                    $member_id_second_id =   '';
                 }

                 if(isset($member_id_third))
                 {
                    $member_id_third_id = $member_id_third->id;
                 }else{
                    $member_id_third_id ='';
                 }


             }else{
                 $member_id_second_id =   '';
                 $member_id_third_id ='';
             }





             /* logic to get correct member_id  */

            if ($library_id == "222") {

                $subscription = EbookSubscription2::where('member_id', $member_id_second_id)
                    ->where('ebook_id', $request->ebook_id)
                    ->first();

                if ($subscription) {
                    // If the record exists, update its fields with the data from $request->all()
                 $ebook =   $subscription->update([
                        'member_id' => $member_id_second_id,
                        'ebook_id' => $request->ebook_id,
                        'issued_on' => $request->issued_on,
                        'returned_on' => $request->returned_on,
                        'library_id' => $request->library_id,
                        'razorpay_payment_id' => $request->razorpay_payment_id,
                        'renew' => $request->renew,
                        'amount' => $request->amount,

                    ]);
                } else {
                    // If the record doesn't exist, create a new one with the specified values
                    $ebook =  EbookSubscription2::create([
                        'member_id' => $member_id_second_id,
                        'ebook_id' => $request->ebook_id,
                        'issued_on' => $request->issued_on,
                        'returned_on' => $request->returned_on,
                        'library_id' => $request->library_id,
                        'razorpay_payment_id' => $request->razorpay_payment_id,
                        'renew' => $request->renew,
                        'amount' => $request->amount,

                    ]);

                }


                /* $ebook = EbookSubscription2::updateOrCreate(['member_id' => $member_id_second_id, "ebook_id" => $request->ebook_id], $request->all()); */
                $book = EbookLimitModel2::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel2::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel2::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else if ($library_id == '333') {

                $subscription = EbookSubscription3::where('member_id', $member_id_third_id)
                    ->where('ebook_id', $request->ebook_id)
                    ->first();

                if ($subscription) {
                    // If the record exists, update its fields with the data from $request->all()
                 $ebook =   $subscription->update([
                        'member_id' => $member_id_third_id,
                        'ebook_id' => $request->ebook_id,
                        'issued_on' => $request->issued_on,
                        'returned_on' => $request->returned_on,
                        'library_id' => $request->library_id,
                        'razorpay_payment_id' => $request->razorpay_payment_id,
                        'renew' => $request->renew,
                        'amount' => $request->amount,

                    ]);
                } else {
                    // If the record doesn't exist, create a new one with the specified values
                    $ebook =  EbookSubscription3::create([
                        'member_id' => $member_id_third_id,
                        'ebook_id' => $request->ebook_id,
                        'issued_on' => $request->issued_on,
                        'returned_on' => $request->returned_on,
                        'library_id' => $request->library_id,
                        'razorpay_payment_id' => $request->razorpay_payment_id,
                        'renew' => $request->renew,
                        'amount' => $request->amount,

                    ]);

                }

                /* $ebook = EbookSubscription3::updateOrCreate(['member_id' => $member_id_third_id, "ebook_id" => $request->ebook_id], $request->all()); */
                $book = EbookLimitModel3::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel3::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel3::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else {
                $ebook = EbookSubscription::updateOrCreate(['member_id' => $request->member_id, "ebook_id" => $request->ebook_id], $request->all());
                $book = EbookLimitModel::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            }
        } elseif ($site_name == "http://kundanlalgupta.smartcitylibrary.com") {

            /* logic to get correct member_id  */

            $member_id  = $request->member_id;

            if(isset($member_id))
            {
                $member_email = Member::where('id', $member_id)->first();
            }else{
                $member_email = '';
            }

            if(isset($member_email))
            {


                $member_id_second = Member2::where('email',$member_email->email)->first();
                $member_id_third = Member3::where('email',$member_email->email)->first();

                if(isset($member_id_second))
                {
                   $member_id_second_id =   $member_id_second->id;
                }else{
                   $member_id_second_id =   '';
                }

                if(isset($member_id_third))
                {
                   $member_id_third_id = $member_id_third->id;
                }else{
                   $member_id_third_id ='';
                }
            }else{
                $member_id_second_id =   '';
                $member_id_third_id ='';
            }



            /* logic to get correct member_id  */

            if ($library_id == "111") {

                $subscription = EbookSubscription2::where('member_id', $member_id_second_id)
                ->where('ebook_id', $request->ebook_id)
                ->first();

            if ($subscription) {
                // If the record exists, update its fields with the data from $request->all()
             $ebook =   $subscription->update([
                    'member_id' => $member_id_second_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);
            } else {
                // If the record doesn't exist, create a new one with the specified values
                $ebook =  EbookSubscription2::create([
                    'member_id' => $member_id_second_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);

            }


                /* $ebook = EbookSubscription2::updateOrCreate(['member_id' => $member_id_second_id, "ebook_id" => $request->ebook_id], $request->all()); */
                $book = EbookLimitModel2::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel2::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel2::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else if ($library_id == '333') {

                $subscription = EbookSubscription3::where('member_id', $member_id_third_id)
                ->where('ebook_id', $request->ebook_id)
                ->first();

            if ($subscription) {
                // If the record exists, update its fields with the data from $request->all()
             $ebook =   $subscription->update([
                    'member_id' => $member_id_third_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);
            } else {
                // If the record doesn't exist, create a new one with the specified values
                $ebook =  EbookSubscription3::create([
                    'member_id' => $member_id_third_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);

            }

               /*  $ebook = EbookSubscription3::updateOrCreate(['member_id' => $member_id_third_id, "ebook_id" => $request->ebook_id], $request->all()); */
                $book = EbookLimitModel3::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel3::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel3::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else {
                $ebook = EbookSubscription::updateOrCreate(['member_id' => $request->member_id, "ebook_id" => $request->ebook_id], $request->all());
                $book = EbookLimitModel::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            }
        } elseif ($site_name == "http://rashtramatakasturba.smartcitylibrary.com") {

             /* logic to get correct member_id  */

             $member_id  = $request->member_id;

             if(isset($member_id))
             {
                 $member_email = Member::where('id', $member_id)->first();
             }else{
                 $member_email = '';
             }
             if(isset($member_email))
             {


                 $member_id_second = Member2::where('email',$member_email->email)->first();
                 $member_id_third = Member3::where('email',$member_email->email)->first();

                 if(isset($member_id_second))
                 {
                    $member_id_second_id =   $member_id_second->id;
                 }else{
                    $member_id_second_id =   '';
                 }

                 if(isset($member_id_third))
                 {
                    $member_id_third_id = $member_id_third->id;
                 }else{
                    $member_id_third_id ='';
                 }
             }else{
                 $member_id_second_id =   '';
                 $member_id_third_id ='';
             }



             /* logic to get correct member_id  */


            if ($library_id == "111") {

                $subscription = EbookSubscription2::where('member_id', $member_id_second_id)
                ->where('ebook_id', $request->ebook_id)
                ->first();

            if ($subscription) {
                // If the record exists, update its fields with the data from $request->all()
             $ebook =   $subscription->update([
                    'member_id' => $member_id_second_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);
            } else {
                // If the record doesn't exist, create a new one with the specified values
                $ebook =  EbookSubscription2::create([
                    'member_id' => $member_id_second_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);

            }


                /* $ebook = EbookSubscription2::updateOrCreate(['member_id' => $member_id_second_id, "ebook_id" => $request->ebook_id], $request->all()); */
                $book = EbookLimitModel2::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel2::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel2::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else if ($library_id == '222') {

                $subscription = EbookSubscription3::where('member_id', $member_id_third_id)
                ->where('ebook_id', $request->ebook_id)
                ->first();

            if ($subscription) {
                // If the record exists, update its fields with the data from $request->all()
             $ebook =   $subscription->update([
                    'member_id' => $member_id_third_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);
            } else {
                // If the record doesn't exist, create a new one with the specified values
                $ebook =  EbookSubscription3::create([
                    'member_id' => $member_id_third_id,
                    'ebook_id' => $request->ebook_id,
                    'issued_on' => $request->issued_on,
                    'returned_on' => $request->returned_on,
                    'library_id' => $request->library_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'renew' => $request->renew,
                    'amount' => $request->amount,

                ]);

            }


               /*  $ebook = EbookSubscription3::updateOrCreate(['member_id' => $member_id_third_id, "ebook_id" => $request->ebook_id], $request->all()); */
                $book = EbookLimitModel3::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel3::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel3::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else {
                $ebook = EbookSubscription::updateOrCreate(['member_id' => $request->member_id, "ebook_id" => $request->ebook_id], $request->all());
                $book = EbookLimitModel::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            }
        } else {
            /* if ($library_id == "222") {
                $ebook = EbookSubscription2::updateOrCreate(['member_id' => $request->member_id, "ebook_id" => $request->ebook_id], $request->all());
                $book = EbookLimitModel2::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel2::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel2::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else if ($library_id == 333) {

                $ebook = EbookSubscription3::updateOrCreate(['member_id' => $request->member_id, "ebook_id" => $request->ebook_id], $request->all());
                $book = EbookLimitModel3::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel3::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel3::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } else {
                $ebook = EbookSubscription::updateOrCreate(['member_id' => $request->member_id, "ebook_id" => $request->ebook_id], $request->all());
                $book = EbookLimitModel::where("ebook_id", $request->ebook_id)->first();
                if ($book) {
                    EbookLimitModel::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
                } else {
                    EbookLimitModel::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
                }
                return response()->json([
                    'data' => $ebook,
                    'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
                ]);
            } */
        }
    }
}
