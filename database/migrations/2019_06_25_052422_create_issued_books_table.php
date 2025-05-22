<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateIssuedBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::hasTable('issued_books')) {
        Schema::create('issued_books', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('book_item_id')->unsigned();
            $table->integer('member_id')->unsigned();
            $table->dateTime('reserve_date')->nullable();
            $table->dateTime('issued_on')->nullable();
            $table->dateTime('return_due_date')->nullable();
            $table->text('note')->nullable();
            $table->dateTime('return_date')->nullable();
            $table->integer('status');
            $table->unsignedBigInteger('issuer_id')->nullable();
            $table->unsignedBigInteger('returner_id')->nullable();
            $table->timestamps();

            $table->foreign('book_item_id')
                ->references('id')->on('book_items')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('member_id')
                ->references('id')->on('members')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('issuer_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('returner_id')
                ->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
                
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
        Schema::dropIfExists('issued_books');
    }
}
