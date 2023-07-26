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
            $table->foreignId('nacin_otpreme_id')->constrained('nacin_otpremes')->default(1);
            $table->date('datum')->nullable();
            $table->date('rok')->nullable();
            $table->string('ziro_racun')->nullable();
            $table->decimal('ukupno', 8, 2)->nullable();
            $table->foreignId('dobavljac_id')->constrained('dobavljacs')->default(1);
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
