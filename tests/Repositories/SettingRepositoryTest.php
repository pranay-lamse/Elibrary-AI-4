<?php

namespace Tests\Repositories;

use App\Models\Setting;
use App\Repositories\SettingRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class SettingRepositoryTest
 */
class SettingRepositoryTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * @var SettingRepository
     */
    private $settingRepo;

    protected function setUp(): void
    {
        parent::setUp();
        $this->settingRepo = app(SettingRepository::class);
    }

    /** @test */
    public function test_can_create_setting()
    {
        /** @var Setting[] $settings */
        $settings = Setting::factory()->count(2)->raw();

        $settingList = $this->settingRepo->createOrUpdate($settings);

        $this->assertCount(2, $settingList);
        $this->assertArrayHasKey('id', $settingList[0]);
        $this->assertArrayHasKey('id', $settingList[1]);
        $this->assertEquals(\Arr::Pluck($settings, 'key'), \Arr::pluck($settingList, 'key'));
    }

    /** @test */
    public function test_can_update_setting_when_key_with_name_already_exist()
    {
        $setting = Setting::factory()->create();
        $inputs = [
            'key'          => $setting->key,
            'value'        => $this->faker->randomDigit,
            'display_name' => $this->faker->word,
        ];

        $settingList = $this->settingRepo->createOrUpdate([$inputs]);

        $this->assertArrayHasKey('id', $settingList[0]);
        $this->assertEquals($inputs['key'], $settingList[0]['key']);
        $this->assertEquals($inputs['value'], $settingList[0]['value']);
    }
}
