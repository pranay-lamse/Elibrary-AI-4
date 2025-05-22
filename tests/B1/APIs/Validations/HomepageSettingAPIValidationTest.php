<?php

namespace Tests\B1\APIs\Validations;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class HomepageSettingAPIValidationTest
 */
class HomepageSettingAPIValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_not_allow_to_update_homepage_setting_without_key()
    {
        $response = $this->putJson(route('api.b1.homepage-settings.update'), [['key' => '']]);

        $this->assertExceptionMessage($response, 'The key field is required.');
    }

    /** @test */
    public function test_not_allow_to_update_homepage_setting_without_value()
    {
        $response = $this->putJson(route('api.b1.homepage-settings.update'), [['key' => 'my_setting']]);

        $this->assertExceptionMessage($response, 'The value field is required.');
    }

    /** @test */
    public function test_not_allow_to_update_homepage_setting_without_display_name()
    {
        $response = $this->putJson(route('api.b1.homepage-settings.update'), [['key' => 'my_setting', 'value' => 100]]);

        $this->assertExceptionMessage($response, 'The display name field is required.');
    }
}
