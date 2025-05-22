<?php

namespace Tests\B1\APIs;

use App\Models\BookSeries;
use App\Models\SeriesBook;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class BookSeriesAPIControllerTest
 */
class BookSeriesAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_book_series()
    {
        $this->mockRepo(self::$bookSeries);

        /** @var BookSeries[] $bookSeries */
        $bookSeries = BookSeries::factory()->count(5)->create();

        $this->bookSeriesRepository->shouldReceive('all')->twice()->andReturn($bookSeries);

        $response = $this->getJson(route('api.b1.book-series.index'));

        $this->assertSuccessDataResponse(
            $response,
            $bookSeries->toArray(),
            'Book Series retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_book_series()
    {
        /** @var BookSeries[] $bookSeries */
        $bookSeries = BookSeries::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.book-series.index'));
        $take3 = $this->getJson(route('api.b1.book-series.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.book-series.index', ['skip' => 2, 'limit' => 2]));
        $searchByTitle = $this->getJson(route('api.b1.book-series.index', [
            'search' => $bookSeries[0]->title,
        ]
        ));

        $this->assertCount(7, $response->original['data']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByTitle->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 7);
    }

    /** @test */
    public function it_can_store_book_series()
    {
        $this->mockRepo(self::$bookSeries);

        /** @var BookSeries $bookSeries */
        $bookSeries = BookSeries::factory()->make();

        $this->bookSeriesRepository->expects('store')
            ->with($bookSeries->toArray())
            ->andReturn($bookSeries);

        $response = $this->postJson(route('api.b1.book-series.store'), $bookSeries->toArray());

        $this->assertSuccessDataResponse($response, $bookSeries->toArray(), 'Book Series saved successfully.');
    }

    /** @test */
    public function it_can_update_book_series()
    {
        $this->mockRepo(self::$bookSeries);

        /** @var BookSeries $bookSeries */
        $bookSeries = BookSeries::factory()->create();
        $fakeBookSeries = BookSeries::factory()->make(['id' => $bookSeries->id]);

        $this->bookSeriesRepository->expects('update')
            ->with($fakeBookSeries->toArray(), $bookSeries->id)
            ->andReturn($fakeBookSeries);

        $response = $this->putJson(route('api.b1.book-series.update', $bookSeries->id),
            $fakeBookSeries->toArray()
        );

        $this->assertSuccessDataResponse(
            $response,
            $fakeBookSeries->toArray(),
            'Book Series updated successfully.'
        );
    }

    /** @test */
    public function test_can_not_update_default_book_series()
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->create(['is_default' => true]);
        $fakeBookSeries = factory(BookSeries::class)->make(['id' => $bookSeries->id]);

        $response = $this->putJson(route('api.b1.book-series.update', $bookSeries->id),
            $fakeBookSeries->toArray()
        );

        $this->assertSuccessMessageResponse(
            $response,
            'Default book series should not be updated.'
        );
        $this->assertEquals($bookSeries->title, BookSeries::find($bookSeries->id)->title);
    }


    /** @test */
    public function it_can_retrieve_book_series_with_series_book_items()
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = BookSeries::factory()->create();
        $seriesBook = SeriesBook::factory()->create(['series_id' => $bookSeries->id]);

        $response = $this->getJson(route('api.b1.book-series.show', $bookSeries->id));

        $this->assertSuccessDataResponse(
            $response,
            $bookSeries->toArray(),
            'Book Series retrieved successfully.'
        );

        $this->assertEquals($seriesBook->id, $response->original['data']['series_items'][0]['id']);
    }

    /** @test */
    public function it_can_delete_book_series()
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = BookSeries::factory()->create();

        $response = $this->deleteJson(route('api.b1.book-series.destroy', $bookSeries->id));

        $this->assertSuccessDataResponse(
            $response,
            $bookSeries->toArray(),
            'Book Series deleted successfully.'
        );
        $this->assertEmpty(BookSeries::find($bookSeries->id));
    }

    /** @test */
    public function test_can_not_delete_default_series()
    {
        /** @var BookSeries $bookSeries */
        $bookSeries = factory(BookSeries::class)->create(['is_default' => true]);

        $response = $this->deleteJson(route('api.b1.book-series.destroy', $bookSeries->id));

        $this->assertSuccessMessageResponse(
            $response,
            'Default book series should not be deleted.'
        );
        $this->assertNotEmpty(BookSeries::find($bookSeries->id));
    }
}
