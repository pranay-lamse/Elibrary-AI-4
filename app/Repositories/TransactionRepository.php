<?php

namespace App\Repositories;

use App;
use App\Models\Subscription;
use App\Models\Transaction;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Class TransactionRepository
 */
class TransactionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'amount',
        'status',
        'member_id',
    ];

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
        return Transaction::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return User[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && !in_array($search['order_by'], ['amount', 'created_at'])) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $searchString = isset($search['search']) ? $search['search'] : '';
        unset($search['search']);
        $query = $this->allQuery($search, $skip, $limit)->with('member', 'subscriptionPlan');
        $search['search'] = $searchString;
        $query = $this->applyDynamicSearch($search, $query);
        if(isset($search['id']))
        {
            $query = $query->where('id', $search['id']);
        }


        $subscriptions = $query->orderByDesc('id')->get();

        if (! empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'member_name') {
                $orderString = 'member.first_name';
            }

            if ($orderBy == 'plan_name') {
                $orderString = 'subscriptionPlan.name';
            }

            $subscriptions = $subscriptions->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $subscriptions->values();
    }

    /**
     * @param $search
     * @param $query
     *
     * @return mixed
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(! empty($search['search']), function (Builder $query) use ($search) {
            $query->where(function (Builder  $query) use($search) {
//                $query->orWhereHas('member', function (Builder $query) use ($search) {
//                    filterByColumns($query, $search['search'], ['first_name','last_name']);
//                });
                $query->orWhereHas('subscriptionPlan', function (Builder $query) use ($search) {
                    $query->whereRaw('lower(name) LIKE ?', ['%'.$search['search'].'%']);
                });

                $query->orWhereHas('subscriptionPlan', function (Builder $query) use ($search) {
                    $query->where('price', $search['search']);
                });
            });
        });

        return $query;
    }

}
