<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Seeder;

class CreateAuthorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $authors = [
            [
                'Ernest', 'Hemingway',
                'Ernest Miller Hemingway was an American journalist, novelist, short-story writer, and sportsman.',
            ],
            [
                'Stephen', 'King',
                'Stephen Edwin King is an American author of horror, supernatural fiction, suspense, science fiction, and fantasy novels.',
            ],
            [
                'J. K.', 'Rowling',
                'Joanne Rowling CH, OBE, FRSL, FRCPE, FRSE, better known by her pen names J. K. Rowling and Robert Galbraith, is a British novelist, screenwriter, producer, and philanthropist.',
            ],
            [
                'Jeff', 'Goins',
                'Jeff Goins is an American author, blogger, and speaker. He is the founder of Tribe Writers, an online community for writers.',
            ],
            [
                'Arundhati', 'Roy',
                'Suzanna Arundhati Roy is an Indian author best known for her novel The God of Small Things, which won the Man Booker Prize for Fiction in 1997 and became the biggest-selling book by a non-expatriate Indian author.',
            ],
            [
                'Chetan', 'Bhagat',
                'Chetan Bhagat is a screenwriter, television personality and motivational speaker, known for his Indian-English novels about young urban middle class Indians.',
            ],
            [
                'Durjoy', 'Datta',
                'Durjoy Datta is an Indian screenwriter and entrepreneur known for his novels about the romantic life of young Indians.',
            ],
            [
                'Hua', 'Yu',
                'Yu Hua is a Chinese author, born April 3, 1960 in Hangzhou, Zhejiang province. Shortly after his debut as a fiction writer in 1983, Yu Hua was regarded as a promising avant-garde or post-New Wave writer.',
            ],
            [
                'Yukio', 'Mishima',
                'Yukio Mishima is the pen name of Kimitake Hiraoka, a Japanese author, poet, playwright, actor, model, film director, nationalist, and founder of the Tatenokai.',
            ],
            [
                'Danielle', 'Steel',
                'Danielle Fernandes Dominique Schuelein-Steel is an American writer, best known for her romance novels.',
            ],
            ['William', 'Shakesphere', ''],
            ['Amartya', 'Sen', ''],
            ['L.J', 'Smith', ''],
        ];

        foreach ($authors as $author) {
            Author::create([
                'first_name' => $author[0], 'last_name' => $author[1], 'description' => $author[2],
            ]);
        }
    }
}
