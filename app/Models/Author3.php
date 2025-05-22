<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Author
 *
 * @property int $id
 * @property string $first_name
 * @property string|null $last_name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Book[] $books
 * @property-read int|null $books_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Author whereIsDefault($value)
 */
class Author3 extends Model
{

    protected $connection = 'mysql3';

    public $table = 'authors';

    protected $appends = ['full_name'];

    public $fillable = [
        'first_name',
        'last_name',
        'description',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [

        'first_name'  => 'string',
        'last_name'   => 'string',
        'description' => 'string',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'first_name' => 'required',
    ];

    /**
     * @return BelongsToMany
     */
    public function books()
    {
        return $this->belongsToMany(Book::class, 'book_authors', 'author_id', 'book_id');
    }

    /**
     * @param  Builder  $query
     * @param  array  $keywords
     *
     * @return mixed
     */
    public static function filterByKeywords(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('lower(first_name) LIKE ?', ['%' . strtolower(trim($keyword)) . '%']);
                $query->orWhereRaw('lower(last_name) LIKE ?', ['%' . strtolower(trim($keyword)) . '%']);
            }
        });

        return $query;
    }

    /**
     * @param  Builder  $query
     * @param $keywords
     *
     * @return mixed
     */
    public static function filterById(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('authors.id = ?', [trim($keyword)]);
            }
        });

        return $query;
    }

    /**
     * @param  Builder  $query
     * @param  array  $keywords
     *
     * @return mixed
     */
    public static function filterByName(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('LOWER(first_name) LIKE ?', [trim(strtolower($keyword)) . '%'])->orWhereRaw('LOWER(last_name) LIKE ?', [trim(strtolower($keyword)) . '%']);
            }
        });

        return $query;
    }

    public function getFullNameAttribute($value)
    {
        return ucfirst($this->first_name) . ' ' . ucfirst($this->last_name);
    }
}
