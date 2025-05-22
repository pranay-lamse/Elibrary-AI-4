<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Setting;
use App\Mail\MarkdownMail;
use App\Models\IssuedBook;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class BookDueReminderMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:book-due-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send book due reminder mail to member.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Sending Reminder..');

        $date = Carbon::now()->addDays(getSettingValueByKey(Setting::BOOK_DUE_REMINDER_DAYS))->toDateString();
        $issuedBook = IssuedBook::with('member')
            ->whereDate('return_due_date', '=', $date)
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->get();

        if (count($issuedBook) > 0) {
            foreach ($issuedBook as $book) {
                $input['firstName'] = $book->member->first_name;
                $input['lastName'] = $book->member->last_name;
                $input['book'] = $book->bookItem->book->name;
                $input['dueDate'] = Carbon::parse($book->return_date)->format('l jS F,Y');
                $input['logo'] = getLogoURL();
                Mail::to($book->member->email)
                    ->send(new MarkdownMail(
                        'mail.book_due_reminder_before_days',
                        getSettingValueByKey(Setting::LIBRARY_NAME) . ' - Book Due Reminder',
                        $input
                    ));
            }
        }

        $this->info('Reminder Sent Successfully.');
    }
}
