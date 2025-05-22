<?php

namespace Tests\B1\APIs;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookItem;
use App\Models\Genre;
use App\Models\Tag;
use Arr;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class BookAPIControllerTest
 */
class BookAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_books()
    {
        $this->mockRepo(self::$book);

        /** @var Book[] $books */
        $books = Book::factory()->count(5)->create();

        $this->bookRepository->shouldReceive('all')->twice()->andReturn($books);

        $response = $this->getJson(route('api.b1.books.index'));

        $this->assertSuccessDataResponse(
            $response,
            $books->toArray(),
            'Books retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_books()
    {
        /** @var Book[] $books */
        $books = Book::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.books.index'));
        $take3 = $this->getJson(route('api.b1.books.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.books.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.books.index', ['search' => $books[0]->name]));

        $this->assertCount(24, $response->original['data']);
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(24, $response->original['totalRecords']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 5);
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function test_can_sort_books_records_by_author_name()
    {
        $author1 = Author::factory()->create(['first_name' => 'ABC']);
        $book1 = Book::factory()->create();
        $author1->books()->sync([$book1->id]);

        $author2 = Author::factory()->create(['first_name' => 'ZYX']);
        $book2 = Book::factory()->create();
        $author2->books()->sync([$book2->id]);

        $responseAsc = $this->getJson(route('api.b1.books.index', [
            'order_by'  => 'author_name',
            'direction' => 'asc',
        ]
        ));
        $responseDesc = $this->getJson(route('api.b1.books.index', [
            'order_by'  => 'author_name',
            'direction' => 'desc',
        ]
        ));

        $responseAsc = $responseAsc->original['data'];
        $responseDesc = $responseDesc->original['data'];
        $this->assertEquals($author1->first_name, $responseAsc[0]['authors'][0]['first_name']);
        $this->assertEquals($author2->first_name, $responseDesc[0]['authors'][0]['first_name']);
    }

    /** @test */
    public function it_can_store_book()
    {
        $this->mockRepo(self::$book);

        $genre = Genre::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->make(['genres' => [$genre->id]]);

        $this->bookRepository->expects('store')
            ->with($book->toArray())
            ->andReturn($book);

        $response = $this->postJson(route('api.b1.books.store'), $book->toArray());

        $this->assertSuccessDataResponse($response, $book->toArray(), 'Book saved successfully.');
    }

    /** @test */
    public function test_can_store_book_items_to_given_book()
    {
        /** @var Book $book */
        $book = Book::factory()->create();
        $bookItems = BookItem::factory()->count(2)->raw();

        $response = $this->postJson(route('api.b1.books.add-items', $book->id), ['items' => $bookItems]);

        $this->assertSuccessDataResponse($response, $book->toArray(), 'Book items added successfully.');
        $this->assertCount(2, $book->fresh()->items);
    }

    /** @test */
    public function it_can_update_book()
    {
        $this->mockRepo(self::$book);

        $genre = Genre::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->create();
        $fakeBook = Book::factory()->make([
            'id'     => $book->id,
            'genres' => [$genre->id],
        ]);

        $this->bookRepository->expects('update')
            ->with($fakeBook->toArray(), $book->id)
            ->andReturn($fakeBook);

        $response = $this->putJson(route('api.b1.books.update', $book->id), $fakeBook->toArray());

        $this->assertSuccessDataResponse(
            $response, $fakeBook->toArray(), 'Book updated successfully.'
        );
    }

    /** @test */
    public function it_can_retrieve_book()
    {
        $genre = Genre::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->create();
        $book->genres()->sync([$genre->id]);

        $response = $this->getJson(route('api.b1.books.show', $book->id));

        $this->assertSuccessDataResponse($response, $book->fresh()->toArray(), 'Book retrieved successfully.');
        $this->assertNotEmpty($book->genres);
    }

    /** @test */
    public function it_can_delete_book()
    {
        /** @var Book $book */
        $book = Book::factory()->create();

        $response = $this->deleteJson(route('api.b1.books.destroy', $book->id));

        $this->assertSuccessDataResponse($response, $book->toArray(), 'Book deleted successfully.');
        $this->assertEmpty(Book::find($book->id));
    }

    /** @test */
    public function test_can_not_delete_default_book()
    {
        $response = $this->deleteJson(route('api.b1.books.destroy', 1));

        $this->assertSuccessMessageResponse($response, 'Default book should not be deleted.');
        $this->assertNotEmpty(Book::find(1));
    }

    /** @test */
    public function test_unable_to_delete_book_when_it_has_one_or_more_book_items()
    {
        /** @var BookItem $bookItem */
        $bookItem = BookItem::factory()->create();

        $response = $this->deleteJson(route('api.b1.books.destroy', $bookItem->book_id));

        $this->assertExceptionMessage($response, 'Book can not be delete, it is has one or more book items.');
    }

    /** @test */
    public function test_can_create_book()
    {
        $genre = Genre::factory()->create();
        $tag = Tag::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->make(['genres' => [$genre->id], 'tags' => [$tag->id]]);

        $response = $this->postJson(route('api.b1.books.store'), $book->toArray());

        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
        $book = $response->original['data'];
        $this->assertArrayHasKey('id', $book);
        $this->assertCount(1, $book['genres']);
        $this->assertCount(1, $book['tags']);
    }

    /** @test */
    public function test_can_create_genres_on_the_fly_while_creating_book()
    {
        $genre = Genre::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->make(['genres' => ["$genre->id", 'Genre Name']]);

        $response = $this->postJson(route('api.b1.books.store'), $book->toArray());

        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
        $book = $response->original['data'];
        $this->assertArrayHasKey('id', $book);
        $this->assertCount(2, $book['genres']);
        $this->assertContains($genre->name, Arr::pluck($book['genres'], 'name'));
    }

    /** @test */
    public function test_can_create_tags_on_the_fly_while_creating_book()
    {
        $genre = Genre::factory()->create();
        $tag = Tag::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->make(['genres' => [$genre->id], 'tags' => ["$tag->id", 'Tag Name']]);

        $response = $this->postJson(route('api.b1.books.store'), $book->toArray());

        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
        $book = $response->original['data'];
        $this->assertArrayHasKey('id', $book);
        $this->assertCount(2, $book['tags']);
        $this->assertContains($tag->name, Arr::pluck($book['tags'], 'name'));
    }

    /** @test */
    public function test_can_create_authors_on_the_fly_while_creating_book()
    {
        $genre = Genre::factory()->create();
        $author = Author::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->make(['genres' => [$genre->id], 'authors' => ["$author->id", 'Vishal']]);

        $response = $this->postJson(route('api.b1.books.store'), $book->toArray());

        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
        $book = $response->original['data'];
        $this->assertArrayHasKey('id', $book);
        $this->assertCount(2, $book['authors']);
        $this->assertContains($author->first_name, Arr::pluck($book['authors'], 'first_name'));
    }

    /** @test */
    public function test_can_update_book()
    {
        $genre = Genre::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->create();
        $updateBook = Book::factory()->raw(['id' => $book->id, 'genres' => [$genre->id]]);

        $response = $this->postJson(route('api.b1.books.update', $book->id), $updateBook);

        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
        $this->assertCount(1, $response->original['data']['genres']);
    }

    /** @test */
    public function test_can_not_update_default_book()
    {
        $genre = factory(Genre::class)->create();
        $book = Book::first();
        $updateBook = factory(Book::class)->raw(['id' => $book->id, 'genres' => [$genre->id]]);

        $response = $this->postJson(route('api.b1.books.update', $book->id), $updateBook);

        $this->assertSuccessMessageResponse($response, 'Default book should not be updated.');
        $this->assertEquals($book->name, Book::find($book->id)->name);
    }

    /** @test */
    public function test_can_create_genres_on_the_fly_while_updating_book()
    {
        $genre = Genre::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->create();
        $updateBook = Book::factory()->raw(['id' => $book->id, 'genres' => [$genre->id, 'Genre Name']]);

        $response = $this->putJson(route('api.b1.books.update', $book->id), $updateBook);

        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
        $this->assertCount(2, $response->original['data']['genres']);
    }

    /** @test */
    public function test_can_create_tags_on_the_fly_while_updating_book()
    {
        $genre = Genre::factory()->create();
        $tag = Tag::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->create();
        $updateBook = Book::factory()->raw([
            'id'     => $book->id,
            'genres' => [$genre->id],
            'tags'   => [$tag->id, 'Tag Name'],
        ]);

        $response = $this->putJson(route('api.b1.books.update', $book->id), $updateBook);

        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
        $this->assertCount(2, $response->original['data']['tags']);
    }

    /** @test */
    public function test_can_create_authors_on_the_fly_while_updating_book()
    {
        $genre = Genre::factory()->create();
        $author = Author::factory()->create();
        /** @var Book $book */
        $book = Book::factory()->create();
        $updateBook = Book::factory()->raw([
            'id'      => $book->id,
            'genres'  => [$genre->id],
            'authors' => [$author->id, 'Vishal'],
        ]);

        $response = $this->putJson(route('api.b1.books.update', $book->id), $updateBook);

        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
        $updateBook = $response->original['data'];
        $this->assertCount(2, $updateBook['authors']);
    }
}
