<?php

namespace App\Repositories;

use App\Models\Income;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class ExpenseRepository
 */
class IncomeRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [

        'date',
        'amount',
        'details',
        'reference_code',
        'created_at',
        'title',
    ];

    /**
     *
     * @return array
     */


    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Income::class;
    }

    /**
     * @param $input
     *
     *
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storeExpense($input)
    {
        try {
            DB::beginTransaction();
            $expense = $this->create($input);
            $input['reference_code'] = getSettingValue('expense_code') . '_11' . $expense->id;
            $expense->update($input);
            DB::commit();

            return $expense;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }
}
