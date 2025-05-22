<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\Setting;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class SettingAPIPermissionTest
 */
class SettingAPIPermissionTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();

        $this->loggedInUserId = User::factory()->create();
        $token = $this->loggedInUserId->createToken('admin_token')->plainTextToken;
        $this->defaultHeaders = ['HTTP_Authorization' => 'Bearer '.$token];
    }

    /** @test */
    public function test_not_allow_to_create_setting_without_permission()
    {
        $fakeSetting = Setting::factory()->raw();

        $response = $this->postJson(route('api.b1.settings.store'), $fakeSetting);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_setting_without_permission()
    {
        $setting = Setting::factory()->create();
        $updateSetting = Setting::factory()->raw(['id' => $setting->id]);

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), $updateSetting);

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_delete_setting_without_permission()
    {
        $setting = Setting::factory()->create();

        $response = $this->deleteJson(route('api.b1.settings.destroy', $setting->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_settings_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $response = $this->getJson(route('api.b1.settings.index'));

        $this->assertSuccessMessageResponse($response, 'Settings retrieved successfully.');
    }

    /** @test */
    public function test_can_create_setting_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $fakeSetting = Setting::factory()->raw();

        $response = $this->postJson(route('api.b1.settings.store'), [$fakeSetting]);

        $this->assertSuccessMessageResponse($response, 'Setting saved successfully.');
    }

    /** @test */
    public function test_can_update_setting_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $setting = Setting::factory()->create();
        $updateSetting = Setting::factory()->raw(['id' => $setting->id]);

        $response = $this->putJson(route('api.b1.settings.update', $setting->id), $updateSetting);

        $this->assertSuccessMessageResponse($response, 'Setting updated successfully.');
    }

    /** @test */
    public function test_can_delete_setting_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);
        $setting = Setting::factory()->create();

        $response = $this->deleteJson(route('api.b1.settings.destroy', $setting->id));

        $this->assertSuccessMessageResponse($response, 'Setting deleted successfully.');
    }

    /**
     * @test
     */
    public function test_can_show_setting_with_valid_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);

        /** @var Setting $setting */
        $setting = Setting::factory()->create();

        $response = $this->getJson(route('api.b1.settings.show', $setting->id));

        $this->assertSuccessMessageResponse($response, 'Setting retrieved successfully.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_show_setting_without_permission()
    {
        /** @var Setting $setting */
        $setting = Setting::factory()->create();

        $response = $this->get(route('api.b1.settings.show', $setting->id));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /**
     * @test
     */
    public function test_not_allow_to_upload_setting_logo_without_permission()
    {
        $response = $this->post(route('api.b1.upload-logo', ['logo' => '']));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }
}
