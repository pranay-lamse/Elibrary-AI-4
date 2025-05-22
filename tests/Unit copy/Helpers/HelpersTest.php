<?php

namespace Tests\Unit\Helpers;

use App\Models\Setting;
use Tests\TestCase;

/**
 * Class HelpersTest
 */
class HelpersTest extends TestCase
{
    /** @test */
    public function explode_trim_remove_empty_values_from_array()
    {
        $result = explode_trim_remove_empty_values_from_array(' string   ');
        $this->assertEquals(['string'], $result);

        $result = explode_trim_remove_empty_values_from_array(' string,test   ');
        $this->assertEquals(['string', 'test'], $result);

        $result = explode_trim_remove_empty_values_from_array(' string , test   ');
        $this->assertEquals(['string', 'test'], $result);
    }

    /** @test */
    public function test_return_setting_value()
    {
        /** @var Setting $setting */
        $setting = Setting::factory()->create();

        $result = getSettingValueByKey($setting->key);

        $this->assertNotEmpty($result);
        $this->assertEquals($setting->value, $result);
    }
}
