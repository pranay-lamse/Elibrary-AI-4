<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteVisitCounter extends Model
{
    use HasFactory;

    public $table = 'site_visit_counters';

    public $fillable = [
        'count',
    ];
}
