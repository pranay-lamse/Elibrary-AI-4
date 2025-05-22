<?php

namespace Database\Seeders;

use App\Models\BookLanguage;
use Illuminate\Database\Seeder;

class CreateBookLanguagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bookLanguages = [
            'English'    => 'EN',
            'Gujarati'   => 'GJ',
            'Marathi'    => 'MR',
            'Urdu'       => 'UR',
            'Spanish'    => 'ES',
            'Portuguese' => 'PT',
            'French'     => 'FR',
            'German'     => 'DE',
            'Chinese'    => 'ZH',
            'Italian'    => 'IT',
            'Norwegian'  => 'NO',
            'Russian'    => 'RU',
            'Dutch'      => 'NL',
            'Swedish'    => 'SV',
            'Arabic'     => 'AR',
            'Greek'      => 'EL',
            'Japanese'   => 'JA',
            'Korean'     => 'KO',
        ];

        foreach ($bookLanguages as $bookLanguage => $code) {
            BookLanguage::create(['language_name' => $bookLanguage, 'language_code' => $code]);
        }
    }
}
