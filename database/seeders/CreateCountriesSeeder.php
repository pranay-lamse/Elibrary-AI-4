<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Seeder;

class CreateCountriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $countries = file_get_contents(public_path('resources/countries.json'));
        $countries = json_decode($countries, true);

        foreach ($countries as $country) {
            Country::create(['name' => $country['name'], 'code' => $country['code']]);
        }
    }
}
