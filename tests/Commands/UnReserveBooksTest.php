<?php

namespace Tests\Commands;

use App\Models\BookItem;
use App\Models\Member;
use Artisan;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class UnReserveBooksTest
 */
class UnReserveBooksTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_un_reserve_books_if_its_is_not_reserved_within_due_days()
    {
        $member = Member::factory()->create();
        $bookItems = BookItem::factory()->count(3)->create();

        // two books are reserved
        $response = $this->postJson(route('api.v1.reserve-book', $bookItems[0]->id),
            ['book_item_id' => $bookItems[0]->id, 'member_id' => $member->id]
        );
        $response = $this->postJson(route('api.v1.reserve-book', $bookItems[1]->id),
            ['book_item_id' => $bookItems[1]->id, 'member_id' => $member->id]
        );

        $freeBooks = BookItem::whereStatus(BookItem::STATUS_AVAILABLE)->get();
        $this->assertCount(1, $freeBooks);

        $this->mockTime(Carbon::now()->addDays(6)); // all reserved books are now expired

        // this book should not be free after running this command
        $response = $this->postJson(route('api.v1.reserve-book', $bookItems[2]->id),
            ['book_item_id' => $bookItems[2]->id, 'member_id' => $member->id]
        );

        Artisan::call('lms:un-reserve-books');

        $freeBooks = BookItem::whereStatus(BookItem::STATUS_AVAILABLE)->pluck('id')->toArray();
        $this->assertCount(2, $freeBooks);
        $this->assertNotContains($bookItems[2]->id, $freeBooks);
    }
}
