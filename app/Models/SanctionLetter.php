<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanctionLetter extends Model
{
    use HasFactory;
    public $table = "sanction_letters";
    protected $fillable = ["subject", "letter_status", "pdf_file", "description"];
}
