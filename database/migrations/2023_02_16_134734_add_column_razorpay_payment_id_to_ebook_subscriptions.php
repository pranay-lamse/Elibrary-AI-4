<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnRazorpayPaymentIdToEbookSubscriptions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ebook_subscriptions', function (Blueprint $table) {
            $table->string("razorpay_payment_id")->after("member_id")->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ebook_subscriptions', function (Blueprint $table) {
            //
        });
    }
}
