<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateExpenseCategoryRequest;
use App\Http\Requests\UpdateExpenseCategoryRequest;
use App\Http\Resources\ExpenseCategoryCollection;
use App\Http\Resources\ExpenseCategoryResource;
use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Repositories\ExpenseCategoryRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class ExpenseCategoryAPIController
 */
class ExpenseCategoryAPIController extends AppBaseController
{
    /** @var ExpenseCategoryRepository */
    private $expenseCategoryRepository;

    public function __construct(ExpenseCategoryRepository $expenseCategoryRepository)
    {
        $this->expenseCategoryRepository = $expenseCategoryRepository;
    }

    /**
     * @param Request $request
     *
     * @return ExpenseCategoryCollection
     */
    public function index(Request $request)
    {
        // $perPage = getPageSize($request);
        // $search = $request->filter['search'] ?? '';
        // $expenseCategories = ExpenseCategory::where('name', 'LIKE', "%$search%")->paginate($perPage);
        // ExpenseCategoryResource::usingWithCollection();

        // return new ExpenseCategoryCollection($expenseCategories);
        $input = $request->except(['skip', 'limit']);
        $genres = $this->expenseCategoryRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse(
            $genres->toArray(),
            [
                'message' => 'Genres retrieved successfully.',
                'totalRecords' => $this->expenseCategoryRepository->all($input)->count()
            ]
        );
    }

    /**
     * @param CreateExpenseCategoryRequest $request
     *
     * @throws ValidatorException
     *
     * @return ExpenseCategoryResource
     */
    public function store(CreateExpenseCategoryRequest $request)
    {
        $input = $request->all();
        $expenseCategory = $this->expenseCategoryRepository->create($input);

        return new ExpenseCategoryResource($expenseCategory);
    }

    /**
     * @param $id
     *
     * @return ExpenseCategoryResource
     */
    public function show($id)
    {
        $expenseCategory = $this->expenseCategoryRepository->find($id);

        return new ExpenseCategoryResource($expenseCategory);
    }

    /**
     * @param UpdateExpenseCategoryRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return ExpenseCategoryResource
     */
    public function update(UpdateExpenseCategoryRequest $request, $id)
    {
        $input = $request->all();
        $expenseCategory = $this->expenseCategoryRepository->update($input, $id);

        return new ExpenseCategoryResource($expenseCategory);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $expenseModels = [
            Expense::class,
        ];
        $result = canDelete($expenseModels, 'expense_category_id', $id);
        if ($result) {
            return $this->sendError('Expense category can\'t be deleted.');
        }
        $this->expenseCategoryRepository->delete($id);

        return $this->sendSuccess('Expense category deleted successfully');
    }
}
