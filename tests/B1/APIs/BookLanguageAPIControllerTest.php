<?php

namespace Tests\B1\APIs;

use App\Models\BookItem;
use App\Models\BookLanguage;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class BookLanguageAPIControllerTest
 */
class BookLanguageAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_book_languages()
    {
        $this->mockRepo(self::$bookLanguage);

        /** @var BookLanguage[] $bookLanguages */
        $bookLanguages = BookLanguage::factory()->count(5)->create();

        $this->bookLanguageRepository->shouldReceive('all')->twice()->andReturn($bookLanguages);

        $response = $this->getJson(route('api.b1.book-languages.index'));

        $this->assertSuccessDataResponse(
            $response, $bookLanguages->toArray(), 'Book Languages retrieved successfully.'
        );
    }

    /** @test */
    public function test_can_search_and_get_book_languages()
    {
        /** @var BookLanguage[] $bookLanguage */
        $bookLanguage = BookLanguage::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.book-languages.index'));
        $take3 = $this->getJson(route('api.b1.book-languages.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.book-languages.index', ['skip' => 2, 'limit' => 2]));
        $search = $this->getJson(route('api.b1.book-languages.index', [
            'search' => $bookLanguage[0]->language_name,
        ])
        );

        $this->assertCount(23, $response->original['data'], '18 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $searchCount = count($search->original['data']);
        $this->assertTrue($searchCount > 0 && $searchCount < 23);
        $this->assertEquals($searchCount, $search->original['totalRecords']);
        $this->assertEquals(23, $response->original['totalRecords']);
    }

    /** @test */
    public function it_can_create_book_language()
    {
        $this->mockRepo(self::$bookLanguage);

        /** @var BookLanguage $bookLanguage */
        $bookLanguage = BookLanguage::factory()->make();

        $this->bookLanguageRepository->expects('create')
            ->with($bookLanguage->toArray())
            ->andReturn($bookLanguage);

        $response = $this->postJson(route('api.b1.book-languages.store'), $bookLanguage->toArray());

        $this->assertSuccessDataResponse(
            $response, $bookLanguage->toArray(), 'Book Language saved successfully.'
        );
    }

    /** @test */
    public function it_can_update_book_language()
    {
        $this->mockRepo(self::$bookLanguage);

        /** @var BookLanguage $bookLanguage */
        $bookLanguage = BookLanguage::factory()->create();
        $fakeBookLanguage = BookLanguage::factory()->make(['id' => $bookLanguage->id]);

        $this->bookLanguageRepository->expects('update')
            ->with($fakeBookLanguage->toArray(), $bookLanguage->id)
            ->andReturn($fakeBookLanguage);

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage->id),
            $fakeBookLanguage->toArray());

        $this->assertSuccessDataResponse(
            $response, $fakeBookLanguage->toArray(), 'Book Language updated successfully.'
        );
    }

    /** @test */
    public function test_can_not_update_default_book_language()
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = factory(BookLanguage::class)->create(['is_default' => true]);
        $fakeBookLanguage = factory(BookLanguage::class)->make(['id' => $bookLanguage->id]);

        $response = $this->putJson(route('api.b1.book-languages.update', $bookLanguage->id),
            $fakeBookLanguage->toArray());

        $this->assertSuccessMessageResponse(
            $response, 'Default book language should not be updated.'
        );
        $this->assertEquals($bookLanguage->language_name, BookLanguage::find($bookLanguage->id)->language_name);
    }

    /** @test */
    public function it_can_retrieve_book_language()
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = BookLanguage::factory()->create();

        $response = $this->getJson(route('api.b1.book-languages.show', $bookLanguage->id));

        $this->assertSuccessDataResponse(
            $response, $bookLanguage->toArray(), 'Book Language retrieved successfully.'
        );
    }

    /** @test */
    public function it_can_delete_book_language()
    {
        $bookLanguage = BookLanguage::factory()->create();

        $response = $this->deleteJson(route('api.b1.book-languages.destroy', $bookLanguage->id));

        $this->assertSuccessMessageResponse($response, 'Book Language deleted successfully.');
        $this->assertEmpty(BookLanguage::where('language_name', $bookLanguage->language_name)->first());
    }

    /** @test */
    public function test_can_not_delete_default_book_language()
    {
        $bookLanguage = factory(BookLanguage::class)->create(['is_default' => true]);

        $response = $this->deleteJson(route('api.b1.book-languages.destroy', $bookLanguage->id));

        $this->assertSuccessMessageResponse($response, 'Default book language should not be deleted.');
        $this->assertNotEmpty(BookLanguage::where('language_name', $bookLanguage->language_name)->first());
    }

    /** @test */
    public function test_can_not_delete_book_language_when_book_is_used_one_more_book_items()
    {
        /** @var BookLanguage $bookLanguage */
        $bookLanguage = BookLanguage::factory()->create();
        $bookItem = BookItem::factory()->create(['language_id' => $bookLanguage->id]);

        $response = $this->deleteJson(route('api.b1.book-languages.destroy', $bookLanguage->id));

        $this->assertExceptionMessage(
            $response,
            'Book Language can not be delete, it is used in one or more book items.');
    }
}
