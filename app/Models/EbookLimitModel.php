<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EbookLimitModel extends Model
{
    use HasFactory;
    protected $table = 'ebook_subscription_limit';
    protected $fillable = ['ebook_id', 'count'];
}
