<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Book;
use App\Models\Book2;
use App\Models\Book3;
use App\Models\Author;
use App\Models\Author2;
use App\Models\Author3;
use Illuminate\Support\Facades\DB;
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
class BookAPIControllerNamesSuggestion extends AppBaseController
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

        $books = Book::select('name','id', 'library_id')->with('items')->where('name', 'like', '%' . $request['search'] . '%')->limit($request['limit'])->orderBy('name')->get();
        $books2 = Book2::select('name','id' , 'library_id')->with('items')->where('name', 'like', '%' . $request['search'] . '%')->limit($request['limit'])->orderBy('name')->get();

        $books3 = Book3::select('name','id', 'library_id')->with('items')->where('name', 'like', '%' . $request['search'] . '%')->limit($request['limit'])->orderBy('name')->get();

        $books = array_merge($books->toArray(), $books2->toArray(), $books3->toArray());

        $filteredArray = array();

        foreach ($books as $key => $value) {


            if (!empty($value['items'])) {
                array_push($filteredArray, $value);
            }
        }


         // Extract the 'name' column from the array
         $names = array_column($filteredArray, 'name');

         // Find the unique names
         $uniqueNames = array_unique($names);

         // Initialize an empty result array
         $result = [];

         // Loop through the original array and add entries with unique names to the result
         foreach ($filteredArray as $item) {
             if (in_array($item['name'], $uniqueNames)) {
                 $result[] = $item;
                 // Remove the name from the list of unique names to handle duplicates
                 $key = array_search($item['name'], $uniqueNames);
                 unset($uniqueNames[$key]);
             }
         }


        return $this->sendResponse($result, 'Books retrieved successfully.');
    }

    public function getAuthorsNames(Request $request)
    {


             $author_result = Author::select('id', 'first_name', 'last_name')
            ->where(DB::raw("CONCAT(first_name, ' ', last_name)"), $request['search'])
            ->first();

            if(isset($author_result->id))
            {

                $Authors = Author::select('*')->where('id', $author_result->id)->limit($request['limit'])->get();

            }else{
                $Authors = Author::select('*')->where('id', $request['search'])->limit($request['limit'])->get();
            }


            /* second authors data  */

            $author_result2 = Author2::select('id', 'first_name', 'last_name')
            ->where(DB::raw("CONCAT(first_name, ' ', last_name)"), $request['search'])
            ->first();

            if(isset($author_result2->id))
            {

                $Authors2 = Author2::select('*')->where('id', $author_result2->id)->limit($request['limit'])->get();

            }else{
                $Authors2 = Author2::select('*')->where('id', $request['search'])->limit($request['limit'])->get();
            }


            /* second authors data end  */

            /* third authors data  */

            $author_result3 = Author3::select('id', 'first_name', 'last_name')
            ->where(DB::raw("CONCAT(first_name, ' ', last_name)"), $request['search'])
            ->first();

            if(isset($author_result3->id))
            {

                $Authors3 = Author3::select('*')->where('id', $author_result3->id)->limit($request['limit'])->get();

            }else{
                $Authors3 = Author3::select('*')->where('id', $request['search'])->limit($request['limit'])->get();
            }


            /* third authors data end  */



       $Authors = array_merge($Authors->toArray(), $Authors2->toArray(), $Authors3->toArray());




         // Extract the 'name' column from the array
        /*  $names = array_column($Authors, 'full_name');

         // Find the unique names
         $uniqueNames = array_unique($names);

         // Initialize an empty result array
         $result = [];

         // Loop through the original array and add entries with unique names to the result
         foreach ($Authors as $item) {
             if (in_array($item['full_name'], $uniqueNames)) {
                 $result[] = $item;
                 // Remove the name from the list of unique names to handle duplicates
                 $key = array_search($item['full_name'], $uniqueNames);
                 unset($uniqueNames[$key]);
             }
         } */


        return $this->sendResponse($Authors, 'Author names retrieved successfully.');
    }


}
