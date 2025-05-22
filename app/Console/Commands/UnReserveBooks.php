<?php

namespace App\Console\Commands;

use App\Models\BookItem;
use App\Models\IssuedBook;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UnReserveBooks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lms:un-reserve-books';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reserved due books are un-reserved automatically.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        /** @var IssuedBook[] $issueBooks */
        $issueBooks = IssuedBook::with('bookItem')->whereStatus(IssuedBook::STATUS_RESERVED)->get();

        foreach ($issueBooks as $issueBook) {
            if ($issueBook->issue_due_date > Carbon::now()->toDateTimeString()) {
                continue;
            }
            $issueBook->update(['status' => IssuedBook::STATUS_UN_RESERVED]);

            /** @var BookItem $bookItem */
            $bookItem = BookItem::findOrFail($issueBook->book_item_id);
            $bookItem->update(['status' => BookItem::STATUS_AVAILABLE]);
            $this->info("Un-Reserved book with id : $issueBook->id");
        }
    }
}
