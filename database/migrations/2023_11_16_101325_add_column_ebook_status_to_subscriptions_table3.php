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
        if (!Schema::connection('mysql3')->hasColumn('subscriptions', 'book_status')) {
            Schema::connection('mysql3')->table('subscriptions', function (Blueprint $table) {
                $table->string("book_status")->nullable();
                $table->string("ebook_status")->nullable();
                $table->string("library_status")->nullable();
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
