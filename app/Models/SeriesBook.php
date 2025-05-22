<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * App\Models\SeriesBook
 *
 * @property int $id
 * @property int $series_id
 * @property int $book_id
 * @property int $sequence
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static Builder|SeriesBook newModelQuery()
 * @method static Builder|SeriesBook newQuery()
 * @method static Builder|SeriesBook query()
 * @method static Builder|SeriesBook whereBookId($value)
 * @method static Builder|SeriesBook whereCreatedAt($value)
 * @method static Builder|SeriesBook whereId($value)
 * @method static Builder|SeriesBook whereSequence($value)
 * @method static Builder|SeriesBook whereSeriesId($value)
 * @method static Builder|SeriesBook whereUpdatedAt($value)
 * @property-read Collection|Book[] $book[]
 * @mixin Eloquent
 */
class SeriesBook extends Model
{
    use HasFactory;

    public $table = 'series_books';

    public $fillable = [
        'series_id',
        'book_id',
        'sequence',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'        => 'integer',
        'series_id' => 'integer',
        'book_id'   => 'integer',
        'sequence'  => 'integer',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'series_id' => 'required',
        'book_id'   => 'required',
        'sequence'  => 'required',
    ];

    /**
     * @return BelongsTo
     */
    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function items()
    {
        return $this->hasMany(BookItem::class, 'book_id', 'id');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'book_tags', 'book_id', 'tag_id');
    }

    /**
     * @return BelongsToMany
     */
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'book_genres', 'book_id', 'genre_id');
    }
}
