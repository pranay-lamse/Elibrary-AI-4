<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Member;
use App\Services\FCMService;
use Illuminate\Support\Facades\Http;
use Config;
class FirebaseController extends Controller
{
    public function sendNotificationrToUser()
    {
       // get a user to get the fcm_token that already sent.               from mobile apps
       /* $user = User::findOrFail($id); */
        $response_all_users =    Http::acceptJson()->get('https://elibraryuse-default-rtdb.firebaseio.com/deviceTokens.json' );

        $response = $response_all_users->object();


        foreach($response as $response)
        {

            FCMService::send(
                $response->token,
                [
                    'title' => 'Hi genius',
                    'body' => 'Not u',
                ]
            );
        }





    }



    public function membershipRenewal()
    {
       // get a user to get the fcm_token that already sent.               from mobile apps
       /* $user = User::findOrFail($id); */
       /*  $response_all_users =    Http::acceptJson()->get('https://elibraryuse-default-rtdb.firebaseio.com/deviceTokens.json' );

        $response = $response_all_users->object(); */

        $currenturl = Config::get('app.site_url');

        $response = Member::whereNotNull('fcm_token')->get();



        if ($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com') {
            $library_name = 'dindayalupadhyay library';

        } elseif ($currenturl == 'http://kundanlalgupta.smartcitylibrary.com') {
            $library_name = 'kundanlalgupta library';
        }else{
            $library_name = 'rashtramatakasturba library';
        }
        foreach($response as $response)
        {



            $first_name = $response->first_name ?? '-';

            FCMService::send(
                $response->fcm_token,
                [
                    'title' => 'Membership renewal! ',
                    'body' => 'Hi '.$first_name.', This is a reminder that your membership with '.$library_name.' expiring after 7 days and you are now within your membership grace period. We hope you will take the time to renew your membership and remain a part of our community. ',
                ]
            );
        }





    }

    public function bookReturnDateArrivingNotification()
    {
        $currenturl = Config::get('app.site_url');

        $response = Member::whereNotNull('fcm_token')->get();



        if ($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com') {
            $library_name = 'dindayalupadhyay library';

        } elseif ($currenturl == 'http://kundanlalgupta.smartcitylibrary.com') {
            $library_name = 'kundanlalgupta library';
        }else{
            $library_name = 'rashtramatakasturba library';
        }
        foreach($response as $response)
        {



            $first_name = $response->first_name ?? '-';

            FCMService::send(
                $response->fcm_token,
                [
                    'title' => 'Book Return Date! ',
                    'body' => 'Dear  '.$first_name.', Please return the following book(s) immediately. Fine amount will be collected after the due date as per library policy.

                    ',


                ]
            );
        }

    }
    public function penaltyNotification()
    {
        $currenturl = Config::get('app.site_url');

        $response = Member::whereNotNull('fcm_token')->get();



        if ($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com') {
            $library_name = 'dindayalupadhyay library';

        } elseif ($currenturl == 'http://kundanlalgupta.smartcitylibrary.com') {
            $library_name = 'kundanlalgupta library';
        }else{
            $library_name = 'rashtramatakasturba library';
        }
        foreach($response as $response)
        {



            $first_name = $response->first_name ?? '-';

            FCMService::send(
                $response->fcm_token,
                [
                    'title' => 'Penalty Notification! ',
                    'body' => 'Dear  '.$first_name.', Please clear penalty due for '.$library_name,


                ]
            );
        }
    }
    public function newBookArrivedNotification()
    {
        $currenturl = Config::get('app.site_url');

        $response = Member::whereNotNull('fcm_token')->get();



        if ($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com') {
            $library_name = 'dindayalupadhyay library';

        } elseif ($currenturl == 'http://kundanlalgupta.smartcitylibrary.com') {
            $library_name = 'kundanlalgupta library';
        }else{
            $library_name = 'rashtramatakasturba library';
        }
        foreach($response as $response)
        {



            $first_name = $response->first_name ?? '-';

            FCMService::send(
                $response->fcm_token,
                [
                    'title' => 'New book arriving Notification! ',
                    'body' => 'Dear  '.$first_name.', Please check new updated books from  '.$library_name,


                ]
            );
        }
    }
    public function newFeaturesNotifications()
    {
        $currenturl = Config::get('app.site_url');

        $response = Member::whereNotNull('fcm_token')->get();



        if ($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com') {
            $library_name = 'dindayalupadhyay library';

        } elseif ($currenturl == 'http://kundanlalgupta.smartcitylibrary.com') {
            $library_name = 'kundanlalgupta library';
        }else{
            $library_name = 'rashtramatakasturba library';
        }
        foreach($response as $response)
        {



            $first_name = $response->first_name ?? '-';

            FCMService::send(
                $response->fcm_token,
                [
                    'title' => 'New Features added! ',
                    'body' => 'Dear  '.$first_name.', Please check new updated Features for  '.$library_name,


                ]
            );
        }

    }



}
