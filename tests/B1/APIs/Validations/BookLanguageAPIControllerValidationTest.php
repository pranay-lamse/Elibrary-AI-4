<?php

namespace Tests\B1\APIs\Validations;

use App\Models\BookLanguage;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookLanguageAPIControllerValidationTest
 */
class BookLanguageAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_book_language_fails_when_language_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.book-languages.store'), ['language_name' => '']);

        $this->assertExceptionMessage($response, 'The language name field is required.');
    }

    /** @test */
    public function test_create_book_language_fails_when_language_name_is_duplicate()
    {
        $bookLanguage = BookLanguage::factory()->create();

        $response = $this->postJson(route('api.b1.book-languages.store'), [
            'language_name' => $bookLanguage->language_name,
        ]);

        $this->assertExceptionMessage($response, 'The language name has already been taken.');
    }

    /** @test */
    public function test_create_book_language_fails_when_language_code_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.book-languages.store'), [
            'language_name' => $this->faker->name,
            'language_code' => '',
        ]);

        $this->assertExceptionMessage($response, 'The language code field is required.');
    }

    /** @test */
    public function test_create_book_language_fails_when_language_code_is_duplicate()
    {
        $bookLanguage = BookLanguage::factory()->create();

        $response = $this->postJson(route('api.b1.book-languages.store'), [
            'language_name' => $this->faker->name,
            'language_code' => $bookLanguage->language_code,
        ]);

        $this->assertExceptionMessage($response, 'The language code has already been taken.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_name_is_not_passed()
    {
        $bookLanguage = BookLanguage::factory()->create();

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage->id), [
            'language_name' => '',
        ]);

        $this->assertExceptionMessage($response, 'The language name field is required.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_name_is_duplicate()
    {
        $bookLanguage1 = BookLanguage::factory()->create();
        $bookLanguage2 = BookLanguage::factory()->create();

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage2->id), [
            'language_name' => $bookLanguage1->language_name,
        ]);

        $this->assertExceptionMessage($response, 'The language name has already been taken.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_code_is_not_passed()
    {
        $bookLanguage = BookLanguage::factory()->create();

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage->id), [
            'language_name' => $this->faker->name,
            'language_code' => '',
        ]);

        $this->assertExceptionMessage($response, 'The language code field is required.');
    }

    /** @test */
    public function test_update_book_language_fails_when_language_code_is_duplicate()
    {
        $bookLanguage1 = BookLanguage::factory()->create();
        $bookLanguage2 = BookLanguage::factory()->create();

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage2->id),
            ['language_name' => $this->faker->name, 'language_code' => $bookLanguage1->language_code]
        );

        $this->assertExceptionMessage($response, 'The language code has already been taken.');
    }

    /** @test */
    public function it_can_store_book_language()
    {
        $fakeBookLanguage = BookLanguage::factory()->raw();

        $response = $this->postJson(route('api.b1.book-languages.store'), $fakeBookLanguage);

        $this->assertSuccessMessageResponse($response, 'Book Language saved successfully.');
        $this->assertNotEmpty(BookLanguage::where('language_name', $fakeBookLanguage['language_name'])->first());
    }

    /** @test */
    public function it_can_update_book_language()
    {
        $bookLanguage = BookLanguage::factory()->create();
        $fakeBookLanguage = BookLanguage::factory()->raw();

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage->id), $fakeBookLanguage);

        $this->assertSuccessMessageResponse($response, 'Book Language updated successfully.');
        $this->assertEquals($fakeBookLanguage['language_name'], $bookLanguage->fresh()->language_name);
    }
}
