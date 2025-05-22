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
        if (!Schema::connection('mysql2')->hasColumn('transactions', 'book_status_created_at')) {
            Schema::connection('mysql2')->table('transactions', function (Blueprint $table) {
                $table->string("book_status")->nullable();
                $table->string("ebook_status")->nullable();
                $table->string("library_status")->nullable();
                $table->string("book_status_created_at")->nullable();
                $table->string("ebook_status_created_at")->nullable();
                $table->string("library_status_created_at")->nullable();
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
