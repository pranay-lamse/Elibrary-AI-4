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


        if (Schema::connection('mysql2')->hasTable('transactions')) {
            Schema::connection('mysql2')->table('transactions', function (Blueprint $table) {
                // Check and add the payment_response column if it doesn't exist
                if (!Schema::connection('mysql2')->hasColumn('transactions', 'payment_response')) {
                    $table->string("payment_response")->nullable();
                }

                // Check and add the mode_pay column if it doesn't exist
                if (!Schema::connection('mysql2')->hasColumn('transactions', 'mode_pay')) {
                    $table->string("mode_pay")->nullable();
                }
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
