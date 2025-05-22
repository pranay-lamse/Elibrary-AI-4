<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\AuthorRepositoryInterface;
use App\Repositories\Contracts\AuthorRepositoryInterface2;
use App\Repositories\Contracts\AuthorRepositoryInterface3;
use Illuminate\Support\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class AuthorAPIController
 */
class AuthorAPIController extends AppBaseController
{
    /** @var AuthorRepositoryInterface */
    private $authorRepository;
    private $authorRepository2;
    private $authorRepository3;

    public function __construct(AuthorRepositoryInterface $authorRepo, AuthorRepositoryInterface2 $authorRepo2 , AuthorRepositoryInterface3 $authorRepo3)
    {
        $this->authorRepository = $authorRepo;
        $this->authorRepository2 = $authorRepo2;
        $this->authorRepository3 = $authorRepo3;
    }

    /**
     * Display a listing of the Author.
     * GET|HEAD /authors
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $authors = $this->authorRepository->all2(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        $authors2 = $this->authorRepository2->all2(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );


        $authors3 = $this->authorRepository3->all2(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );



        $authors = array_merge($authors->toArray(), $authors2->toArray(), $authors3->toArray());

        /* $filteredArray = array();

        foreach ($authors as $key => $value) {


            if (!empty($value)) {
                array_push($filteredArray, $value);
            }
        } */

       // Extract the 'name' column from the array
            $names = array_column($authors, 'full_name');

            // Find the unique names
            $uniqueNames = array_unique($names);

            // Initialize an empty result array
            $result = [];

            // Loop through the original array and add entries with unique names to the result
            foreach ($authors as $item) {
                if (in_array($item['full_name'], $uniqueNames)) {
                    $result[] = $item;
                    // Remove the name from the list of unique names to handle duplicates
                    $key = array_search($item['full_name'], $uniqueNames);
                    unset($uniqueNames[$key]);
                }
            }



        return $this->sendResponse($result, 'Authors retrieved successfully.');
    }
}
