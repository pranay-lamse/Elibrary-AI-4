<?php

namespace Tests\Repositories;

use App\Models\Role;
use App\Repositories\UserRepository;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class UserRepositoryTest
 */
class UserRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var UserRepository
     */
    private $userRepo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->userRepo = app(UserRepository::class);
    }

    /** @test */
    public function test_can_get_all_users()
    {
        User::factory()->count(10)->create();

        $users = $this->userRepo->all();
        $take3 = $this->userRepo->all([], null, 3);
        $skip4 = $this->userRepo->all([], 7, 5);

        $this->assertCount(12, $users, '1 default user');
        $this->assertCount(3, $take3);
        $this->assertCount(5, $skip4);
    }

    /** @test */
    public function test_can_store_user()
    {
        /** @var User $farhan */
        $farhan = User::factory()->raw(['password' => 123456]);

        /** @var Role $role */
        $role = Role::factory()->create();

        $input = array_merge($farhan, [
            'password'  => 123456,
            'role_id'   => $role->id,
            'address_1' => $this->faker->address,
        ]);
        $user = $this->userRepo->store($input);

        $this->assertArrayHasKey('id', $user);
        $this->assertCount(1, $user->roles);
        $this->assertEquals($role->id, $user->roles[0]->id);
        $this->assertNotEmpty($user->address);
    }

    /** @test */
    public function test_can_update_user()
    {
        /** @var User $farhan */
        $farhan = User::factory()->create();

        /** @var Role $role */
        $role = Role::factory()->create();

        $inputs = [
            'first_name' => 'random name',
            'role_id'    => $role->id,
            'address_1'  => $this->faker->address,
        ];
        $user = $this->userRepo->update($inputs, $farhan->id);

        $this->assertArrayHasKey('id', $user);
        $this->assertEquals('random name', $user->first_name);
        $this->assertCount(1, $user->roles);
        $this->assertEquals($role->id, $user->roles[0]->id);
        $this->assertNotEmpty($user->address);
    }

    /**
     * @test
     * @expectedException App\Exceptions\ApiOperationFailedException
     * @expectedExceptionMessage User not found
     */
    public function test_not_allow_to_update_non_existing_user()
    {
        /** @var User $user */
        $user = User::factory()->raw();

        $this->userRepo->update($user, 999);
    }
}
