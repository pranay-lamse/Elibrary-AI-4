<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Tag;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class TagAPIControllerValidationTest
 */
class TagAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_tag_fails_when_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.tags.store'), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_create_tag_fails_when_name_is_duplicate()
    {
        $tag = Tag::factory()->create();

        $response = $this->postJson(route('api.b1.tags.store'), ['name' => $tag->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function test_update_tag_fails_when_name_is_not_passed()
    {
        $tag = Tag::factory()->create();

        $response = $this->putJson(route('api.b1.tags.update', $tag->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_update_tag_fails_when_name_is_duplicated()
    {
        $tags = Tag::factory()->count(2)->create();

        $response = $this->putJson(route('api.b1.tags.update', $tags[1]->id), ['name' => $tags[0]->name]);

        $this->assertExceptionMessage($response, 'The name has already been taken.');
    }

    /** @test */
    public function it_can_store_tag()
    {
        $fakeTag = Tag::factory()->raw();

        $response = $this->postJson(route('api.b1.tags.store'), $fakeTag);

        $this->assertSuccessMessageResponse($response, 'Tag saved successfully.');
        $this->assertNotEmpty(Tag::where('name', $fakeTag['name'])->first());
    }

    /** @test */
    public function it_can_update_tag()
    {
        $tag = Tag::factory()->create();

        $fakeTag = Tag::factory()->raw();

        $response = $this->putJson(route('api.b1.tags.update', $tag->id), $fakeTag);

        $this->assertSuccessMessageResponse($response, 'Tag updated successfully.');
        $this->assertEquals($fakeTag['name'], $tag->fresh()->name);
    }
}
