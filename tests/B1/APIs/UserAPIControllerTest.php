<?php

namespace Tests\B1\APIs;

use App\Models\Address;
use App\Models\Role;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class UserAPIControllerTest
 */
class UserAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_users()
    {
        $this->mockRepo(self::$user);

        /** @var User $users */
        $users = factory(User::class, 5)->create();

        $this->userRepository->shouldReceive('all')->twice()->andReturn($users);

        $response = $this->getJson(route('api.b1.users.index'));

        $this->assertSuccessDataResponse(
            $response,
            $users->toArray(),
            'Users retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_users()
    {
        /** @var User[] $users */
        $users = factory(User::class, 5)->create();

        $response = $this->getJson(route('api.b1.users.index'));
        $take3 = $this->getJson(route('api.b1.users.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.users.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.users.index', ['search' => $users[0]->first_name]));

        $this->assertCount(7, $response->original['data'], '1 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(7, $response->original['totalRecords'], '1 defaults');

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function test_can_sort_user_records_by_role_name()
    {
        /** @var User $vishal */
        $vishal = factory(User::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create(['name' => 'manager']);
        $vishal->roles()->sync([$role->id]);

        $responseAsc = $this->getJson(route('api.b1.users.index', [
            'order_by'  => 'role_name',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.b1.users.index', [
            'order_by'  => 'role_name',
            'direction' => 'desc',
        ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals('admin', $responseAsc[0]['roles'][0]['name'], 'default role is admin');
        $this->assertEquals($role->name, $responseDesc[0]['roles'][0]['name']);
    }

    /** @test */
    public function it_can_create_user()
    {
        $this->mockRepo(self::$user);

        /** @var User $farhan */
        $farhan = factory(User::class)->make();
        $role = factory(Role::class)->create();

        $input = array_merge($farhan->toArray(), [
            'password' => 12345678,
            'role_id'  => $role->id,
        ]);

        $this->userRepository->expects('store')
            ->with($input)
            ->andReturn($farhan);

        $response = $this->postJson(route('api.b1.users.store'), $input);

        $this->assertSuccessDataResponse($response, $farhan->toArray(), 'User saved successfully.');
    }

    /** @test */
    public function it_can_update_user()
    {
        $this->mockRepo(self::$user);

        /** @var User $farhan */
        $farhan = factory(User::class)->create();
        $updateRecord = factory(User::class)->make(['id' => $farhan->id]);

        $this->userRepository->expects('update')
            ->with($updateRecord->toArray(), $farhan->id)
            ->andReturn($updateRecord);

        $response = $this->putJson(route('api.b1.users.update', $farhan->id), $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'User updated successfully.');
    }

    /** @test */
    public function test_can_retrieve_user_with_roles_and_address()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->create();

        /** @var Role $role */
        $role = factory(Role::class)->create();
        $farhan->roles()->sync([$role->id]);

        $address = factory(Address::class)->create();
        $farhan->address()->save($address);

        $response = $this->getJson(route('api.b1.users.show', $farhan->id));

        $this->assertSuccessDataResponse(
            $response,
            $farhan->toArray(),
            'User retrieved successfully.'
        );
        $response = $response->original['data'];
        $this->assertNotEmpty($response['roles']);
        $this->assertEquals($role->id, $response['roles'][0]['id']);

        $this->assertNotEmpty($response['address']);
        $this->assertEquals($address->id, $response['address']['id']);
    }

    /** @test */
    public function it_can_delete_user()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->create();

        $response = $this->deleteJson(route('api.b1.users.destroy', $farhan->id));

        $this->assertSuccessDataResponse(
            $response,
            $farhan->toArray(),
            'User deleted successfully.'
        );
        $this->assertEmpty(User::find($farhan->id));
    }

    /** @test */
    public function test_not_delete_default_user()
    {
        $response = $this->deleteJson(route('api.b1.users.destroy', $this->loggedInUserId));

        $this->assertSuccessMessageResponse(
            $response,
            'Default user should not be deleted.'
        );
        $this->assertNotEmpty(User::find($this->loggedInUserId));
    }

    /** @test */
    public function test_can_not_update_default_user_profile()
    {
        $user = factory(User::class)->create(['is_default' => true]);
        $this->actingAs($user);
        $updateRecord = factory(User::class)->make(['id' => $user->id]);

        $response = $this->postJson(route('api.b1.users.update-user-profile'), $updateRecord->toArray());

        $this->assertSuccessMessageResponse(
            $response,
            'Default user profile should not be updated.'
        );
    }

    /** @test */
    public function it_can_update_user_profile()
    {
        $this->mockRepo(self::$user);

        $user = factory(User::class)->create();
        $this->actingAs($user);
        $updateRecord = factory(User::class)->make(['id' => $user->id]);

        $this->userRepository->expects('update')
            ->with($updateRecord->toArray(), $user->id)
            ->andReturn($updateRecord);

        $response = $this->postJson(route('api.b1.users.update-user-profile'), $updateRecord->toArray());

        $this->assertSuccessDataResponse(
            $response,
            $updateRecord->toArray(),
            'User profile updated successfully.'
        );
    }

    /** @test */
    public function test_can_search_users_records_by_role_name()
    {
        /** @var User $farhan */
        $farhan = factory(User::class)->create();

        /** @var Role $firstRole */
        $firstRole = factory(Role::class)->create(['name' => 'editor']);
        $farhan->roles()->sync([$firstRole->id]);

        /** @var User $vishal */
        $vishal = factory(User::class)->create();

        /** @var Role $secondRole */
        $secondRole = factory(Role::class)->create(['name' => 'manager']);
        $vishal->roles()->sync([$secondRole->id]);

        $response = $this->getJson(route('api.b1.users.index', ['search' => $firstRole->name]));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_can_activate_user()
    {
        /** @var User $user */
        $user = factory(User::class)->create(['is_active' => 0]);

        $response = $this->getJson(route('api.b1.users.update-status', $user->id));

        $this->assertSuccessDataResponse($response, $user->fresh()->toArray(), 'User updated successfully.');
        $this->assertTrue($user->fresh()->is_active);
    }

    /** @test */
    public function test_can_de_activate_user()
    {
        /** @var User $user */
        $user = factory(User::class)->create(['is_active' => 1]);

        $response = $this->getJson(route('api.b1.users.update-status', $user->id));

        $this->assertSuccessDataResponse($response, $user->fresh()->toArray(), 'User updated successfully.');
        $this->assertFalse($user->fresh()->is_active);
    }

    /** @test */
    public function test_can_get_details_of_logged_in_user()
    {
        $response = $this->get(route('api.b1.users.user-details'));

        $this->assertNotEmpty($response);
        $this->assertEquals($this->loggedInUserId, $response->original['data']->id);
    }

    /** @test */
    public function test_can_remove_given_user_image()
    {
        $user = factory(User::class)->create(['image' => 'image.jpg']);

        $response = $this->postJson(route('api.b1.users.remove-image', $user->id));

        $this->assertSuccessMessageResponse($response, 'User image removed successfully.');
        $this->assertEmpty($user->fresh()->image);
    }
}
