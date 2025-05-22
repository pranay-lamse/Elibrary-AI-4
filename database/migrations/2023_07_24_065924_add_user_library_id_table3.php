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
        if (!Schema::connection('mysql3')->hasColumn('members', 'user_library_id')) {
            Schema::connection('mysql3')->table('members', function (Blueprint $table) {
                $table->integer("user_library_id")->after("phone")->default(333);
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
