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

        if (!Schema::connection('mysql2')->hasColumn('genres', 'library_id')) {
            Schema::connection('mysql2')->table('genres', function (Blueprint $table) {
                $table->integer("library_id")->after("description")->default(222);
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
