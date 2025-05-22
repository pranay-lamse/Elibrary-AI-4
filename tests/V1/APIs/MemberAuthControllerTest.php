<?php

namespace Tests\V1\APIs;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MemberAuthControllerTest
 */
class MemberAuthControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
    }

    /** @test */
    public function test_can_reset_password()
    {
        /** @var Member $member */
        $member = Member::factory()->create();

        $key = $member->email.'|'.date('Y-m-d H:i:s');
        $token = encrypt($key);
        $input = ['token' => $token, 'password' => '1nfy0m'];

        $response = $this->postJson(route('api.v1.reset-member-password.index'), $input);

        $this->assertSuccessMessageResponse($response, 'Password updated successfully.');
    }

    /** @test */
    public function test_unable_to_reset_password_of_non_existing_email()
    {
        $key = $this->faker->email.'|'.date('Y-m-d H:i:s');
        $token = encrypt($key);
        $input = ['token' => $token, 'password' => '1nfy0m'];

        $response = $this->postJson(route('api.v1.reset-member-password.index'), $input);

        $this->assertJsonErrorMessageResponse($response, 'User with given email not available.');
    }

    /** @test */
    public function test_unable_to_reset_password_when_activate_link_has_expired()
    {
        /** @var Member $member */
        $member = Member::factory()->create();

        $key = $member->email.'|'.date('Y-m-d H:i:s', strtotime('-1 day'));
        $token = encrypt($key);
        $input = ['token' => $token, 'password' => '1nfy0m'];

        $response = $this->postJson(route('api.v1.reset-member-password.index'), $input);

        $this->assertJsonErrorMessageResponse($response, 'The activate link has expired.');
    }

    /** @test */
    public function test_unable_to_verify_member_account_without_token()
    {
        $response = $this->getJson(route('api.v1.activate-member'));

        $this->assertStringContainsString('#app/login?success=0&msg=token not found.', $response->getTargetUrl());
    }

    /** @test */
    public function test_can_verify_and_activate_member_account()
    {
        /** @var Member $member */
        $member = Member::factory()->create([
            'activation_code' => 123456,
            'is_active'       => false,
        ]);
        $key = $member->id.'|'.$member->activation_code;
        $token = encrypt($key);

        $response = $this->getJson(route('api.v1.activate-member', ['token='.$token]));

        $this->assertStringContainsString(
            '#app/login?success=1&msg=Your account has been activated successfully.', $response->getTargetUrl()
        );
        $this->assertTrue($member->fresh()->is_active);
    }

    /** @test */
    public function test_member_can_register_with_valid_input()
    {
        $fakeMember = Member::factory()->raw();

        $response = $this->postJson(route('api.v1.register-member', $fakeMember));

        $this->assertEquals($response->original['message'], 'Registered successfully.');
        $this->assertNotEmpty($response->original['data']['token']);
        $this->assertNotEmpty($response->original['data']['user']);
    }
}
