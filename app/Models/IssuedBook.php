<?php

namespace App\Models;

use App\User;
use Carbon\Carbon;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\IssuedBook
 *
 * @property int $id
 * @property int $book_item_id
 * @property int $member_id
 * @property string $reserve_date
 * @property string $issued_on
 * @property string $return_due_date
 * @property string $note
 * @property string $return_date
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static Builder|IssuedBook newModelQuery()
 * @method static Builder|IssuedBook newQuery()
 * @method static Builder|IssuedBook query()
 * @method static Builder|IssuedBook whereBookItemId($value)
 * @method static Builder|IssuedBook whereCreatedAt($value)
 * @method static Builder|IssuedBook whereId($value)
 * @method static Builder|IssuedBook whereIssuedOn($value)
 * @method static Builder|IssuedBook whereMemberId($value)
 * @method static Builder|IssuedBook whereNote($value)
 * @method static Builder|IssuedBook whereReserveDate($value)
 * @method static Builder|IssuedBook whereReturnDate($value)
 * @method static Builder|IssuedBook whereReturnDueDate($value)
 * @method static Builder|IssuedBook whereStatus($value)
 * @method static Builder|IssuedBook whereUpdatedAt($value)
 * @mixin Eloquent
 * @property-read BookItem $bookItem
 * @property-read Book $book
 * @property-read BookLanguage|null $language
 * @property-read Member $member
 * @method static Builder|IssuedBook reserve()
 * @method static Builder|IssuedBook ofMember($memberId)
 * @method static Builder|IssuedBook ofBookItem($bookItemId)
 * @property int|null $issuer_id
 * @property int|null $returner_id
 * @method static Builder|IssuedBook whereIssuerId($value)
 * @method static Builder|IssuedBook whereReturnerId($value)
 * @property-read string|null $issuer_name
 * @property-read string|null $returner_name
 * @property-read User|null $issuer
 * @property-read User|null $returner
 * @property-read mixed $issue_due_date
 * @property-read mixed $expected_available_date
 * @method static Builder|IssuedBook lastIssuedBook()
 * @method static Builder|IssuedBook overDue()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook issued()
 * @property-read Collection|Author[] $authors
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\IssuedBook onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook reserveDue()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IssuedBook whereDeletedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\IssuedBook withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\IssuedBook withoutTrashed()
 */
class IssuedBook extends Model
{
    use HasFactory;
    use SoftDeletes;

    const STATUS_RESERVED = 1;

    const STATUS_ISSUED = 2;

    const STATUS_RETURNED = 3;

    const STATUS_AVAILABLE = 4;

    const STATUS_UN_RESERVED = 5;

    const STATUS_LOST = 6;

    const STATUS_DAMAGED = 7;

    const STATUS_ARCHIVED = 'archived';

    const STATUS = [
        1 => 'Reserved',
        2 => 'Issued',
        3 => 'Returned',
        4 => 'Available',
        5 => 'Un Reserved',
        6 => 'Lost',
        7 => 'Damaged',
    ];

    const STATUS_IN_STRING = ['issued', 'reserved', 'returned', 'unreserved', 'lost', 'damaged'];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'member_id' => 'required|numeric',
        'status'    => 'required|numeric',
    ];

    public $table = 'issued_books';

    protected $appends = ['issue_due_date'];

    public $fillable = [
        'book_item_id',
        'member_id',
        'reserve_date',
        'issued_on',
        'return_due_date',
        'note',
        'return_date',
        'status',
        'issuer_id',
        'returner_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'           => 'integer',
        'book_item_id' => 'integer',
        'member_id'    => 'integer',
        'reserve_date' => 'datetime',
        'issued_on'    => 'datetime',
        'note'         => 'string',
        'return_date'  => 'datetime',
        'status'       => 'integer',
        'issuer_id'    => 'integer',
        'returner_id'  => 'integer',
    ];

    /**
     * @return BelongsTo
     */
    public function bookItem()
    {
        return $this->belongsTo(BookItem::class, 'book_item_id');
    }

    /**
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function scopeReserve(Builder $query)
    {
        return $query->where('status', self::STATUS_RESERVED);
    }

    /**
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function scopeIssued(Builder $query)
    {
        return $query->where('status', self::STATUS_ISSUED);
    }

    /**
     * @return BelongsTo
     */
    public function issuer()
    {
        return $this->belongsTo(User::class, 'issuer_id');
    }

    /**
     * @return BelongsTo
     */
    public function returner()
    {
        return $this->belongsTo(User::class, 'returner_id');
    }

    /**
     * @return BelongsTo
     */
    public function member()
    {
        return $this->belongsTo(Member::class, 'member_id');
    }

    /**
     * @param  int  $memberId
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function scopeOfMember(Builder $query, $memberId)
    {
        return $query->where('member_id', $memberId);
    }

    /**
     * @return string
     */
    public function getIssuerNameAttribute()
    {
        if (! empty($this->issuer_id)) {
            return $this->issuer->first_name.' '.$this->issuer->last_name;
        }
    }

    /**
     * @return string
     */
    public function getReturnerNameAttribute()
    {
        if (! empty($this->returner_id)) {
            return $this->returner->first_name.' '.$this->returner->last_name;
        }
    }

    /**
     * @return array
     */
    public function apiObj()
    {
        $record = $this->toArray();
        $record['issuer_name'] = $this->issuer_name;
        $record['returner_name'] = $this->returner_name;

        if (isset($record['book_item']['last_issued_book'])) {
            $record['expected_available_date'] = $this->getExpectedAvailableDate($record['book_item']['last_issued_book']);
        }
        unset($record['issuer']);
        unset($record['returner']);

        return $record;
    }

    /**
     * @param  int  $lastIssuedBook
     * @return mixed|null
     */
    public function getExpectedAvailableDate($lastIssuedBook)
    {
        if (empty($lastIssuedBook)) {
            return null;
        }

        if ($lastIssuedBook['status'] == self::STATUS_RESERVED) {
            $returnDueDays = getSettingValueByKey(Setting::RETURN_DUE_DAYS);

            return Carbon::now()->addDays($returnDueDays)->toDateTimeString();
        }
        if ($lastIssuedBook['status'] == self::STATUS_ISSUED) {
            return $lastIssuedBook['return_due_date'];
        }
    }

    /**
     * @return mixed
     */
    public function getIssueDueDateAttribute()
    {
        if ($this->status == self::STATUS_RESERVED) {
            $reserveDueDays = getSettingValueByKey(Setting::RESERVE_DUE_DAYS);

            return Carbon::parse($this->reserve_date)->addDays($reserveDueDays)->toDateTimeString();
        }
    }

    /**
     * @param  int  $bookItemId
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function scopeOfBookItem(Builder $query, $bookItemId)
    {
        return $query->where('book_item_id', $bookItemId);
    }

    /**
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function scopeLastIssuedBook(Builder $query)
    {
        return $query->where('status', '!=', self::STATUS_RETURNED);
    }

    /**
     * @param  string  $statusInString
     *
     * @return int|null
     */
    public static function getStatusFromString($statusInString)
    {
        $status = null;
        switch ($statusInString) {
            case 'issued':
                $status = self::STATUS_ISSUED;
                break;
            case 'returned':
                $status = self::STATUS_RETURNED;
                break;
            case 'reserved':
                $status = self::STATUS_RESERVED;
                break;
            case 'unreserved':
                $status = self::STATUS_UN_RESERVED;
                break;
            case 'lost':
                $status = self::STATUS_LOST;
                break;
            case 'damaged':
                $status = self::STATUS_DAMAGED;
                break;
        }

        return $status;
    }

    public function scopeOverDue(Builder $query)
    {
        $now = Carbon::now()->toDateString();

        return $query->where('status', self::STATUS_ISSUED)
            ->whereRaw('DATE(return_due_date) < ?', [$now]);
    }

    /**
     * @param  Builder  $query
     *
     * @return Builder|\Illuminate\Database\Query\Builder
     */
    public function scopeReserveDue(Builder $query)
    {
        $today = Carbon::today()->toDateString();

        return $query->whereRaw('DATE(reserve_date) <= ?', [$today])
            ->where('status', self::STATUS_RESERVED);
    }

    /**
     * @return array
     */
    public function apiM1Obj()
    {
        return [
            'id'                      => $this->id,
            'status'                  => $this->status,
            'expected_available_date' => $this->expected_available_date,
        ];
    }

    /**
     * @return array
     */
    public function apiM1BookHistoryObj()
    {
        $record = [
            'id'           => $this->id,
            'book_code'    => $this->bookItem->book_code,
            'book_name'    => $this->bookItem->book->name,
            'book_item_id' => $this->bookItem->id,
            'image'        => $this->bookItem->book->image,
            'status'       => $this->status,
        ];

        return $record;
    }

    /**
     * @return array
     */
    public function apiM1BookHistoryDetailObj()
    {
        $record = [
            'id'              => $this->id,
            'book_code'       => $this->bookItem->book_code,
            'book_name'       => $this->bookItem->book->name,
            'image'           => $this->bookItem->book->image,
            'status'          => $this->status,
            'edition'         => $this->bookItem->edition,
            'issue_due_date'  => $this->issue_due_date,
            'reserve_date'    => Carbon::parse($this->reserve_date)->toDateTimeString(),
            'return_date'     => $this->return_date,
            'return_due_date' => $this->return_due_date,
            'issue_date'      => $this->issued_on,
            'language_name'   => $this->bookItem->language->language_name,
        ];
        $record['expected_available_date'] = $this->expected_available_date;

        return $record;
    }
}
