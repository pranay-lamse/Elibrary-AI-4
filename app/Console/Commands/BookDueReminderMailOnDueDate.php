<?php

namespace App\Console\Commands;

use App\Mail\MarkdownMail;
use App\Models\IssuedBook;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class BookDueReminderMailOnDueDate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:send-book-due-mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send book due reminder mail to member and admin on due date.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Sending Reminder..');

        $date = Carbon::today();
        $issuedBook = IssuedBook::with('member')
            ->whereDate('return_due_date', '=', $date)
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->get();

        if (! count($issuedBook)) {
            $this->info('Reminder Sent Successfully.');

            return;
        }

        foreach ($issuedBook as $book) {
            $input['firstName'] = $book->member->first_name;
            $input['lastName'] = $book->member->last_name;
            $input['book'] = $book->bookItem->book->name;
            $input['dueDate'] = Carbon::parse($book->return_date)->format('l jS F,Y');
            Mail::to($book->member->email)
                ->send(new MarkdownMail('mail.book_due_reminder_on_due_day',
                    getSettingValueByKey(Setting::LIBRARY_NAME).' - Book Due Reminder',
                    $input));
            Mail::to(config('app.admin_email'))
                ->send(new MarkdownMail('mail.book_due_reminder_to_admin',
                    getSettingValueByKey(Setting::LIBRARY_NAME).' - Due Book',
                    $input));
        }

        $this->info('Reminder Sent Successfully.');
    }
}
