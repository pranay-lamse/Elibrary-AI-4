<?php

namespace Tests\V1\APIs\Validations;

use App\Models\BookItem;
use App\Models\IssuedBook;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class IssuedBookAPIControllerValidationTest
 */
class IssuedBookAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function test_can_get_all_book_history()
    {
        $issuedBook = IssuedBook::factory()->count(5)->create([
            'member_id' => $this->loggedInMemberId,
        ]);

        $response = $this->getJson(route('api.v1.books-history.index'));

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
        $this->assertCount(5, $response->original['data']);
    }

    /** @test */
    public function test_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = BookItem::factory()->create();

        $reserveBook = $this->postJson(route('api.v1.reserve-book', $bookItem->id));

        $this->assertSuccessMessageResponse($reserveBook, 'Book reserved successfully.');
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_can_un_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = BookItem::factory()->create();

        $reserveBook = $this->postJson(route('api.v1.reserve-book', $bookItem->id));
        $unReserveBook = $this->postJson(route('api.v1.un-reserve-book', $bookItem->id));

        $this->assertSuccessMessageResponse($unReserveBook, 'Book un-reserved successfully.');
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $bookItem->fresh()->status);
    }
}
