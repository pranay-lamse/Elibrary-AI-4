<?php

namespace App\Http\Controllers\API\B1;

use Exception;
use App\Models\Member;
use App\Models\BookItem;
use App\Models\IssuedBook;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BookCirculationExport;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\UpdateIssuedBookRequest;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Carbon\Carbon;

/**
 * Class IssuedBookController
 */
class IssuedBookAPIController extends AppBaseController
{
    /** @var IssuedBookRepositoryInterface */
    private $issuedBookRepository;

    public function __construct(IssuedBookRepositoryInterface $issuedBookRepository)
    {
        $this->issuedBookRepository = $issuedBookRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $issuedBooks = $this->issuedBookRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );
        $issuedBooks = $issuedBooks->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        $input['withCount'] = 1;
        return $this->sendResponse(
            $issuedBooks,
            [
                'message' => 'Issued Books retrieved successfully.',
                'totalRecords' => $this->issuedBookRepository->all($input)
            ]
        );
    }

    /**
     * @param  BookItem  $bookItem
     * @param  Request  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function issueBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['book_item_id'] = $bookItem->id;

        $result = $this->issuedBookRepository->issueBook($input);

        return $this->sendResponse($result->apiObj(), 'Book issued successfully.');
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

        $result = $this->issuedBookRepository->reserveBook($input);

        return $this->sendResponse($result->apiObj(), 'Book reserved successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     * @param  Request  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function returnBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['book_item_id'] = $bookItem->id;

        $result = $this->issuedBookRepository->returnBook($input);

        return $this->sendResponse($result->apiObj(), 'Book return successfully.');
    }

    public function reIssueBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['book_item_id'] = $bookItem->id;
        $input['status'] = IssuedBook::STATUS_RETURNED;
        $input['return_date'] =  Carbon::now()->toDateString();

        $result = $this->issuedBookRepository->returnBook($input);

        if($result)
        {

            $input2['book_id'] = $input['book_id'];
            $input2['book_item_id'] = $input['book_item_id'];
            $input2['member_id'] = $input['member_id'];
            $input2['note'] = $input['note'];
            $input2['status'] = IssuedBook::STATUS_ISSUED;
            $input2['collected_penalty'] = $input['collected_penalty'];
            $input2['penalty_collected'] = false;
            $input2['issued_on'] = $input['return_date'];



            $result = $this->issuedBookRepository->issueBook($input2);

            return $this->sendResponse($result->apiObj(), 'Book re-issued successfully.');
        }else{
            return $this->sendResponse($result->apiObj(), 'Something went wrong!.');

        }

    }



    /**
     * @param  BookItem  $bookItem
     * @param  Request  $request
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function updateIssuedBookStatus(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $input['book_item_id'] = $bookItem->id;

        $result = $this->issuedBookRepository->updateIssuedBookStatus($input);

        return $this->sendResponse($result->apiObj(), 'Issued Book status updated successfully.');
    }

    /**
     * @param  IssuedBook  $issuedBook
     *
     * @return JsonResponse
     */
    public function show(IssuedBook $issuedBook)
    {
        $issuedBook->issuer;
        $issuedBook->returner;
        $issuedBook->member;
        $bookItem = $issuedBook->bookItem;
        $bookItem->publisher;
        $bookItem->language;
        $book = $bookItem->book;
        $book->genres;
        $book->authors;
        $book->tags;

        return $this->sendResponse($issuedBook->apiObj(), 'Issued Book retrieved successfully.');
    }

    /**
     * @param  int  $id
     * @param  UpdateIssuedBookRequest  $request
     *
     * @return JsonResponse
     */
    public function update($id, UpdateIssuedBookRequest $request)
    {
        $input = $request->all();

        $this->issuedBookRepository->findOrFail($id);

        $issuedBook = $this->issuedBookRepository->update($input, $id);

        return $this->sendResponse($issuedBook->toArray(), 'Issued Book updated successfully.');
    }

    /**
     * @param  int  $id
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = $this->issuedBookRepository->findOrFail($id);

        $issuedBook->delete();

        return $this->sendSuccess('Issued Book deleted successfully.');
    }

    /**
     * @param  Member  $member
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function memberBooksHistory(Member $member, Request $request)
    {
        $search = $request->all();
        $search['member_id'] = $member->id;

        $records = $this->issuedBookRepository->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        $records = $records->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        $totalRecords = (!empty($search['search'])) ? count($records) : IssuedBook::ofMember($search['member_id'])->count();

        return $this->sendResponse(
            $records,
            'Books history retrieved successfully.',
            ['totalRecords' => $totalRecords]
        );
    }

    /**
     * @param  BookItem  $bookItem
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function unReserveBook(BookItem $bookItem, Request $request)
    {
        $input = $request->all();
        $result = $this->issuedBookRepository->unReserveBook($bookItem, $input);

        return $this->sendResponse($result->apiObj(), 'Book un-reserved successfully.');
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function exportBooks(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $issuedBooks = $this->issuedBookRepository->all(
            $input,
        );
        // $request->get('skip'),
        // $request->get('limit')
        $issuedBooks = $issuedBooks->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });

        $filename = 'export-book-circulations/Books-' . time() . '.xlsx';
        Excel::store(new BookCirculationExport($issuedBooks), $filename, config('filesystems.default'));
        $path = Storage::disk(config('filesystems.default'))->url($filename);

        return $this->sendResponse($path, 'Book circulation exported successfully');
    }
}
