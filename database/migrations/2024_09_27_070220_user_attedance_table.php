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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('user_id'); // Foreign key for user
            $table->date('attendance_date'); // Date of attendance
            $table->timestamp('login_time')->nullable(); // Login timestamp
            $table->timestamp('logout_time')->nullable(); // Logout timestamp
            $table->timestamps(); // Created and updated timestamps

            // Optionally add foreign key constraint
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
