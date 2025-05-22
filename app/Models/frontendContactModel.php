<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class frontendContactModel extends Model
{
    use HasFactory;
    public $table = "frontend_contact";
    protected $fillable = ["name", "email", "subject", "notes", "contact_type"];
}
