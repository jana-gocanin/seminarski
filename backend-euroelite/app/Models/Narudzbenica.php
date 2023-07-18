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
}
