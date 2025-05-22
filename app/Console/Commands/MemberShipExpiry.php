<?php

namespace App\Console\Commands;

use App\Mail\MailSender;
use App\Models\Member;
use App\Models\Subscription;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class MemberShipExpiry extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Mails To Members whose subscription is about to end.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentDate = Carbon::now();
        $endDateThreshold = $currentDate->copy()->addWeek();
        $subscriptions = Subscription::whereBetween('end_date', [$currentDate, $endDateThreshold])->with('member')->get()->toArray();
        if (!empty($subscriptions)) {
            foreach ($subscriptions as $key => $value) {
                $data['firstName'] = $value['member']['first_name'];
                $data['lastName'] = $value['member']['last_name'];
                $data['endDate'] = date('l, F j, Y \a\t g:i A', strtotime($value['end_date']));
                $data['email'] = $value['member']['email'];
                $data['libraryName'] = env('LIBRARY_NAME');
                try {
                    Mail::to($value['member']['email'])->send(new MailSender('mail.subscription', 'Reminder of Elibrary Membership Subscriptions.', $data));
                    Log::info("Membership Subscription Expiry Mail send to " . $value['member']['email']);
                } catch (Exception $error) {
                    echo $error->getMessage();
                }
            }
        }

        // Mail::send('mail.subscription', [], function ($message) {
        //     $message->to('rahul.u@veerit.com')->subject('Reminder of Elibrary Membership Subscriptions.');
        // });
        // Log::info("Membership Subscription Expiry Mail send to rahul.u@veerit.com");
    }
}
