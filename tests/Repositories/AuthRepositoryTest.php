<?php

namespace Tests\Repositories;

use App\Models\Permission;
use App\Models\Role;
use App\Repositories\AuthRepository;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

/**
 * Class AuthRepositoryTest
 */
class AuthRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var AuthRepository
     */
    private $authRepo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->authRepo = app(AuthRepository::class);
    }

    /** @test */
    public function test_can_get_app_config()
    {
        /** @var User $farhan */
        $farhan = User::factory()->create();
        Sanctum::actingAs($farhan);

        /** @var Permission $permission */
        $permission = Permission::factory()->create();

        /** @var Role $role */
        $role = Role::factory()->create();
        $role->permissions()->sync([$permission->id]);
        $farhan->roles()->sync([$role->id]);

        $appConfig = $this->authRepo->getAppConfig();

        $this->assertEquals($farhan->id, $appConfig['user']['id']);

        $this->assertCount(1, $appConfig['roles']);
        $this->assertEquals($role->id, $appConfig['roles'][0]['id']);

        $this->assertCount(1, $appConfig['permissions']);
        $this->assertEquals($permission->id, $appConfig['permissions'][0]['id']);
    }
}
