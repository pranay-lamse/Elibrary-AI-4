<?php

namespace Database\Seeders;

use App\Models\HomepageSetting;
use Illuminate\Database\Seeder;

class CreateNewHomePageSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings[] = ['hero_image_title', 'Hero image title 1', 'Hero Image Title'];
        $settings[] = ['hero_image_description', 'This is Hero image Description.', 'Hero Image Description'];
        $settings[] = [
            'about_us_text',
            'An About Us page helps your company make a good first impression, and is critical for building customer trust and loyalty.',
            'About us Text',
        ];
        $settings[] = ['genres_text', 'Art', 'Genres Text'];
        $settings[] = ['popular_books_text', 'Innovation ', 'Popular Books Text'];

        foreach ($settings as $setting) {
            HomepageSetting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}
