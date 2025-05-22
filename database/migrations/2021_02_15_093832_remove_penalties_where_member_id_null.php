<?php

use App\Models\Penalty;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemovePenaltiesWhereMemberIdNull extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $penalties = Penalty::where('member_id', '=', null)->get();
        foreach ($penalties as $penalty) {
            $penalty->delete();
        }

        Schema::table('penalties', function (Blueprint $table) {
            $table->dropForeign('penalties_member_id_foreign');
            $table->foreign('member_id')
                ->references('id')->on('members')
                ->onUpdate('cascade')
                ->onDelete('cascade');
                
        });
    }
}
