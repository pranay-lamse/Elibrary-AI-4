<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EbookLimitModel3 extends Model
{
    use HasFactory;
    protected $connection = 'mysql3';
    protected $table = 'ebook_subscription_limit';
    protected $fillable = ['ebook_id', 'count'];
}
