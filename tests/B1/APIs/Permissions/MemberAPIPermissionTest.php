<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Member;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MemberAPIPermissionTest
 */
class MemberAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = User::factory()->create();
        $token = $this->loggedInUserId->createToken('admin_token')->plainTextToken;
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_can_delete_member_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_members']);

        $member = Member::factory()->create();

        $response = $this->deleteJson(route('api.b1.members.destroy', $member->id));

        $this->assertExceptionMessage($response, 'Member deleted successfully.');
    }

    /** @test */
    public function test_not_allow_to_delete_member_without_permission()
    {
        $member = Member::factory()->create();

        $response = $this->deleteJson(route('api.b1.members.destroy', $member->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
