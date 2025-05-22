<?php

namespace Tests\B1\APIs\Validations;

use App\Models\BookSeries;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookSeriesAPIControllerValidationTest
 */
class BookSeriesAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_series_fails_when_title_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.book-series.store'), ['title' => '']);

        $this->assertExceptionMessage($response, 'The title field is required.');
    }

    /** @test */
    public function test_create_book_series_fails_when_title_is_duplicate()
    {
        $bookSeries = BookSeries::factory()->create();

        $response = $this->postJson(route('api.b1.book-series.store'), ['title' => $bookSeries->title]);

        $this->assertExceptionMessage($response, 'The title has already been taken.');
    }

    /** @test */
    public function test_update_book_series_fails_when_title_is_not_passed()
    {
        $bookSeries = BookSeries::factory()->create();

        $response = $this->putJson(route('api.b1.book-series.update', $bookSeries->id), ['title' => '']);

        $this->assertExceptionMessage($response, 'The title field is required.');
    }

    /** @test */
    public function it_can_store_book_series()
    {
        $fakeBookSeries = BookSeries::factory()->raw();
        $response = $this->postJson(route('api.b1.book-series.store'), $fakeBookSeries);

        $this->assertSuccessMessageResponse($response, 'Book Series saved successfully.');
        $this->assertNotEmpty(BookSeries::where('title', $fakeBookSeries['title'])->first());
    }

    /** @test */
    public function it_can_update_book_series()
    {
        $bookSeries = BookSeries::factory()->create();
        $fakeBookSeries = BookSeries::factory()->raw();

        $response = $this->putJson(route('api.b1.book-series.update', $bookSeries->id), $fakeBookSeries);

        $this->assertSuccessMessageResponse($response, 'Book Series updated successfully.');
        $this->assertEquals($fakeBookSeries['title'], $bookSeries->fresh()->title);
    }
}
