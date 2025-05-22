<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class CreateTagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            'Family',
            'Animal',
            'Fiction',
            'Science',
            'History',
            'Biopic',
            'Art',
            'Horror',
            'Comedy',
            'Nature',
            'Popular',
            'Sports',
            'Entertainment',
        ];

        foreach ($tags as $tag) {
            Tag::create(['name' => $tag]);
        }
    }
}
