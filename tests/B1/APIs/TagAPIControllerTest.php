<?php

namespace Tests\B1\APIs;

use App\Models\Tag;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class TagAPIControllerTest
 */
class TagAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_tags()
    {
        $this->mockRepo(self::$tag);

        /** @var Tag $tags */
        $tags = Tag::factory()->count(5)->create();

        $this->tagRepository->shouldReceive('all')->twice()->andReturn($tags);

        $response = $this->getJson(route('api.b1.tags.index'));

        $this->assertSuccessDataResponse($response, $tags->toArray(), 'Tags retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_tags()
    {
        /** @var Tag[] $tags */
        $tags = Tag::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.tags.index'));
        $take3 = $this->getJson(route('api.b1.tags.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.tags.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.b1.tags.index', ['search' => $tags[0]->name]));

        $this->assertCount(18, $response->original['data'], '13 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
        $this->assertEquals(18, $response->original['totalRecords'], '13 defaults');

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 18);
        $this->assertEquals(count($search), $searchByName->original['totalRecords']);
    }

    /** @test */
    public function it_can_create_tag()
    {
        $this->mockRepo(self::$tag);

        $tag = Tag::factory()->make();

        $this->tagRepository->expects('create')
            ->with($tag->toArray())
            ->andReturn($tag);

        $response = $this->postJson(route('api.b1.tags.store'), $tag->toArray());

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag saved successfully.');
    }

    /** @test */
    public function it_can_update_tag()
    {
        $this->mockRepo(self::$tag);

        /** @var Tag $tag */
        $tag = Tag::factory()->create();
        $fakeTag = Tag::factory()->make(['id' => $tag->id]);

        $this->tagRepository->expects('update')
            ->with($fakeTag->toArray(), $tag->id)
            ->andReturn($fakeTag);

        $response = $this->putJson(route('api.b1.tags.update', $tag->id), $fakeTag->toArray());

        $this->assertSuccessDataResponse($response, $fakeTag->toArray(), 'Tag updated successfully.');
    }

    /** @test */
    public function test_can_not_update_default_tag()
    {
        /** @var Tag $tag */
        $tag = factory(Tag::class)->create(['is_default' => true]);
        $fakeTag = factory(Tag::class)->make(['id' => $tag->id]);

        $response = $this->putJson(route('api.b1.tags.update', $tag->id), $fakeTag->toArray());

        $this->assertSuccessMessageResponse($response, 'Default tag should not be updated.');
        $this->assertEquals($tag->name, Tag::find($tag->id)->name);
    }

    /** @test */
    public function it_can_retrieve_tag()
    {
        /** @var Tag $tag */
        $tag = Tag::factory()->create();

        $response = $this->getJson(route('api.b1.tags.show', $tag->id));

        $this->assertSuccessDataResponse($response, $tag->toArray(), 'Tag retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_tag()
    {
        /** @var Tag $tag */
        $tag = Tag::factory()->create();

        $response = $this->deleteJson(route('api.b1.tags.destroy', $tag->id));

        $this->assertSuccessMessageResponse($response, 'Tag deleted successfully.');
        $this->assertEmpty(Tag::find($tag->id));
    }
}
