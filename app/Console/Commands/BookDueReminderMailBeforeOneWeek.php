<?php

namespace App\Console\Commands;

use App\Mail\MarkdownMail;
use App\Models\IssuedBook;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class BookDueReminderMailBeforeOneWeek extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:book-due-mail-before-one-week';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send book due reminder mail to member before one week.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Sending Reminder..');

        $date = Carbon::now()->addWeek();
        $issuedBook = IssuedBook::with('member', 'bookItem.book')
            ->whereDate('return_due_date', '=', $date)
            ->where('status', '!=', IssuedBook::STATUS_RETURNED)
            ->get()
            ->groupBy('member_id');
        if (!count($issuedBook)) {
            $this->info('Reminder Sent Successfully.');
            return;
        }

        $input = [];
        foreach ($issuedBook as $books) {
            $input['firstName'] = $books->first()->member->first_name;
            $input['lastName'] = $books->first()->member->last_name;
            $input['email'] = $books->first()->member->email;
            $input['dueDate'] = Carbon::parse($books->first()->return_due_date)->format('l jS F,Y');
            unset($input['books']);
            foreach ($books as $book) {
                $input['books'][] = $book->bookItem->book->name;
            }

            Mail::to($input['email'])
                ->send(new MarkdownMail(
                    'mail.book_due_reminder_before_one_week',
                    ' Urgent: Return Reminder for ' . $input['books'],
                    $input
                ));
        }

        $this->info('Reminder Sent Successfully.');
    }
}
