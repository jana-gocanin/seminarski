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
        Schema::create('stavka_narudzbenices', function (Blueprint $table) {
            $table->id();
            $table->integer('kolicina');
            $table->decimal('iznos', 8, 2);
            $table->foreignId('proizvod_id')->constrained('proizvods');
            $table->foreignId('narudzbenica_id')->constrained('narudzbenicas');
            $table->timestamps();

            // Dodajemo primarni ključ koji se sastoji od 'id' i 'narudzbenica_id'
            $table->primary(['id', 'narudzbenica_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stavka_narudzbenices');
    }
};
