<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Book;
use App\Models\Book2;
use App\Models\Book3;
use App\Models\BookItem;
use App\Models\BookItem2;
use App\Models\BookItem3;
use Illuminate\Http\Request;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Config;
use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\BookItemRepositoryInterface;
use App\Repositories\Contracts\BookItemRepositoryInterface2;
use App\Repositories\Contracts\BookItemRepositoryInterface3;

/**
 * Class BookItemAPIController
 */
class BookItemAPIController extends AppBaseController
{
    /** @var BookItemRepositoryInterface */
    private $bookItemRepo;
    private $bookItemRepo2;
    private $bookItemRepo3;

    public function __construct(BookItemRepositoryInterface $bookItemRepo, BookItemRepositoryInterface2 $bookItemRepo2, BookItemRepositoryInterface3 $bookItemRepo3)
    {
        $this->bookItemRepo = $bookItemRepo;
        $this->bookItemRepo2 = $bookItemRepo2;
        $this->bookItemRepo3 = $bookItemRepo3;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function searchBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $input['withCount'] = 1;
        $library_id = $request->library_id;
        $currenturl = Config::get('app.site_url');

        if ($currenturl == 'http://dindayalupadhyay.smartcitylibrary.com') {
            if ($library_id == 111) {
                $records = $this->bookItemRepo->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records = $records->map(function (BookItem $bookItem) {
                    return $bookItem->apiObj();
                });
                foreach ($records as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }



                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }
                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 222) {
                $records2 = $this->bookItemRepo2->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records2 = $records2->map(function (BookItem2 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records2 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 333) {
                $records3 = $this->bookItemRepo3->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );

                $records3 = $records3->map(function (BookItem3 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records3 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;


                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }
        } elseif ($currenturl == 'http://kundanlalgupta.smartcitylibrary.com') {

            /* change sequene for library kundanlal */
            /* start  */

            if ($library_id == 222) {
                $records = $this->bookItemRepo->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records = $records->map(function (BookItem $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }



                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }
                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 111) {
                $records2 = $this->bookItemRepo2->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records2 = $records2->map(function (BookItem2 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records2 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 333) {
                $records3 = $this->bookItemRepo3->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );

                $records3 = $records3->map(function (BookItem3 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records3 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;


                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }


            /* end */
        } elseif ($currenturl == 'http://rashtramatakasturba.smartcitylibrary.com') {
            /* change sequene for library kundanlal */
            /* start  */

            if ($library_id == 333) {
                $records = $this->bookItemRepo->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records = $records->map(function (BookItem $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }



                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }
                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 111) {
                $records2 = $this->bookItemRepo2->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records2 = $records2->map(function (BookItem2 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records2 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 222) {
                $records3 = $this->bookItemRepo3->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );

                $records3 = $records3->map(function (BookItem3 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records3 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;


                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }


            /* end */
        } else {

            if ($library_id == 111) {


                $records = $this->bookItemRepo->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records = $records->map(function (BookItem $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }



                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }
                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 222) {


                $records2 = $this->bookItemRepo2->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );
                $records2 = $records2->map(function (BookItem2 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records2 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }

                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book3::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;
                    $records3 = $this->bookItemRepo3->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records3 = $records3->map(function (BookItem3 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }

            if ($library_id == 333) {
                $records3 = $this->bookItemRepo3->searchBooks(
                    $input,
                    $request->get('skip', null),
                    $request->get('limit', null)
                );

                $records3 = $records3->map(function (BookItem3 $bookItem) {
                    return $bookItem->apiObj();
                });

                foreach ($records3 as $record) {
                    $name_book_items = $record['book'];

                    $book_name = $name_book_items['name'];
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book::where('name', $book_name)->first();
                }


                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;


                    $records = $this->bookItemRepo->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );
                    $records = $records->map(function (BookItem $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
                if (!empty($book_name)) {
                    $book_name_id_get =  Book2::where('name', $book_name)->first();
                }

                if (!empty($book_name_id_get->id)) {
                    $input = $request->except(['limit', 'skip', 'id']);
                    $input['id'] = $book_name_id_get->id;

                    $records2 = $this->bookItemRepo2->searchBooks(
                        $input,
                        $request->get('skip', null),
                        $request->get('limit', null)
                    );

                    $records2 = $records2->map(function (BookItem2 $bookItem) {
                        return $bookItem->apiObj();
                    });
                }
            }
        }

        if (!empty($records)) {
            $books = $records->toArray();
        }

        if (!empty($records2)) {
            $books = $records2->toArray();
        }

        if (!empty($records3)) {
            $books = $records3->toArray();
        }

        if (!empty($records) && !empty($records2)) {
            $books = array_merge($records->toArray(), $records2->toArray());
        }
        if (!empty($records2) && !empty($records3)) {
            $books = array_merge($records2->toArray(), $records3->toArray());
        }
        if (!empty($records) && !empty($records3)) {
            $books = array_merge($records->toArray(), $records3->toArray());
        }

        if (!empty($records) && !empty($records2) &&  !empty($records3)) {
            $books = array_merge($records->toArray(), $records2->toArray(), $records3->toArray());
        }




        if (!empty($books)) {
            return $this->sendResponse($books, 'BookItem retrieved successfully.');
        } else {
            return $this->sendResponse([], 'BookItem retrieved successfully.');
        }
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function getEBooks(Request $request)
    {
        $input = $request->except(['limit', 'skip']);

        $records = $this->bookItemRepo->searchEBooks(
            $input,
            // $request->get('skip', null),
            // $request->get('limit', null)
        );


        $records = $records->map(function (BookItem $bookItem) {
            return $bookItem->apiEBookResponse();
        });

        $records2 = $this->bookItemRepo2->searchEBooks(
            $input,
            // $request->get('skip', null),
            // $request->get('limit', null)
        );


        $records2 = $records2->map(function (BookItem2 $bookItem) {
            return $bookItem->apiEBookResponse();
        });


        $records3 = $this->bookItemRepo3->searchEBooks(
            $input,
            // $request->get('skip', null),
            // $request->get('limit', null)
        );


        $records3 = $records3->map(function (BookItem3 $bookItem) {
            return $bookItem->apiEBookResponse();
        });

        $total = count($records) + count($records2) + count($records3);
        $records = array_merge($records->toArray(), $records2->toArray(), $records3->toArray());

        return $this->sendResponse(
            $records,
            ['message' => 'BookItem retrieved successfully.', 'totalRecords' => $total],
        );
    }


}
