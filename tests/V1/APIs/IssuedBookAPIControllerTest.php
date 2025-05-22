<?php

namespace Tests\V1\APIs;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class IssuedBookAPIControllerTest
 */
class IssuedBookAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function test_can_get_all_book_history()
    {
        $this->mockRepo(self::$issuedBook);

        $member = Member::factory()->create();
        /** @var IssuedBook $issuedBook */
        $issuedBook = IssuedBook::factory()->count(5)->create(['member_id' => $member->id]);

        $this->issuedBookRepository->shouldReceive('all')->twice()->andReturn($issuedBook);

        $response = $this->getJson(route('api.v1.books-history.index'));

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
    }

    /** @test */
    public function test_can_get_book_history()
    {
        /** @var IssuedBook[] $IssuedBooks */
        $IssuedBooks = IssuedBook::factory()->count(5)->create(['member_id' => $this->loggedInMemberId]);

        IssuedBook::factory(); // of another member

        $response = $this->getJson(route('api.v1.books-history.index'));
        $take3 = $this->getJson(route('api.v1.books-history.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.v1.books-history.index', ['skip' => 2, 'limit' => 2]));

        $totalRecords = $response->original['totalRecords'];
        $response = $response->original['data'];
        $this->assertCount(5, $response);
        $this->assertContains($this->loggedInMemberId, \Arr::pluck($response, 'member_id'));

        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(15, $totalRecords);
    }

    /** @test */
    public function it_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = BookItem::factory()->create();
        $response = $this->postJson(route('api.v1.reserve-book', $bookItem->id),
            ['book_item_id' => $bookItem->id]);

        $issuedBook = IssuedBook::ofMember($this->loggedInMemberId)->first();
        $this->assertSuccessMessageResponse($response, 'Book reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $issuedBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $issuedBook->bookItem->status);
    }

    /** @test */
    public function it_can_un_reserve_book()
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::factory()->create([
            'status'    => IssuedBook::STATUS_RESERVED,
            'member_id' => $this->loggedInMemberId,
        ]);

        $response = $this->postJson(route('api.v1.un-reserve-book', $issueBook->book_item_id), [
            'member_id' => $this->loggedInMemberId,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book un-reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $issueBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $issueBook->bookItem->status);
        $this->assertEquals($this->loggedInMemberId, $issueBook->member_id);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_name()
    {
        $book1 = Book::factory()->create(['name' => 'ABC']);
        $bookItem1 = BookItem::factory()->create(['book_id' => $book1->id]);
        $issuedBook1 = IssuedBook::factory()->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $book2 = Book::factory()->create(['name' => 'ZYX']);
        $bookItem2 = BookItem::factory()->create(['book_id' => $book2->id]);
        $issuedBook2 = IssuedBook::factory()->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $responseAsc = $this->getJson(route('api.v1.books-history.index',
            ['order_by' => 'name', 'direction' => 'asc']));
        $responseDesc = $this->getJson(route('api.v1.books-history.index',
            ['order_by' => 'name', 'direction' => 'desc']));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($book1->name, $responseAsc[0]['book_item']['book']['name']);
        $this->assertEquals($book2->name, $responseDesc[0]['book_item']['book']['name']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_code()
    {
        $bookItem1 = BookItem::factory()->create(['book_code' => 'ABCD3453']);
        $issuedBook1 = IssuedBook::factory()->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $bookItem2 = BookItem::factory()->create(['book_code' => 'ZWQ34543']);
        $issuedBook2 = IssuedBook::factory()->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $responseAsc = $this->getJson(route('api.v1.books-history.index', [
            'order_by'  => 'book_code',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.v1.books-history.index', [
            'order_by'  => 'book_code',
            'direction' => 'desc',
        ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($bookItem1->book_code, $responseAsc[0]['book_item']['book_code']);
        $this->assertEquals($bookItem2->book_code, $responseDesc[0]['book_item']['book_code']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_reserve_on()
    {
        $reservedOn = date('Y-m-d H:i:s');
        $reservedFutureDate = date('Y-m-d H:i:s', strtotime('+15 days'));
        $firstIssuedBook = IssuedBook::factory()->create([
            'reserve_date' => $reservedOn,
            'member_id'    => $this->loggedInMemberId,
        ]);
        $secondIssueBook = IssuedBook::factory()->create([
            'member_id'    => $this->loggedInMemberId,
            'reserve_date' => $reservedFutureDate,
        ]);

        $responseAsc = $this->getJson(route('api.v1.books-history.index', [
            'order_by'  => 'reserved_on',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.v1.books-history.index', [
            'order_by'  => 'reserved_on',
            'direction' => 'desc',
        ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($reservedOn, $responseAsc[0]['reserve_date']);
        $this->assertEquals($reservedFutureDate, $responseDesc[0]['reserve_date']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_status()
    {
        $issuedBook1 = IssuedBook::factory()->create([
            'status'    => IssuedBook::STATUS_ISSUED,
            'member_id' => $this->loggedInMemberId,
        ]);
        $issuedBook2 = IssuedBook::factory()->create([
            'status'    => IssuedBook::STATUS_RESERVED,
            'member_id' => $this->loggedInMemberId,
        ]);

        $responseIssued = $this->getJson(route('api.v1.books-history.index', [
            'search'    => 'issued',
            'direction' => 'asc',
        ]
        ));
        $responseReserved = $this->getJson(route('api.v1.books-history.index', [
            'search'    => 'reserved',
            'direction' => 'desc',
        ]
        ));
        $responseIssued = $responseIssued->original['data'];
        $responseReserved = $responseReserved->original['data'];
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $responseIssued[0]['status']);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $responseReserved[0]['status']);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_due_date()
    {
        $returnDueDate = Carbon::now()->addDays(15)->toDateString();
        /** @var IssuedBook $issuedBook1 */
        $issuedBook1 = IssuedBook::factory()->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => Carbon::now(),
            'return_due_date' => $returnDueDate,
            'member_id'       => $this->loggedInMemberId,
        ]);
        $issuedBook2 = IssuedBook::factory()->create(['member_id' => $this->loggedInMemberId]);

        $response = $this->getJson(route('api.v1.books-history.index', [
            'due_date' => $returnDueDate,
        ]
        ));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($returnDueDate, Carbon::parse($response[0]['return_due_date'])->toDateString());
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_name()
    {
        $book1 = Book::factory()->create(['name' => 'Be Unique']);
        $bookItem1 = BookItem::factory()->create(['book_id' => $book1->id]);
        $issuedBook1 = IssuedBook::factory()->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $this->loggedInMemberId,
        ]);

        $book2 = Book::factory()->create();
        $bookItem2 = BookItem::factory()->create(['book_id' => $book2->id]);
        $issuedBook2 = IssuedBook::factory()->create([
            'book_item_id' => $bookItem2->id,
        ]);

        $response = $this->getJson(route('api.v1.books-history.index', [
            'search' => $book1->name,
        ]
        ));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_code()
    {
        $bookItem1 = BookItem::factory()->create(['book_code' => 'VISHAL008']);
        $issuedBook1 = IssuedBook::factory()->create(['book_item_id' => $bookItem1->id]);

        $bookItem2 = BookItem::factory()->create(['book_code' => 'MITUL007']);
        $issuedBook2 = IssuedBook::factory()->create(['book_item_id' => $bookItem2->id]);

        $response = $this->getJson(route('api.v1.books-history.index', [
            'search' => $bookItem1->book_code,
        ]
        ));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_member_name()
    {
        $member1 = Member::factory()->create(['first_name' => 'Jhon']);
        $issuedBook1 = IssuedBook::factory()->create(['member_id' => $member1->id]);

        $member2 = Member::factory()->create(['first_name' => 'Steve']);
        $issuedBook2 = IssuedBook::factory()->create(['member_id' => $member2->id]);

        $response = $this->getJson(route('api.v1.books-history.index', [
            'search' => $member1->first_name,
        ]
        ));
        $searchByLastName = $this->getJson(route('api.v1.books-history.index', [
            'search' => $member1->last_name,
        ]
        ));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_member_not_allow_to_reserve_books_more_then_library_limit()
    {
        $member = Member::factory()->create();

        for ($i = 0; $i <= 4; $i++) {
            /** @var BookItem $bookItem */
            $bookItem = BookItem::factory()->create();

            $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
                'book_item_id' => $bookItem->id,
                'member_id'    => $member->id,
            ]);
        }

        $bookItem = BookItem::factory()->create();
        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $this->assertExceptionMessage($response, 'Your reserve books limit is exceed.');
    }
}
