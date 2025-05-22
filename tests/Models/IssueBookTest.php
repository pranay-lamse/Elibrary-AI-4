<?php

namespace Tests\Models;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\Models\Setting;
use App\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class IssueBookTest
 */
class IssueBookTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function it_can_get_issue_books_of_given_member()
    {
        $ankit = Member::factory()->create();
        $vishal = Member::factory()->create();

        $book1 = IssuedBook::factory()->create(['member_id' => $ankit->id]);
        $book2 = IssuedBook::factory()->create(['member_id' => $vishal->id]);

        $issuedBooks = IssuedBook::ofMember($ankit->id)->get();
        $this->assertCount(1, $issuedBooks);

        $firstIssuedBooks = $issuedBooks->first();
        $this->assertEquals($book1->id, $firstIssuedBooks->id);
        $this->assertEquals($ankit->id, $firstIssuedBooks->member_id);
    }

    /** @test */
    public function it_can_retrieve_only_reserve_books()
    {
        $book1 = IssuedBook::factory()->create(['status' => IssuedBook::STATUS_RESERVED]);
        $book2 = IssuedBook::factory()->create(['status' => IssuedBook::STATUS_RETURNED]);

        $books = IssuedBook::reserve()->get();
        $this->assertCount(4, $books);

        /** @var IssuedBook $firstBook */
        $firstBook = $books->first();
        $this->assertEquals(IssuedBook::STATUS_RESERVED, $firstBook->status);
    }

    /** @test */
    public function it_can_get_issue_books_of_given_book_item()
    {
        $bookItem1 = BookItem::factory()->create();
        $bookItem2 = BookItem::factory()->create();

        $book1 = IssuedBook::factory()->create(['book_item_id' => $bookItem1->id]);
        $book2 = IssuedBook::factory()->create(['book_item_id' => $bookItem2->id]);

        $issuedBooks = IssuedBook::ofBookItem($bookItem1->id)->get();
        $this->assertCount(1, $issuedBooks);

        $firstIssuedBooks = $issuedBooks->first();
        $this->assertEquals($book1->id, $firstIssuedBooks->id);
        $this->assertEquals($bookItem1->id, $firstIssuedBooks->book_item_id);
    }

    /** @test */
    public function it_can_get_last_issued_book()
    {
        $book1 = IssuedBook::factory()->create(['status' => IssuedBook::STATUS_RETURNED]);
        $book2 = IssuedBook::factory()->create(['status' => IssuedBook::STATUS_ISSUED]);

        $issuedBooks = IssuedBook::lastIssuedBook()->latest()->get();
        $this->assertCount(9, $issuedBooks);
        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issuedBooks[0]->status);
    }

    /** @test */
    public function test_issue_due_date_should_be_calculated_from_its_setting()
    {
        $now = Carbon::now();
        $issueBook = IssuedBook::factory()->create([
            'status'       => IssuedBook::STATUS_RESERVED,
            'reserve_date' => $now,
        ]
        );

        $issueBook = IssuedBook::findOrFail($issueBook->id);

        $this->assertEquals($issueBook->issue_due_date, $now->addDays(5), 'Default due days 5');
    }

    /** @test */
    public function test_check_expected_available_date_for_reserved_book()
    {
        $now = Carbon::now();
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::factory()->create([
            'status'       => IssuedBook::STATUS_RESERVED,
            'reserve_date' => $now,
        ]
        );

        $date = $issueBook->getExpectedAvailableDate($issueBook);

        $this->assertEquals($date, $now->addDays(15)->toDateTimeString(), 'Default return due days 15');
    }

    /** @test */
    public function test_check_expected_available_date_for_issued_book()
    {
        $returnDueDate = Carbon::now()->addDays(15);
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::factory()->create([
            'status'          => IssuedBook::STATUS_ISSUED,
            'return_due_date' => $returnDueDate,
        ]);

        $this->assertEquals($issueBook->return_due_date, $returnDueDate);
    }

    /** @test */
    public function test_can_get_status_from_string()
    {
        $status = IssuedBook::getStatusFromString('issued');

        $this->assertEquals(IssuedBook::STATUS_ISSUED, $status);
    }

    /** @test */
    public function test_return_issue_due_date()
    {
        $now = Carbon::now();
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::factory()->create([
            'status'       => IssuedBook::STATUS_RESERVED,
            'reserve_date' => $now,
        ]
        );

        $issueBook = IssuedBook::findOrFail($issueBook->id);

        $this->assertNotEmpty($issueBook->issue_due_date);
        $reserveDueDays = getSettingValueByKey(Setting::RESERVE_DUE_DAYS);
        $issueDueDate = Carbon::parse($now)->addDays($reserveDueDays)->toDateTimeString();
        $this->assertEquals($issueDueDate, $issueBook->issue_due_date);
    }

    /** @test */
    public function test_return_expected_available_date_for_issued_book()
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::factory()->create(['status' => IssuedBook::STATUS_ISSUED]);

        $expectedDate = $issueBook->getExpectedAvailableDate($issueBook);

        $this->assertEquals(IssuedBook::STATUS_ISSUED, $issueBook->status);
        $this->assertEquals($issueBook->return_due_date, $expectedDate);
    }

    /** @test */
    public function test_return_book_issuer_name()
    {
        /** @var User $user */
        $user = User::factory()->create();
        $issueBook = IssuedBook::factory()->create([
            'status'    => IssuedBook::STATUS_ISSUED,
            'issuer_id' => $user->id,
        ]);

        $issueBook = IssuedBook::latest()->first();

        $this->assertNotEmpty($issueBook->issuer_name);
        $this->assertEquals($user->first_name.' '.$user->last_name, $issueBook->issuer_name);
    }

    /** @test */
    public function test_return_book_returner_name()
    {
        /** @var User $user */
        $user = User::factory()->create();
        $issueBook = IssuedBook::factory()->create([
            'status'      => IssuedBook::STATUS_ISSUED,
            'returner_id' => $user->id,
        ]);

        $issueBook = IssuedBook::latest()->first();

        $this->assertNotEmpty($issueBook->returner_name);
        $this->assertEquals($user->first_name.' '.$user->last_name, $issueBook->returner_name);
    }
}
