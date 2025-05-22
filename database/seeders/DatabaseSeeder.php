<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(DefaultPermissionsSeeder::class);
        $this->call(DefaultRoleSeeder::class);
        $this->call(DefaultUserSeeder::class);
        $this->call(SettingTableSeeder::class);
        $this->call(AddDashboardAndSettingPermissionsSeeder::class);
        $this->call(AddPurchaseAndSalePermissionsSeeder::class);
        $this->call(AddPurchaseReturnAndSaleReturnPermissionsSeeder::class);

       
        $this->call(CreateGenresSeeder::class);
        $this->call(CreateBookLanguagesSeeder::class);
        $this->call(CreateDefaultUsersSeeder::class);
       
        $this->call(CreateAuthorsSeeder::class);
        $this->call(CreatePublishersSeeder::class);
        $this->call(CreateTagsSeeder::class);
        $this->call(CreatePlansSeeder::class);
        $this->call(CreateSettingsSeeder::class);
        $this->call(CreateDefaultMemberSeeder::class);
        $this->call(CreateBooksSeeder::class);
        $this->call(CreateIssuedBooksSeeder::class);
        $this->call(CreateDefaultBookSeriesSeeder::class);
        $this->call(CreateHomepageSettingsSeeder::class);
        $this->call(CreateBookRequestsSeeder::class);
        $this->call(DefaultMemberSettingsSeeder::class);
        $this->call(CreateBookDueReminderSetting::class);
        $this->call(CreateNewHomePageSettingsSeeder::class);
    }
}
