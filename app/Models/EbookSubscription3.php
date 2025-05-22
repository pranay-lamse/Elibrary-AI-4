<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Member3;
use App\Models\BookItem3;
class EbookSubscription3 extends Model
{
    use HasFactory;
    protected $connection = 'mysql3';
    protected $table = 'ebook_subscriptions';
    protected $fillable = ['ebook_id', 'member_id', 'issued_on', 'returned_on', 'email','razorpay_payment_id','status', 'amount'];

    public function member()
    {
        return $this->belongsTo(Member3::class, 'member_id');
    }
    public function items()
    {
        return $this->hasMany(BookItem3::class,'id', 'ebook_id');
    }
}
