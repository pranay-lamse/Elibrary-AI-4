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
        if (!Schema::connection('mysql3')->hasColumn('transactions', 'start_date')) {
            Schema::connection('mysql3')->table('transactions', function (Blueprint $table) {
                $table->dateTime('start_date')->nullable();
                $table->dateTime('end_date')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
