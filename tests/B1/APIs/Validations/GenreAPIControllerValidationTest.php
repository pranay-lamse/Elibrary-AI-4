<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Genre;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class GenreAPIControllerValidationTest
 */
class GenreAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_genre_fails_when_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.genres.store'), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_genre_fails_when_name_is_not_passed()
    {
        $genre = Genre::factory()->create();

        $response = $this->putJson(route('api.b1.genres.update', $genre->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_genre_fails_when_name_is_duplicate()
    {
        $genre = Genre::factory()->create();

        $response = $this->postJson(route('api.b1.genres.store'), ['name' => $genre->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_genre_fails_when_name_is_duplicate()
    {
        $genre1 = Genre::factory()->create();
        $genre2 = Genre::factory()->create();

        $response = $this->putJson(route('api.b1.genres.update', $genre2->id), ['name' => $genre1->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function it_can_store_genre()
    {
        $name = $this->faker->name;
        $response = $this->postJson(route('api.b1.genres.store'), ['name' => $name]);

        $this->assertSuccessMessageResponse($response, 'Genre saved successfully.');
        $this->assertNotEmpty(Genre::whereName($name)->first());
    }

    /** @test */
    public function it_can_update_genre()
    {
        /** @var Genre $genre */
        $genre = Genre::factory()->create();

        $newName = $this->faker->name;
        $response = $this->putJson(route('api.b1.genres.update', $genre->id), ['name' => $newName]);

        $this->assertSuccessMessageResponse($response, 'Genre updated successfully.');
        $this->assertEquals($newName, $genre->fresh()->name);
    }
}
