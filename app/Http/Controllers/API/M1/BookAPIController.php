<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\Contracts\BookRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class BookAPIController
 */
class BookAPIController extends AppBaseController
{
    /**
     * @var BookRepositoryInterface
     */
    private $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function getEBooks(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $input['is_ebooks'] = true;
        $books = $this->bookRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        $input['withCount'] = 1;

        return $this->sendResponse(
            $books->toArray(),
            'Books retrieved successfully.',
            ['totalRecords' => $this->bookRepository->all($input)]
        );
    }
}
