<?php

namespace Tests\B1\APIs;

use App\Models\BookRequest;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class BookRequestAPIControllerTest
 */
class BookRequestAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_admin_can_all_book_requests()
    {
        BookRequest::factory()->count(3)->create();
        BookRequest::factory()->count(2)->create();

        $response = $this->getJson(route('api.b1.book-requests.index'));
        $take = $this->getJson(route('api.b1.book-requests.index', ['limit' => 3]));
        $skip = $this->getJson(route('api.b1.book-requests.index', ['limit' => 3, 'skip' => 7]));

        $this->assertSuccessMessageResponse($response, 'Requested books retrieved successfully.');
        $this->assertCount(9, $response->original['data']);
        $this->assertCount(3, $take->original['data']);
        $this->assertCount(2, $skip->original['data']);
    }

    /** @test */
    public function test_can_get_all_book_requests()
    {
        $this->mockRepo(self::$bookRequest);

        /** @var BookRequest[] $bookRequests */
        $bookRequests = BookRequest::factory()->count(5)->create();

        $this->bookRequestRepository->shouldReceive('all')->twice()->andReturn($bookRequests);

        $response = $this->getJson(route('api.b1.book-requests.index'));

        $this->assertSuccessDataResponse(
            $response, $bookRequests->toArray(), 'Requested books retrieved successfully.'
        );
    }

    /** @test */
    public function test_admin_can_get_book_requests_of_specific_member()
    {
        $bookRequest = BookRequest::factory()->create();
        BookRequest::factory()->count(2)->create();

        $response = $this->getJson(route('api.b1.book-requests.index', ['member_id' => $bookRequest->member_id]));

        $this->assertSuccessMessageResponse($response, 'Requested books retrieved successfully.');
        $this->assertCount(1, $response->original['data']);
    }

    /** @test */
    public function test_admin_can_approve_pending_request_book()
    {
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::APPROVED])
        );

        $this->assertSuccessMessageResponse($response, 'Book request status updated successfully.');
        $this->assertEquals(BookRequest::APPROVED, $bookRequest->fresh()->status);
    }

    /** @test */
    public function test_admin_can_change_request_status_from_approve_to_available()
    {
        $bookRequest = BookRequest::factory()->create(['status' => BookRequest::APPROVED]);

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::CANCELLED])
        );

        $this->assertSuccessMessageResponse($response, 'Book request status updated successfully.');
        $this->assertEquals(BookRequest::CANCELLED, $bookRequest->fresh()->status);
    }

    /** @test */
    public function test_admin_can_change_request_status_from_pending_to_cancelled()
    {
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::AVAILABLE])
        );

        $this->assertSuccessMessageResponse($response, 'Book request status updated successfully.');
        $this->assertEquals(BookRequest::AVAILABLE, $bookRequest->fresh()->status);
    }

    /** @test */
    public function test_not_allow_to_update_book_request_when_request_is_cancelled()
    {
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::AVAILABLE])
        );

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::CANCELLED])
        );

        $this->assertExceptionMessage($response, 'Invalid action.');
    }

    /** @test */
    public function test_not_allow_to_update_book_request_with_invalid_action()
    {
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::CANCELLED])
        );

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::APPROVED])
        );

        $this->assertExceptionMessage($response, 'Invalid action.');
    }

    /** @test */
    public function test_not_allow_to_update_book_request_with_same_status_twice()
    {
        $bookRequest = BookRequest::factory()->create();

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::PENDING])
        );

        $response = $this->putJson(route('api.b1.book-requests.update-status',
                [$bookRequest->id, BookRequest::PENDING])
        );

        $this->assertExceptionMessage($response, 'Book request is already Pending.');
    }

    /** @test */
    public function test_can_return_requested_books_count_from_isbn_number()
    {
        $bookRequest = BookRequest::factory()->create();
        BookRequest::factory()->create(['isbn' => $bookRequest->isbn]);

        $response = $this->getJson(route('api.b1.book-requests.index'));

        $this->assertEquals(2, $response->original['data'][0]['request_count']);
    }

    /** @test */
    public function test_book_requests_sort_by_book_name()
    {
        $bookRequest1 = BookRequest::factory()->create(['book_name' => 'ABCDE']);
        $bookRequest2 = BookRequest::factory()->create(['book_name' => 'ZDZDZD']);

        $responseDesc = $this->getJson(route('api.b1.book-requests.index',
                ['order_by' => 'book_name', 'direction' => 'desc'])
        );
        $responseAsc = $this->getJson(route('api.b1.book-requests.index',
                ['order_by' => 'book_name', 'direction' => 'asc'])
        );

        $this->assertEquals($bookRequest1->id, $responseAsc->original['data'][0]->id);
        $this->assertEquals($bookRequest2->id, $responseDesc->original['data'][0]->id);
    }
}
