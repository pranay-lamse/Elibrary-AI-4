<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::hasTable('members')) {
        Schema::create('members', function (Blueprint $table) {
            $table->increments('id');
            $table->string('member_id')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedInteger('membership_plan_id');
            $table->string('phone')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(0);
            $table->string('activation_code')->nullable();
            $table->string('email_verified_at')->nullable();
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
        Schema::drop('members');
    }
}
