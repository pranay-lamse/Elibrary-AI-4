<?php

namespace Tests\Repositories;

use App\Models\Member;
use App\Repositories\MemberRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class MemberRepositoryTest
 */
class MemberRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var MemberRepository
     */
    private $memberRepo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->memberRepo = app(MemberRepository::class);
    }

    /** @test */
    public function test_can_get_all_members()
    {
        Member::factory()->count(10)->create();

        $members = $this->memberRepo->all();
        $take3 = $this->memberRepo->all([], null, 3);
        $skip4 = $this->memberRepo->all([], 9, 8);

        $this->assertCount(13, $members);
        $this->assertCount(3, $take3);
        $this->assertCount(4, $skip4);
    }

    /** @test */
    public function test_can_store_member()
    {
        /** @var Member $member */
        $member = Member::factory()->raw();
        $input = array_merge($member, [
            'password'  => 123456,
            'address_1' => $this->faker->address,
        ]);

        $member = $this->memberRepo->store($input);

        $this->assertArrayHasKey('id', $member);
        $this->assertNotEmpty($member->address);
    }

    /**
     * @test
     * @expectedException Illuminate\Database\Eloquent\ModelNotFoundException
     * @expectedExceptionMessage MembershipPlan not found.
     */
    public function test_unable_to_create_member_with_non_existing_membership_plan_id()
    {
        $this->memberRepo->store(['membership_plan_id' => 999]);
    }

    /** @test */
    public function test_can_update_member()
    {
        /** @var Member $member */
        $member = Member::factory()->create();
        $fakeMember = Member::factory()->raw(['id' => $member->id]);

        $updatedMember = $this->memberRepo->update($fakeMember, $member->id);

        $this->assertArrayHasKey('id', $updatedMember);
        $this->assertEquals($fakeMember['first_name'], $updatedMember->fresh()->first_name);
    }

    /**
     * @test
     * @expectedException App\Exceptions\ApiOperationFailedException
     * @expectedExceptionMessage Member not found
     */
    public function test_not_allow_to_update_non_existing_member()
    {
        /** @var Member $member */
        $member = Member::factory()->raw();

        $this->memberRepo->update($member, 999);
    }

    /** @test */
    public function test_can_generate_member_id()
    {
        /** @var Member $member */
        $member = Member::factory()->create();

        $generatedMemberId = $this->memberRepo->generateMemberId();

        $this->assertNotEmpty($generatedMemberId);
        $this->assertNotEquals($member->member_id, $generatedMemberId);
    }
}
