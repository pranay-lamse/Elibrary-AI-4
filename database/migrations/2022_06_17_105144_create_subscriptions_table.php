<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::hasTable('subscriptions')) {
        Schema::create('subscriptions',function (Blueprint$table){
            $table->id();
            $table->integer('member_id')->unsigned();
            $table->integer('plan_id')->unsigned();
            $table->integer('transaction_id')->nullable();
            $table->double('plan_amount')->default(0);
            $table->integer('plan_frequency');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->dateTime('trial_ends_at');
            $table->boolean('status')->default(0);
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('members')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreign('plan_id')->references('id')->on('membership_plans')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
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
        Schema::dropIfExists('subscriptions');
    }
}
