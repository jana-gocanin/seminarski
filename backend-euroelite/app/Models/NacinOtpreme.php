<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NacinOtpreme extends Model
{
    protected $table = 'nacin_otpremes';
    protected $fillable = ['naziv_nacina'];
}
