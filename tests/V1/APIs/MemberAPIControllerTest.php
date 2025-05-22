<?php

namespace Tests\V1\APIs;

use App\Models\Member;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class MemberAPIControllerTest
 */
class MemberAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function it_can_update_member_profile()
    {
        $this->mockRepo(self::$member);

        /** @var Member $updateRecord */
        $updateRecord = Member::factory()->make(['id' => $this->loggedInMemberId]);
        unset($updateRecord->email);
        unset($updateRecord->membership_plan_id);

        $this->memberRepository->expects('update')
            ->with($updateRecord->toArray(), $this->loggedInMemberId)
            ->andReturn($updateRecord);

        $response = $this->postJson(route('api.v1.update-member-profile'), $updateRecord->toArray());

        $this->assertSuccessDataResponse(
            $response,
            $updateRecord->toArray(),
            'Member profile updated successfully.'
        );
    }

    /** @test */
    public function test_can_get_details_of_logged_in_member()
    {
        $response = $this->getJson(route('api.v1.member-details'));

        $this->assertSuccessMessageResponse($response, 'Member details retrieved successfully.');
        $this->assertNotEmpty($response);
        $this->assertEquals($this->loggedInMemberId, $response->original['data']->id);
    }

    /** @test */
    public function test_can_update_member_profile()
    {
        $member = Member::factory()->create();
        $fakeMember = Member::factory()->raw(['id' => $member->id]);

        $response = $this->postJson(route('api.v1.update-member-profile'), $fakeMember);

        $this->assertSuccessMessageResponse($response, 'Member profile updated successfully.');
        $this->assertNotEquals($fakeMember['email'], $member->fresh()->email, 'Email should not update');
        $this->assertNotEquals($fakeMember['first_name'], $member->fresh()->first_name);
    }

    /** @test */
    public function test_can_remove_image()
    {
        $member = Member::factory()->create(['image' => 'image.jpg']);
        Sanctum::actingAs($member);

        $response = $this->postJson(route('api.v1.remove-image'));

        $this->assertSuccessMessageResponse($response, 'Member image removed successfully.');
        $this->assertEmpty($member->fresh()->image);
    }

    /** @test */
    public function test_can_get_only_member_settings()
    {
        $response = $this->getJson(route('api.v1.settings.index'));

        $this->assertCount(1, $response->original['data']);
        $this->assertEquals('language', $response->original['data'][0]['key']);
        $this->assertSuccessMessageResponse($response, 'Settings retrieved successfully.');
    }
}
