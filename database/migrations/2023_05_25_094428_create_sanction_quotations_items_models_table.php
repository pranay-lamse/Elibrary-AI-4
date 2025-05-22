<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSanctionQuotationsItemsModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sanction_quotations_items', function (Blueprint $table) {
            $table->id();
            $table->integer("quotation_id")->nullable();
            $table->integer("sanction_letter_id")->nullable();
            $table->integer("sanction_letter_item_id")->nullable();
            $table->integer("price")->nullable()->default(0);
            $table->string("category")->nullable();
            $table->string("name")->nullable();
            $table->integer("quantity")->nullable()->default(0);
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
        Schema::dropIfExists('sanction_quotations_items');
    }
}
