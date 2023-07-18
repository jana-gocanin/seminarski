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
        Schema::create('narudzbenicas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nacin_otpreme_id')->constrained('nacin_otpremes');
            $table->date('datum');
            $table->date('rok');
            $table->string('ziro_racun');
            $table->decimal('ukupno', 8, 2);
            $table->foreignId('dobavljac_id')->constrained('dobavljacs');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('narudzbenicas');
    }
};
