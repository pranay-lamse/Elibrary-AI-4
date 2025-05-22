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
        Schema::table('membership_plans', function (Blueprint $table) {
            $table->addColumn('float', 'deposit')->after('price')->nullable()->default(0.00);
            $table->addColumn('float', 'renewal_price')->after('deposit')->nullable()->default(0.00);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('membership_plans', function (Blueprint $table) {
            if (Schema::hasColumn('membership_plans', 'deposit')) {
                $table->dropColumn(['deposit', 'renewal_price']);
            }
        });
    }
};
