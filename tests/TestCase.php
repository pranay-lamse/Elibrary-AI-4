<?php

namespace Tests;

use App\Models\Member;
use App\Models\Permission;
use App\Models\Role;
use App\User;
use Carbon\Carbon;
use Faker\Factory;
use Faker\Generator;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Testing\TestResponse;
use Laravel\Sanctum\Sanctum;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    /** @var Generator */
    public $faker;

    public $loggedInUserId;

    public $loggedInMemberId;

    public function signInWithDefaultAdminUser()
    {
        $user = User::first();
        $this->loggedInUserId = $user->id;
        Sanctum::actingAs($user, ['*']);

        return $user;
    }

    public function signInWithMember()
    {
        $member = Member::factory()->create();
        $this->loggedInMemberId = $member->id;

        Sanctum::actingAs($member);

        return $member;
    }

    public function __construct($name = null, array $data = [], $dataName = '')
    {
        parent::__construct($name, $data, $dataName);

        $this->faker = Factory::create();
    }

    /**
     * @param  TestResponse  $response
     * @param  string  $message
     */
    public function assertSuccessMessageResponse(TestResponse $response, string $message)
    {
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => $message,
            ]);
    }

    /**
     * @param  TestResponse  $response
     * @param  array  $data
     * @param  string  $message
     */
    public function assertSuccessDataResponse(TestResponse $response, array $data, string $message)
    {
        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => $message,
                'data'    => $data,
            ]);
    }

    /**
     * @param  TestResponse  $response
     * @param  string  $message
     */
    public function assertExceptionMessage(TestResponse $response, string $message)
    {
        $this->assertEquals($message, $response->original['message']);
    }

    /**
     * @param  TestResponse  $response
     * @param  string  $message
     */
    public function assertErrorMessageResponse(TestResponse $response, string $message)
    {
        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
                'message' => $message,
            ]);
    }

    /**
     * @param  TestResponse  $response
     * @param  string  $message
     */
    public function assertJsonErrorMessageResponse(TestResponse $response, string $message)
    {
        $response->assertJson([
            'success' => false,
            'message' => $message,
        ]);
    }

    /**
     * @param  int|User  $userId
     * @param  array  $permissions
     *
     * @return User
     */
    public function assignPermissions($userId, $permissions)
    {
        /** @var Role $role */
        $role = Role::factory()->create();

        foreach ($permissions as $permission) {
            $permission = Permission::whereName($permission)->first();
            $role->givePermissionTo($permission);
        }

        /** @var User $user */
        $user = (is_int($userId)) ? User::findOrFail($userId) : $userId;
        $user->assignRole($role);

        return $user;
    }

    /**
     * @param  string  $string
     * @param  string  $timezone
     *
     * @return Carbon
     */
    protected function mockTime($string, $timezone = 'UTC')
    {
        Carbon::setTestNow(Carbon::parse($string, $timezone));

        return Carbon::now();
    }
}
