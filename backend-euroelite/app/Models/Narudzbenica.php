<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Narudzbenica extends Model
{
    protected $fillable = ['nacin_otpreme_id', 'datum', 'rok', 'ziro_racun', 'ukupno', 'dobavljac_id'];

    public function nacinOtpreme()
    {
        return $this->belongsTo(NacinOtpreme::class);
    }

    public function dobavljac()
    {
        return $this->belongsTo(Dobavljac::class);
    }

    public function stavke()
    {
        return $this->hasMany(StavkaNarudzbenice::class);
    }
//metode
    public function izmeni($redniBroj, $novaKolicina)
    {
        $stavka = $this->stavke->firstWhere('id', $redniBroj);
        
        if ($stavka) {
            $stavka->kolicina = $novaKolicina;
            $stavka->save();
        }
    }

    public function obrisi($redniBroj)
    {
        $stavka = $this->stavke->firstWhere('id', $redniBroj);
        
        if ($stavka) {
            $stavka->delete();
        }
    }

    public function postaviNacinOtpreme($nacinOtpremeId)
    {
        $nacinOtpreme = NacinOtpreme::find($nacinOtpremeId);
        
        if ($nacinOtpreme) {
            $this->nacinOtpreme()->associate($nacinOtpreme);
            $this->save();
        }
    }

    


}

