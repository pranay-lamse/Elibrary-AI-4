<?php

namespace App\Http\Controllers\API\V1;

use App\Models\BookItem;
use App\Models\BookItem2;
use App\Models\BookItem3;
use App\Models\IssuedBook;
use App\Models\IssuedBook2;
use App\Models\IssuedBook3;
use App\Models\Member;
use App\Models\Member2;
use App\Models\Member3;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\IssuedBookRepositoryInterface;
use App\Repositories\Contracts\IssuedBookRepositoryInterface2;
use App\Repositories\Contracts\IssuedBookRepositoryInterface3;
use Config;
/**
 * Class IssuedBookController
 */
class IssuedBookAPIController extends AppBaseController
{
    /** @var IssuedBookRepositoryInterface */
    private $issuedBookRepository;
    private $issuedBookRepository2;
    private $issuedBookRepository3;

    public function __construct(IssuedBookRepositoryInterface $issuedBookRepo, IssuedBookRepositoryInterface2 $issuedBookRepo2, IssuedBookRepositoryInterface3 $issuedBookRepo3)
    {
        $this->issuedBookRepository = $issuedBookRepo;
        $this->issuedBookRepository2 = $issuedBookRepo2;
        $this->issuedBookRepository3 = $issuedBookRepo3;
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

        $member_email = Member::where('id', $search['member_id'])->first();
        if ($member_email) {
            $member_email = $member_email->email;
        } else {
            $member_email = null;
        }


        $member_details2 = Member2::where('email', $member_email)->first();
        if ($member_details2) {
            $member_email2 = $member_details2->email;
            $member_id2 = $member_details2->id;
        } else {
            $member_email2 = null;
            $member_id2 = null;
        }
        $search2 = $request->all();
        $search2['member_id'] = $member_id2;

        $member_details3 = Member3::where('email', $member_email)->first();
        if ($member_details3) {

            $member_email3 = $member_details3->email;
            $member_id3 = $member_details3->id;
        } else {
            $member_email3 = null;
            $member_id3 = null;
        }

        $search3 = $request->all();
        $search3['member_id'] = $member_id3;

        /* for library first  */
        $records = $this->issuedBookRepository->all(
            $search,
            // $request->get('skip', null),
            // $request->get('limit', null)
        );

        $records = $records->map(function (IssuedBook $issuedBook) {
            return $issuedBook->apiObj();
        });
        /* for library first  */

        /* for library2  */
        $records2 = $this->issuedBookRepository2->all(
            $search2,
            // $request->get('skip', null),
            // $request->get('limit', null)
        );

        $records2 = $records2->map(function (IssuedBook2 $issuedBook) {
            return $issuedBook->apiObj();
        });
        /* for library2   */



        /* for library3  */
        $records3 = $this->issuedBookRepository3->all(
            $search3,
            // $request->get('skip', null),
            // $request->get('limit', null)
        );

        $records3 = $records3->map(function (IssuedBook3 $issuedBook) {
            return $issuedBook->apiObj();
        });
        /* for library3   */



        $input['withCount'] = 1;

        $records = array_merge($records->toArray(), $records2->toArray(), $records3->toArray());

        /*  if(!empty($records3))
        {
            $total_count = $records->count() + $records3->count() ;
            $records = array_merge($records->toArray(), $records3->toArray());
        } */

        /* if($records2 && $records3)
        {
            $total_count = $records->count() + $records2->count() + $records3->count() ;
            $records = array_merge($records->toArray(), $records2->toArray(), $records3->toArray());
        } */




        $total = count($records) + count($records2) + count($records3);
        return $this->sendResponse(
            $records,
            ['totalRecords' => $total]
        );
    }

    /**
     * @param  BookItem  $bookItem
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function reserveBook( Request $request)
    {

        $input = $request->all();
        $library_id = $request->library_id;
        $book_item_id = $request->book_item_id;
        $currenturl = Config::get('app.site_url');

        if($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com')
        {

            if ($library_id == 222) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member2::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook2::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;

                $result = $this->issuedBookRepository2->reserveBook($input);
            } else if ($library_id == 333) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member3::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook3::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;


                $result = $this->issuedBookRepository3->reserveBook($input);
            } else {
                $input['status'] = IssuedBook::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = Auth::id();

                $result = $this->issuedBookRepository->reserveBook($input);
            }

        }elseif($currenturl == 'http://kundanlalgupta.smartcitylibrary.com')
        {
            if ($library_id == 111) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member2::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook2::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;

                $result = $this->issuedBookRepository2->reserveBook($input);
            } else if ($library_id == 333) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member3::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook3::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;


                $result = $this->issuedBookRepository3->reserveBook($input);
            } else {
                $input['status'] = IssuedBook::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = Auth::id();

                $result = $this->issuedBookRepository->reserveBook($input);
            }

        }elseif($currenturl == 'http://rashtramatakasturba.smartcitylibrary.com')
        {
            if ($library_id == 111) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member2::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook2::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;

                $result = $this->issuedBookRepository2->reserveBook($input);
            } else if ($library_id == 222) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member3::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook3::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;


                $result = $this->issuedBookRepository3->reserveBook($input);
            } else {
                $input['status'] = IssuedBook::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = Auth::id();

                $result = $this->issuedBookRepository->reserveBook($input);
            }
        }else{
            if ($library_id == 222) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member2::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook2::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;

                $result = $this->issuedBookRepository2->reserveBook($input);
            } else if ($library_id == 333) {

                $member_id = Auth::id();
                $member_details = Member::where('id', $member_id)->first();
                $member_email = $member_details->email;


                $member_details = Member3::where('email', $member_email)->first();
                $member_id = $member_details->id;

                $input['status'] = IssuedBook3::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = $member_id;


                $result = $this->issuedBookRepository3->reserveBook($input);
            } else {
                $input['status'] = IssuedBook::STATUS_RESERVED;
                $input['book_item_id'] = $book_item_id;
                $input['member_id'] = Auth::id();

                $result = $this->issuedBookRepository->reserveBook($input);
            }
        }



        return $this->sendResponse($result->apiObj(), 'Book reserved successfully.');
    }

    /**
     * @param  BookItem  $bookItem
     *
     * @return JsonResponse
     */
    public function unReserveBook(BookItem $bookItem, BookItem2 $bookItem2, BookItem3 $bookItem3, Request $request)
    {
        $input['member_id'] = Auth::id();


        $library_id = $request->library_id;


        $currenturl = Config::get('app.site_url');

        if($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com')
        {
            if ($library_id == 222) {
                $result = $this->issuedBookRepository2->unReserveBook($bookItem, $input);
            } else if ($library_id == 333) {
                $result = $this->issuedBookRepository3->unReserveBook($bookItem, $input);
            } else {
                $result = $this->issuedBookRepository->unReserveBook($bookItem, $input);
            }

        }elseif($currenturl == 'http://kundanlalgupta.smartcitylibrary.com')
        {
            if ($library_id == 111) {
                $result = $this->issuedBookRepository2->unReserveBook($bookItem, $input);
            } else if ($library_id == 333) {
                $result = $this->issuedBookRepository3->unReserveBook($bookItem, $input);
            } else {
                $result = $this->issuedBookRepository->unReserveBook($bookItem, $input);
            }

        }elseif($currenturl == 'http://rashtramatakasturba.smartcitylibrary.com')
        {
            if ($library_id == 111) {
                $result = $this->issuedBookRepository2->unReserveBook($bookItem, $input);
            } else if ($library_id == 222) {
                $result = $this->issuedBookRepository3->unReserveBook($bookItem, $input);
            } else {
                $result = $this->issuedBookRepository->unReserveBook($bookItem, $input);
            }

        }else{
            if ($library_id == 222) {
                $result = $this->issuedBookRepository2->unReserveBook($bookItem, $input);
            } else if ($library_id == 333) {
                $result = $this->issuedBookRepository3->unReserveBook($bookItem, $input);
            } else {
                $result = $this->issuedBookRepository->unReserveBook($bookItem, $input);
            }

        }



        return $this->sendResponse($result->apiObj(), 'Book un-reserved successfully.');
    }
}
