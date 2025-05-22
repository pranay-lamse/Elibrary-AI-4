<?php

namespace Database\Seeders;

use App\Models\Penalty;
use Illuminate\Database\Seeder;

class RemovePenaltiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $penalties = Penalty::where('book_item_id', '=', null)->orWhere('collected_by', '=', null)->get();
        foreach ($penalties as $penalty) {
            $penalty->delete();
        }
    }
}
