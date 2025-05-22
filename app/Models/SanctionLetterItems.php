<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanctionLetterItems extends Model
{
    use HasFactory;
    public $table = "sanction_letter_items";
    protected $fillable = ["letter_id", "category", "name", "quantity", "price", "notes"];
}
