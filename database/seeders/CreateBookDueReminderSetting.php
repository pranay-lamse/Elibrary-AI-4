<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * Class CreateSettingsSeeder
 */
class CreateBookDueReminderSetting extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings[] = ['book_due_reminder_before_days', 2, 'Book Due Reminder Before Days'];

        foreach ($settings as $setting) {
            Setting::create([
                'key'          => $setting[0],
                'value'        => $setting[1],
                'display_name' => $setting[2],
            ]);
        }
    }
}
