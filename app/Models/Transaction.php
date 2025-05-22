<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Transaction
 *
 * @property int $id
 * @property int $member_id
 * @property int $transaction_id
 * @property int $plan_id
 * @property int $payment_mode
 * @property float $amount
 * @property bool|null $status
 * @property array|null $meta
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Member $member
 * @property-read \App\Models\MembershipPlan $membershipPlan
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction wherePaymentMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction wherePlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Transaction whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Transaction extends Model
{
    protected $table = 'transactions';

    public $fillable = ['member_id', 'transaction_id', 'plan_id', 'payment_mode', 'amount', 'status', 'meta','payment_response','mode_pay', 'payment_method_type','book_status',
'ebook_status',
'library_status',
'book_status_created_at',
'ebook_status_created_at',
'library_status_created_at','start_date',
'end_date'];

    protected $casts = [
        'meta'   => 'json',
        'status' => 'boolean',
    ];

    public const TYPE_RAZORPAY = 1;
    public const TYPE_ONLINE = 1;
    public const TYPE_OFFLINE = 2;

    /**
     * @return BelongsTo
     */
    public function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(MembershipPlan::class, 'plan_id', 'id');
    }

    /**
     * @return BelongsTo
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class, 'member_id');
    }
}
