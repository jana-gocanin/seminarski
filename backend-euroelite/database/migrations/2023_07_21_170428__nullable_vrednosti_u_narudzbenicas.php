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
        Schema::table('narudzbenicas', function (Blueprint $table) {
            $table->foreignId('nacin_otpreme_id')->constrained('nacin_otpremes')->change();
            $table->date('datum')->nullable()->change();
            $table->date('rok')->nullable()->change();
            $table->string('ziro_racun')->nullable()->change();
            $table->decimal('ukupno', 8, 2)->nullable()->change();
            $table->foreignId('dobavljac_id')->constrained('dobavljacs')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('narudzbenicas', function (Blueprint $table) {
            // Obrisi dodate kolone i vrati tabelu u originalno stanje
            $table->dropForeign(['nacin_otpreme_id']);
            $table->dropColumn('nacin_otpreme_id');
            $table->dropColumn('datum');
            $table->dropColumn('rok');
            $table->dropColumn('ziro_racun');
            $table->dropColumn('ukupno');
            $table->dropForeign(['dobavljac_id']);
            $table->dropColumn('dobavljac_id');
        });
    }
};
