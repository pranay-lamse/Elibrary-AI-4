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
        if (!Schema::hasColumn('ebook_subscriptions', 'library_id')) {
            Schema::table('ebook_subscriptions', function (Blueprint $table) {
                $table->integer("library_id")->after("amount")->default(111);
            });
        }
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ebook_subscriptions', function (Blueprint $table) {
            $table->removeColumn("library_id");
        });
    }
};
