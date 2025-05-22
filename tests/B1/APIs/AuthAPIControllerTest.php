<?php

namespace Tests\B1\APIs;

use App\Models\Permission;
use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

/**
 * Class AuthAPIControllerTest
 */
class AuthAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    /** @var */
    protected $authRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_app_config()
    {
        $farhan = User::factory()->create();
        Sanctum::actingAs($farhan);

        /** @var Permission $permission */
        $permission = Permission::factory()->create();

        /** @var Role $role */
        $role = Role::factory()->create();
        $role->permissions()->sync([$permission->id]);
        $farhan->roles()->sync([$role->id]);

        $response = $this->getJson(route('api.b1.config'));

        $this->assertSuccessMessageResponse($response, 'Config retrieved successfully.');
        $this->assertEquals($farhan->id, $response->original['data']['user']['id']);

        $this->assertCount(1, $response->original['data']['roles']);
        $this->assertEquals($role->id, $response->original['data']['roles'][0]['id']);

        $this->assertCount(1, $response->original['data']['permissions']);
        $this->assertEquals($permission->id, $response->original['data']['permissions'][0]['id']);
    }
}
