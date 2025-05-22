<?php

namespace Tests\V1\APIs;

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
        $this->signInWithMember();
    }

    /** @test */
    public function test_can_get_all_membership_plans()
    {
        $this->mockRepo(self::$membershipPlan);

        /** @var MembershipPlan[] $membershipPlan */
        $membershipPlan = MembershipPlan::factory()->count(5)->create();

        $this->membershipPlanRepository->expects('all')->andReturn($membershipPlan);

        $response = $this->getJson(route('api.v1.membership-plans.index'));

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

        $response = $this->getJson(route('api.v1.membership-plans.index'));
        $take3 = $this->getJson(route('api.v1.membership-plans.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.v1.membership-plans.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.v1.membership-plans.index', ['search' => $membershipPlans[0]->name]));

        $this->assertCount(8, $response->original['data'], '2 defaults plan');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
    }
}
