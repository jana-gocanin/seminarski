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
}
