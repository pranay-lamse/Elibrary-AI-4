<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSanctionLetterItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sanction_letter_items', function (Blueprint $table) {
            $table->id();
            $table->integer("letter_id")->nullable(false);
            $table->string("category")->nullable(false);
            $table->string("name")->nullable(false);
            $table->string("price")->nullable(false)->default(0);
            $table->string("quantity")->nullable(false)->default(0);
            $table->string("notes")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sanction_letter_items');
    }
}
