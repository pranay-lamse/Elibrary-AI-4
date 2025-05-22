<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\Transfer;
use App\Models\ManageStock;
use App\Models\TransferItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\TransferResource;
use App\Repositories\TransferRepository;
use App\Repositories\TransferRepository2;
use App\Repositories\TransferRepository3;
use App\Http\Resources\TransferCollection;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateTransferRequest;
use App\Http\Requests\UpdateTransferRequest;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

use App\Models\Author;
use App\Models\BookTags;
use App\Models\BookAuthors;
use App\Models\BookGenres;

use App\Models\BookTags2;
use App\Models\BookAuthors2;
use App\Models\BookGenres2;

use App\Models\BookTags3;
use App\Models\BookAuthors3;
use App\Models\BookGenres3;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\Genre;
use App\Models\Publisher;
use App\Models\Tag;
use App\Repositories\Contracts\BookRepositoryInterface;
use Illuminate\Support\Facades\Config;

use App\Models\Book2;
use App\Models\BookItem2;

use App\Models\Author2;
use App\Models\Genre2;
use App\Models\Publisher2;
use App\Models\Tag2;
use App\Repositories\Contracts\BookRepositoryInterface2;

use App\Models\Book3;
use App\Models\BookItem3;
use App\Models\Author3;
use App\Models\Genre3;
use App\Models\Publisher3;
use App\Models\Tag3;
use App\Models\Warehouse;
use App\Models\Warehouse2;
use App\Models\Warehouse3;
use App\Repositories\Contracts\BookRepositoryInterface3;

class TransferAPIController extends AppBaseController
{

    /** @var  transferRepository */
    private $transferRepository;
    private $transferRepository2;
    private $transferRepository3;
    private $bookRepo;
    private $bookRepo2;
    private $bookRepo3;


    public function __construct(TransferRepository $transferRepository,TransferRepository2 $transferRepository2,TransferRepository3 $transferRepository3,BookRepositoryInterface $bookRepo,BookRepositoryInterface2 $bookRepo2,BookRepositoryInterface3 $bookRepo3)
    {
        $this->transferRepository = $transferRepository;
        $this->transferRepository2 = $transferRepository2;
        $this->transferRepository3 = $transferRepository3;
        $this->bookRepo = $bookRepo;
        $this->bookRepo2 = $bookRepo2;
        $this->bookRepo3 = $bookRepo3;
    }


    /**
     * @param Request $request
     *
     *
     * @return TransferCollection
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $transfers = $this->transferRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

         $transfers2 = $this->transferRepository2->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $transfers3 = $this->transferRepository3->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );




        $filteredTransfers = [];

        // Merge the transfers
        $mergedTransfers = $transfers->concat($transfers2)->concat($transfers3);

        $site_name = Config::get('app.site_url');
        if ($site_name == "http://dindayalupadhyay.smartcitylibrary.com") {
            $testgetfromWarehouseId = 1;
        } elseif ($site_name == "http://kundanlalgupta.smartcitylibrary.com") {
            $testgetfromWarehouseId = 2;
        } elseif ($site_name == "http://rashtramatakasturba.smartcitylibrary.com") {
            $testgetfromWarehouseId = 3;
        } else {
            $testgetfromWarehouseId = 1;
        }

        // Filter and merge transfers based on $testgetfromWarehouseId
        $filteredFromTransfers = $transfers
            ->concat($transfers2)
            ->concat($transfers3)
            ->where('from_warehouse_id', $testgetfromWarehouseId)
            ->where('status', 1);

        // Filter transfers where to_warehouse_id is equal to $testgetfromWarehouseId
        $filteredToTransfers = $transfers
            ->concat($transfers2)
            ->concat($transfers3)
            ->where('to_warehouse_id', $testgetfromWarehouseId)
            ->where('status', 1);

        // Merge filtered transfers from both from_warehouse_id and to_warehouse_id
        /* $filteredTransfers = $filteredFromTransfers->merge($filteredToTransfers)->values(); */
        $filteredTransfers = $filteredFromTransfers->concat($filteredToTransfers)->values();

        // Assuming TransferCollection is a collection class to handle transfers
        // and TransferResource is a resource class to format each transfer item
        TransferResource::usingWithCollection();

        // Return a new TransferCollection with the filtered transfers
        return new TransferCollection($filteredTransfers);


    }

    public function transfers2(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $transfers = $this->transferRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

         $transfers2 = $this->transferRepository2->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $transfers3 = $this->transferRepository3->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );




        $filteredTransfers = [];

        // Merge the transfers
        $mergedTransfers = $transfers->concat($transfers2)->concat($transfers3);

        $site_name = Config::get('app.site_url');
        if ($site_name == "http://dindayalupadhyay.smartcitylibrary.com") {
            $testgetfromWarehouseId = 1;
        } elseif ($site_name == "http://kundanlalgupta.smartcitylibrary.com") {
            $testgetfromWarehouseId = 2;
        } elseif ($site_name == "http://rashtramatakasturba.smartcitylibrary.com") {
            $testgetfromWarehouseId = 3;
        } else {
            $testgetfromWarehouseId = 1;
        }

        // Filter and merge transfers based on $testgetfromWarehouseId
        $filteredFromTransfers = $transfers
            ->concat($transfers2)
            ->concat($transfers3)
            ->where('from_warehouse_id', $testgetfromWarehouseId)
            ->where('status', 5);

        // Filter transfers where to_warehouse_id is equal to $testgetfromWarehouseId
        $filteredToTransfers = $transfers
            ->concat($transfers2)
            ->concat($transfers3)
            ->where('to_warehouse_id', $testgetfromWarehouseId)
            ->where('status', 5);

        // Merge filtered transfers from both from_warehouse_id and to_warehouse_id
        /* $filteredTransfers = $filteredFromTransfers->merge($filteredToTransfers)->values(); */
        $filteredTransfers = $filteredFromTransfers->concat($filteredToTransfers)->values();

        // Assuming TransferCollection is a collection class to handle transfers
        // and TransferResource is a resource class to format each transfer item
        TransferResource::usingWithCollection();

        // Return a new TransferCollection with the filtered transfers
        return new TransferCollection($filteredTransfers);


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }


    /**
     * @param CreateTransferRequest $request
     *
     *
     * @return TransferResource
     */
    public function store(CreateTransferRequest $request)
    {
        $input = $request->all();
        $to_warehouse_id  = Warehouse::where('id',$request->to_warehouse_id)->first();
        $to_warehouse_library_id = $to_warehouse_id->library_id;

        $from_warehouse_id  = Warehouse::where('id',$request->from_warehouse_id)->first();
        $from_warehouse_library_id = $from_warehouse_id->library_id;




        $transfer_items = $request->transfer_items;
        $bookItemArray2  = array();

        $book_description = $request->description;
        $transfer_to_library_id = $to_warehouse_library_id;

        /* transfer insert  */

        $TransferInputArray['from_warehouse_id'] = $request->from_warehouse_id;
        $TransferInputArray['to_warehouse_id'] = $request->to_warehouse_id ;
        $TransferInputArray['note'] = $request->note ;

        $TransferInputArray['date'] = date("Y/m/d");
        $TransferInputArray['status'] = $request->status ;
        $TransferInputArray['reference_code'] = floor(time()-999999999);


        $transfer = Transfer::create($TransferInputArray);


        /* transfer insert end  */

        foreach($transfer_items as $transfer_items)
        {


            $book_transfer_authors_name = $transfer_items['authors_name'];
            foreach($transfer_items['items'] as $items){
                array_push($bookItemArray2, $items['id']);

                $book_id = $items['book_id'];
                $book_publisher_name = $items['publisher'];


            }
        }


        foreach($bookItemArray2 as $bookItemArrays)
        {
            $TransferItemInputArray['transfer_id'] = $transfer->id;
            $TransferItemInputArray['product_id'] = $bookItemArrays;
            $TransferItemInputArray['product_price'] = 0 ;
            $TransferItemInputArray['net_unit_price'] = 0 ;
            $TransferItemInputArray['tax_type'] = 0 ;
            $TransferItemInputArray['tax_value'] = 0 ;
            $TransferItemInputArray['tax_amount'] = 0 ;
            $TransferItemInputArray['discount_type'] = 0 ;
            $TransferItemInputArray['discount_value'] = 0 ;
            $TransferItemInputArray['discount_amount'] = 0 ;
            $TransferItemInputArray['quantity'] = count($bookItemArray2);
            $TransferItemInputArray['sub_total'] = 0 ;


            $transferItem = TransferItem::create($TransferItemInputArray);
        }


       $bookItemArray =  implode(",",$bookItemArray2);

       $book_publisher_name =   $book_publisher_name['name'];





        $library_id = $to_warehouse_library_id;
        $site_name = Config::get('app.site_url');
        if ($site_name == "http://dindayalupadhyay.smartcitylibrary.com") {

            if ($library_id == "222") {

                $get_details_of_book = Book::where('id', $book_id)->first();
                $get_details_of_book_item = BookItem::whereIn('id', [$bookItemArray])->get();


                if (true) {

                    $author_book_id =  Author2::firstOrCreate(['first_name' => $book_transfer_authors_name], ['first_name' => $book_transfer_authors_name]);
                    $tag = Tag2::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $genre = Genre2::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $book_publisher = Publisher2::firstOrCreate(['name' => $book_publisher_name], ['name' => $book_publisher_name]);


                    $book['is_featured'] = '0';
                    $book['isbn'] = $get_details_of_book->isbn;
                    $book['name'] = $get_details_of_book->name;
                    $book['image'] = $get_details_of_book->image;
                    $book['published_on'] = $get_details_of_book->published_on;
                    $book['library_id'] = $transfer_to_library_id;
                    $book['url'] = $get_details_of_book->url;
                    $book['product_id'] = $get_details_of_book->product_id;
                    $book['description'] = $get_details_of_book->description;
                    $book['transfer_status'] = $from_warehouse_library_id;

                    $book_create = Book2::create($book);

                    $book_authors['author_id'] = $author_book_id->id;
                    $book_authors['book_id'] = $book_create->id;
                    $book_authors_create = BookAuthors2::create($book_authors);


                    $book_tags['tag_id'] = $tag->id;
                    $book_tags['book_id'] = $book_create->id;
                   $book_tags_create = BookTags2::create($book_tags);


                    $book_genres['genre_id'] = $genre->id;
                    $book_genres['book_id'] = $book_create->id;
                    $book_genres_create = BookGenres2::create($book_genres);


                    //book item entry start
                    foreach($get_details_of_book_item as $get_details_of_book_item)
                    {

                        $book_items['book_id'] = $book_create->id;
                        $book_items['book_code'] = '1451'.$get_details_of_book_item->book_code;
                        $book_items['edition'] = $get_details_of_book_item->edition;
                        $book_items['format'] = $get_details_of_book_item->format;
                        $book_items['status'] = 1;
                        $book_items['publisher_id'] = $book_publisher->id;
                        $book_items['language_id'] = $get_details_of_book_item->language_id;
                        $book_items['file_name'] = $get_details_of_book_item->file_name;
                        $book_items['product_id'] = $get_details_of_book_item->product_id;
                        $book_items['rack_number'] = $get_details_of_book_item->rack_number;
                        $book_items['pdf_preview_file'] = $get_details_of_book_item->pdf_preview_file;
                        $book_items['transfer_status'] = $from_warehouse_library_id;
                        $book_items['price'] = 0;

                        $book_item_details  =    BookItem2::create($book_items);
                    }
                    foreach($bookItemArray2 as $bookItemArray2as)
                    {


                      DB::table('book_items')->where('id', $bookItemArray2as)->update(array('status' => 2));

                    }



                }


            } else if ($library_id == 333) {
                $get_details_of_book = Book::where('id', $book_id)->first();
                $get_details_of_book_item = BookItem::whereIn('id', [$bookItemArray])->get();

                if (true) {

                    $author_book_id =  Author3::firstOrCreate(['first_name' => $book_transfer_authors_name], ['first_name' => $book_transfer_authors_name]);
                    $tag = Tag3::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $genre = Genre3::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $book_publisher = Publisher3::firstOrCreate(['name' => $book_publisher_name], ['name' => $book_publisher_name]);

                    $book['is_featured'] = '0';
                    $book['isbn'] = $get_details_of_book->isbn;
                    $book['name'] = $get_details_of_book->name;
                    $book['image'] = $get_details_of_book->image;
                    $book['published_on'] = $get_details_of_book->published_on;
                    $book['library_id'] = $transfer_to_library_id;
                    $book['url'] = $get_details_of_book->url;
                    $book['product_id'] = $get_details_of_book->product_id;
                    $book['description'] = $get_details_of_book->description;
                    $book['transfer_status'] = $from_warehouse_library_id;
                    $book_create = Book3::create($book);

                    $book_authors['author_id'] = $author_book_id->id;
                    $book_authors['book_id'] = $book_create->id;
                    $book_authors_create = BookAuthors3::create($book_authors);

                    $book_tags['tag_id'] = $tag->id;
                    $book_tags['book_id'] = $book_create->id;
                    $book_tags_create = BookTags3::create($book_tags);

                    $book_genres['genre_id'] = $genre->id;
                    $book_genres['book_id'] = $book_create->id;
                    $book_genres_create = BookGenres3::create($book_genres);

                    //book item entry start
                    foreach($get_details_of_book_item as $get_details_of_book_item)
                    {

                        $book_items['book_id'] = $book_create->id;
                        $book_items['book_code'] = '1451'.$get_details_of_book_item->book_code;
                        $book_items['edition'] = $get_details_of_book_item->edition;
                        $book_items['format'] = $get_details_of_book_item->format;
                        $book_items['publisher_id'] = $book_publisher->id;
                        $book_items['language_id'] = $get_details_of_book_item->language_id;
                        $book_items['file_name'] = $get_details_of_book_item->file_name;
                        $book_items['product_id'] = $get_details_of_book_item->product_id;
                        $book_items['rack_number'] = $get_details_of_book_item->rack_number;
                        $book_items['pdf_preview_file'] = $get_details_of_book_item->pdf_preview_file;
                        $book_items['transfer_status'] = $from_warehouse_library_id;
                        $book_items['status'] = 1;
                        $book_items['price'] = 0;
                        $book_item_details  =    BookItem3::create($book_items);
                    }

                    foreach($bookItemArray2 as $bookItemArray2as)
                    {


                      DB::table('book_items')->where('id', $bookItemArray2as)->update(array('status' => 2));

                    }

                }

            } else {

            }
        } elseif ($site_name == "http://kundanlalgupta.smartcitylibrary.com") {
            if ($library_id == "111") {

                $get_details_of_book = Book::where('id', $book_id)->first();
                $get_details_of_book_item = BookItem::whereIn('id', [$bookItemArray])->get();


                if (true) {

                    $author_book_id =  Author2::firstOrCreate(['first_name' => $book_transfer_authors_name], ['first_name' => $book_transfer_authors_name]);
                    $tag = Tag2::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $genre = Genre2::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $book_publisher = Publisher2::firstOrCreate(['name' => $book_publisher_name], ['name' => $book_publisher_name]);

                    $book['is_featured'] = '0';
                    $book['isbn'] = $get_details_of_book->isbn;
                    $book['name'] = $get_details_of_book->name;
                    $book['image'] = $get_details_of_book->image;
                    $book['library_id'] = $transfer_to_library_id;
                    $book['description'] = $get_details_of_book->description;
                    $book['transfer_status'] = $from_warehouse_library_id;
                    $book_create = Book2::create($book);


                    $book_authors['author_id'] = $author_book_id->id;
                    $book_authors['book_id'] = $book_create->id;
                    $book_authors_create = BookAuthors2::create($book_authors);

                    $book_tags['tag_id'] = $tag->id;
                    $book_tags['book_id'] = $book_create->id;
                    $book_tags_create = BookTags2::create($book_tags);

                    $book_genres['genre_id'] = $genre->id;
                    $book_genres['book_id'] = $book_create->id;
                    $book_genres_create = BookGenres2::create($book_genres);

                    //book item entry start
                    foreach($get_details_of_book_item as $get_details_of_book_item)
                    {

                        $book_items['book_id'] = $book_create->id;
                        $book_items['book_code'] = '1451'.$get_details_of_book_item->book_code;
                        $book_items['edition'] = $get_details_of_book_item->edition;
                        $book_items['format'] = $get_details_of_book_item->format;
                        $book_items['status'] = 1;
                        $book_items['publisher_id'] = $book_publisher->id;
                        $book_items['language_id'] = $get_details_of_book_item->language_id;
                        $book_items['file_name'] = $get_details_of_book_item->file_name;
                        $book_items['product_id'] = $get_details_of_book_item->product_id;
                        $book_items['rack_number'] = $get_details_of_book_item->rack_number;
                        $book_items['pdf_preview_file'] = $get_details_of_book_item->pdf_preview_file;
                        $book_items['transfer_status'] = $from_warehouse_library_id;
                        $book_items['price'] = 0;

                        $book_item_details  =    BookItem2::create($book_items);
                    }
                    foreach($bookItemArray2 as $bookItemArray2as)
                    {


                      DB::table('book_items')->where('id', $bookItemArray2as)->update(array('status' => 2));

                    }



                }

            } else if ($library_id == 333) {

                $get_details_of_book = Book::where('id', $book_id)->first();
                $get_details_of_book_item = BookItem::whereIn('id', [$bookItemArray])->get();

                if (true) {

                    $author_book_id =  Author3::firstOrCreate(['first_name' => $book_transfer_authors_name], ['first_name' => $book_transfer_authors_name]);
                    $tag = Tag3::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $genre = Genre3::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $book_publisher = Publisher3::firstOrCreate(['name' => $book_publisher_name], ['name' => $book_publisher_name]);

                    $book['is_featured'] = '0';
                    $book['isbn'] = $get_details_of_book->isbn;
                    $book['name'] = $get_details_of_book->name;
                    $book['library_id'] = $transfer_to_library_id;
                    $book['description'] = $get_details_of_book->description;
                    $book['transfer_status'] = $from_warehouse_library_id;
                    $book_create = Book3::create($book);

                    $book_authors['author_id'] = $author_book_id->id;
                    $book_authors['book_id'] = $book_create->id;
                    $book_authors_create = BookAuthors3::create($book_authors);

                    $book_tags['tag_id'] = $tag->id;
                    $book_tags['book_id'] = $book_create->id;
                    $book_tags_create = BookTags3::create($book_tags);

                    $book_genres['genre_id'] = $genre->id;
                    $book_genres['book_id'] = $book_create->id;
                    $book_genres_create = BookGenres3::create($book_genres);

                    //book item entry start
                    foreach($get_details_of_book_item as $get_details_of_book_item)
                    {

                        $book_items['book_id'] = $book_create->id;
                        $book_items['book_code'] = '1451'.$get_details_of_book_item->book_code;
                        $book_items['edition'] = $get_details_of_book_item->edition;
                        $book_items['format'] = $get_details_of_book_item->format;
                        $book_items['publisher_id'] = $book_publisher->id;
                        $book_items['language_id'] = $get_details_of_book_item->language_id;
                        $book_items['file_name'] = $get_details_of_book_item->file_name;
                        $book_items['product_id'] = $get_details_of_book_item->product_id;
                        $book_items['rack_number'] = $get_details_of_book_item->rack_number;
                        $book_items['pdf_preview_file'] = $get_details_of_book_item->pdf_preview_file;
                        $book_items['transfer_status'] = $from_warehouse_library_id;
                        $book_items['status'] = 1;
                        $book_items['price'] = 0;
                        $book_item_details  =    BookItem3::create($book_items);
                    }

                    foreach($bookItemArray2 as $bookItemArray2as)
                    {


                      DB::table('book_items')->where('id', $bookItemArray2as)->update(array('status' => 2));

                    }

                }

            } else {

            }
        } elseif ($site_name == "http://rashtramatakasturba.smartcitylibrary.com") {
            if ($library_id == "111") {


                $get_details_of_book = Book::where('id', $book_id)->first();
                $get_details_of_book_item = BookItem::whereIn('id', [$bookItemArray])->get();


                if (true) {

                    $author_book_id =  Author2::firstOrCreate(['first_name' => $book_transfer_authors_name], ['first_name' => $book_transfer_authors_name]);
                    $tag = Tag2::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $genre = Genre2::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $book_publisher = Publisher2::firstOrCreate(['name' => $book_publisher_name], ['name' => $book_publisher_name]);

                    $book['is_featured'] = '0';
                    $book['isbn'] = $get_details_of_book->isbn;
                    $book['name'] = $get_details_of_book->name;
                    $book['image'] = $get_details_of_book->image;
                    $book['library_id'] = $transfer_to_library_id;
                    $book['description'] = $get_details_of_book->description;
                    $book['transfer_status'] = $from_warehouse_library_id;
                    $book_create = Book2::create($book);

                    $book_authors['author_id'] = $author_book_id->id;
                    $book_authors['book_id'] = $book_create->id;
                    $book_authors_create = BookAuthors2::create($book_authors);

                    $book_tags['tag_id'] = $tag->id;
                    $book_tags['book_id'] = $book_create->id;
                    $book_tags_create = BookTags2::create($book_tags);

                    $book_genres['genre_id'] = $genre->id;
                    $book_genres['book_id'] = $book_create->id;
                    $book_genres_create = BookGenres2::create($book_genres);

                    //book item entry start
                    foreach($get_details_of_book_item as $get_details_of_book_item)
                    {

                        $book_items['book_id'] = $book_create->id;
                        $book_items['book_code'] = '1451'.$get_details_of_book_item->book_code;
                        $book_items['edition'] = $get_details_of_book_item->edition;
                        $book_items['format'] = $get_details_of_book_item->format;
                        $book_items['status'] = 1;
                        $book_items['publisher_id'] = $book_publisher->id;
                        $book_items['language_id'] = $get_details_of_book_item->language_id;
                        $book_items['file_name'] = $get_details_of_book_item->file_name;
                        $book_items['product_id'] = $get_details_of_book_item->product_id;
                        $book_items['rack_number'] = $get_details_of_book_item->rack_number;
                        $book_items['pdf_preview_file'] = $get_details_of_book_item->pdf_preview_file;
                        $book_items['transfer_status'] = $from_warehouse_library_id;
                        $book_items['price'] = 0;

                        $book_item_details  =    BookItem2::create($book_items);
                    }
                    foreach($bookItemArray2 as $bookItemArray2as)
                    {


                      DB::table('book_items')->where('id', $bookItemArray2as)->update(array('status' => 2));

                    }



                }


            } elseif ($library_id == 222) {
                $get_details_of_book = Book::where('id', $book_id)->first();
                $get_details_of_book_item = BookItem::whereIn('id', [$bookItemArray])->get();

                if (true) {

                    $author_book_id =  Author3::firstOrCreate(['first_name' => $book_transfer_authors_name], ['first_name' => $book_transfer_authors_name]);
                    $tag = Tag3::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $genre = Genre3::firstOrCreate(['name' => 'other'], ['name' => 'other']);
                    $book_publisher = Publisher3::firstOrCreate(['name' => $book_publisher_name], ['name' => $book_publisher_name]);

                    $book['is_featured'] = '0';
                    $book['isbn'] = $get_details_of_book->isbn;
                    $book['name'] = $get_details_of_book->name;
                    $book['library_id'] = $transfer_to_library_id;
                    $book['description'] = $get_details_of_book->description;
                    $book['transfer_status'] = $from_warehouse_library_id;
                    $book_create = Book3::create($book);

                    $book_authors['author_id'] = $author_book_id->id;
                    $book_authors['book_id'] = $book_create->id;
                    $book_authors_create = BookAuthors3::create($book_authors);

                    $book_tags['tag_id'] = $tag->id;
                    $book_tags['book_id'] = $book_create->id;
                    $book_tags_create = BookTags3::create($book_tags);

                    $book_genres['genre_id'] = $genre->id;
                    $book_genres['book_id'] = $book_create->id;
                    $book_genres_create = BookGenres3::create($book_genres);

                    //book item entry start
                    foreach($get_details_of_book_item as $get_details_of_book_item)
                    {

                        $book_items['book_id'] = $book_create->id;
                        $book_items['book_code'] = '1451'.$get_details_of_book_item->book_code;
                        $book_items['edition'] = $get_details_of_book_item->edition;
                        $book_items['format'] = $get_details_of_book_item->format;
                        $book_items['publisher_id'] = $book_publisher->id;
                        $book_items['language_id'] = $get_details_of_book_item->language_id;
                        $book_items['file_name'] = $get_details_of_book_item->file_name;
                        $book_items['product_id'] = $get_details_of_book_item->product_id;
                        $book_items['rack_number'] = $get_details_of_book_item->rack_number;
                        $book_items['pdf_preview_file'] = $get_details_of_book_item->pdf_preview_file;
                        $book_items['transfer_status'] = $from_warehouse_library_id;
                        $book_items['status'] = 1;
                        $book_items['price'] = 0;
                        $book_item_details  =    BookItem3::create($book_items);
                    }

                    foreach($bookItemArray2 as $bookItemArray2as)
                    {


                      DB::table('book_items')->where('id', $bookItemArray2as)->update(array('status' => 2));

                    }

                }

            } else {

            }

            //book item entry end

        } else {
            if ($library_id == "222") {

            } else if ($library_id == 333) {


            } else {

            }
        }

            if($book_item_details->id)
            {


                $transfer = $transfer->load('transferItems.bookItem.book');

                return new TransferResource($transfer);
          //return $this->sendResponse('1', 'Book saved successfully.');
            }else{
                return $this->sendResponse('2', 'Error.');
            }



        /* store logic by repo end  */

    }


    public function show(Transfer $transfer)
    {
        $transfer = $transfer->load('transferItems.bookItem.book');

        return new TransferResource($transfer);
    }


    /**
     * @param Transfer $transfer
     *
     *
     * @return TransferResource
     */
    public function edit(Transfer $transfer)
    {
        $transfer = $transfer->load('transferItems.product.stocks', 'fromWarehouse', 'toWarehouse');

        return new TransferResource($transfer);
    }

    public function transferReturn(Request $request)
    {
        $transfer_id = $request->transfer_id;
        $get_transfer_details  = TransferItem::where('transfer_id', $transfer_id)->get();
        $bookItemArray2 = array();
        foreach($get_transfer_details as $transfer_items)
            {
                array_push($bookItemArray2, $transfer_items['product_id']);

            }



            foreach($bookItemArray2 as $bookItemArray2as){

                if($request->transfer_id)
                 {
                    $get_transfer_id =  Transfer::where('id', $request->transfer_id)->first();
                    $transfer_warehouse_id = $get_transfer_id->to_warehouse_id;
                    $transfer_from_warehouse_id = $get_transfer_id->from_warehouse_id;

                    $get_library_id_from_warehouse = Warehouse::where('id', $transfer_warehouse_id)->first();
                    $library_id_from_warehouse = $get_library_id_from_warehouse->library_id;

                    $get_library_id_from_warehouse2 = Warehouse::where('id', $transfer_from_warehouse_id)->first();
                    $transfer_from_warehouse_id = $get_library_id_from_warehouse2->library_id;


                    Transfer::where('id', $request->transfer_id)->update(array('status' => 5));
                 }






              $bookItem = BookItem::where('id', $bookItemArray2as)->with('book')->first();
              $bookName = $bookItem->book->name;


              /* for primary library id update  */

                BookItem::where('id', $bookItemArray2as)->update(array('status' => 1));

                /* for primary library id udapte end  */

                /*  for other library id update start  */

                $library_id = $library_id_from_warehouse;
                $site_name = Config::get('app.site_url');
                if ($site_name == "http://dindayalupadhyay.smartcitylibrary.com") {





                    if ($library_id == 222) {



               $book_item_id = Book2::where('name', $bookName)->first();

                if ($book_item_id) {
                    $book_item_details = BookItem2::where('book_id', $book_item_id->id)
                        ->where('transfer_status', $transfer_from_warehouse_id)
                        ->first();

                    if ($book_item_details) {
                        // Delete the book item
                        $book_item_details->delete();

                        // Delete the book
                        $book_item_id->delete();
                    } else {
                        // Handle case where book item details are not found
                    }
                } else {
                    // Handle case where book is not found
                }




                    } elseif ($library_id == 333) {

                        $book_item_id = Book3::where('name', $bookName)->first();

                        if ($book_item_id) {
                            $book_item_details = BookItem3::where('book_id', $book_item_id->id)
                                ->where('transfer_status', $transfer_from_warehouse_id)
                                ->first();

                            if ($book_item_details) {
                                // Delete the book item
                                $book_item_details->delete();

                                // Delete the book
                                $book_item_id->delete();
                            } else {
                                // Handle case where book item details are not found
                            }
                        } else {
                            // Handle case where book is not found
                        }


                    } else {

                    }
                } elseif ($site_name == "http://kundanlalgupta.smartcitylibrary.com") {
                    if ($library_id == 111) {

                        $book_item_id = Book2::where('name', $bookName)->first();

                        if ($book_item_id) {
                            $book_item_details = BookItem2::where('book_id', $book_item_id->id)
                                ->where('transfer_status', $transfer_from_warehouse_id)
                                ->first();

                            if ($book_item_details) {
                                // Delete the book item
                                $book_item_details->delete();

                                // Delete the book
                                $book_item_id->delete();
                            } else {
                                // Handle case where book item details are not found
                            }
                        } else {
                            // Handle case where book is not found
                        }



                    } else if ($library_id == 333) {

                        $book_item_id = Book3::where('name', $bookName)->first();

                        if ($book_item_id) {
                            $book_item_details = BookItem3::where('book_id', $book_item_id->id)
                                ->where('transfer_status', $transfer_from_warehouse_id)
                                ->first();

                            if ($book_item_details) {
                                // Delete the book item
                                $book_item_details->delete();

                                // Delete the book
                                $book_item_id->delete();
                            } else {
                                // Handle case where book item details are not found
                            }
                        } else {
                            // Handle case where book is not found
                        }



                    } else {

                    }
                } elseif ($site_name == "http://rashtramatakasturba.smartcitylibrary.com") {
                    if ($library_id == 111) {

                        $book_item_id = Book2::where('name', $bookName)->first();

                    if ($book_item_id) {
                        $book_item_details = BookItem2::where('book_id', $book_item_id->id)
                            ->where('transfer_status', $transfer_from_warehouse_id)
                            ->first();

                        if ($book_item_details) {
                            // Delete the book item
                            $book_item_details->delete();

                            // Delete the book
                            $book_item_id->delete();
                        } else {
                            // Handle case where book item details are not found
                        }
                    } else {
                        // Handle case where book is not found
                    }


                    } else if ($library_id == 222) {

                        $book_item_id = Book3::where('name', $bookName)->first();

                        if ($book_item_id) {
                            $book_item_details = BookItem3::where('book_id', $book_item_id->id)
                                ->where('transfer_status', $transfer_from_warehouse_id)
                                ->first();

                            if ($book_item_details) {
                                // Delete the book item
                                $book_item_details->delete();

                                // Delete the book
                                $book_item_id->delete();
                            } else {
                                // Handle case where book item details are not found
                            }
                        } else {
                            // Handle case where book is not found
                        }


                    } else {

                    }

                    //book item entry end

                } else {
                    if ($library_id == 222) {

                    } else if ($library_id == 333) {


                    } else {

                    }
                }



                /* for other library id update end  */




                 }



                 $input = $request->except(['skip', 'limit']);
                 $transfers = $this->transferRepository->all(
                     $input,
                     $request->get('skip'),
                     $request->get('limit')
                 );



                 TransferResource::usingWithCollection();

                 return new TransferCollection($transfers);


     }


    /**
     * @param Request $request
     * @param $id
     *
     *
     * @return TransferResource
     */
    public function update(UpdateTransferRequest $request, $id)
    {
        $input = $request->all();
        $transfer = $this->transferRepository->updateTransfer($input, $id);

        return new TransferResource($transfer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Transfer $transfer
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $transfer = Transfer::with('transferItems')->where('id', $id)->firstOrFail();

            // foreach ($transfer->transferItems as $transferItem) {
            //     $oldTransferItem = TransferItem::whereId($transferItem->id)->first();
            //     $oldTransfer = Transfer::whereId($oldTransferItem->transfer_id)->first();
            //     $fromManageStock = ManageStock::whereWarehouseId($oldTransfer->from_warehouse_id)->whereProductId($oldTransferItem->product_id)->first();
            //     $toManageStock = ManageStock::whereWarehouseId($oldTransfer->to_warehouse_id)->whereProductId($oldTransferItem->product_id)->first();

            //     $toquantity = 0;

            //     if ($toManageStock) {
            //         $toquantity = $toquantity - $oldTransferItem->quantity;
            //         manageStock($toManageStock->warehouse_id, $oldTransferItem->product_id, $toquantity);
            //     }

            //     $fromQuantity = 0;

            //     $fromQuantity = $fromQuantity + $oldTransferItem->quantity;

            //     manageStock($oldTransfer->from_warehouse_id, $oldTransferItem->product_id, $fromQuantity);
            // }
            TransferItem::where('transfer_id', $id)->delete();

            $this->transferRepository->delete($id);

            DB::commit();

            return $this->sendSuccess('Transfer delete successfully');
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}
