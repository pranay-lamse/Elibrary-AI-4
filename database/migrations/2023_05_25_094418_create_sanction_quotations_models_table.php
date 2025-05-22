<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSanctionQuotationsModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sanction_quotations', function (Blueprint $table) {
            $table->id();
            $table->string("date")->nullable();
            $table->string("reference_code")->nullable();
            $table->integer("sanction_letter_id")->nullable();
            $table->integer("supplier_id")->nullable();
            $table->double("discount")->nullable();
            $table->double("shipping")->nullable();
            $table->string("quotation_pdf_file")->nullable();
            $table->double("grand_total")->nullable();
            $table->integer("status")->nullable();
            $table->integer("created_by")->nullable();
            $table->integer("modified_by")->nullable();
            $table->text("note")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sanction_quotations');
    }
}
