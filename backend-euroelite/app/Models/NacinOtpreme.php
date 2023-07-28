<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NacinOtpreme extends Model
{
    protected $table = 'nacin_otpremes';
    protected $fillable = ['naziv_nacina'];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        // Provera da li je prosleđen naziv i postavljanje vrednosti polja 'naziv_nacina'
        if (isset($attributes['naziv'])) {
            $this->naziv_nacina = $attributes['naziv'];
        }
    }
}
