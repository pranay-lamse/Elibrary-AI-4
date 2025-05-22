<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\BookSeries
 *
 * @property int $id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SeriesBook[] $seriesItems
 * @property-read int|null $series_items_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookSeries whereIsDefault($value)
 */
class BookSeries extends Model
{
    use HasFactory;

    public $table = 'book_series';

    public $fillable = [
        'title',
        'cover'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'         => 'integer',
        'title'      => 'string',
        'cover'      => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'title' => 'required|unique:book_series,title',
    ];

    /**
     * @return HasMany
     */
    public function seriesItems()
    {
        return $this->hasMany(SeriesBook::class, 'series_id')->orderBy('sequence');
    }
}
