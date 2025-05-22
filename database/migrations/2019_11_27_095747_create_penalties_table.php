<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreatePenaltiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('penalties')) {
        Schema::create('penalties', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('member_id')->nullable();
            $table->unsignedInteger('book_item_id')->nullable();
            $table->double('actual_penalty');;
            $table->unsignedInteger('issued_book_id')->nullable();
            $table->double('collected_penalty');
            $table->text('notes')->nullable();
            $table->dateTime('collected_at');
            $table->unsignedBigInteger('collected_by')->nullable();
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('members')
                ->onUpdate('cascade')
                ->onDelete('set null');

            $table->foreign('book_item_id')->references('id')->on('book_items')
                ->onUpdate('cascade')
                ->onDelete('set null');

            $table->foreign('collected_by')->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('set null');
                
        });
    }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('penalties');
    }
}
