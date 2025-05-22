<?php

namespace Database\Seeders;

use App\Models\MemberSetting;
use Illuminate\Database\Seeder;

/**
 * Class DefaultMemberSettingsSeeder
 */
class DefaultMemberSettingsSeeder extends Seeder
{
    public function run()
    {
        $settings[] = [
            'current_language',
            'en',
            'Current Language',
        ];

        foreach ($settings as $setting) {
            MemberSetting::create([
                'key'           => $setting[0],
                'default_value' => $setting[1],
                'display_name'  => $setting[2],
            ]);
        }
    }
}
