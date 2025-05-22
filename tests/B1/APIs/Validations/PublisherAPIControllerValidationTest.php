<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Publisher;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class PublisherAPIControllerValidationTest
 */
class PublisherAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_publisher_fails_when_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.publishers.store'), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_publisher_fails_when_name_is_duplicate()
    {
        $publisher = Publisher::factory()->create();

        $response = $this->postJson(route('api.b1.publishers.store'), ['name' => $publisher->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_publisher_fails_when_name_is_not_passed()
    {
        $publisher = Publisher::factory()->create();

        $response = $this->putJson(route('api.b1.publishers.update', $publisher->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_publisher_fails_when_name_is_duplicate()
    {
        $publisher1 = Publisher::factory()->create();
        $publisher2 = Publisher::factory()->create();

        $response = $this->putJson(route('api.b1.publishers.update', $publisher2->id), [
            'name' => $publisher1->name,
        ]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function it_can_store_publisher()
    {
        $response = $this->postJson(route('api.b1.publishers.store'), ['name' => $this->faker->name]);

        $this->assertSuccessMessageResponse($response, 'Publisher saved successfully.');
    }

    /** @test */
    public function it_can_update_publisher()
    {
        /** @var Publisher $publisher */
        $publisher = Publisher::factory()->create();

        $newName = $this->faker->name;
        $response = $this->putJson(route('api.b1.publishers.update', $publisher->id), ['name' => $newName]);

        $this->assertSuccessMessageResponse($response, 'Publisher updated successfully.');
        $this->assertEquals($newName, $publisher->fresh()->name);
    }
}
