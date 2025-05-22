<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('books')) {
        Schema::create('books', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('name');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->datetime('published_on')->nullable();
            $table->string('isbn')->nullable();
            $table->string('url')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->softDeletes();
            $table->timestamps();
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
        Schema::dropIfExists('books');
    }
}
