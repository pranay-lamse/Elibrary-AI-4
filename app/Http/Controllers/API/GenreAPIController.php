<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Models\Genre;
use App\Models\Genre2;
use App\Models\Genre3;
use App\Repositories\Contracts\GenreRepositoryInterface;
use App\Repositories\Contracts\GenreRepositoryInterface2;
use App\Repositories\Contracts\GenreRepositoryInterface3;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

/**
 * Class GenreAPIController
 */
class GenreAPIController extends AppBaseController
{
    /** @var GenreRepositoryInterface */
    private $genreRepository;
    private $genreRepository2;
    private $genreRepository3;

    public function __construct(GenreRepositoryInterface $genreRepo,GenreRepositoryInterface2 $genreRepo2,GenreRepositoryInterface3 $genreRepo3)
    {
        $this->genreRepository = $genreRepo;
        $this->genreRepository2 = $genreRepo2;
        $this->genreRepository3 = $genreRepo3;
    }

    /**
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        /* $geneses = Genre::all(); */

        $authors = $this->genreRepository->all2(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        $authors2 = $this->genreRepository2->all2(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );


        $authors3 = $this->genreRepository3->all2(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );



        $authors = array_merge($authors->toArray(), $authors2->toArray(), $authors3->toArray());


        $names = array_column($authors, 'name');

            // Find the unique names
            $uniqueNames = array_unique($names);

            // Initialize an empty result array
            $result = [];

            // Loop through the original array and add entries with unique names to the result
            foreach ($authors as $item) {
                if (in_array($item['name'], $uniqueNames)) {
                    $result[] = $item;
                    // Remove the name from the list of unique names to handle duplicates
                    $key = array_search($item['name'], $uniqueNames);
                    unset($uniqueNames[$key]);
                }
            }



        return $this->sendResponse($result, 'Genres retrieved successfully.');


    }
    public function getAllGenres()
    {
        $geneses = Genre::where('show_on_landing_page', 1)->get();

        return $this->sendResponse($geneses, 'Genres retrieved successfully.');
    }
}
