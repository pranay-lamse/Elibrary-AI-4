<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnPurchaseIdToExpenses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('expenses', 'purchase_id')) {
            Schema::table('expenses', function (Blueprint $table) {
                $table->addColumn("integer", "purchase_id")->after("warehouse_id")->nullable(false);
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
        Schema::table('expenses', function (Blueprint $table) {
            $table->removeColumn("purchase_id");
        });
    }
}
