<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResourceModel extends Model
{
    use HasFactory;
    public $table = "resources";
    protected $fillable = [
        "title",
        "category_id",
        "file_content",
        "url",
        "note"
    ];
}
