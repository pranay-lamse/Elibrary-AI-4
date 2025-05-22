<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\BookSeries;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookSeriesAPIPermissionTest
 */
class BookSeriesAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_book_series_without_permission()
    {
        $response = $this->getJson(route('api.b1.book-series.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_book_series_without_permission()
    {
        $fakeBookSeries = BookSeries::factory()->raw();

        $response = $this->postJson(route('api.b1.book-series.store'), $fakeBookSeries);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_book_series_without_permission()
    {
        $bookSeries = BookSeries::factory()->create();
        $updateBookSeries = BookSeries::factory()->raw(['id' => $bookSeries->id]);

        $response = $this->putJson(route('api.b1.book-series.update', $bookSeries->id), $updateBookSeries);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_book_series_without_permission()
    {
        $bookSeries = BookSeries::factory()->create();

        $response = $this->deleteJson(route('api.b1.book-series.destroy', $bookSeries->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_book_series_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $response = $this->getJson(route('api.b1.book-series.index'));

        $this->assertSuccessMessageResponse($response, 'Book Series retrieved successfully.');
    }

    /** @test */
    public function test_can_create_book_series_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $fakeBookSeries = BookSeries::factory()->raw();

        $response = $this->postJson(route('api.b1.book-series.store'), $fakeBookSeries);

        $this->assertSuccessMessageResponse($response, 'Book Series saved successfully.');
    }

    /** @test */
    public function test_can_update_book_series_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $bookSeries = BookSeries::factory()->create();
        $updateBookSeries = BookSeries::factory()->raw(['id' => $bookSeries->id]);

        $response = $this->putJson(route('api.b1.book-series.update', $bookSeries->id), $updateBookSeries);

        $this->assertSuccessMessageResponse($response, 'Book Series updated successfully.');
    }

    /** @test */
    public function test_can_delete_book_series_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $bookSeries = BookSeries::factory()->create();

        $response = $this->deleteJson(route('api.b1.book-series.destroy', $bookSeries->id));

        $this->assertSuccessMessageResponse($response, 'Book Series deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_book_series_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_series']);
        $bookSeries = BookSeries::factory()->create();

        $response = $this->getJson(route('api.b1.book-series.show', $bookSeries->id));

        $this->assertSuccessMessageResponse($response, 'Book Series retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_book_series_without_permission()
    {
        $bookSeries = BookSeries::factory()->create();

        $response = $this->get(route('api.b1.book-series.show', $bookSeries->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
