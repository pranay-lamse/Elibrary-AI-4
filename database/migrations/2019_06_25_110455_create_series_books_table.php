<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateSeriesBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::hasTable('series_books')) {
        Schema::create('series_books', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('series_id');
            $table->unsignedInteger('book_id');
            $table->integer('sequence');
            $table->timestamps();

            $table->foreign('series_id')->references('id')->on('book_series')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');

            $table->foreign('book_id')->references('id')->on('books')
                ->onDelete('CASCADE')
                ->onUpdate('CASCADE');
                $table->softDeletes();
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
        Schema::drop('series_books');
    }
}
