<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class UserAPIPermissionTest
 */
class UserAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_users_without_permission()
    {
        $response = $this->getJson(route('api.b1.users.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_user_without_permission()
    {
        $fakeUser = User::factory()->raw();

        $response = $this->postJson(route('api.b1.users.store'), $fakeUser);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_user_without_permission()
    {
        $user = User::factory()->create();
        $updateUser = User::factory()->raw(['id' => $user->id]);

        $response = $this->putJson(route('api.b1.users.update', $user->id), $updateUser);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_user_without_permission()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson(route('api.b1.users.destroy', $user->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_users_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_users']);

        $response = $this->getJson(route('api.b1.users.index'));

        $this->assertSuccessMessageResponse($response, 'Users retrieved successfully.');
    }

    /** @test */
    public function test_can_create_user_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_users']);
        $role = Role::factory()->create();
        $fakeUser = User::factory()->raw(['role_id' => $role->id]);

        $response = $this->postJson(route('api.b1.users.store'), $fakeUser);

        $this->assertSuccessMessageResponse($response, 'User saved successfully.');
    }

    /** @test */
    public function test_can_update_user_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_users']);
        $user = User::factory()->create();
        $updateUser = User::factory()->raw(['id' => $user->id]);

        $response = $this->putJson(route('api.b1.users.update', $user->id), $updateUser);

        $this->assertSuccessMessageResponse($response, 'User updated successfully.');
    }

    /** @test */
    public function test_can_delete_user_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_users']);
        $user = User::factory()->create();

        $response = $this->deleteJson(route('api.b1.users.destroy', $user->id));

        $this->assertSuccessMessageResponse($response, 'User deleted successfully.');
    }

    /** @test */
    public function test_not_allow_to_update_status_without_permission()
    {
        $user = User::factory()->create();

        $response = $this->getJson(route('api.b1.users.update-status', $user->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_update_status_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_users']);
        $user = User::factory()->create();

        $response = $this->getJson(route('api.b1.users.update-status', $user->id));

        $this->assertSuccessMessageResponse($response, 'User updated successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_user_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_users']);
        $user = User::factory()->create();

        $response = $this->getJson(route('api.b1.users.show', $user->id));

        $this->assertSuccessMessageResponse($response, 'User retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_user_without_permission()
    {
        $user = User::factory()->create();

        $response = $this->get(route('api.b1.users.show', $user->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
