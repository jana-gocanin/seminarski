<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dobavljac extends Model
{
    protected $table = 'dobavljacs';
    protected $fillable = ['naziv_dobavljaca', 'email_dobavljaca'];
}
