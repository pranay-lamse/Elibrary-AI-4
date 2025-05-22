<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('subscriptions', 'second_member_name')) {
            Schema::table('subscriptions', function (Blueprint $table) {
                $table->string("second_member_name")->nullable();
                $table->string("third_member_name")->nullable();
                $table->string("forth_member_name")->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->removeColumn("second_member_name");
        });
    }
};
