<?php

namespace Tests\B1\APIs;

use App\Models\Permission;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class PermissionAPIControllerTest
 */
class PermissionAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_permissions()
    {
        $this->mockRepo(self::$permission);

        /** @var Permission[] $permissions */
        $permissions = Permission::factory()->count(5)->create();

        $this->permissionRepository->expects('all')->andReturn($permissions);

        $response = $this->getJson(route('api.b1.permissions.index'));

        $this->assertSuccessDataResponse(
            $response,
            $permissions->toArray(),
            'Permissions retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_permissions()
    {
        /** @var Permission[] $permissions */
        $permissions = Permission::factory()->count(5)->create();

        $response = $this->getJson('api/b1/permissions');
        $take3 = $this->getJson(route('api.b1.permissions.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.permissions.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.permissions.index', ['search' => $permissions[0]->name]));

        $this->assertCount(21, $response->original['data'], '15 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 20);
    }

    /** @test */
    public function it_can_create_permission()
    {
        $this->mockRepo(self::$permission);

        /** @var Permission $permission */
        $permission = Permission::factory()->make();

        $this->permissionRepository->expects('create')
            ->with($permission->toArray())
            ->andReturn($permission);

        $response = $this->postJson(route('api.b1.permissions.store', $permission->toArray()));

        $this->assertSuccessDataResponse($response, $permission->toArray(), 'Permission saved successfully.');
    }

    /** @test */
    public function it_can_update_permission()
    {
        $this->mockRepo(self::$permission);

        /** @var Permission $permission */
        $permission = Permission::factory()->create();
        $fakePermission = Permission::factory()->make(['id' => $permission->id]);

        $this->permissionRepository->expects('update')
            ->with($fakePermission->toArray(), $permission->id)
            ->andReturn($fakePermission);

        $response = $this->putJson(route('api.b1.permissions.update', $permission->id),
            $fakePermission->toArray()
        );

        $this->assertSuccessDataResponse(
            $response,
            $fakePermission->toArray(),
            'Permission updated successfully.'
        );
    }

    /** @test */
    public function it_can_retrieve_permission()
    {
        /** @var Permission $permission */
        $permission = Permission::factory()->create();

        $response = $this->getJson(route('api.b1.permissions.show', $permission->id));

        $this->assertSuccessDataResponse(
            $response,
            $permission->toArray(),
            'Permission retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_delete_permission()
    {
        /** @var Permission $permission */
        $permission = Permission::factory()->create();

        $response = $this->deleteJson(route('api.b1.permissions.destroy', $permission->id));

        $this->assertSuccessDataResponse(
            $response,
            $permission->toArray(),
            'Permission deleted successfully.'
        );
        $this->assertEmpty(Permission::find($permission->id));
    }
}
