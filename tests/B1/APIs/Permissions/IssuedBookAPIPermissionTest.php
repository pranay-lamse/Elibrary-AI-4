<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\BookItem;
use App\Models\IssuedBook;
use App\Models\Member;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class IssuedBookAPIPermissionTest
 */
class IssuedBookAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        /** @var User loggedInUserId */
        $this->loggedInUserId = User::factory()->create();
        $token = $this->loggedInUserId->createToken('admin_token')->plainTextToken;
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_issue_book_without_permission()
    {
        $member = Member::factory()->create();
        $bookItem = BookItem::factory()->create();
        $input = ['member_id' => $member->id, 'book_item_id' => $bookItem->id];

        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), $input);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_issue_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['issue_books']);

        /** @var Member $member */
        $member = Member::factory()->create();

        /** @var BookItem $bookItem */
        $bookItem = BookItem::factory()->create();
        $input = ['member_id' => $member->id, 'book_item_id' => $bookItem->id];

        $response = $this->postJson(route('api.b1.issue-book', $bookItem->id), $input);

        $this->assertSuccessMessageResponse($response, 'Book issued successfully.');
    }

    /** @test */
    public function test_not_allow_to_return_book_without_permission()
    {
        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::factory()->create();

        $response = $this->postJson(route('api.b1.return-book', $issueBook->book_item_id), [
            'book_item_id' => $issueBook->book_item_id,
        ]);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_return_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['issue_books']);

        /** @var IssuedBook $issueBook */
        $issueBook = IssuedBook::factory()->create(['status' => IssuedBook::STATUS_ISSUED]);

        $response = $this->postJson(route('api.b1.return-book', $issueBook->book_item_id), [
            'book_item_id' => $issueBook->book_item_id, 'member_id' => $issueBook->member_id,
        ]);

        $this->assertSuccessMessageResponse($response, 'Book return successfully.');
    }

    /** @test */
    public function test_not_allow_to_get_book_history_without_permission()
    {
        $response = $this->getJson(route('api.b1.books-history'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_book_history_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['issue_books']);

        $response = $this->getJson(route('api.b1.books-history'));

        $this->assertSuccessMessageResponse($response, 'Issued Books retrieved successfully.');
    }

    /** @test */
    public function test_not_allow_to_get_issued_book_without_permission()
    {
        /** @var IssuedBook $issuedBook */
        $issuedBook = IssuedBook::factory()->create();

        $response = $this->getJson(route('api.b1.issued-book.show', $issuedBook->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_issued_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['issue_books']);

        /** @var IssuedBook $issuedBook */
        $issuedBook = IssuedBook::factory()->create();

        $response = $this->getJson(route('api.b1.issued-book.show', $issuedBook->id));

        $this->assertSuccessMessageResponse($response, 'Issued Book retrieved successfully.');
    }
}
