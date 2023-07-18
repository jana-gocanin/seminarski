<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proizvod extends Model
{
    protected $table = 'proizvods';
    protected $fillable = [ 'naziv_proizvoda', 'nabavna_cena', 'opis'];
}
