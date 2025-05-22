<?php

namespace Tests\B1\APIs;

use App\Models\Member;
use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class MembershipPlanAPIControllerTest
 */
class MembershipPlanAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_membership_plans()
    {
        $this->mockRepo(self::$membershipPlan);

        /** @var MembershipPlan[] $membershipPlan */
        $membershipPlan = MembershipPlan::factory()->count(5)->create();

        $this->membershipPlanRepository->shouldReceive('all')->twice()->andReturn($membershipPlan);

        $response = $this->getJson(route('api.b1.membership-plans.index'));

        $this->assertSuccessDataResponse(
            $response,
            $membershipPlan->toArray(),
            'Membership Plans retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_membership_plans()
    {
        /** @var MembershipPlan[] $membershipPlans */
        $membershipPlans = MembershipPlan::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.membership-plans.index'));
        $take3 = $this->getJson(route('api.b1.membership-plans.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.membership-plans.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.membership-plans.index', [
            'search' => $membershipPlans[0]->name,
        ])
        );

        $this->assertCount(7, $response->original['data'], '2 defaults plan');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
    }

    /** @test */
    public function it_can_create_membership_plan()
    {
        $this->mockRepo(self::$membershipPlan);

        /** @var MembershipPlan $membershipPlans */
        $membershipPlans = MembershipPlan::factory()->make();

        $this->membershipPlanRepository->expects('store')
            ->with($membershipPlans->toArray())
            ->andReturn($membershipPlans);

        $response = $this->postJson(route('api.b1.membership-plans.store'), $membershipPlans->toArray());

        $this->assertSuccessDataResponse(
            $response,
            $membershipPlans->toArray(),
            'Membership Plan saved successfully.'
        );
    }

    /** @test */
    public function it_can_update_membership_plan()
    {
        $this->mockRepo(self::$membershipPlan);

        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = MembershipPlan::factory()->create();
        $updateRecord = MembershipPlan::factory()->make(['id' => $membershipPlan->id]);

        $this->membershipPlanRepository->expects('update')
            ->with($updateRecord->toArray(), $membershipPlan->id)
            ->andReturn($updateRecord);

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id),
            $updateRecord->toArray()
        );

        $this->assertSuccessDataResponse(
            $response,
            $updateRecord->toArray(),
            'Membership Plan updated successfully.'
        );
    }

    /** @test */
    public function test_can_no_update_default_plan()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create(['is_default' => true]);
        $updateRecord = factory(MembershipPlan::class)->make(['id' => $membershipPlan->id]);

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id),
            $updateRecord->toArray()
        );

        $this->assertSuccessMessageResponse(
            $response,
            'Default membership plan should not be updated.'
        );
        $this->assertEquals($membershipPlan->name, MembershipPlan::find($membershipPlan->id)->name);
    }


    /** @test */
    public function test_can_retrieve_membership_plan()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = MembershipPlan::factory()->create();

        $response = $this->getJson(route('api.b1.membership-plans.show', $membershipPlan->id));

        $this->assertSuccessDataResponse(
            $response,
            $membershipPlan->toArray(),
            'Membership Plan retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_delete_membership_plan()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = MembershipPlan::factory()->create();

        $response = $this->deleteJson(route('api.b1.membership-plans.destroy', $membershipPlan->id));

        $this->assertSuccessDataResponse(
            $response,
            $membershipPlan->toArray(),
            'Membership Plan deleted successfully.'
        );
        $this->assertEmpty(MembershipPlan::find($membershipPlan->id));
    }

    /** @test */
    public function test_can_not_delete_default_plan()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = factory(MembershipPlan::class)->create(['is_default' => true]);

        $response = $this->deleteJson(route('api.b1.membership-plans.destroy', $membershipPlan->id));

        $this->assertSuccessMessageResponse(
            $response,
            'Default membership plan should not be deleted.'
        );
        $this->assertNotEmpty(MembershipPlan::find($membershipPlan->id));
    }

    /** @test */
    public function test_unable_to_delete_membership_plan_when_its_assigned_to_one_or_more_member()
    {
        /** @var MembershipPlan $membershipPlan */
        $membershipPlan = MembershipPlan::factory()->create();

        /** @var Member $member */
        $member = Member::factory()->create(['membership_plan_id' => $membershipPlan->id]);

        $response = $this->deleteJson(route('api.b1.membership-plans.destroy', $member->membership_plan_id));

        $this->assertExceptionMessage(
            $response,
            'Membership Plan can not be delete, it is assigned to one or more members.'
        );
    }
}
