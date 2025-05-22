<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateIncomeRequest;
use App\Http\Requests\UpdateIncomeRequest;
use App\Http\Resources\IncomeCollection;
use App\Http\Resources\IncomeResource;
use App\Models\Income;
use App\Repositories\IncomeRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class IncomeAPIController
 */
class IncomeAPIController extends AppBaseController
{
    /** @var IncomeRepository */
    private $IncomeRepository;

    public function __construct(IncomeRepository $IncomeRepository)
    {
        $this->IncomeRepository = $IncomeRepository;
    }

    /**
     * @param Request $request
     *
     * @return IncomeCollection
     */
    public function index(Request $request)
    {


        $input = $request->except(['skip', 'limit']);
        $income = $this->IncomeRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );


        IncomeResource::usingWithCollection();

        return new IncomeCollection($income);




    }

    /**
     * @param CreateIncomeRequest $request
     *
     * @return IncomeResource
     */
    public function store(CreateIncomeRequest $request)
    {
        $input = $request->all();
        $income = $this->IncomeRepository->storeExpense($input);

        return new IncomeResource($income);
    }

    /**
     * @param $id
     *
     * @return IncomeResource
     */
    public function show($id)
    {
        $income = $this->IncomeRepository->find($id);

        return new IncomeResource($income);
    }

    /**
     * @param UpdateIncomeRequest $request
     * @param $id
     *
     * @throws ValidatorException
     *
     * @return IncomeResource
     */
    public function update(UpdateIncomeRequest $request, $id)
    {
        $input = $request->all();
        $income = $this->IncomeRepository->update($input, $id);

        return new IncomeResource($income);
    }

    /**
     * @param $id
     *
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $this->IncomeRepository->delete($id);

        return $this->sendSuccess('Income deleted successfully');
    }
}
