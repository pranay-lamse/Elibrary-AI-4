<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnPdfPreviewFileToBookItems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('book_items', 'pdf_preview_file')) {
            Schema::table('book_items', function (Blueprint $table) {
                $table->string('pdf_preview_file')->after('rack_number')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('book_items', function (Blueprint $table) {
            //
        });
    }
}
