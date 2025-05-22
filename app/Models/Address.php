<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;

/**
 * App\Models\Address
 *
 * @property int $id
 * @property int $owner_id
 * @property string $owner_type
 * @property string $address_1
 * @property string|null $address_2
 * @property string $city
 * @property string $state
 * @property int $zip
 * @property string|null $country_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection|Address[] $owner
 * @property-read Country|null $country
 * @method static Builder|Address newModelQuery()
 * @method static Builder|Address newQuery()
 * @method static Builder|Address query()
 * @method static Builder|Address whereAddress1($value)
 * @method static Builder|Address whereAddress2($value)
 * @method static Builder|Address whereCity($value)
 * @method static Builder|Address whereCountryId($value)
 * @method static Builder|Address whereCreatedAt($value)
 * @method static Builder|Address whereId($value)
 * @method static Builder|Address whereOwnerId($value)
 * @method static Builder|Address whereOwnerType($value)
 * @method static Builder|Address whereState($value)
 * @method static Builder|Address whereUpdatedAt($value)
 * @method static Builder|Address whereZip($value)
 * @mixin Eloquent
 */
class Address extends Model
{
    use HasFactory;

    public $table = 'addresses';

    public $fillable = [
        'address_1',
        'address_2',
        'city',
        'state',
        'zip',
        'country_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'         => 'integer',
        'address_1'  => 'string',
        'address_2'  => 'string',
        'city'       => 'string',
        'state'      => 'string',
        'zip'        => 'integer',
        'country_id' => 'string',
    ];

    /**
     * @return MorphTo
     */
    public function owner()
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo
     */
    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    /**
     * @return array
     */
    public function apiM1AddressObj()
    {
        $record = [
            'address_1'  => $this->address_1,
            'address_2'  => $this->address_2,
            'city'       => $this->city,
            'state'      => $this->state,
            'country'      => $this->country->name,
            'country_id' => $this->country_id,
            'zip'        => $this->zip,
        ];

        return $record;
    }
}
