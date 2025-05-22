<?php

namespace Tests\Repositories;

use App\Models\MembershipPlan;
use App\Repositories\MembershipPlanRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MembershipPlanRepositoryTest.
 */
class MembershipPlanRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var MembershipPlanRepository */
    protected $membershipPlanRepo;

    protected function setUp(): void
    {
        parent::setUp();

        $this->membershipPlanRepo = app(MembershipPlanRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function it_can_store_membership_plan()
    {
        $fakePlan = MembershipPlan::factory()->raw();

        $plan = $this->membershipPlanRepo->store($fakePlan);

        $this->assertArrayHasKey('id', $plan);
        $this->assertEquals($fakePlan['name'], $plan['name']);
    }

    /** @test */
    public function it_can_update_membership_plan()
    {
        $plan = MembershipPlan::factory()->create();
        $fakePlan = MembershipPlan::factory()->raw();

        $updatedPlan = $this->membershipPlanRepo->update($fakePlan, $plan->id);

        $this->assertArrayHasKey('id', $updatedPlan);
        $this->assertEquals($fakePlan['name'], $updatedPlan['name']);
    }

    /** @test */
    public function test_can_generate_membership_plan_id()
    {
        $generatedMemberShipPlanId = $this->membershipPlanRepo->generateMembershipPlanId();

        $this->assertNotEmpty($generatedMemberShipPlanId);
        $this->assertIsNumeric($generatedMemberShipPlanId);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage invalid frequency.
     */
    public function test_validate_membership_plan_fails_with_invalid_frequency()
    {
        $fakePlan = MembershipPlan::factory()->raw(['frequency' => 99]);

        $this->membershipPlanRepo->validateMembershipPlan($fakePlan);
    }

    /**
     * @test
     */
    public function test_can_validate_membership_input()
    {
        $response = $this->membershipPlanRepo->validateMembershipPlan([
            'frequency' => MembershipPlan::MONTHLY_FREQUENCY,
        ]);

        $this->assertTrue($response);
    }
}
