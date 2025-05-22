<?php

namespace Database\Seeders;

use App\Models\HomepageSetting;
use Illuminate\Database\Seeder;

/**
 * Class CreateHomepageSettingsSeeder
 */
class CreateHomepageSettingsSeeder extends Seeder
{
    public function run()
    {
        $settings[] = ['facebook', 'https://www.facebook.com/infyom', 'Facebook link'];
        $settings[] = ['github', 'https://github.com/InfyOmLabs', 'Github link'];
        $settings[] = ['linkedin', 'https://in.linkedin.com/company/infyom-technologies', 'Linkedin link'];
        $settings[] = ['twitter', 'infyom', 'Twitter link'];
        $settings[] = ['contact_email', 'contact@infyom.in', 'Contact Email'];
        $settings[] = ['contact_phone', '7096336561', 'Contact Phone'];
        $settings[] = ['website', 'http://www.infyom.com', 'Website'];
        $settings[] = ['company_description', 'Leading Laravel Development Company Of India.', 'Company Description'];

        foreach ($settings as $setting) {
            HomepageSetting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}
