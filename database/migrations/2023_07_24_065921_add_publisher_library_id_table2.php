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

        if (!Schema::connection('mysql2')->hasColumn('publishers', 'library_id')) {
            Schema::connection('mysql2')->table('publishers', function (Blueprint $table) {
                $table->integer("library_id")->after("name")->default(222);
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
