<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class IssuedBookController
 */
class IssuedBookAPIController extends AppBaseController
{
    /** @var IssuedBookRepositoryInterface */
    private $issuedBookRepository;

    public function __construct(IssuedBookRepositoryInterface $issuedBookRepo)
    {
        $this->issuedBookRepository = $issuedBookRepo;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function booksHistory(Request $request)
    {
        $search = $request->all();
        $search['member_id'] = Auth::id();

        $records = $this->issuedBookRepository->searchBookHistory(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiM1BookHistoryObj();
        });

        $input['withCount'] = 1;

        return $this->sendResponse(
            $records,
            'Books history retrieved successfully.',
            $this->getTotalRecords(IssuedBook::class, $input, $records)
        );
    }

    /**
     * @param  int  $issuedBookId
     *
     * @return JsonResponse
     */
    public function booksHistoryDetail($issuedBookId)
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = IssuedBook::findOrFail($issuedBookId);

        $result = $issuedBook->apiM1BookHistoryDetailObj();

        return $this->sendResponse(
            $result,
            'Books history Details retrieved successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function reserveBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['status'] = IssuedBook::STATUS_RESERVED;
        $input['book_item_id'] = $bookItem->id;
        $input['member_id'] = Auth::id();

        $result = $this->issuedBookRepository->reserveBook($input);

        return $this->sendResponse($result->apiM1Obj(), 'Book reserved successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     *
     * @return JsonResponse
     */
    public function unReserveBook(BookItem $bookItem)
    {
        $input['member_id'] = Auth::id();
        $result = $this->issuedBookRepository->unReserveBook($bookItem, $input);

        return $this->sendResponse($result->apiM1Obj(), 'Book un-reserved successfully.');
    }
}
