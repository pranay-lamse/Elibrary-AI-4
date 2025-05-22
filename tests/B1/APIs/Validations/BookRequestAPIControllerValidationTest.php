<?php

namespace Tests\B1\APIs\Validations;

use App\Models\BookRequest;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookRequestAPIControllerValidation
 */
class BookRequestAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_not_update_request_book_status_with_invalid_status()
    {
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
            [$bookRequest->id, 999]
        ));

        $this->assertExceptionMessage($response, 'Invalid status.');
    }
}
