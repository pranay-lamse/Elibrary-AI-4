<?php

namespace Tests\B1\APIs;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class DashboardAPIControllerTest
 */
class DashboardAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_counts_of_total_books()
    {
        $books = Book::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(24, $response['total_books']);
    }

    /** @test */
    public function test_can_get_count_of_total_reserved_books()
    {
        $reservedBooks = IssuedBook::factory()->count(7)->create(['status' => IssuedBook::STATUS_RESERVED]);
        $issuedBooks = IssuedBook::factory()->count(2)->create(['status' => IssuedBook::STATUS_ISSUED]);

        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(10, $response['total_reserved_books']);
    }

    /** @test */
    public function test_can_get_count_of_total_issued_books()
    {
        $reservedBooks = IssuedBook::factory()->count(3)->create(['status' => IssuedBook::STATUS_RESERVED]);
        $issuedBooks = IssuedBook::factory()->count(2)->create(['status' => IssuedBook::STATUS_ISSUED]);

        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(5, $response['total_issued_books']);
    }

    /** @test */
    public function test_can_get_count_of_total_available_books()
    {
        BookItem::factory()->count(3)->create(['status' => BookItem::STATUS_NOT_AVAILABLE]);
        BookItem::factory()->count(2)->create(['status' => BookItem::STATUS_AVAILABLE]);

        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(14, $response['total_available_books']);
    }

    /** @test */
    public function test_can_get_total_overdue_books_count()
    {
        IssuedBook::factory()->count(3)->create([
            'status' => IssuedBook::STATUS_ISSUED,
        ]);

        IssuedBook::factory()->count(3)->create([
            'status' => IssuedBook::STATUS_RETURNED,
        ]);

        $this->mockTime(Carbon::now()->addMonths(3));
        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(6, $response['total_overdue_books']);
    }

    /** @test */
    public function test_can_get_total_members_count()
    {
        Member::factory()->count(3)->create();

        $response = $this->getJson(route('api.b1.dashboard-details'));

        $this->assertSuccessMessageResponse($response, 'Dashboard details retrieved successfully.');
        $response = $response->original['data'];
        $this->assertEquals(6, $response['total_members']);
    }
}
