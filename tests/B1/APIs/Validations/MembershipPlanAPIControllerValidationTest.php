<?php

namespace Tests\B1\APIs\Validations;

use App\Models\MembershipPlan;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MembershipPlanAPIControllerValidationTest
 */
class MembershipPlanAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_membership_plan_fails_when_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.membership-plans.store'), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_membership_plan_fails_when_price_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.membership-plans.store'), [
            'name'  => $this->faker->name,
            'price' => '',
        ]);

        $this->assertExceptionMessage($response, 'The price field is required.');
    }

    /** @test */
    public function test_create_membership_plan_fails_when_frequency_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.membership-plans.store'), [
            'name'  => $this->faker->name,
            'price' => $this->faker->randomDigit,
        ]);

        $this->assertExceptionMessage($response, 'The frequency field is required.');
    }

    /** @test */
    public function test_update_membership_plan_fails_when_name_is_not_passed()
    {
        $membershipPlan = MembershipPlan::factory()->create();

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_membership_plan_fails_when_price_is_not_passed()
    {
        $membershipPlan = MembershipPlan::factory()->create();

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id), [
            'name'  => $this->faker->name,
            'price' => '',
        ]);

        $this->assertExceptionMessage($response, 'The price field is required.');
    }

    /** @test */
    public function test_update_membership_plan_fails_when_frequency_is_not_passed()
    {
        $membershipPlan = MembershipPlan::factory()->create();

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id), [
            'name'  => $this->faker->name,
            'price' => $this->faker->randomDigit,
        ]);

        $this->assertExceptionMessage($response, 'The frequency field is required.');
    }

    /** @test */
    public function it_can_store_membership_plan()
    {
        $fakeMembershipPlan = MembershipPlan::factory()->raw();

        $response = $this->postJson(route('api.b1.membership-plans.store'), $fakeMembershipPlan);

        $this->assertSuccessMessageResponse($response, 'Membership Plan saved successfully.');
        $this->assertNotEmpty(MembershipPlan::where('name', $fakeMembershipPlan['name'])->first());
    }

    /** @test */
    public function it_can_update_membership_plan()
    {
        $membershipPlan = MembershipPlan::factory()->create();
        $fakeMembershipPlan = MembershipPlan::factory()->raw();

        $response = $this->putJson(route('api.b1.membership-plans.update', $membershipPlan->id),
            $fakeMembershipPlan
        );

        $this->assertSuccessMessageResponse($response, 'Membership Plan updated successfully.');
        $this->assertEquals($fakeMembershipPlan['name'], $membershipPlan->fresh()->name);
    }
}
