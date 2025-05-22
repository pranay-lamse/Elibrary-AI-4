<?php

namespace Database\Seeders;
use App\Repositories\Contracts\BookRepositoryInterface;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

/**
 * Class CreateBooksSeeder
 */
class CreateBooksSeeder extends Seeder
{
    public function run()
    {
        /** @var BookRepositoryInterface $bookRepo */
        $bookRepo = App::make(BookRepositoryInterface::class);

        $bookRecords = json_decode(file_get_contents(public_path('resources/books.json')), true);

        foreach ($bookRecords as $book) {
            $items = $book['items'];
            $authors = $book['authors'];
            $tags = $book['tags'];
            $genres = $book['genres'];
            $image = $book['image'];
            unset($book['image']);
//            $book['image_url']= asset('uploads/books').'/'.$image;

            unset($book['items'], $book['authors'], $book['tags'], $book['genres']);

            $book = $bookRepo->store($book);
            $bookRepo->createOrUpdateBookItems($book, $items);
            $bookRepo->attachAuthors($book, ['authors' => $authors]);
            $bookRepo->attachTagsAndGenres($book, ['tags' => $tags, 'genres' => $genres]);
        }
    }
}
