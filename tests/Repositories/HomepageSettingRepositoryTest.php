<?php

namespace Tests\Repositories;

use App\Models\HomepageSetting;
use App\Repositories\HomepageSettingRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class HomepageSettingRepository
 */
class HomepageSettingRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /** @var HomepageSettingRepository */
    protected $homepageSettingRepo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->homepageSettingRepo = app(HomepageSettingRepository::class);
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_homepage_settings()
    {
        $response = $this->homepageSettingRepo->all();
        $take3 = $this->homepageSettingRepo->all([], null, 3);
        $skip3 = $this->homepageSettingRepo->all([], 5, 5);

        $this->assertCount(8, $response);
        $this->assertCount(3, $take3);
        $this->assertCount(3, $skip3);
    }

    /** @test */
    public function test_can_update_settings()
    {
        $setting = HomepageSetting::factory()->create();

        $updateSetting = HomepageSetting::factory()->raw(['key' => $setting->key]);

        $updatedSetting = $this->homepageSettingRepo->bulkUpdate([$updateSetting]);

        $this->assertEquals($updateSetting['value'], $updatedSetting[0]->value);
    }
}
