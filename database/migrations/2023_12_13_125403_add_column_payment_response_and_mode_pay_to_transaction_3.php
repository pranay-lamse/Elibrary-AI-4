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
        if (Schema::connection('mysql3')->hasTable('books')) {
            Schema::connection('mysql3')->table('books', function (Blueprint $table) {
                // Check and add the transfer_status column if it doesn't exist
                if (!Schema::connection('mysql3')->hasColumn('books', 'transfer_status')) {
                    $table->string("transfer_status")->nullable();
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
