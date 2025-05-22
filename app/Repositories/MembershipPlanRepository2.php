<?php

namespace App\Repositories;

use App\Models\MembershipPlan2;
use App\Repositories\Contracts\MembershipPlanRepositoryInterface2;
use Exception;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class MembershipPlanRepository
 */
class MembershipPlanRepository2 extends BaseRepository2 implements MembershipPlanRepositoryInterface2
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'frequency',
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
        return MembershipPlan2::class;
    }

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return MembershipPlan
     */
    public function find($id, $columns = ['*'])
    {
        return $this->findOrFail($id);
    }

    /**
     * @param  array  $input
     *
     * @throws Exception
     *
     * @return MembershipPlan
     */
    public function store($input)
    {
        $this->validateMembershipPlan($input);

        $membershipPlan = MembershipPlan2::create($input);

        return $membershipPlan;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @return MembershipPlan
     */
    public function update($input, $id)
    {
        $this->validateMembershipPlan($input);
        unset($input['membership_plan_id']);

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = $this->findOrFail($id);
        $membershipPlan->update($input);

        return $membershipPlan;
    }

    /**
     * @param  array  $input
     *
     * @return bool
     */
    public function validateMembershipPlan($input)
    {
        if (! in_array($input['frequency'], [MembershipPlan2::MONTHLY_FREQUENCY, MembershipPlan2::YEARLY_FREQUENCY])) {
            throw new UnprocessableEntityHttpException('invalid frequency.');
        }

        return true;
    }

    /**
     * @return string
     */
    public function generateMembershipPlanId()
    {
        return rand(10000, 99999);
    }
}
