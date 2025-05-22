<?php

namespace Tests\B1\APIs;

use App\Models\Permission;
use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class RoleAPIControllerTest
 */
class RoleAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_roles()
    {
        $this->mockRepo(self::$role);

        /** @var Role[] $roles */
        $roles = Role::factory()->count(5)->create();

        $this->roleRepository->shouldReceive('all')->twice()->andReturn($roles);

        $response = $this->getJson(route('api.b1.roles.index'));

        $this->assertSuccessDataResponse($response, $roles->toArray(), 'Roles retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_roles()
    {
        /** @var Role[] $roles */
        $roles = Role::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.roles.index'));
        $take3 = $this->getJson(route('api.b1.roles.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.roles.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.roles.index', ['search' => $roles[0]->name]));

        $this->assertCount(7, $response->original['data'], '2 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
    }

    /** @test */
    public function it_can_store_role()
    {
        $this->mockRepo(self::$role);

        $permission = Permission::factory()->create();

        /** @var Role $role */
        $role = Role::factory()->make(['permissions' => [$permission->id]]);

        $this->roleRepository->expects('store')
            ->with($role->toArray())
            ->andReturn($role);

        $response = $this->postJson(route('api.b1.roles.store', $role->toArray()));

        $this->assertSuccessDataResponse($response, $role->toArray(), 'Role saved successfully.');
    }

    /** @test */
    public function it_can_update_role()
    {
        $this->mockRepo(self::$role);

        $permission = Permission::factory()->create();

        /** @var Role $role */
        $role = Role::factory()->create();

        $updateRole = array_merge(
            Role::factory()->make(['id' => $role->id])->toArray(),
            ['permissions' => [$permission->id]]
        );

        $this->roleRepository->expects('update')
            ->with($updateRole, $role->id)
            ->andReturn($role);

        $response = $this->putJson(route('api.b1.roles.update', $role->id), $updateRole);

        $this->assertSuccessDataResponse($response, $role->toArray(), 'Role updated successfully.');
    }

    /** @test */
    public function test_can_not_update_default_role()
    {
        $permission = factory(Permission::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create(['is_default' => true]);

        $updateRole = array_merge(
            factory(Role::class)->make(['id' => $role->id])->toArray(),
            ['permissions' => [$permission->id]]
        );

        $response = $this->putJson(route('api.b1.roles.update', $role->id), $updateRole);

        $this->assertSuccessDataResponse($response, $role->toArray(), 'Default role should not be updated.');
        $this->assertEquals($role->name, Role::find($role->id)->name);
    }

    /** @test */
    public function test_can_retrieve_role()
    {
        $permission = Permission::factory()->create();

        /** @var Role $role */
        $role = Role::factory()->create();
        $role->permissions()->sync([$permission->id]);

        $response = $this->getJson(route('api.b1.roles.show', $role->id));

        $this->assertSuccessDataResponse($response, $role->toArray(), 'Role retrieved successfully.');
        $this->assertEquals($permission->id, $response->original['data']['permissions'][0]['id']);
    }

    /** @test */
    public function it_can_delete_role()
    {
        $role = Role::factory()->create();

        $response = $this->deleteJson(route('api.b1.roles.destroy', $role->id));

        $this->assertSuccessMessageResponse($response, 'Role deleted successfully.');
        $this->assertEmpty(Role::where('name', $role->name)->first());
    }

    /** @test */
    public function test_can_not_delete_default_role()
    {
        $role = factory(Role::class)->create(['is_default' => true]);

        $response = $this->deleteJson(route('api.b1.roles.destroy', $role->id));

        $this->assertSuccessMessageResponse($response, 'Default role should not be deleted.');
        $this->assertNotEmpty(Role::where('name', $role->name)->first());
    }

    /** @test */
    public function test_unable_to_delete_role_when_is_assigned_to_user()
    {
        $user = User::factory()->create();

        /** @var Role $role */
        $role = Role::factory()->create();
        $role->users()->sync([$user->id]);

        $response = $this->deleteJson(route('api.b1.roles.destroy', $role->id));

        $this->assertErrorMessageResponse($response, 'Role is assigned to one or more users.');
    }
}
