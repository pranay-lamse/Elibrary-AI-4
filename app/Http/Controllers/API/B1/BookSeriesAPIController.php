<?php

namespace App\Http\Controllers\API\B1;

use Exception;
use App\Models\BookSeries;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\AppBaseController;
use App\Exceptions\ApiOperationFailedException;
use App\Http\Requests\API\CreateBookSeriesRequest;
use App\Http\Requests\API\UpdateBookSeriesRequest;
use App\Repositories\Contracts\BookSeriesRepositoryInterface;

/**
 * Class BookSeriesAPIController
 */
class BookSeriesAPIController extends AppBaseController
{
    /** @var BookSeriesRepositoryInterface */
    private $bookSeriesRepository;

    public function __construct(BookSeriesRepositoryInterface $bookSeriesRepo)
    {
        $this->bookSeriesRepository = $bookSeriesRepo;
    }

    /**
     * Display a listing of the BookSeries.
     * GET|HEAD /bookSeries
     *
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {

        $input = $request->except(['skip', 'limit']);
        $bookSeries = $this->bookSeriesRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $bookSeries->toArray(),
            'Book Series retrieved successfully.',
            ['totalRecords' => $this->bookSeriesRepository->all($input)->count()]
        );
    }

    /**
     * Store a newly created BookSeries in storage.
     * POST /bookSeries
     *
     * @param  CreateBookSeriesRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function store(CreateBookSeriesRequest $request)
    {
        $input = $request->all();

        if ($request->file('cover')) {
            $input['cover'] = ImageTrait::makeImage($request->cover, 'series');
        } else {
            $input['cover'] = $request->cover;
        }
        $bookSeries = $this->bookSeriesRepository->store($input);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series saved successfully.');
    }

    /**
     * Display the specified BookSeries.
     * GET|HEAD /bookSeries/{id}
     *
     * @param  BookSeries  $bookSeries
     *
     * @return JsonResponse
     */
    public function show(BookSeries $bookSeries)
    {
        $bookSeries = BookSeries::with('seriesItems.book')->findOrFail($bookSeries->id);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series retrieved successfully.');
    }

    /**
     * Update the specified BookSeries in storage.
     * PUT/PATCH /bookSeries/{id}
     *
     * @param  BookSeries  $bookSeries
     * @param  UpdateBookSeriesRequest  $request
     *
     * @throws ApiOperationFailedException
     *
     * @return JsonResponse
     */
    public function update(BookSeries $bookSeries, UpdateBookSeriesRequest $request)
    {
        $bookSeries = BookSeries::with('seriesItems.book')->findOrFail($bookSeries->id);

        $input = $request->all();


        $bookSeries = $this->bookSeriesRepository->update($input, $bookSeries->id);

        return $this->sendResponse($bookSeries->toArray(), 'Book Series updated successfully.');
    }

    /**
     * Remove the specified BookSeries from storage.
     * DELETE /bookSeries/{id}
     *
     * @param  BookSeries  $bookSeries
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookSeries $bookSeries)
    {

        $bookSeries->delete();

        return $this->sendResponse($bookSeries, 'Book Series deleted successfully.');
    }
}
