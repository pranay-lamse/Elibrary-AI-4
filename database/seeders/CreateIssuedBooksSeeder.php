<?php

namespace Database\Seeders;


use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

/**
 * Class CreateIssuedBooksSeeder
 */
class CreateIssuedBooksSeeder extends Seeder
{
    public function run()
    {
        /** @var IssuedBookRepositoryInterface $issuedBookRepo */
        $issuedBookRepo = App::make(IssuedBookRepositoryInterface::class);
        $member = Member::first();

        $item1 = BookItem::whereId(1)->first();
        $item2 = BookItem::whereId(2)->first();
        $item3 = BookItem::whereId(3)->first();
        $item4 = BookItem::whereId(4)->first();
        $item5 = BookItem::whereId(5)->first();
        $item6 = BookItem::whereId(6)->first();
        $item7 = BookItem::whereId(7)->first();
        $item8 = BookItem::whereId(8)->first();
        $item9 = BookItem::whereId(9)->first();
        $item10 = BookItem::whereId(10)->first();

        $input = ['member_id' => $member->id];

        $issuedBookRepo->issueBook(array_merge($input, ['book_item_id' => $item1->id, 'issued_on' => '2019-09-01']));
        $issuedBookRepo->returnBook(array_merge($input, ['book_item_id' => $item1->id, 'return_date' => '2019-09-12']));

        $issuedBookRepo->reserveBook(array_merge($input, [
            'book_item_id' => $item2->id, 'reserve_date' => '2019-08-05',
        ]));
        $issuedBookRepo->reserveBook(array_merge($input, [
            'book_item_id' => $item3->id, 'reserve_date' => '2019-07-22',
        ]));
        $issuedBookRepo->reserveBook(array_merge($input,
            ['book_item_id' => $item4->id, 'reserve_date' => '2019-07-18']));

        $issuedBookRepo->issueBook(array_merge($input, ['book_item_id' => $item5->id, 'issued_on' => '2019-07-02']));
        $issuedBookRepo->issueBook(array_merge($input, ['book_item_id' => $item6->id, 'issued_on' => '2019-07-02']));
        $issuedBookRepo->issueBook(array_merge($input, ['book_item_id' => $item7->id, 'issued_on' => '2019-09-25']));

        $issuedBookRepo->issueBook(array_merge($input, ['book_item_id' => $item8->id, 'issued_on' => '2019-04-01']));
        $issuedBookRepo->updateIssuedBookStatus(['book_item_id' => $item8->id, 'status' => IssuedBook::STATUS_LOST]);

        $issuedBookRepo->issueBook(array_merge($input, ['book_item_id' => $item9->id, 'issued_on' => '2019-05-01']));
        $issuedBookRepo->returnBook(array_merge($input, ['book_item_id' => $item9->id, 'return_date' => '2019-05-14']));

        $issuedBookRepo->reserveBook(array_merge(
                $input,
                ['book_item_id' => $item10->id, 'reserve_date' => '2019-04-07'])
        );
        $issuedBookRepo->unReserveBook($item10, $input);
    }
}
