<?php

namespace Tests\V1\APIs\Validations;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookRequestAPIControllerValidationTest
 */
class BookRequestAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function test_not_allow_to_create_book_request_without_book_name()
    {
        $response = $this->postJson(route('api.v1.book-requests.store', ['book_name' => '']));

        $this->assertExceptionMessage($response, 'The book name field is required.');
    }

    /** @test */
    public function test_not_allow_to_create_book_request_without_isbn()
    {
        $response = $this->postJson(route('api.v1.book-requests.store', ['book_name' => 'ABC', 'isbn' => '']));

        $this->assertExceptionMessage($response, 'The isbn field is required.');
    }

    /** @test */
    public function test_not_allow_to_get_non_existing_book_request_details()
    {
        $response = $this->getJson(route('api.v1.book-requests.show', [999]));

        $this->assertExceptionMessage($response, 'BookRequest not found.');
    }

    /** @test */
    public function test_not_allow_to_update_non_existing_book_request()
    {
        $response = $this->putJson(route('api.v1.book-requests.update', [999]));

        $this->assertExceptionMessage($response, 'BookRequest not found.');
    }

    /** @test */
    public function test_not_allow_to_delete_non_existing_book_request()
    {
        $response = $this->deleteJson(route('api.v1.book-requests.destroy', [999]));

        $this->assertExceptionMessage($response, 'BookRequest not found.');
    }
}
