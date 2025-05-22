<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use Str;

/**
 * App\Models\MembershipPlan
 *
 * @property int $id
 * @property string $name
 * @property float $price
 * @property string $description
 * @property int $frequency
 * @property string $slug
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|MembershipPlan newModelQuery()
 * @method static Builder|MembershipPlan newQuery()
 * @method static Builder|MembershipPlan query()
 * @method static Builder|MembershipPlan whereCreatedAt($value)
 * @method static Builder|MembershipPlan whereDescription($value)
 * @method static Builder|MembershipPlan whereFrequency($value)
 * @method static Builder|MembershipPlan whereId($value)
 * @method static Builder|MembershipPlan whereName($value)
 * @method static Builder|MembershipPlan wherePrice($value)
 * @method static Builder|MembershipPlan whereSlug($value)
 * @method static Builder|MembershipPlan whereStripePlanId($value)
 * @method static Builder|MembershipPlan whereUpdatedAt($value)
 * @mixin Eloquent
 * @property string $membership_plan_id
 * @property-read \App\Models\Member $member
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereMembershipPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MembershipPlan whereIsDefault($value)
 */
class MembershipPlan2 extends Model
{
    use HasFactory;

    const MONTHLY_FREQUENCY = 1;
    protected $connection = 'mysql2';
    const YEARLY_FREQUENCY = 2;
    const LIFETIME = 3;

    public $table = 'membership_plans';

    public $fillable = [
        'name',
        'price',
        'description',
        'frequency',
        'slug',
        'num_books_borrow',
        'deposit',
        'renewal_price',
        'library_status',
        'ebook_status',
        'book_status'

    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'               => 'integer',
        'name'             => 'string',
        'price'            => 'float',
        'description'      => 'string',
        'frequency'        => 'integer',
        'slug'             => 'string',
        'num_books_borrow' => 'integer',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name'      => 'required',
        'price'     => 'required',
        'frequency' => 'required',
    ];

    public static function boot()
    {
        parent::boot();

        self::creating(function (self $model) {
            $model->slug = Str::slug($model->name);
        });
    }

    /**
     * @return HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'membership_plan_id');
    }

    /**
     * @return HasOne
     */
    public function plan(): HasOne
    {
        return $this->hasOne(Subscription::class)->latest();
    }

    /**
     * @return HasMany
     */
    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class, 'plan_id');
    }

    /**
     * @return HasMany
     */
    public function activeSubscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class, 'plan_id')
            ->where('status', Subscription::ACTIVE);
    }
}
