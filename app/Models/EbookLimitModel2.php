<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EbookLimitModel2 extends Model
{
    use HasFactory;
    protected $connection = 'mysql2';

    protected $table = 'ebook_subscription_limit';

    protected $fillable = ['ebook_id', 'count'];
}
