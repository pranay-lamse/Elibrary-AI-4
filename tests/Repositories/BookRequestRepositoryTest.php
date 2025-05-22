<?php

namespace Tests\Repositories;

use App\Models\BookRequest;
use App\Repositories\BookRequestRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class BookRequestRepositoryTest
 */
class BookRequestRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var BookRequestRepository */
    protected $bookRequestRepo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->bookRequestRepo = app(BookRequestRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    public function test_can_get_all_book_requests()
    {
        $bookRequests = BookRequest::factory()->count(5)->create();

        $response = $this->bookRequestRepo->all();
        $take3 = $this->bookRequestRepo->all([], null, 3);
        $skip3 = $this->bookRequestRepo->all([], 7, 4);

        $this->assertCount(9, $response);
        $this->assertCount(3, $take3);
        $this->assertCount(2, $skip3);
    }

    /**
     * @test
     * @expectedException \Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException
     * @expectedExceptionMessage Invalid format.
     */
    public function test_not_allow_invalid_status_in_book_request()
    {
        $this->bookRequestRepo->validate(['format' => 999]);
    }

    /** @test */
    public function test_can_store_book_request()
    {
        $fakeRequest = BookRequest::factory()->raw();

        $response = $this->bookRequestRepo->store($fakeRequest);

        $this->assertNotEmpty($response->id);
        $this->assertEquals($fakeRequest['book_name'], $response->book_name);
        $this->assertEquals($fakeRequest['isbn'], $response->isbn);
    }

    /**
     * @test
     * @expectedException \Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedException BookRequest not found.
     */
    public function test_can_not_update_non_existing_book_request()
    {
        $fakeRequest = BookRequest::factory()->raw();

        $response = $this->bookRequestRepo->update($fakeRequest, 999);
    }
}
