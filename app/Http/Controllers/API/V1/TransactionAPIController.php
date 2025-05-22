<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\AppBaseController;
use App\Repositories\SubscriptionRepository;
use App\Repositories\TransactionRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class TransactionAPIController
 */
class TransactionAPIController extends AppBaseController
{
    /** @var TransactionRepository */
    private $transactionRepository;

    public function __construct(TransactionRepository $transactionRepo)
    {
        $this->transactionRepository = $transactionRepo;
    }

    /**
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $input = $request->except(['skip', 'limit']);
        $input['member_id'] = Auth::id();
        $transactions = $this->transactionRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            array_values($transactions->toArray()),
            'Transactions retrieved successfully.',
            ['totalRecords' => $transactions->count()]
        );
    }

    public function getAll(Request $request)
    {

        $input = $request->except(['skip', 'limit']);

        $transactions = $this->transactionRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );
        return $this->sendResponse(
            array_values($transactions->toArray()),
            'Transactions retrieved successfully.',
            ['totalRecords' => $transactions->count()]
        );

    }

}
