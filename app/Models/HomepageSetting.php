<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HomepageSetting
 *
 * @property int $id
 * @property string $key
 * @property string $value
 * @property string $display_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting ofKey($key)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomepageSetting whereValue($value)
 * @mixin \Eloquent
 */
class HomepageSetting extends Model
{
    use HasFactory;

    public $table = 'homepage_settings';

    public $fillable = [
        'key',
        'value',
        'display_name',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'key'          => 'string',
        'value'        => 'string',
        'display_name' => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'key'          => 'required',
        'value'        => 'required',
        'display_name' => 'required',
    ];

    /**
     * @param  Builder  $query
     * @param  string  $key
     *
     * @return Builder
     */
    public function scopeOfKey(Builder $query, $key)
    {
        return $query->where('key', $key);
    }
}
