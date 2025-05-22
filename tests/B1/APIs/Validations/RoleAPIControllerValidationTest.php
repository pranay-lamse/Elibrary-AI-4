<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class RoleAPIControllerValidationTest
 */
class RoleAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_role_fails_when_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.roles.store', ['name' => '']));

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_role_fails_when_name_is_duplicate()
    {
        $role = Role::factory()->create();

        $response = $this->postJson(route('api.b1.roles.store', ['name' => $role->name]));

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_create_role_fails_when_permissions_not_passed()
    {
        $response = $this->postJson(route('api.b1.roles.store', [
            'name'        => $this->faker->name,
            'permissions' => [],
        ]
        ));

        $this->assertExceptionMessage($response, 'Role must have at least one permission.');
    }

    /** @test */
    public function test_update_role_fails_when_name_is_not_passed()
    {
        $role = Role::factory()->create();

        $response = $this->putJson(route('api.b1.roles.update', $role->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_role_fails_when_name_is_duplicate()
    {
        $role1 = Role::factory()->create();
        $role2 = Role::factory()->create();

        $response = $this->putJson(route('api.b1.roles.update', $role2->id), ['name' => $role1->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_role_fails_when_permissions_not_passed()
    {
        $role = Role::factory()->create();

        $response = $this->putJson(route('api.b1.roles.update', $role->id), [
            'name'        => $this->faker->name,
            'permissions' => [],
        ]);

        $this->assertExceptionMessage($response, 'Role must have at least one permission.');
    }

    /** @test */
    public function it_can_store_role()
    {
        $inputs = $this->prepareRoleInputs();

        $response = $this->postJson(route('api.b1.roles.store', $inputs));

        $this->assertSuccessMessageResponse($response, 'Role saved successfully.');
        $this->assertEquals($inputs['name'], $response->original['data']['name']);
        $this->assertEquals($inputs['permissions'][0], $response->original['data']['permissions'][0]['id']);
    }

    /** @test */
    public function it_can_update_role()
    {
        /** @var Role $role */
        $role = Role::factory()->create();

        $inputs = $this->prepareRoleInputs();
        $response = $this->putJson(route('api.b1.roles.update', $role->id), $inputs);

        $this->assertSuccessMessageResponse($response, 'Role updated successfully.');
        $this->assertEquals($inputs['name'], $response->original['data']['name']);
    }

    /**
     * @param array $input
     *
     * @return array
     */
    public function prepareRoleInputs($input = [])
    {
        $permission = Permission::factory()->create();

        return array_merge([
            'name'        => $this->faker->name,
            'permissions' => [$permission->id],
        ], $input);
    }
}
