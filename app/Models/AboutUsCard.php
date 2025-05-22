<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Model as Model;

/**
 * App\Models\AboutUs
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard query()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutUsCard whereUpdatedAt($value)
 * @mixin Eloquent
 */
class AboutUsCard extends Model
{
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'title' => 'required',
    ];

    public $table = 'about_us_cards';

    public $fillable = [
        'title',
        'description',
        'is_active',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'          => 'integer',
        'title'       => 'string',
        'description' => 'string',
        'is_active'   => 'boolean',
    ];
}
