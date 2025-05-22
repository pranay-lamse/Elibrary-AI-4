<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\BookRequest;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookRequestAPIPermissionTest
 */
class BookRequestAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_book_requests_without_permission()
    {
        $response = $this->getJson(route('api.b1.book-requests.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_book_request_status_without_permission()
    {
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status', [$bookRequest->id, 1]));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_book_requests_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_requests']);

        $response = $this->getJson(route('api.b1.book-requests.index'));

        $this->assertSuccessMessageResponse($response, 'Requested books retrieved successfully.');
    }

    /** @test */
    public function test_can_update_book_request_status_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_book_requests']);
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::APPROVED])
        );

        $this->assertSuccessMessageResponse($response, 'Book request status updated successfully.');
    }
}
