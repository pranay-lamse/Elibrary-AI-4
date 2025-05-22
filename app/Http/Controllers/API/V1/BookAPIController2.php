<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Book;
use App\Models\Book2;
use App\Models\Book3;
use App\Models\BookItem;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\BookRepositoryInterface2;
use App\Repositories\Contracts\BookRepositoryInterface3;

/**
 * Class BookController
 */
class BookAPIController2 extends AppBaseController
{
    /** @var BookRepositoryInterface */
    private $bookRepository;
    private $bookRepository2;
    private $bookRepository3;

    public function __construct(BookRepositoryInterface $bookRepo, BookRepositoryInterface2 $bookRepo2, BookRepositoryInterface3 $bookRepo3)
    {
        $this->bookRepository = $bookRepo;
        $this->bookRepository2 = $bookRepo2;
        $this->bookRepository3 = $bookRepo3;
    }

    /**
     * Display a listing of the Book.
     * GET|HEAD /books
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        if(!isset($request->skip)){
            $skip = 0;
        }else{
            $skip = 0;
        }

        if(!isset($request->limit)){
            $limit = 10;
        }else{
            $limit = 10;
        }

        $books = $this->bookRepository->all(
            $request->except(['skip', 'limit']),


            $request->get('skip') ?? $skip,
            $request->get('limit') ?? $limit
        );
        $books2 = $this->bookRepository2->all(
            $request->except(['skip', 'limit']),
            $request->get('skip') ?? $skip,
            $request->get('limit') ?? $limit
        );
        $books3 = $this->bookRepository3->all(
            $request->except(['skip', 'limit']),
            $request->get('skip') ?? $skip,
            $request->get('limit') ?? $limit
        );

        $books = array_merge($books2->toArray(), $books3->toArray(), $books->toArray());

        $filteredArray = array();

        foreach ($books as $key => $value) {


            if (!empty($value['items'])) {
                array_push($filteredArray, $value);
            }
        }




        return $this->sendResponse($filteredArray, 'Books retrieved successfully.');
    }


    public function fetch4Books(Request $request)
    {
        $books = $this->bookRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit', 4)
        );


        $books = $books->toArray();

        $filteredArray = array();

        foreach ($books as $key => $value) {


            if (!empty($value['items'])) {
                array_push($filteredArray, $value);
            }
        }




        return $this->sendResponse($filteredArray, 'Books retrieved successfully.');
    }

    public function fetch4Books2(Request $request)
    {
        $books = $this->bookRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit', 4)
        );
        /* $books2 = $this->bookRepository2->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );
        $books3 = $this->bookRepository3->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        ); */

        $books = $books->toArray();

        $filteredArray = array();

        foreach ($books as $key => $value) {


            if (!empty($value['items'])) {
                array_push($filteredArray, $value);
            }
        }




        return $this->sendResponse($filteredArray, 'Books retrieved successfully.');
    }


    public function pdfDownload(BookItem $item, Request $request): JsonResponse
    {
        $bookItem = $item->whereId($request->id)->get()->toArray();


        $data = [];
        if (Storage::exists('pdf/book-item-' . $bookItem[0]['book_code'] . '.pdf')) {
            Storage::delete('pdf/book-item-' . $bookItem[0]['book_code'] . '.pdf');
        }
        $pdf = PDF::loadView('pdf.book-item-pdf', compact('bookItem'))->setOptions([
            'tempDir' => public_path(),
            'chroot'  => public_path(),
        ]);

        Storage::disk(config('app.media_disc'))->put(
            'pdf/book-item-' . $bookItem[0]['book_code'] . '.pdf',
            $pdf->output()
        );
        $data['purchase_return_pdf_url'] = Storage::url('public/uploads/ebooks/' . $bookItem[0]['file_name']);

        return $this->sendResponse($data, "purchase return pdf retrieved Successfully");
    }
}
