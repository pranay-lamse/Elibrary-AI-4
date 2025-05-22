<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

/**
 * Class MemberSetting
 *
 * @property int $id
 * @property string $key
 * @property string $default_value
 * @property string $display_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting whereDefaultValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\MemberSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\MemberSettingValue[] $customSetting
 * @property-read int|null $custom_setting_count
 */
class MemberSetting extends Model
{
    protected $table = 'member_settings';

    protected $fillable = [
        'key',
        'default_value',
        'display_name',
    ];

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
        'key'   => 'required',
        'value' => 'required',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function customSetting()
    {
        return $this->hasMany(MemberSettingValue::class, 'setting_id')->where('member_id', Auth::id());
    }
}
