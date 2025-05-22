<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EbookSubscription extends Model
{
    use HasFactory;
    protected $table = 'ebook_subscriptions';

    protected $fillable = ['ebook_id', 'member_id', 'issued_on', 'returned_on', 'email','razorpay_payment_id','status', 'amount'];

    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    public function items()
    {
        return $this->hasMany(BookItem::class,'id', 'ebook_id');
    }

}
