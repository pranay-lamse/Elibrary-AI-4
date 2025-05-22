<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResourceCategoryModel extends Model
{
    use HasFactory;
    public $table = "resource_category";
    public $fillable = ['name'];
}
