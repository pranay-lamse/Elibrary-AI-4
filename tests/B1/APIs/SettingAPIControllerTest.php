<?php

namespace Tests\B1\APIs;

use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class SettingAPIControllerTest
 */
class SettingAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_settings()
    {
        $this->mockRepo(self::$setting);

        /** @var Setting[] $settings */
        $settings = Setting::factory()->count(5)->create();

        $this->settingRepository->expects('all')->andReturn($settings);

        $response = $this->getJson(route('api.b1.settings.index'));

        $this->assertSuccessDataResponse($response, $settings->toArray(), 'Settings retrieved successfully.');
    }

    /** @test */
    public function test_can_search_and_get_settings()
    {
        /** @var Setting[] $settings */
        $settings = Setting::factory()->count(5)->create();

        $response = $this->getJson(route('api.b1.settings.index'));
        $take3 = $this->getJson(route('api.b1.settings.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.b1.settings.index', ['skip' => 2, 'limit' => 2]));

        $this->assertCount(16, $response->original['data'], '9 defaults');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);
    }

    /** @test */
    public function it_can_store_setting()
    {
        $this->mockRepo(self::$setting);

        $settings = Setting::factory()->count(2)->raw();

        $this->settingRepository->expects('createOrUpdate')
            ->with($settings)
            ->andReturn($settings);

        $response = $this->postJson(route('api.b1.settings.store'), $settings);

        $this->assertSuccessDataResponse($response, $settings, 'Setting saved successfully.');
    }

    /** @test */
    public function it_can_update_setting()
    {
        $this->mockRepo(self::$setting);

        /** @var Setting $setting */
        $setting = Setting::factory()->create();
        $fakeSetting = Setting::factory()->make();

        $this->settingRepository->expects('update')
            ->with($fakeSetting->toArray(), $setting->id)
            ->andReturn($fakeSetting);

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), $fakeSetting->toArray());

        $this->assertSuccessDataResponse($response, $fakeSetting->toArray(), 'Setting updated successfully.');
    }

    /** @test */
    public function it_can_retrieve_setting()
    {
        /** @var Setting $setting */
        $setting = Setting::factory()->create();

        $response = $this->getJson(route('api.b1.settings.show', $setting->id));

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting retrieved successfully.');
    }

    /** @test */
    public function it_can_delete_setting()
    {
        /** @var Setting $setting */
        $setting = Setting::factory()->create();

        $response = $this->deleteJson(route('api.b1.settings.destroy', $setting->id));

        $this->assertSuccessDataResponse($response, $setting->toArray(), 'Setting deleted successfully.');
        $this->assertEmpty(Setting::find($setting->id));
    }
}
