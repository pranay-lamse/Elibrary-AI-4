<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\AboutUsCard;
use App\Models\Book;
use App\Models\Book2;
use App\Models\Book3;
use App\Models\Genre;
use App\Models\HomepageSetting;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\BookRepositoryInterface2;
use App\Repositories\Contracts\BookRepositoryInterface3;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookAPIController
 */
class BookAPIController extends AppBaseController
{
    /**
     * @var BookRepositoryInterface
     */
    private $bookRepository;
    private $bookRepository2;
    private $bookRepository3;

    public function __construct(BookRepositoryInterface $bookRepository, BookRepositoryInterface2 $bookRepository2, BookRepositoryInterface3 $bookRepository3)
    {
        $this->bookRepository = $bookRepository;
        $this->bookRepository2 = $bookRepository2;
        $this->bookRepository3 = $bookRepository3;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $input['is_featured'] = true;

        list($books, $count) = $this->bookRepository->searchBooks(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        list($books2, $count2) = $this->bookRepository2->searchBooks(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        list($books3, $count3) = $this->bookRepository3->searchBooks(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        // dd($books->toArray());

        $books = $books->map(function (Book $record) {
            return $record->toArray();
        });

        $books2 = $books2->map(function (Book2 $record) {
            return $record->toArray();
        });

        $books3 = $books3->map(function (Book3 $record) {
            return $record->toArray();
        });



        $data['books'] = array_merge($books->toArray(), $books2->toArray(), $books3->toArray());

        $data['genres'] = Genre::where('show_on_landing_page', 1)->get();
        $data['homePageSetting'] = HomepageSetting::whereIn('key', [
            'hero_image_title', 'hero_image_description', 'about_us_text', 'genres_text', 'popular_books_text',
        ])->get();
        $data['aboutUsCard'] = AboutUsCard::whereIsActive(true)->get();

        return $this->sendResponse(
            $data,
            'Books retrieved successfully.',
            ['totalRecords' => $count + $count2 + $count3]
        );
    }

    /**
     * @return JsonResponse
     */
    public function totalBooks()
    {
        $count = Book::count();

        return $this->sendResponse($count, 'Books count retrieved successfully.');
    }
}
