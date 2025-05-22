<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::hasTable('book_items')) {
            Schema::create('book_items', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('book_id');
                $table->string('book_code')->unique();
                $table->string('edition');
                $table->integer('format');
                $table->integer('status')->default(1);
                $table->string('location')->nullable();
                $table->float('price')->nullable();
                $table->unsignedInteger('publisher_id')->nullable();
                $table->unsignedInteger('language_id');
                $table->string('pdf_preview_file')->nullable();
                $table->timestamps();
                $table->foreign('publisher_id')
                    ->references('id')->on('publishers')
                    ->onDelete('set null')
                    ->onUpdate('set null');
                $table->foreign('language_id')
                    ->references('id')->on('book_languages')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
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
        Schema::dropIfExists('book_items');
    }
}
