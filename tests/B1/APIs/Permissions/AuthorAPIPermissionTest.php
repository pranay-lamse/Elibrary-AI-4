<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Author;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class AuthorAPIPermissionTest
 */
class AuthorAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_authors_without_permission()
    {
        $result = $this->getJson(route('api.b1.authors.index'));

        $this->assertExceptionMessage($result, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_author_without_permission()
    {
        $fakeAuthor = Author::factory()->raw();

        $result = $this->postJson(route('api.b1.authors.store'), $fakeAuthor);

        $this->assertExceptionMessage($result, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_author_without_permission()
    {
        $author = Author::factory()->create();
        $updateAuthor = Author::factory()->raw(['id' => $author->id]);

        $result = $this->putJson(route('api.b1.authors.update', $author->id), $updateAuthor);

        $this->assertExceptionMessage($result, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_author_without_permission()
    {
        $author = Author::factory()->create();

        $result = $this->deleteJson(route('api.b1.authors.destroy', $author->id));

        $this->assertExceptionMessage($result, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_authors_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_authors']);

        $result = $this->getJson(route('api.b1.authors.index'));

        $this->assertSuccessMessageResponse($result, 'Authors retrieved successfully.');
    }

    /** @test */
    public function test_can_create_author_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_authors']);
        $fakeAuthor = Author::factory()->raw();

        $result = $this->postJson(route('api.b1.authors.store'), $fakeAuthor);

        $this->assertSuccessMessageResponse($result, 'Author saved successfully.');
    }

    /** @test */
    public function test_can_update_author_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_authors']);
        $author = Author::factory()->create();
        $updateAuthor = Author::factory()->raw(['id' => $author->id]);

        $result = $this->putJson(route('api.b1.authors.update', $author->id), $updateAuthor);

        $this->assertSuccessMessageResponse($result, 'Author updated successfully.');
    }

    /** @test */
    public function test_can_delete_author_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_authors']);
        $author = Author::factory()->create();

        $result = $this->deleteJson(route('api.b1.authors.destroy', $author->id));

        $this->assertSuccessMessageResponse($result, 'Author deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_author_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_authors']);
        $author = Author::factory()->create();

        $response = $this->getJson(route('api.b1.authors.show', $author->id));

        $this->assertSuccessMessageResponse($response, 'Author retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_author_without_permission()
    {
        $author = Author::factory()->create();

        $response = $this->get(route('api.b1.authors.show', $author->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
