<?php

namespace App\Http\Controllers\API\B1;

use Exception;
use App\Models\Book;
use App\Models\BookItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookItemAPIController
 */
class BookItemAPIController extends AppBaseController
{
    /** @var BookItemRepositoryInterface */
    private $bookItemRepo;

    public function __construct(BookItemRepositoryInterface $bookItemRepo)
    {
        $this->bookItemRepo = $bookItemRepo;
    }

    /**
     * @param  Book  $book
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function availableBooks(Book $book, Request $request)
    {
        $search = $request->only(['member_id']);
        $search['book_id'] = $book->id;
        $search['status'] = BookItem::STATUS_AVAILABLE;

        $records = $this->bookItemRepo->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse($records->toArray(), 'Books history retrieved successfully.');
    }





    public function availableBooksByBookItem(Request $request)
    {


        /* $search = BookItem::where('book_code', '=', $request->bookId)->get();
        foreach ($search as $get_value) {
            $search['book_name'] = Book::where('id', '=', $get_value['book_id'])->get();
        }

        return $this->sendResponse($search, 'BookItem history retrieved successfully.'); */

        $search = BookItem::where('book_code', '=', $request->bookId)->with('book')->get();
        /* foreach ($search as $get_value) {
            $search['book_name'] = Book::where('id', '=', $get_value['book_id'])->get();
        } */

        return $this->sendResponse($search, 'BookItem history retrieved successfully.');
    }



    public function availableBooksByBookItemWithoutMember(Request $request)
    {


        /* $search = BookItem::where('book_code', '=', $request->bookId)->get();
        foreach ($search as $get_value) {
            $search['book_name'] = Book::where('id', '=', $get_value['book_id'])->get();
        }

        return $this->sendResponse($search, 'BookItem history retrieved successfully.'); */

        $search = BookItem::where('book_code', '=', $request->bookId)->with('book' ,'issuedBooks')->get();
        /* foreach ($search as $get_value) {
            $search['book_name'] = Book::where('id', '=', $get_value['book_id'])->get();
        } */

        return $this->sendResponse($search, 'BookItem history retrieved successfully.');
    }



    /**
     * @param  BookItem  $bookItem
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookItem $bookItem)
    {

        if ($bookItem->status == BookItem::STATUS_NOT_AVAILABLE) {
            throw new BadRequestHttpException('BookItem can not be delete, it is reserved OR issued by someone.');
        }
        $bookItem->delete();

        return $this->sendSuccess('BookItem deleted successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function updateBookStatus(BookItem $bookItem, Request $request)
    {
        $input = $request->all();

        if (!in_array($input['status'], [
            BookItem::STATUS_AVAILABLE,
            BookItem::STATUS_NOT_AVAILABLE,
            BookItem::STATUS_LOST,
            BookItem::STATUS_DAMAGED,
        ])) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        $bookItem->status = $input['status'];
        $bookItem->save();

        return $this->sendResponse($bookItem->toArray(), 'Book status updated successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function searchBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookItemRepo->searchBooks(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (BookItem $bookItem) {
            return $bookItem->apiObj();
        });

        return $this->sendResponse($records, 'BookItem retrieved successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     *
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     *
     * @return \Illuminate\Contracts\Routing\ResponseFactory|JsonResponse|\Illuminate\Http\Response
     */
    public function downloadEBook(BookItem $bookItem)
    {
        if ($bookItem->format == BookItem::FORMAT_E_BOOK) {
            $mime = Storage::disk(config('app.ebook_disk'))->mimeType(BookItem::DOCUMENT_PATH . '/' . $bookItem->file_name);
            $file = Storage::disk(config('app.ebook_disk'))->get(BookItem::DOCUMENT_PATH . '/' . $bookItem->file_name);

            $headers = [
                'Content-Type'        => $mime,
                'Content-Description' => 'File Transfer',
                'Content-Disposition' => "attachment; filename={$bookItem->file_name}",
                'filename'            => $bookItem->file_name,
            ];

            return response($file, 200, $headers);
        }

        return $this->sendError('File Not Found.');
    }
}
