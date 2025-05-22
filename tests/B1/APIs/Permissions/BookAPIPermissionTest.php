<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Book;
use App\Models\BookItem;
use App\Models\Genre;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookAPIPermissionTest
 */
class BookAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_books_without_permission()
    {
        $response = $this->getJson(route('api.b1.books.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_create_book_without_permission()
    {
        $fakeBook = Book::factory()->raw();

        $response = $this->postJson(route('api.b1.books.store'), $fakeBook);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_book_without_permission()
    {
        $book = Book::factory()->create();
        $updateBook = Book::factory()->raw(['id' => $book->id]);

        $response = $this->putJson(route('api.b1.books.update', $book->id), $updateBook);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_book_without_permission()
    {
        $book = Book::factory()->create();

        $response = $this->deleteJson(route('api.b1.books.destroy', $book->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_books_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);

        $response = $this->getJson(route('api.b1.books.index'));

        $this->assertSuccessMessageResponse($response, 'Books retrieved successfully.');
    }

    /** @test */
    public function test_can_create_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);
        $genre = Genre::factory()->create();
        $fakeBook = Book::factory()->raw(['genres' => [$genre->id]]);

        $response = $this->postJson(route('api.b1.books.store'), $fakeBook);

        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
    }

    /** @test */
    public function test_can_update_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);
        $book = Book::factory()->create();
        $genre = Genre::factory()->create();
        $updateBook = Book::factory()->raw(['id' => $book->id, 'genres' => [$genre->id]]);

        $response = $this->putJson(route('api.b1.books.update', $book->id), $updateBook);

        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
    }

    /** @test */
    public function test_can_delete_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);
        $book = Book::factory()->create();

        $response = $this->deleteJson(route('api.b1.books.destroy', $book->id));

        $this->assertSuccessMessageResponse($response, 'Book deleted successfully.');
    }

    /** @test */
    public function test_unable_to_add_book_items_without_permission()
    {
        $items = BookItem::factory()->count(2)->raw();

        $response = $this->postJson(route('api.b1.books.add-items', 1), ['items' => $items]);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_add_items_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);
        $book = Book::factory()->create();
        $items = BookItem::factory()->count(2)->raw();

        $response = $this->postJson(route('api.b1.books.add-items', $book->id), ['items' => $items]);

        $this->assertSuccessMessageResponse($response, 'Book items added successfully.');
    }

    /** @test */
    public function test_not_allow_to_get_available_book_items_without_permission()
    {
        $book = Book::factory()->create();

        $response = $this->getJson(route('api.b1.books.available-books', $book->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_available_book_items_without_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);
        $items = BookItem::factory()->count(2)->create();

        $response = $this->getJson(route('api.b1.books.available-books', [$items[0]->book->id, 'member_id' => 1]));

        $this->assertSuccessMessageResponse($response, 'Books history retrieved successfully.');
    }

    /** @test */
    public function test_not_allow_to_update_book_status_without_permission()
    {
        $item = BookItem::factory()->create();

        $response = $this->putJson(route('api.b1.books.update-book-status', $item->id),
            ['status' => BookItem::STATUS_LOST]
        );

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_update_book_status_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);
        $item = BookItem::factory()->create();

        $response = $this->putJson(route('api.b1.books.update-book-status', $item->id),
            ['status' => BookItem::STATUS_LOST]
        );

        $this->assertSuccessMessageResponse($response, 'Book status updated successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_book_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_books']);
        $book = Book::factory()->create();

        $response = $this->getJson(route('api.b1.books.show', $book->id));

        $this->assertSuccessMessageResponse($response, 'Book retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_book_without_permission()
    {
        $book = Book::factory()->create();

        $response = $this->get(route('api.b1.books.show', $book->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
