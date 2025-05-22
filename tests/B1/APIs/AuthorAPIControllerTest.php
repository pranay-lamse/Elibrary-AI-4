<?php

namespace Tests\B1\APIs;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class AuthorAPIControllerTest
 */
class AuthorAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function it_can_get_all_authors()
    {
        $this->mockRepo(self::$author);

        $authors = Author::factory()->count(5)->create();

        $this->authorRepository->shouldReceive('all')
            ->twice()
            ->andReturn($authors);

        $response = $this->getJson(route('api.b1.authors.index'));

        $this->assertSuccessDataResponse($response, $authors->toArray(), 'Authors retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_authors()
    {
        /** @var Author[] $authors */
        $authors = Author::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.authors.index'));
        $take3 = $this->getJson(route('api.b1.authors.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.authors.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.authors.index', [
            'search' => $authors[0]->first_name.' '.$authors[0]->last_name,
        ]
        ));

        $this->assertCount(18, $response->original['data'], '10 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(18, $response->original['totalRecords'], '10 defaults');

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 18);
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function it_can_create_author()
    {
        $this->mockRepo(self::$author);

        $author = Author::factory()->make();

        $this->authorRepository->expects('create')
            ->with($author->toArray())
            ->andReturn($author);

        $response = $this->postJson(route('api.b1.authors.store'), $author->toArray());

        $this->assertSuccessDataResponse($response, $author->toArray(), 'Author saved successfully.');
    }

    /** @test */
    public function it_can_update_author()
    {
        $this->mockRepo(self::$author);

        /** @var Author $author */
        $author = Author::factory()->create();
        $updateRecord = Author::factory()->make(['id' => $author->id]);

        $this->authorRepository->expects('update')
            ->with($updateRecord->toArray(), $author->id)
            ->andReturn($updateRecord);

        $response = $this->putJson(route('api.b1.authors.update', $author->id), $updateRecord->toArray());

        $this->assertSuccessDataResponse($response, $updateRecord->toArray(), 'Author updated successfully.');
    }

    /** @test */
    public function test_can_not_update_default_author()
    {
        /** @var Author $author */
        $author = factory(Author::class)->create(['is_default' => true]);
        $updateRecord = factory(Author::class)->make(['id' => $author->id]);

        $response = $this->putJson(route('api.b1.authors.update', $author->id), $updateRecord->toArray());

        $this->assertSuccessMessageResponse($response, 'Default author should not be updated.');
        $this->assertEquals($author->first_name, Author::find($author->id)->first_name);
    }

    /** @test */
    public function it_can_retrieve_author()
    {
        /** @var Author $author */
        $author = Author::factory()->create();

        $response = $this->getJson(route('api.b1.authors.show', $author->id));

        $this->assertSuccessDataResponse($response, $author->toArray(), 'Author retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_author()
    {
        /** @var Author $author */
        $author = Author::factory()->create();

        $response = $this->deleteJson(route('api.b1.authors.destroy', $author->id));

        $this->assertSuccessDataResponse($response, $author->toArray(), 'Author deleted successfully.');
        $this->assertEmpty(Author::find($author->id));
    }

    /** @test */
    public function test_can_not_delete_default_author()
    {
        /** @var Author $author */
        $author = factory(Author::class)->create(['is_default' => true]);

        $response = $this->deleteJson(route('api.b1.authors.destroy', $author->id));

        $this->assertSuccessMessageResponse($response, 'Default author should not be deleted.');
        $this->assertNotEmpty(Author::find($author->id));
    }

    /** @test */
    public function test_unable_to_delete_author_when_author_is_assigned_to_one_or_more_books()
    {
        $book = Book::factory()->create();

        /** @var Author $author */
        $author = Author::factory()->create();
        $book->authors()->sync([$author->id]);

        $response = $this->deleteJson(route('api.b1.authors.destroy', $author->id));

        $this->assertExceptionMessage($response, 'Author can not be delete, it is used in one or more books.');
    }
}
