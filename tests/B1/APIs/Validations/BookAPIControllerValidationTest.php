<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Book;
use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookAPIControllerValidationTest
 */
class BookAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_fails_when_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.books.store'), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_book_fails_when_name_is_duplicate()
    {
        $book = Book::factory()->create();

        $response = $this->postJson(route('api.b1.books.store'), ['name' => $book->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_create_book_fails_when_isbn_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.books.store'), ['name' => $this->faker->name, 'isbn' => '']);

        $this->assertExceptionMessage($response, 'The isbn field is required.');
    }

    /** @test */
    public function test_create_book_fails_when_isbn_is_duplicate()
    {
        $isbn = Book::factory()->create();

        $response = $this->postJson(route('api.b1.books.store'), [
            'name' => $this->faker->name,
            'isbn' => $isbn->isbn,
        ]
        );

        $this->assertExceptionMessage($response, 'The isbn has already been taken.');
    }

    /** @test */
    public function test_create_book_fails_when_genres_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.books.store'), [
            'name'   => $this->faker->name,
            'isbn'   => $this->faker->isbn13,
            'genres' => [],
        ]
        );

        $this->assertExceptionMessage($response, 'The genres field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_name_is_not_passed()
    {
        $book = Book::factory()->create();

        $response = $this->putJson(route('api.b1.books.update', $book->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_isbn_is_not_passed()
    {
        $book = Book::factory()->create();

        $response = $this->putJson(route('api.b1.books.update', $book->id), [
            'name' => $this->faker->name,
            'isbn' => '',
        ]);

        $this->assertExceptionMessage($response, 'The isbn field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_genres_is_not_passed()
    {
        $book = Book::factory()->create();

        $response = $this->postJson(route('api.b1.books.update', $book->id), [
            'name'   => $this->faker->name,
            'isbn'   => $this->faker->isbn13,
            'genres' => [],
        ]);

        $this->assertExceptionMessage($response, 'The genres field is required.');
    }

    /** @test */
    public function test_update_book_fails_when_name_is_duplicate()
    {
        $book1 = Book::factory()->create();
        $book2 = Book::factory()->create();

        $response = $this->putJson(route('api.b1.books.update', $book2->id), ['name' => $book1->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_book_fails_when_isbn_is_duplicate()
    {
        $book1 = Book::factory()->create();
        $book2 = Book::factory()->create();

        $response = $this->putJson(route('api.b1.books.update', $book2->id), [
            'name' => $this->faker->name,
            'isbn' => $book1->isbn,
        ]);

        $this->assertExceptionMessage($response, 'The isbn has already been taken.');
    }

    /** @test */
    public function it_can_store_book()
    {
        $response = $this->postJson(route('api.b1.books.store'), $this->prepareBookInputs());

        $this->assertSuccessMessageResponse($response, 'Book saved successfully.');
    }

    /** @test */
    public function it_can_update_book()
    {
        /** @var Book $book */
        $book = Book::factory()->create();

        $response = $this->putJson(route('api.b1.books.update', $book->id), $this->prepareBookInputs());

        $this->assertSuccessMessageResponse($response, 'Book updated successfully.');
    }

    /**
     * @param array $input
     *
     * @return array
     */
    public function prepareBookInputs($input = [])
    {
        $genre = Genre::factory()->create();

        return array_merge([
            'name'   => $this->faker->name,
            'isbn'   => $this->faker->isbn10,
            'genres' => [$genre->id],
        ], $input);
    }
}
