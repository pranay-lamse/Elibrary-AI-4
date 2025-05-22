<?php

namespace Tests\V1\APIs;

use App\Models\Author;
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
        $this->signInWithMember();
    }

    /** @test */
    public function it_can_get_all_authors()
    {
        $this->mockRepo(self::$author);

        /** @var Author[] $authors */
        $authors = Author::factory()->count(5)->create();

        $this->authorRepository->expects('all')->andReturn($authors);

        $response = $this->getJson(route('api.v1.authors.index'));

        $this->assertSuccessDataResponse($response, $authors->toArray(), 'Authors retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_authors()
    {
        /** @var Author[] $authors */
        $authors = Author::factory()->count(5)->create();

        $response = $this->getJson(route('api.v1.authors.index'));
        $take3 = $this->getJson(route('api.v1.authors.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.v1.authors.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.v1.authors.index', ['search' => $authors[0]->first_name]));

        $this->assertCount(18, $response->original['data'], '13 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 18);
    }
}
