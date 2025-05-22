<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookSeries;
use App\Models\SeriesBook;
use App\Repositories\BookSeriesRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookSeriesRepositoryTest.
 */
class BookSeriesRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var BookSeriesRepository */
    protected $bookSeriesRepo;

    private $defaultUserId = 1;

    protected function setUp(): void
    {
        parent::setUp();

        $this->bookSeriesRepo = app(BookSeriesRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_book_series()
    {
        /** @var BookSeries[] $bookSeries */
        $bookSeries = BookSeries::factory()->count(5)->create();

        $allBookSeries = $this->bookSeriesRepo->all();
        $take3 = $this->bookSeriesRepo->all([], null, 3);
        $skip2 = $this->bookSeriesRepo->all([], 4, 4);

        $this->assertCount(7, $allBookSeries);
        $this->assertCount(3, $take3);
        $this->assertCount(3, $skip2);
    }

    /** @test
     */
    public function it_can_store_book_series()
    {
        $fakeBookSeries = BookSeries::factory()->raw();

        $bookResult = $this->bookSeriesRepo->store($fakeBookSeries);

        $this->assertArrayHasKey('id', $bookResult);
        $this->assertEquals($fakeBookSeries['title'], $bookResult->title);
    }

    /** @test */
    public function it_can_update_book_series()
    {
        $bookSeries = BookSeries::factory()->create();
        $fakeBookSeries = BookSeries::factory()->raw();

        $bookSeries = $this->bookSeriesRepo->update($fakeBookSeries, $bookSeries->id);

        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertEquals($fakeBookSeries['title'], $bookSeries->title);
    }

    /** @test */
    public function test_can_create_book_series_with_series_items()
    {
        /** @var Book $book */
        $book = Book::factory()->create();
        $fakeBookSeries = BookSeries::factory()->raw();

        $fakeBookSeries['series_items'][] = ['book_id' => $book->id, 'sequence' => 1];
        $fakeBookSeries['series_items'][] = ['book_id' => $book->id, 'sequence' => 2];

        $bookSeries = $this->bookSeriesRepo->store($fakeBookSeries);

        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertCount(2, $bookSeries->seriesItems);
    }

    /** @test */
    public function test_can_update_book_series_with_series_items()
    {
        $bookSeries = BookSeries::factory()->create()->toArray();
        $seriesItem = SeriesBook::factory()->create(['series_id' => $bookSeries['id']])->toArray();
        $bookSeries['series_items'][] = array_merge($seriesItem, ['sequence' => 5]);

        $bookSeries = $this->bookSeriesRepo->update($bookSeries, $bookSeries['id']);
        $this->assertArrayHasKey('id', $bookSeries);
        $this->assertCount(1, $bookSeries->seriesItems);
        $this->assertEquals(5, $bookSeries->seriesItems[0]->sequence);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage BookSeries not found.
     */
    public function test_not_allow_to_update_non_existing_book_series()
    {
        $bookSeries = BookSeries::factory()->raw();

        $this->bookSeriesRepo->update($bookSeries, 999);
    }
}
