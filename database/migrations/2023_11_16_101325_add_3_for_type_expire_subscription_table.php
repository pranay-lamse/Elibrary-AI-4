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
        if (!Schema::hasColumn('subscriptions', 'book_status_created_at')) {
            Schema::table('subscriptions', function (Blueprint $table) {
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
        Schema::table('books', function (Blueprint $table) {
            $table->removeColumn("transfer_status");
        });
    }
};
