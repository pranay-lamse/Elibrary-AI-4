<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuotationToPurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quotation_to_purchases', function (Blueprint $table) {
            $table->id();
            $table->string("date")->nullable();
            $table->string("reference_code")->nullable();
            $table->integer("quotation_id")->nullable();
            $table->integer("sanction_letter_id")->nullable();
            $table->integer("supplier_id")->nullable();
            $table->double("discount")->default(0)->nullable();
            $table->double("shipping")->default(0)->nullable();
            $table->string("quotation_pdf_file")->nullable();
            $table->double("grand_total")->default(0)->nullable();
            $table->double("paid_amount")->default(0)->nullable();
            $table->double("due")->default(0)->nullable();
            $table->integer("purchase_status")->default(2)->nullable();
            $table->integer("payment_status")->default(2)->nullable();
            // $table->integer("delivery_status")->default(2)->nullable();
            $table->integer("payment_type")->default(4)->nullable();
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
        Schema::dropIfExists('quotation_to_purchases');
    }
}
