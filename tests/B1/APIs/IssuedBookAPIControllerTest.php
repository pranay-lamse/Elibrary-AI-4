<?php

namespace Tests\B1\APIs;

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

    public function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_issued_books()
    {
        $this->mockRepo(self::$issuedBook);

        /** @var IssuedBook[] $issuedBooks */
        $issuedBooks = factory(IssuedBook::class, 5)->create();

        $this->issuedBookRepository->shouldReceive('all')->twice()->andReturn($issuedBooks);

        $response = $this->getJson(route('api.b1.books-history'));

        $this->assertSuccessMessageResponse($response, 'Issued Books retrieved successfully.');
    }

    /** @test */
    public function test_can_update_issued_book_status()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_ISSUED]);
        $input = [
            'book_item_id' => $issuedBook->book_item_id,
            'status'       => IssuedBook::STATUS_LOST,
        ];

        $response = $this->putJson(route('api.b1.update-issued-book-status', $issuedBook->book_item_id), $input);

        $this->assertSuccessDataResponse(
            $response,
            $issuedBook->fresh()->toArray(),
            'Issued Book status updated successfully.'
        );

        $this->assertEquals(IssuedBook::STATUS_LOST, $issuedBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_LOST, $issuedBook->bookItem->status);
    }

    /** @test */
    public function test_can_get_book_history()
    {
        /** @var IssuedBook[] $IssuedBooks */
        $IssuedBooks = factory(IssuedBook::class, 5)->create();

        $response = $this->getJson(route('api.b1.books-history'));
        $take3 = $this->getJson(route('api.b1.books-history', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.books-history', ['skip' => 2, 'limit' => 2]));

        $this->assertCount(15, $response->original['data']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(15, $response->original['totalRecords']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'ABC']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $book2 = factory(Book::class)->create(['name' => 'ZYX']);
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $responseAsc = $this->getJson(route('api.b1.books-history', [
            'order_by'  => 'name',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books-history', [
            'order_by'  => 'name',
            'direction' => 'desc',
        ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($book1->name, $responseAsc[0]['book_item']['book']['name']);
        $this->assertEquals($book2->name, $responseDesc[0]['book_item']['book']['name']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_book_code()
    {
        $bookItem1 = factory(BookItem::class)->create(['book_code' => '0000156']);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'ZAD587RE']);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $responseAsc = $this->getJson(route('api.b1.books-history', [
            'order_by'  => 'book_code',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books-history', [
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
    public function test_can_sort_issued_book_records_by_member_name()
    {
        $member1 = factory(Member::class)->create(['first_name' => 'AROUND']);
        $issuedBook1 = factory(IssuedBook::class)->create(['member_id' => $member1->id]);

        $member2 = factory(Member::class)->create(['first_name' => 'gdf']);
        $issuedBook2 = factory(IssuedBook::class)->create(['member_id' => $member2->id]);

        $responseAsc = $this->getJson(route('api.b1.books-history', [
            'order_by'  => 'member_name',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books-history', [
            'order_by'  => 'member_name',
            'direction' => 'desc',
        ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($member1->first_name, $responseAsc[0]['member']['first_name']);
        $this->assertEquals($member2->first_name, $responseDesc[0]['member']['first_name']);
    }

    /** @test */
    public function test_can_sort_issued_book_records_by_reserve_on()
    {
        $reservedOn = null;
        $reservedFutureDate = date('Y-m-d H:i:s', strtotime('+15 days'));
        $firstIssuedBook = factory(IssuedBook::class)->create(['reserve_date' => $reservedOn]);
        $secondIssueBook = factory(IssuedBook::class)->create(['reserve_date' => $reservedFutureDate]);

        $responseAsc = $this->getJson(route('api.b1.books-history', [
            'order_by'  => 'reserved_on',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books-history', [
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
        $issuedBook1 = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_ISSUED]);
        $issuedBook2 = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RESERVED]);

        $responseIssued = $this->getJson(route('api.b1.books-history', [
            'search'    => 'issued',
            'direction' => 'asc',
        ]
        ));
        $responseReserved = $this->getJson(route('api.b1.books-history', [
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
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => Carbon::now(),
            'return_due_date' => $returnDueDate,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create();

        $response = $this->getJson(route('api.b1.books-history', ['due_date' => $returnDueDate]));

        $response = $response->original['data'];
        $this->assertCount(1, $response);
        $this->assertEquals($returnDueDate, Carbon::parse($response[0]['return_due_date'])->toDateString());
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => 'Laravel']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $book2 = factory(Book::class)->create();
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $response = $this->getJson(route('api.b1.books-history', ['search' => $book1->name]));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_can_search_issued_book_records_by_book_code()
    {
        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'XRTD6y45U']);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'IRE6484O']);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $response = $this->getJson(route('api.b1.books-history', ['search' => $bookItem1->book_code]));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function it_can_issue_book()
    {
        $this->mockRepo(self::$issuedBook);

        /** @var Member $member */
        $member = factory(Member::class)->create();

        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $input = ['member_id' => $member->id, 'book_item_id' => $bookItem->id];

        $issueBook = factory(IssuedBook::class)->make([
            'member_id'    => $member->id,
            'book_item_id' => $bookItem->id,
        ]);

        $this->issuedBookRepository->expects('issueBook')
            ->with($input)
            ->andReturn($issueBook);

        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), $input);

        $this->assertSuccessMessageResponse($response, 'Book issued successfully.');
        $this->assertEquals($issueBook->member_id, $response->original['data']['member_id']);
        $this->assertEquals($issueBook->book_item_id, $response->original['data']['book_item_id']);
    }

    /** @test */
    public function it_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $this->assertArrayHasKey('id', $response->original['data']);
        $issuedBook = IssuedBook::ofMember($member->id)->first();

        $this->assertSuccessMessageResponse($response, 'Book reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $issuedBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function it_can_un_reserve_book()
    {
        /** @var IssuedBook $issueBook */
        $issueBook = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_RESERVED]);

        $response = $this->postJson(route('api.b1.un-reserve-book', $issueBook->book_item_id), [
            'member_id' => $issueBook->member_id,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book un-reserved successfully.');
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $issueBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $issueBook->bookItem->status);
    }

    /** @test */
    public function it_can_return_book()
    {
        $this->mockRepo(self::$issuedBook);

        /** @var IssuedBook $issueBook */
        $issueBook = factory(IssuedBook::class)->create();

        $this->issuedBookRepository->expects('returnBook')
            ->with(['book_item_id' => $issueBook->book_item_id])
            ->andReturn($issueBook);

        $response = $this->postJson(route('api.b1.return-book', $issueBook->book_item_id), [
            'book_item_id' => $issueBook->book_item_id,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book return successfully.');
        $this->assertEquals($issueBook->book_item_id, $response->original['data']['book_item_id']);
    }

    /** @test */
    public function it_can_retrieve_issue_book()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create();

        $response = $this->getJson(route('api.b1.issued-book.show', $issuedBook->id));

        $this->assertSuccessMessageResponse($response, 'Issued Book retrieved successfully.');
        $this->assertEquals($issuedBook->id, $response->original['data']['id']);
    }

    /** @test */
    public function test_can_get_all_issued_books_of_given_member()
    {
        $this->mockRepo(self::$issuedBook);

        /** @var Member $member */
        $member = factory(Member::class)->create();

        /** @var IssuedBook[] $issuedBooks */
        $issuedBooks = factory(IssuedBook::class, 5)->create(['member_id' => $member->id]);

        $this->issuedBookRepository->expects('all')->andReturn($issuedBooks);

        $response = $this->getJson(route('api.b1.members.book-history', $member->id));

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
        $this->assertCount(5, $response->original['data']);

        $totalRecords = $response->original['totalRecords'];
        $this->assertEquals(5, $totalRecords);
    }

    /** @test */
    public function test_can_sort_member_issued_book_records_by_book_name()
    {
        /** @var Member $meember */
        $member = factory(Member::class)->create();

        $book1 = factory(Book::class)->create(['name' => 'ABC']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $member->id,
        ]);

        $book2 = factory(Book::class)->create(['name' => 'ZYX']);
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $member->id,
        ]);

        factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $responseAsc = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'order_by'  => 'name',
            'direction' => 'asc',
        ]));

        $responseDesc = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'order_by'  => 'name',
            'direction' => 'desc',
        ]));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertCount(2, $responseAsc);
        $this->assertCount(2, $responseDesc);
        $this->assertEquals($book1->name, $responseAsc[0]['book_item']['book']['name']);
        $this->assertEquals($book2->name, $responseDesc[0]['book_item']['book']['name']);
    }

    /** @test */
    public function test_can_sort_member_issued_book_record_by_book_code()
    {
        /** @var Member $meember */
        $member = factory(Member::class)->create();

        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'AB1234XYZ']);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $member->id,
        ]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'ZAD587RE']);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
            'member_id'    => $member->id,
        ]);

        factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $responseAsc = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'order_by'  => 'book_code',
            'direction' => 'asc',
        ]));
        $responseDesc = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'order_by'  => 'book_code',
            'direction' => 'desc',
        ]));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertCount(2, $responseAsc);
        $this->assertCount(2, $responseDesc);
        $this->assertEquals($bookItem1->book_code, $responseAsc[0]['book_item']['book_code']);
        $this->assertEquals($bookItem2->book_code, $responseDesc[0]['book_item']['book_code']);
    }

    /** @test */
    public function test_can_search_member_issued_book_records_by_status()
    {
        /** @var Member $meember */
        $member = factory(Member::class)->create();

        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_ISSUED,
            'member_id' => $member->id,
        ]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'status'    => IssuedBook::STATUS_RESERVED,
            'member_id' => $member->id,
        ]);
        factory(IssuedBook::class)->create([
            'status' => IssuedBook::STATUS_ISSUED,
        ]);

        $responseIssued = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'search'    => 'issued',
            'direction' => 'asc',
        ]));

        $responseReserved = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'search'    => 'reserved',
            'direction' => 'desc',
        ]));

        $responseIssued = $responseIssued->original['data'];
        $responseReserved = $responseReserved->original['data'];
        $this->assertCount(1, $responseIssued);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $responseIssued[0]['status']);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $responseReserved[0]['status']);
    }

    /** @test */
    public function test_can_search_member_issued_book_records_by_book_name()
    {
        /** @var Member $meember */
        $member = factory(Member::class)->create();

        $book1 = factory(Book::class)->create(['name' => 'Laravel']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $member->id,
        ]);

        $book2 = factory(Book::class)->create();
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem2->id,
        ]);

        $response = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'search' => $book1->name,
        ]));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_can_search_member_issued_book_records_by_book_code()
    {
        /** @var Member $meember */
        $member = factory(Member::class)->create();

        $bookItem1 = factory(BookItem::class)->create(['book_code' => 'XRTD6y45U']);
        $issuedBook1 = factory(IssuedBook::class)->create([
            'book_item_id' => $bookItem1->id,
            'member_id'    => $member->id,
        ]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'IRE6484O']);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $response = $this->getJson(route('api.b1.members.book-history', [
            $member->id,
            'search' => $bookItem1->book_code,
        ]));

        $response = $response->original['data'];
        $this->assertTrue(count($response) > 0);
    }

    /** @test */
    public function test_existing_allotment_record_replaced_when_book_is_reserve_from_un_reserve_status_by_same_member()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $response = $this->postJson(route('api.b1.un-reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $issueBookRecords = IssuedBook::ofMember($member->id)->get();
        $this->assertCount(1, $issueBookRecords);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_existing_allotment_record_replaced_when_book_is_issued_from_un_reserve_status_by_same_member()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $response = $this->postJson(route('api.b1.un-reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $issueBookRecords = IssuedBook::ofMember($member->id)->get();
        $this->assertCount(1, $issueBookRecords);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_new_allotment_record_added_when_book_is_reserved_from_un_reserved_status_by_different_member()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member1 = factory(Member::class)->create();
        $member2 = factory(Member::class)->create();

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member1->id,
        ]);

        $response = $this->postJson(route('api.b1.un-reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member1->id,
        ]);

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member2->id,
        ]);

        $issueBookRecords = IssuedBook::all();
        $this->assertCount(12, $issueBookRecords);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_new_allotment_record_added_when_book_is_issued_from_un_reserved_status_by_different_member()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member1 = factory(Member::class)->create();
        $member2 = factory(Member::class)->create();

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member1->id,
        ]);

        $response = $this->postJson(route('api.b1.un-reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member1->id,
        ]);

        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member2->id,
        ]);

        $issueBookRecords = IssuedBook::all();
        $this->assertCount(12, $issueBookRecords);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_existing_allotment_record_replaced_when_book_is_issued_from_reserved_status_by_same_member()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        /** @var Member $member */
        $member = factory(Member::class)->create();

        $response = $this->postJson(route('api.b1.reserve-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $issueBookRecords = IssuedBook::all();
        $this->assertCount(11, $issueBookRecords);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /** @test */
    public function test_member_not_allow_to_issue_books_more_then_library_limit()
    {
        $member = factory(Member::class)->create();

        for ($i = 0; $i <= 4; $i++) {
            /** @var BookItem $bookItem */
            $bookItem = factory(BookItem::class)->create();

            $this->postJson(route('api.b1.issue-book', $bookItem->id), [
                'book_item_id' => $bookItem->id,
                'member_id'    => $member->id,
            ]);
        }

        $bookItem = factory(BookItem::class)->create();
        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), [
            'book_item_id' => $bookItem->id,
            'member_id'    => $member->id,
        ]);

        $this->assertExceptionMessage($response, 'Your issued books limit is exceed.');
    }
}
