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
 * Class BookLanguage
 *
 * @version June 19, 2019, 9:49 am UTC
 * @property string language_name
 * @property string language_code
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereLanguageCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereLanguageName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BookItem[] $bookItems
 * @property-read int|null $book_items_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BookLanguage whereIsDefault($value)
 */
class BookAuthors3 extends Model
{
    use HasFactory;

    /**
     * Validation rules
     *
     * @var array
     */

     protected $connection = 'mysql3';
    public $table = 'book_authors';

    public $fillable = [
        'book_id',
        'author_id',
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */


    /**
     * @return HasMany
     */
    /* public function bookItems()
    {
        return $this->hasMany(BookItem::class, 'language_id');
    } */
}
