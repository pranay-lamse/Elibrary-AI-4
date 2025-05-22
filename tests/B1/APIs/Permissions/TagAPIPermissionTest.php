<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Tag;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class TagAPIPermissionTest
 */
class TagAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_tags_without_permission()
    {
        $response = $this->getJson(route('api.b1.tags.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_tag_without_permission()
    {
        $fakeTag = Tag::factory()->raw();

        $response = $this->postJson(route('api.b1.tags.store'), $fakeTag);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_tag_without_permission()
    {
        $tag = Tag::factory()->create();
        $updateTag = Tag::factory()->raw(['id' => $tag->id]);

        $response = $this->putJson(route('api.b1.tags.update', $tag->id), $updateTag);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_tag_without_permission()
    {
        $tag = Tag::factory()->create();

        $response = $this->deleteJson(route('api.b1.tags.destroy', $tag->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_tags_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_tags']);
        $response = $this->getJson(route('api.b1.tags.index'));

        $this->assertSuccessMessageResponse($response, 'Tags retrieved successfully.');
    }

    /** @test */
    public function test_can_create_tag_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_tags']);
        $fakeTag = Tag::factory()->raw();

        $response = $this->postJson(route('api.b1.tags.store'), $fakeTag);

        $this->assertSuccessMessageResponse($response, 'Tag saved successfully.');
    }

    /** @test */
    public function test_can_update_tag_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_tags']);
        $tag = Tag::factory()->create();
        $updateTag = Tag::factory()->raw(['id' => $tag->id]);

        $response = $this->putJson(route('api.b1.tags.update', $tag->id), $updateTag);

        $this->assertSuccessMessageResponse($response, 'Tag updated successfully.');
    }

    /** @test */
    public function test_can_delete_tag_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_tags']);
        $tag = Tag::factory()->create();

        $response = $this->deleteJson(route('api.b1.tags.destroy', $tag->id));

        $this->assertSuccessMessageResponse($response, 'Tag deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_tag_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_tags']);
        $tag = Tag::factory()->create();

        $response = $this->getJson(route('api.b1.tags.show', $tag->id));

        $this->assertSuccessMessageResponse($response, 'Tag retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_tag_without_permission()
    {
        $tag = Tag::factory()->create();

        $response = $this->get(route('api.b1.tags.show', $tag->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
