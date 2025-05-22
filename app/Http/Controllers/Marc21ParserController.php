<?php

namespace App\Http\Controllers;

use Exception;
use Scriptotek\Marc\Record;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use App\Models\Author;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\Tag;
use App\Repositories\Contracts\BookRepositoryInterface;

class Marc21ParserController extends AppBaseController
{
    public $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepo)
    {
        $this->bookRepository = $bookRepo;
    }

    function generateRandomNumber($range, $prepender = null)
    {
        $randomString = "";

        if ($prepender !== null) {
            $remainingLength = $range - strlen($prepender);
            for ($i = 0; $i < $remainingLength; $i++) {
                $randomNumber = rand(0, 9); // Generates random digit between 0 and 9
                $randomString .= $randomNumber;
            }
            return $prepender . $randomString;
        } else {
            for ($i = 0; $i < $range; $i++) {
                $randomNumber = rand(0, 9); // Generates random digit between 0 and 9
                $randomString .= $randomNumber;
            }
            return intval($randomString);
        }
    }

    public function parseAndStore(Request $request,)
    {

        try {
            $record = Record::fromFile($request->file)->jsonSerialize();
            if (!empty($record)) {
                $book['is_featured'] = 0;
                $book['isbn'] = intval($record['isbns'][0]);
                $book['name'] = $record['title'];
                // $book['authors'] = $record['creators'][0]['name'];
                $book['library_id'] = env("LIBRARY_ID");

                $tag = Tag::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                $genre = Genre::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                $publisher = Publisher::firstOrCreate(['name' => $record['publisher']], ['name' => $record['publisher']]);

                $book['authors'] = array_map(function ($author) {
                    $author = explode(',', $author['name']);

                    $firstAuthor = Author::firstOrCreate([
                        'first_name' => $author[0],

                    ], ['first_name' => $author[0]]);
                    $secondAuthor = Author::firstOrCreate([
                        'first_name' => $author[1],

                    ], ['first_name' => $author[1]]);

                    return [$firstAuthor->id, $secondAuthor->id];
                }, [$record['creators'][0]])[0];
                // $book['tags'] = array_map(fn ($sub) => $sub['term'], $record['subjects']);
                $book['tags'] = [$tag->id];
                $book['genres'] = [$genre->id];
                $book['description'] = $record['summary']['text'];
                $book['items'][0]['edition'] = $record['edition'];
                $book['items'][0]['book_code'] = intval($this->generateRandomNumber(10));
                $book['items'][0]['format'] = 1;
                $book['items'][0]['language_id'] = 1;
                $book['items'][0]['status'] = 2;
                $book['items'][0]['publisher_id'] = $publisher->id;
                $book['items'][0]['price'] = 0;
                $result = $this->bookRepository->store($book);
                return $this->sendResponse($result, 'Book saved successfully.');
            }
        } catch (Exception $error) {
            return $this->sendError($error->getMessage(), 422);
        }
    }
}
