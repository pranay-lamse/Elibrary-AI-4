<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Class Penalty
 *
 * @property int $id
 * @property int|null $member_id
 * @property int|null $book_item_id
 * @property float $collected_penalty
 * @property float $actual_penalty
 * @property string $notes
 * @property \Illuminate\Support\Carbon $collected_at
 * @property int|null $collected_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereBookItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCollectedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCollectedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereActualPenalty($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty wherePenaltyCollected($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\BookItem|null $bookItem
 * @property-read mixed $book_item_name
 * @property-read mixed $member_name
 * @property-read \App\Models\Member|null $member
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereCollectedPenalty($value)
 * @property int|null $issued_book_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Penalty whereIssuedBookId($value)
 * @property-read \App\User|null $collectedBy
 * @property-read mixed $collected_by_name
 */
class Penalty3 extends Model
{
    protected $connection = 'mysql3';
    /**
     * @var string
     */
    public $table = 'penalties';

    /**
     * @var array
     */
    protected $appends = ['member_name', 'book_item_name', 'collected_by_name'];

    /**
     * @var array
     */
    protected $fillable = [
        'member_id',
        'book_item_id',
        'actual_penalty',
        'collected_penalty',
        'notes',
        'collected_at',
        'collected_by',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'member_id'         => 'integer',
        'book_item_id'      => 'integer',
        'actual_penalty'    => 'double',
        'collected_penalty' => 'double',
        'notes'             => 'string',
        'collected_at'      => 'datetime',
        'collected_by'      => 'integer',
    ];

    /**
     * @return BelongsTo
     */
    public function member()
    {
        return $this->belongsTo(Member3::class, 'member_id');
    }

    /**
     * @return BelongsTo
     */
    public function bookItem()
    {
        return $this->belongsTo(BookItem3::class, 'book_item_id');
    }

    /**
     * @return mixed
     */
    public function getMemberNameAttribute()
    {
        return $this->member->full_name;
    }

    /**
     * @return BelongsTo
     */
    public function collectedBy()
    {
        return $this->belongsTo(User::class, 'collected_by');
    }

    public function getCollectedByNameAttribute()
    {
        return $this->collectedBy->full_name;
    }

    /**
     * @return mixed
     */
    public function getBookItemNameAttribute()
    {
        return $this->bookItem->book_item_name;
    }
}
