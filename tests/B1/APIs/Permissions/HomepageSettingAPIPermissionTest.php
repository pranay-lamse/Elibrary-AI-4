<?php

namespace Tests\B1\APIs\Permissions;

use App\Models\HomepageSetting;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class HomepageSettingAPIPermissionTest
 */
class HomepageSettingAPIPermissionTest extends TestCase
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
    public function test_not_allow_to_get_homepage_settings_without_permission()
    {
        $response = $this->getJson(route('api.b1.homepage-settings.index'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_not_allow_to_update_settings_without_permission()
    {
        $response = $this->putJson(route('api.b1.homepage-settings.update'));

        $this->assertExceptionMessage($response, 'Unauthorized action.');
    }

    /** @test */
    public function test_can_get_homepage_settings_with_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);

        $response = $this->getJson(route('api.b1.homepage-settings.index'));

        $this->assertSuccessMessageResponse($response, 'Settings retrieved successfully.');
    }

    /** @test */
    public function test_can_update_homepage_settings_with_permission()
    {
        $this->assignPermissions($this->loggedInUserId, ['manage_settings']);

        $setting = HomepageSetting::factory()->create();
        $updateSetting = HomepageSetting::factory()->raw(['key' => $setting->key]);

        $response = $this->putJson(route('api.b1.homepage-settings.update'), [$updateSetting]);

        $this->assertSuccessMessageResponse($response, 'Setting saved successfully.');
    }
}
