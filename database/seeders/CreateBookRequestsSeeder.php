<?php

namespace Database\Seeders;

use App\Models\BookItem;
use App\Models\BookRequest;
use Illuminate\Database\Seeder;

/**
 * Class CreateBookRequestsSeeder
 */
class CreateBookRequestsSeeder extends Seeder
{
    public function run()
    {
        $requests[] = [
            1,
            'Attitude Is Everything',
            9788188452767,
            "1st",
            BookItem::FORMAT_PAPERBACK,
            BookRequest::PENDING,
        ];
        $requests[] = [
            1,
            'Think and Grow Rich',
            9780615823423,
            "3rd",
            BookItem::FORMAT_PAPERBACK,
            BookRequest::APPROVED,
        ];
        $requests[] = [
            1,
            'The Surrogates',
            9788817039383,
            "10th",
            BookItem::FORMAT_HARDCOVER,
            BookRequest::CANCELLED,
        ];
        $requests[] = [
            1,
            'Harry Potter and the Philosopher\'s Stone',
            9780439324663,
            "1st",
            BookItem::FORMAT_HARDCOVER,
            BookRequest::AVAILABLE,
        ];

        foreach ($requests as $request) {
            BookRequest::create([
                'member_id'  => $request[0],
                'book_name'  => $request[1],
                'isbn'       => $request[2],
                'edition'    => $request[3],
                'format'     => $request[4],
                'status'     => $request[5],
            ]);
        }
    }
}
