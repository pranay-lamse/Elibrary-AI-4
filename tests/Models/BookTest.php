<?php

namespace Tests\Models;

use App\Models\Author;
use App\Models\Book;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookTest
 */
class BookTest extends TestCase
{
    use DatabaseTransactions;

    /** @test */
    public function test_return_book_authors_name()
    {
        $author1 = Author::factory()->create();
        $author2 = Author::factory()->create();

        $book = Book::factory()->create();
        $author1->books()->sync([$book->id]);
        $author2->books()->sync([$book->id]);

        $book = Book::latest()->first();

        $this->assertNotEmpty($book->authors_name);
        $this->assertEquals($author1->first_name.','.$author2->first_name, $book->authors_name);
    }

    /** @test */
    public function test_return_book_image_path()
    {
        $book = Book::factory()->create(['image' => $this->faker->imageUrl()]);

        $book = Book::first();

        $this->assertNotEmpty($book->image_path);
    }
}
