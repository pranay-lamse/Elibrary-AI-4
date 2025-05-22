<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Traits\ImageTrait;
use Illuminate\Database\Seeder;

/**
 * Class CreateSettingsSeeder
 */
class CreateSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings[] = ['currency', 'INR', 'Indian Rupee'];
        $settings[] = ['return_due_days', 15, 'Return Due Days'];
        $settings[] = ['reserve_due_days', 5, 'Reserve Due Days'];
        $settings[] = ['library_name', 'My Library', 'My Library'];
        $settings[] = ['library_logo', 'logo-blue-black.png', 'Library Logo'];
        $settings[] = ['language', 'en', 'English'];
        $settings[] = ['favicon_icon', 'favicon.ico', 'Icon'];
        $settings[] = ['reserve_books_limit', 5, 'Maximum reserve books limit'];
        $settings[] = ['issue_books_limit', 5, 'Maximum issue books limit'];
        $settings[] = ['penalty_per_day', 10, 'Penalty amount per day'];

        foreach ($settings as $setting) {
            Setting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }


        /** @var Setting $setting */
        $setting = Setting::where('key', Setting::LIBRARY_LOGO)->first();

        $setting->update(['value' => 'images/logo-blue-black.png']);

        /** @var Setting $setting */
        $setting = Setting::where('key', Setting::FAVICON_ICON)->first();
       
        $setting->update(['value' => 'images/favicon/favicon.ico']);
    }
}
