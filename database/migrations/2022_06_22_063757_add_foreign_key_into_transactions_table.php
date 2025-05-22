<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyIntoTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->integer('member_id')->unsigned()->nullable()->change();
            $table->foreign('member_id')
                ->references('id')->on('members')
                ->cascadeOnUpdate()
                ->onDelete('SET NULL');
            $table->integer('plan_id')->unsigned()->nullable()->change();
            $table->foreign('plan_id')
                ->references('id')->on('membership_plans')
                ->cascadeOnUpdate()
                ->onDelete('SET NULL');
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropForeign(['member_id']);
            $table->dropForeign(['plan_id']);
            $table->integer('member_id')->change();
            $table->integer('plan_id')->change();
        });
    }
}
