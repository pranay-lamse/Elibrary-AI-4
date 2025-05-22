<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Setting;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class SettingAPIControllerValidationTest
 */
class SettingAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_create_setting_fails_when_key_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.settings.store'), [['key' => '']]);

        $this->assertExceptionMessage($response, 'The key field is required.');
    }

    /** @test */
    public function test_create_setting_fails_when_value_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.settings.store'), [
            [
                'key'   => $this->faker->name,
                'value' => '',
            ],
        ]);

        $this->assertExceptionMessage($response, 'The value field is required.');
    }

    /** @test */
    public function test_create_setting_fails_when_display_name_is_not_passed()
    {
        $response = $this->postJson(route('api.b1.settings.store'), [
            [
                'key'   => $this->faker->name,
                'value' => $this->faker->word,
            ],
        ]);

        $this->assertExceptionMessage($response, 'The display name field is required.');
    }

    /** @test */
    public function test_update_setting_fails_when_key_is_not_passed()
    {
        $setting = Setting::factory()->create();

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), ['key' => '']);

        $this->assertExceptionMessage($response, 'The key field is required.');
    }

    /** @test */
    public function test_update_setting_fails_when_value_is_not_passed()
    {
        $setting = Setting::factory()->create();

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), [
            'key'   => $this->faker->name,
            'value' => '',
        ]);

        $this->assertExceptionMessage($response, 'The value field is required.');
    }

    /** @test */
    public function test_update_setting_fails_when_display_name_is_not_passed()
    {
        $setting = Setting::factory()->create();

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), [
            'key'   => $this->faker->name,
            'value' => $this->faker->word,
        ]);

        $this->assertExceptionMessage($response, 'The display name field is required.');
    }

    /** @test */
    public function it_can_store_setting()
    {
        $fakeSetting = Setting::factory()->count(2)->raw();
        $response = $this->postJson(route('api.b1.settings.store'), $fakeSetting);

        $this->assertSuccessMessageResponse($response, 'Setting saved successfully.');

        $response = $response->original['data'];
        $this->assertArrayHasKey('id', $response[0]);
        $this->assertArrayHasKey('id', $response[1]);
    }

    /** @test */
    public function it_can_update_setting()
    {
        /** @var Setting $setting */
        $setting = Setting::factory()->create();
        $fakeSetting = Setting::factory()->raw();

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), $fakeSetting);

        $this->assertSuccessMessageResponse($response, 'Setting updated successfully.');
        $this->assertEquals($fakeSetting['key'], $setting->fresh()->key);
    }
}
