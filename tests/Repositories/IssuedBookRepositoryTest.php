<?php

namespace Tests\Repositories;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Models\Setting;
use App\Repositories\IssuedBookRepository;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class IssuedBookRepositoryTest.
 */
class IssuedBookRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var IssuedBookRepository */
    protected $issuedBookRepo;

    public function setUp(): void
    {
        parent::setUp();
        $this->issuedBookRepo = app(IssuedBookRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_sort_issued_book_by_book_name()
    {
        $book1 = factory(Book::class)->create(['name' => '00001212']);
        $bookItem1 = factory(BookItem::class)->create(['book_id' => $book1->id]);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $book2 = factory(Book::class)->create(['name' => 'ZYX']);
        $bookItem2 = factory(BookItem::class)->create(['book_id' => $book2->id]);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $resultAsc = $this->issuedBookRepo->all(['order_by' => 'name', 'direction' => 'asc']);
        $resultDesc = $this->issuedBookRepo->all(['order_by' => 'name', 'direction' => 'desc']);

        $this->assertCount(12, $resultAsc);
        $this->assertCount(12, $resultDesc);
        $this->assertEquals($book1->id, $resultAsc[0]->bookItem->book->id);
        $this->assertEquals($book2->id, $resultDesc[0]->bookItem->book->id);
    }

    /** @test */
    public function test_can_sort_issued_book_by_book_code()
    {
        $bookItem1 = factory(BookItem::class)->create(['book_code' => '000000']);
        $issuedBook1 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem1->id]);

        $bookItem2 = factory(BookItem::class)->create(['book_code' => 'ZERO']);
        $issuedBook2 = factory(IssuedBook::class)->create(['book_item_id' => $bookItem2->id]);

        $resultAsc = $this->issuedBookRepo->all(['order_by' => 'book_code', 'direction' => 'asc']);
        $resultDesc = $this->issuedBookRepo->all(['order_by' => 'book_code', 'direction' => 'desc']);

        $this->assertEquals($bookItem1->id, $resultAsc[0]->bookItem->id);
        $this->assertEquals($bookItem2->id, $resultDesc[0]->bookItem->id);
    }

    /** @test */
    public function test_can_search_issue_book_by_status()
    {
        $reserveBookItem = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_ISSUED]);
        $unReserveBookItem = factory(IssuedBook::class)->create(['status' => IssuedBook::STATUS_UN_RESERVED]);

        $issuedBooks = $this->issuedBookRepo->all(['search' => 'issued']);
        $unReserveBooks = $this->issuedBookRepo->all(['search' => 'unreserved']);

        $this->assertCount(4, $issuedBooks);
        $this->assertCount(2, $unReserveBooks);
        $this->assertEquals($reserveBookItem->id, $issuedBooks[0]->id);
        $this->assertEquals($unReserveBookItem->id, $unReserveBooks[0]->id);
    }

    /** @test */
    public function test_can_search_issue_book_by_return_due_date()
    {
        $returnDueDate = Carbon::now()->addDays(15)->toDateString();
        /** @var IssuedBook $issuedBook1 */
        $issuedBook1 = factory(IssuedBook::class)->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'issued_on'       => Carbon::now(),
            'return_due_date' => $returnDueDate,
        ]);

        $issuedBook2 = factory(IssuedBook::class)->create();

        $issuedBooks = $this->issuedBookRepo->all(['due_date' => $returnDueDate]);

        $this->assertCount(1, $issuedBooks);
        $this->assertEquals($issuedBook1->id, $issuedBooks[0]->id);
    }

    /** @test */
    public function test_member_can_issue_book()
    {
        /** @var Member $member */
        $member = factory(Member::class)->create();

        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $input = ['member_id' => $member->id, 'book_item_id' => $bookItem->id];

        $issuedBook = $this->issuedBookRepo->issueBook($input);
        $returnDueDate = Carbon::now()->addDays(getSettingValueByKey(Setting::RETURN_DUE_DAYS));

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issuedBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
        $this->assertEquals($returnDueDate, $issuedBook->return_due_date);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Issue date must be less or equal to today's date.
     */
    public function test_unable_to_issue_book_when_issue_date_is_greater_than_today_date()
    {
        $member = factory(Member::class)->create();
        $date = date('Y-m-d h:i:s', strtotime('+2 day'));

        $this->issuedBookRepo->issueBook(['issued_on' => $date, 'member_id' => $member->id]);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage BookItem not found.
     */
    public function test_unable_to_issue_book_with_non_existing_book_item_id()
    {
        $this->issuedBookRepo->issueBook(['book_item_id' => 9999, 'member_id' => 1]);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is already reserved by another member.
     */
    public function test_unable_to_issue_book_when_its_reserved_by_another_member()
    {
        $vishal = factory(Member::class)->create();
        $mitul = factory(Member::class)->create();

        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $reserved = $this->issuedBookRepo->reserveBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
        $issuedBook = $this->issuedBookRepo->issueBook(['book_item_id' => $bookItem->id, 'member_id' => $mitul->id]);
    }

    /**
     * @test
     * @expectedException Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is already issued.
     */
    public function test_unable_to_issue_book_when_its_already_issued()
    {
        $vishal = factory(Member::class)->create();

        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $this->issuedBookRepo->issueBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
        $this->issuedBookRepo->issueBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
    }

    /** @test */
    public function it_can_store_issued_book()
    {
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id, 'status' => IssuedBook::STATUS_ISSUED];

        /** @var IssuedBook $issuedBook */
        $issuedBook = $this->issuedBookRepo->store($input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals($input['book_item_id'], $issuedBook->book_item_id);
        $this->assertEquals($input['member_id'], $issuedBook->member_id);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is not available
     */
    public function test_can_validate_issue_book_data()
    {
        $issuedBook = factory(IssuedBook::class)->create();

        $this->issuedBookRepo->validateBook($issuedBook->toArray());
    }

    /**
     * @test
     */
    public function test_validate_issue_book_data()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $response = $this->issuedBookRepo->validateBook([
            'book_item_id' => $bookItem->id,
        ]);

        $this->assertTrue($response);
    }

    /** @test */
    public function test_member_can_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $reserveBook = $this->issuedBookRepo->reserveBook($input);

        $this->assertArrayHasKey('id', $reserveBook);
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $reserveBook->status);
        $this->assertEquals(BookItem::STATUS_NOT_AVAILABLE, $bookItem->fresh()->status);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is not available
     */
    public function test_unable_to_reserve_book_when_it_is_not_available()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create(['status' => BookItem::STATUS_NOT_AVAILABLE]);
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $this->issuedBookRepo->reserveBook($input);
    }

    /** @test */
    public function test_member_can_return_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $issuedBook = $this->issuedBookRepo->issueBook($input);
        $returnBook = $this->issuedBookRepo->returnBook($input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_RETURNED, $returnBook->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $bookItem->fresh()->status);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book must be issued before returning it.
     */
    public function test_unable_to_return_book_when_it_is_not_issued()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $this->issuedBookRepo->returnBook($input);
    }

    /** @test */
    public function test_member_can_un_reserve_book()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $member = factory(Member::class)->create();
        $input = ['book_item_id' => $bookItem->id, 'member_id' => $member->id];

        $issuedBook = $this->issuedBookRepo->reserveBook($input);
        $returnBook = $this->issuedBookRepo->unReserveBook($bookItem->fresh(), $input);

        $this->assertArrayHasKey('id', $issuedBook);
        $this->assertEquals(IssuedBook::STATUS_UN_RESERVED, $returnBook->status);
        $this->assertEquals(BookItem::STATUS_AVAILABLE, $bookItem->fresh()->status);
    }

    /**
     * @test
     * @expectedException  Illuminate\Validation\UnauthorizedException
     * @expectedExceptionMessage You can un-reserve only your books.
     */
    public function test_member_can_only_un_reserve_their_books()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();
        $vishal = factory(Member::class)->create();
        $mitul = factory(Member::class)->create();

        $issuedBook = $this->issuedBookRepo->reserveBook(['book_item_id' => $bookItem->id, 'member_id' => $vishal->id]);
        $returnBook = $this->issuedBookRepo->unReserveBook($bookItem, [
            'book_item_id' => $bookItem->id,
            'member_id'    => $mitul->id,
        ]
        );
    }

    /** @test */
    public function test_can_update_given_issued_book_status()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = factory(IssuedBook::class)->create();
        $input = [
            'member_id'    => $issuedBook->member_id,
            'book_item_id' => $issuedBook->book_item_id,
            'status'       => IssuedBook::STATUS_LOST,
        ];
        $updatedStatus = $this->issuedBookRepo->updateIssuedBookStatus($input);

        $this->assertEquals(IssuedBook::STATUS_LOST, $issuedBook->fresh()->status);
        $this->assertEquals(BookItem::STATUS_LOST, $issuedBook->bookItem->status);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Invalid status.
     */
    public function test_unable_to_update_invalid_issued_book_status()
    {
        $this->issuedBookRepo->updateIssuedBookStatus(['status' => 10]);
    }

    /**
     * @test
     * @expectedException  Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Book is not issued.
     */
    public function test_not_allow_to_update_issued_book_status_when_book_is_not_issued()
    {
        /** @var BookItem $bookItem */
        $bookItem = factory(BookItem::class)->create();

        $input = ['book_item_id' => $bookItem->id, 'status' => IssuedBook::STATUS_LOST];

        $this->issuedBookRepo->updateIssuedBookStatus($input);
    }
}
