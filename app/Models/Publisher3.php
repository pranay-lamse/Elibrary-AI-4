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
 * App\Models\Publisher
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BookItem[] $publishers
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BookItem[] $bookItems
 * @property-read int|null $book_items_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Publisher whereIsDefault($value)
 */
class Publisher3 extends Model
{
    use HasFactory;
    protected $connection = 'mysql3';
    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required|unique:publishers,name',
    ];

    public $table = 'publishers';

    public $fillable = [
        'name',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'         => 'integer',
        'name'       => 'string',
    ];

    /**
     * @return HasMany
     */
    public function bookItems()
    {
        return $this->hasMany(BookItem::class, 'publisher_id');
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
                $query->orWhereRaw('lower(name) LIKE ?', [trim(strtolower($keyword))]);
            }
        });

        return $query;
    }
}
