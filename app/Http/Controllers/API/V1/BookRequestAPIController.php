<?php

namespace App\Http\Controllers\API\V1;

use Exception;
use App\Models\BookRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\ApplyBookRequest;
use App\Http\Requests\API\UpdateApplyBookRequest;
use App\Repositories\Contracts\BookRequestRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class BookRequestAPIController
 */
class BookRequestAPIController extends AppBaseController
{
    /**
     * @var BookRequestRepositoryInterface
     */
    private $bookRequestRepository;

    public function __construct(BookRequestRepositoryInterface $bookRequestRepository)
    {
        $this->bookRequestRepository = $bookRequestRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $input = $request->except(['limit', 'skip']);
        $input['member_id'] = Auth::id();

        $records = $this->bookRequestRepository->all(
            $input,
            $request->get('skip', null),
            $request->get('limit', null)
        );

        return $this->sendResponse(
            $records,
            'Requested books retrieved successfully.',
            ['totalRecords' => $this->bookRequestRepository->all($input)->count()]
        );
    }

    /**
     * @param  ApplyBookRequest  $request
     *
     * @return JsonResponse
     */
    public function store(ApplyBookRequest $request)
    {
        $input = $request->all();
        $input['member_id'] = Auth::id();

        $bookRequest = $this->bookRequestRepository->store($input);

        return $this->sendResponse($bookRequest->fresh(), 'Book requested created successfully.');
    }

    /**
     * @param  BookRequest  $bookRequest
     * @param  ApplyBookRequest  $request
     *
     * @return JsonResponse
     */
    public function update(BookRequest $bookRequest, ApplyBookRequest $request)
    {

        $bookRequest = BookRequest::whereMemberId(Auth::id())->find($bookRequest->id);
        if (empty($bookRequest)) {
            throw new UnprocessableEntityHttpException('You can update only your book request.');
        }

        $input = $request->all();
        $input['member_id'] = Auth::id();

        $bookRequest = $this->bookRequestRepository->update($input, $bookRequest->id);

        return $this->sendResponse($bookRequest->fresh(), 'Book requested updated successfully.');
    }

    /**
     * @param  BookRequest  $bookRequest
     *
     * @throws Exception
     *
     * @return JsonResponse
     */
    public function destroy(BookRequest $bookRequest)
    {
        $bookRequest->delete();

        return $this->sendSuccess('Book requested deleted successfully.');
    }

    /**
     * @param  BookRequest  $bookRequest
     *
     * @return JsonResponse
     */
    public function show(BookRequest $bookRequest)
    {
        return $this->sendResponse($bookRequest, 'Book request retrieved successfully.');
    }
}
