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
        Schema::table('book_items', function (Blueprint $table) {
            $table->addColumn('integer', 'transfer_status')->after('pdf_preview_file')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('book_items', function (Blueprint $table) {
            if (Schema::hasColumn('book_items', 'transfer_status')) {
                $table->dropColumn('transfer_status');
            }
        });
    }
};
