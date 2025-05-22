<?php

namespace Tests\B1\APIs;

use App\Models\Book;
use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class GenreAPIControllerTest
 */
class GenreAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_genres()
    {
        $this->mockRepo(self::$genre);

        /** @var Genre[] $genres */
        $genres = Genre::factory()->count(5)->create();

        $this->genreRepository->shouldReceive('all')->twice()->andReturn($genres);

        $response = $this->getJson(route('api.b1.genres.index'));

        $this->assertSuccessDataResponse($response, $genres->toArray(), 'Genres retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_genres()
    {
        /** @var Genre[] $genres */
        $genres = Genre::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.genres.index'));
        $take3 = $this->getJson(route('api.b1.genres.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.genres.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.genres.index', ['search' => $genres[0]->name]));

        $this->assertCount(34, $response->original['data'], '29 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(34, $response->original['totalRecords'], '29 defaults');

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 34);
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function it_can_create_genre()
    {
        $this->mockRepo(self::$genre);

        /** @var Genre $genre */
        $genre = Genre::factory()->make();

        $this->genreRepository->expects('create')
            ->with($genre->toArray())
            ->andReturn($genre);

        $response = $this->postJson(route('api.b1.genres.store'), $genre->toArray());

        $this->assertSuccessDataResponse($response, $genre->toArray(), 'Genre saved successfully.');
    }

    /** @test */
    public function it_can_update_genre()
    {
        $this->mockRepo(self::$genre);

        /** @var Genre $genre */
        $genre = Genre::factory()->create();
        $fakeGenre = Genre::factory()->make(['id' => $genre->id]);

        $this->genreRepository->expects('update')
            ->with($fakeGenre->toArray(), $genre->id)
            ->andReturn($fakeGenre);

        $response = $this->putJson(route('api.b1.genres.update', $genre->id), $fakeGenre->toArray());

        $this->assertSuccessDataResponse($response, $fakeGenre->toArray(), 'Genre updated successfully.');
    }

    /** @test */
    public function test_can_not_update_default_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create(['is_default' => true]);
        $fakeGenre = factory(Genre::class)->make(['id' => $genre->id]);

        $response = $this->putJson(route('api.b1.genres.update', $genre->id), $fakeGenre->toArray());

        $this->assertSuccessMessageResponse($response, 'Default genre should not be updated.');
        $this->assertEquals($genre->name, Genre::find($genre->id)->name);
    }

    /** @test */
    public function it_can_retrieve_genre()
    {
        /** @var Genre $genre */
        $genre = Genre::factory()->create();

        $response = $this->getJson(route('api.b1.genres.show', $genre->id));

        $this->assertSuccessDataResponse($response, $genre->toArray(), 'Genre retrieved successfully.');
    }

    /*** @test */
    public function test_unable_to_delete_genre_when_its_used_in_one_or_more_book()
    {
        /** @var Book $book */
        $book = Book::factory()->create();

        /** @var Genre $genre */
        $genre = Genre::factory()->create();
        $genre->books()->sync([$book->id]);

        $response = $this->deleteJson(route('api.b1.genres.destroy', $genre->id));

        $this->assertExceptionMessage($response, 'Genre can not be delete, it is used in one or more books.');
    }

    /** @test */
    public function it_can_delete_genre()
    {
        /** @var Genre $genre */
        $genre = Genre::factory()->create();

        $response = $this->deleteJson(route('api.b1.genres.destroy', $genre->id));

        $this->assertSuccessDataResponse($response, $genre->toArray(), 'Genre deleted successfully.');
        $this->assertEmpty(Genre::find($genre->id));
    }

    /** @test */
    public function test_can_not_delete_default_genre()
    {
        /** @var Genre $genre */
        $genre = factory(Genre::class)->create(['is_default' => true]);

        $response = $this->deleteJson(route('api.b1.genres.destroy', $genre->id));

        $this->assertSuccessMessageResponse($response, 'Default genre should not be deleted.');
        $this->assertNotEmpty(Genre::find($genre->id));
    }
}
