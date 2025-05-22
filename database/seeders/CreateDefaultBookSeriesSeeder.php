<?php

namespace Database\Seeders;

use App\Repositories\Contracts\BookSeriesRepositoryInterface;
use App\Repositories\Contracts\SeriesBookRepositoryInterface;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

/**
 * Class CreateDefaultBookSeriesSeeder
 */
class CreateDefaultBookSeriesSeeder extends Seeder
{
    public function run()
    {
        /** @var BookSeriesRepositoryInterface $bookSeriesRepo */
        $bookSeriesRepo = App::make(BookSeriesRepositoryInterface::class);
        /** @var SeriesBookRepositoryInterface $seriesBookRepo */
        $seriesBookRepo = App::make(SeriesBookRepositoryInterface::class);

        $input[] = [
            'title' => 'Harry Potter', 'series_items' => [
                [
                    'book_id'  => 13,
                    'sequence' => 1,
                ],
                [
                    'book_id'  => 14,
                    'sequence' => 2,
                ],
                [
                    'book_id'  => 15,
                    'sequence' => 3,
                ],
                [
                    'book_id'  => 16,
                    'sequence' => 4,
                ],
                [
                    'book_id'  => 17,
                    'sequence' => 5,
                ],
                [
                    'book_id'  => 18,
                    'sequence' => 6,
                ],
                [
                    'book_id'  => 19,
                    'sequence' => 7,
                ],
            ],
        ];
        $input[] = [
            'title'        => 'The Vampire Diaries',
            'series_items' => [
                [
                    'book_id'  => 11,
                    'sequence' => 1,
                ],
                [
                    'book_id'  => 12,
                    'sequence' => 2,
                ],
                [
                    'book_id'  => 7,
                    'sequence' => 3,
                ],
            ],
        ];

        foreach ($input as $bookSeries) {
            $items = $bookSeries['series_items'];

            unset($bookSeries['series_items']);

            $bookSeries = $bookSeriesRepo->store($bookSeries);
            $seriesBookRepo->createOrUpdateSeriesItems($bookSeries, $items);
        }
    }
}
