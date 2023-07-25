<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StavkaNarudzbenice extends Model
{
    protected $fillable = ['kolicina', 'iznos', 'proizvod_id', 'narudzbenica_id'];



    public function proizvod()
    {
        return $this->belongsTo(Proizvod::class);
    }

    public function narudzbenica()
    {
        return $this->belongsTo(Narudzbenica::class);
    }

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        // Postavljanje vrednosti prosleđenih iz Narudzbenica konstruktora
        $this->attributes['id'] = $attributes['id'] ?? null;
        $this->attributes['narudzbenica_id'] = $attributes['narudzbenica_id'] ?? null;
        $this->attributes['proizvod_id'] = $attributes['proizvod_id'] ?? null;
        $this->attributes['kolicina'] = $attributes['kolicina'] ?? null;

        // Pozivanje funkcije za izračunavanje iznosa stavke
        $this->attributes['iznos'] = $this->izracunajIznosStavke();
        
    }

    public function izracunajIznosStavke()
    {
        // return $this->proizvod->nabavna_cena * $this->kolicina; if ($this->proizvod_id) {
        $proizvod = Proizvod::find($this->proizvod_id);

        // Provera da li je proizvod pronađen pre nego što izračunamo iznos
            if ($proizvod) {
                return $proizvod->nabavna_cena * $this->kolicina;
            }

            return 0;
        }

    }