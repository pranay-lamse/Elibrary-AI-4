<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMemberSettingValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::hasTable('member_settings_values')) {
        Schema::create('member_settings_values', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('member_id');
            $table->unsignedBigInteger('setting_id');
            $table->string('value');
            $table->timestamps();

            $table->foreign('member_id')->references('id')->on('members')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('setting_id')->references('id')->on('member_settings')
                ->onDelete('cascade')
                ->onUpdate('cascade');
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
        Schema::dropIfExists('member_settings_values');
    }
}
