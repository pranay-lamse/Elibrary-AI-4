<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\MemberSettingValue
 *
 * @property int $id
 * @property int $member_id
 * @property int $setting_id
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue whereSettingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSettingValue whereValue($value)
 * @mixin \Eloquent
 */
class MemberSettingValue extends Model
{
    protected $table = 'member_settings_values';

    protected $fillable = [
        'member_id',
        'setting_id',
        'value',
    ];

    protected $casts = [
        'member_id'  => 'integer',
        'setting_id' => 'integer',
        'value'      => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'value' => 'required',
    ];
}
