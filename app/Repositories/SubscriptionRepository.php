<?php

namespace App\Repositories;

use App;
use App\Models\Subscription;
use App\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;

/**
 * Class SubscriptionRepository
 */
class SubscriptionRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'plan_amount',
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
        return Subscription::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return User[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null , $type= null , $columns = ['*'])
    {
        $orderBy = null;
        if (! empty($search['order_by']) && !in_array($search['order_by'], ['start_date', 'end_date']) ) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }
        $query = $this->allQuery($search, $skip, $limit)->with('member', 'subscriptionPlan');
        $query = $this->applyDynamicSearch($search, $query);

        $subscriptions = $query->orderByDesc('id')->get();
        
        if($type){
            $subscriptions = $query->where('type',$type)->orderByDesc('id')->get();
        }

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
            $query->orWhereHas('member', function (Builder $query) use ($search) {
                filterByColumns($query, $search['search'], ['first_name','last_name']);
            });
            $query->orWhereHas('subscriptionPlan', function (Builder $query) use ($search) {
                filterByColumns($query, $search['search'], ['name']);
            });
        });

        return $query;
    }

}
