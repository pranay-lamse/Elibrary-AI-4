<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEbookSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ebook_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->integer('ebook_id')->nullable();
            $table->integer('member_id')->nullable();
            $table->string('issued_on')->nullable();
            $table->string('returned_on')->nullable();
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
        Schema::dropIfExists('ebook_subscriptions');
    }
}
