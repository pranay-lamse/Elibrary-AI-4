<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use App\Http\Resources\ExpenseCollection;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use App\Models\Warehouse;
use App\Repositories\ExpenseRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class ExpenseAPIController
 */
class ExpenseAPIController extends AppBaseController
{
    /** @var ExpenseRepository */
    private $expenseRepository;

    public function __construct(ExpenseRepository $expenseRepository)
    {
        $this->expenseRepository = $expenseRepository;
    }

    /**
     * @param Request $request
     *
     * @return ExpenseCollection
     */
    public function index(Request $request)
    {


        $input = $request->except(['skip', 'limit']);
        $expenses = $this->expenseRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );


        ExpenseResource::usingWithCollection();

        return new ExpenseCollection($expenses);




    }

    /**
     * @param CreateExpenseRequest $request
     *
     * @return ExpenseResource
     */
    public function store(CreateExpenseRequest $request)
    {
        $input = $request->all();

        $input["warehouse_id"] = 1;
        $expense = $this->expenseRepository->storeExpense($input);

        return new ExpenseResource($expense);
    }

    /**
     * @param $id
     *
     * @return ExpenseResource
     */
    public function show($id)
    {
        $expense = $this->expenseRepository->find($id);

        return new ExpenseResource($expense);
    }

    /**
     * @param UpdateExpenseRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return ExpenseResource
     */
    public function update(UpdateExpenseRequest $request, $id)
    {
        $input = $request->all();
        $expense = $this->expenseRepository->update($input, $id);

        return new ExpenseResource($expense);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $this->expenseRepository->delete($id);

        return $this->sendSuccess('Expense deleted successfully');
    }
}
