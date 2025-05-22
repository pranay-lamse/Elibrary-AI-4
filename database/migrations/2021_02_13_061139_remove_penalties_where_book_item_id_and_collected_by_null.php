<?php

use App\Models\Penalty;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemovePenaltiesWhereBookItemIdAndCollectedByNull extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $penalties = Penalty::where('book_item_id', '=', null)->orWhere('collected_by', '=', null)->get();
        foreach ($penalties as $penalty) {
            $penalty->delete();
        }

        Schema::table('penalties', function (Blueprint $table) {
            $table->dropForeign('penalties_book_item_id_foreign');
            $table->foreign('book_item_id')
                ->references('id')->on('book_items')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->dropForeign('penalties_collected_by_foreign');
            $table->foreign('collected_by')
                ->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
                
        });
    }
}
