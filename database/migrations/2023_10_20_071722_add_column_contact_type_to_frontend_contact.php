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
        Schema::table('frontend_contact', function (Blueprint $table) {
            $table->addColumn('integer', 'contact_type')->after('notes')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('frontend_contact', function (Blueprint $table) {
            if (Schema::hasColumn('frontend_contact', 'contact_type')) {
                $table->dropColumn('contact_type');
            }
        });
    }
};
