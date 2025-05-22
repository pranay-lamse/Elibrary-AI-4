<?php

namespace Tests\B1\APIs;

use App\Models\BookItem;
use App\Models\Publisher;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class PublisherAPIControllerTest
 */
class PublisherAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_publishers()
    {
        $this->mockRepo(self::$publisher);

        /** @var Publisher[] $publishers */
        $publishers = Publisher::factory()->count(5)->create();

        $this->publisherRepository->shouldReceive('all')->twice()->andReturn($publishers);

        $response = $this->getJson(route('api.b1.publishers.index'));

        $this->assertSuccessDataResponse(
            $response,
            $publishers->toArray(),
            'Publishers retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_publishers()
    {
        /** @var Publisher[] $publishers */
        $publishers = Publisher::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.publishers.index'));
        $take3 = $this->getJson(route('api.b1.publishers.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.publishers.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.publishers.index', ['search' => $publishers[0]->name]));

        $this->assertCount(18, $response->original['data'], '12 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(18, $response->original['totalRecords'], '12 defaults');

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 18,
            'Must return at lease one publisher'
        );
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function it_can_create_publisher()
    {
        $this->mockRepo(self::$publisher);

        /** @var Publisher $publisher */
        $publisher = Publisher::factory()->make();

        $this->publisherRepository->expects('create')
            ->with($publisher->toArray())
            ->andReturn($publisher);

        $response = $this->postJson(route('api.b1.publishers.store'), $publisher->toArray());

        $this->assertSuccessDataResponse($response, $publisher->toArray(), 'Publisher saved successfully.');
    }

    /** @test */
    public function it_can_update_publisher()
    {
        $this->mockRepo(self::$publisher);

        /** @var Publisher $publisher */
        $publisher = Publisher::factory()->create();
        $updateRecord = Publisher::factory()->make(['id' => $publisher->id]);

        $this->publisherRepository->expects('update')
            ->with($updateRecord->toArray(), $publisher->id)
            ->andReturn($updateRecord);

        $response = $this->putJson(route('api.b1.publishers.update', $publisher->id), $updateRecord->toArray());

        $this->assertSuccessDataResponse(
            $response,
            $updateRecord->toArray(),
            'Publisher updated successfully.'
        );
    }

    /** @test */
    public function test_can_retrieve_publisher()
    {
        /** @var Publisher $publisher */
        $publisher = Publisher::factory()->create();

        $response = $this->getJson(route('api.b1.publishers.show', $publisher->id));

        $this->assertSuccessDataResponse($response, $publisher->toArray(), 'Publisher retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_publisher()
    {
        /** @var Publisher $publisher */
        $publisher = Publisher::factory()->create();

        $response = $this->deleteJson(route('api.b1.publishers.destroy', $publisher->id));

        $this->assertSuccessDataResponse($response, $publisher->toArray(), 'Publisher deleted successfully.');
        $this->assertEmpty(Publisher::find($publisher->id));
    }

    /** @test */
    public function test_unable_to_delete_publisher_when_its_used_in_one_or_more_book_items()
    {
        /** @var BookItem $bookItem */
        $bookItem = BookItem::factory()->create();

        $response = $this->deleteJson(route('api.b1.publishers.destroy', $bookItem->publisher_id));

        $this->assertExceptionMessage(
            $response,
            'Publisher can not be delete, it is used in one or more book items.'
        );
    }
}
