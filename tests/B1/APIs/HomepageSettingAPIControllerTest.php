<?php

namespace Tests\B1\APIs;

use App\Models\HomepageSetting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class HomepageSettingAPIControllerTest
 */
class HomepageSettingAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_homepage_settings()
    {
        $response = $this->getJson(route('api.b1.homepage-settings.index'));

        $this->assertCount(8, $response->original['data']);
    }

    /** @test */
    public function test_can_update_settings()
    {
        $homepageSetting = HomepageSetting::factory()->create(['key' => 'my_setting', 'value' => 123]);
        $updateSetting = HomepageSetting::factory()->raw(['key' => 'my_setting', 'value' => 500]);

        $response = $this->putJson(route('api.b1.homepage-settings.update'), [$updateSetting]);

        $this->assertSuccessMessageResponse($response, 'Setting saved successfully.');
        $setting = HomepageSetting::find($homepageSetting->id);
        $this->assertEquals($homepageSetting->key, $setting->key);
        $this->assertEquals(500, $setting->value);
    }
}
