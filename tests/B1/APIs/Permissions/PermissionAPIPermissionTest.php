<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Permission;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class PermissionAPIPermissionTest
 */
class PermissionAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_permissions_without_permission()
    {
        $response = $this->getJson(route('api.b1.permissions.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_permission_without_permission()
    {
        $fakePermission = Permission::factory()->raw();

        $response = $this->postJson(route('api.b1.permissions.store'), $fakePermission);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    public function test_not_allow_to_update_permission_without_permission()
    {
        $permission = Permission::factory()->create();
        $updatePermission = Permission::factory()->raw(['id' => $permission->id]);

        $response = $this->putJson(route('api.b1.permissions.update', $permission->id), $updatePermission);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_permission_without_permission()
    {
        $permission = Permission::factory()->create();

        $response = $this->deleteJson(route('api.b1.permissions.destroy', $permission->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_permissions_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);

        $response = $this->getJson(route('api.b1.permissions.index'));

        $this->assertSuccessMessageResponse($response, 'Permissions retrieved successfully.');
    }

    /** @test */
    public function test_create_permission_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $fakePermission = Permission::factory()->raw();

        $response = $this->postJson(route('api.b1.permissions.store'), $fakePermission);

        $this->assertSuccessMessageResponse($response, 'Permission saved successfully.');
    }

    public function test_can_update_permission_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $permission = Permission::factory()->create();
        $updatePermission = Permission::factory()->raw(['id' => $permission->id]);

        $response = $this->putJson(route('api.b1.permissions.update', $permission->id), $updatePermission);

        $this->assertSuccessMessageResponse($response, 'Permission updated successfully.');
    }

    /** @test */
    public function test_can_delete_permission_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $permission = Permission::factory()->create();

        $response = $this->deleteJson(route('api.b1.permissions.destroy', $permission->id));

        $this->assertSuccessMessageResponse($response, 'Permission deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_permission_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_roles']);
        $permission = Permission::factory()->create();

        $response = $this->getJson(route('api.b1.permissions.show', $permission->id));

        $this->assertSuccessMessageResponse($response, 'Permission retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_permission_without_permission()
    {
        $permission = Permission::factory()->create();

        $response = $this->get(route('api.b1.permissions.show', $permission->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
