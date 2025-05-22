<?php

namespace App\Models;

use App\Traits\ImageTrait;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model as Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use phpDocumentor\Reflection\Types\Nullable;
use Config;
use App\Models\BookItem2;
use App\Models\Tag2;
use App\Models\Genre2;
use App\Models\Author2;



/**
 * App\Models\Book
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string|Nullable $image
 * @property Carbon $published_on
 * @property string $isbn
 * @property string $url
 * @property bool $is_featured
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection|Genre[] $genres
 * @property-read Collection|Tag[] $tags
 * @property-read Collection|BookItem[] $items
 * @method static Builder|Book newModelQuery()
 * @method static Builder|Book newQuery()
 * @method static Builder|Book query()
 * @method static Builder|Book whereCreatedAt($value)
 * @method static Builder|Book whereDescription($value)
 * @method static Builder|Book whereId($value)
 * @method static Builder|Book whereImage($value)
 * @method static Builder|Book whereIsFeatured($value)
 * @method static Builder|Book whereIsbn($value)
 * @method static Builder|Book whereName($value)
 * @method static Builder|Book wherePublishedOn($value)
 * @method static Builder|Book whereUpdatedAt($value)
 * @method static Builder|Book whereUrl($value)
 * @mixin Eloquent
 * @property-read string $image_path
 * @property-read string $authors_name
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Author[] $authors
 * @property-read int|null $authors_count
 * @property-read int|null $genres_count
 * @property-read int|null $items_count
 * @property-read int|null $tags_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Book whereIsDefault($value)
 */
class Book2 extends Model
{
    use HasFactory;
    use ImageTrait;
    use ImageTrait {
        deleteImage as traitDeleteImage;
    }
    protected $connection = 'mysql2';
    const IMAGE_PATH = 'books';

    const IMPORT = 'books/import';

    public $table = 'books';

    protected $appends = ['image_path', 'authors_name'];

    public $fillable = [
        'name',
        'description',
        'image',
        'published_on',
        'isbn',
        'url',
        'is_featured',
        'library_id',
        'product_id',
        'transfer_status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'                   => 'integer',
        'name'                 => 'string',
        'description'          => 'string',
        //        'image'                => 'binary',
        'published_on'         => 'datetime',
        'isbn'                 => 'string',
        'url'                  => 'string',
        'is_featured'          => 'boolean',
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name'   => 'required|unique:books,name',
        'isbn'   => 'required|max:13|unique:books,isbn',
        'genres' => 'required',
    ];

    /**
     * @return string
     */
    public function getImagePathAttribute()
    {



        $database_name = env('DB_DATABASE');

        $site_name = Config::get('app.site_url');

        if($site_name == "http://dindayalupadhyay.smartcitylibrary.com"){

            return "https://kundanlalgupta.smartcitylibrary.com/uploads/books/" . $this->image;

        }elseif($site_name == "http://kundanlalgupta.smartcitylibrary.com"){
            return "https://dindayalupadhyay.smartcitylibrary.com/uploads/books/" . $this->image;


        }elseif($site_name == "http://rashtramatakasturba.smartcitylibrary.com"){
            return "https://dindayalupadhyay.smartcitylibrary.com/uploads/books/" . $this->image;

        }else{
            if (!empty($this->image)) {
                return $this->imageUrl(self::IMAGE_PATH . DIRECTORY_SEPARATOR . $this->image);
            }
        }
    }

    /**
     * @return bool
     */
    public function deleteImage()
    {
        if (!empty($this->image)) {
            $this->traitDeleteImage(self::IMAGE_PATH . DIRECTORY_SEPARATOR . $this->image);
            $this->update(['image' => null]);

            return true;
        }
    }

    /**
     * @return BelongsToMany
     */
    public function tags()
    {
        return $this->belongsToMany(Tag2::class, 'book_tags', 'book_id', 'tag_id');
    }

    /**
     * @return BelongsToMany
     */
    public function genres()
    {
        return $this->belongsToMany(Genre2::class, 'book_genres', 'book_id', 'genre_id');
    }

    /**
     * @return HasMany
     */
    public function items()
    {
        return $this->hasMany(BookItem2::class, 'book_id', 'id');
    }

    /**
     * @return BelongsToMany
     */
    public function authors()
    {
        return $this->belongsToMany(Author2::class, 'book_authors', 'book_id', 'author_id')->withTimestamps();
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
                $query->orWhereRaw('lower(name) LIKE ?', ['%' . strtolower(trim($keyword)) . '%']);
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
                $query->orWhereRaw('id = ?', [trim($keyword)]);
            }
        });

        return $query;
    }

    /**
     * @return string
     */
    public function getAuthorsNameAttribute()
    {
        $authors = $this->authors->pluck('first_name')->toArray();

        return implode(',', $authors);
    }

    /**
     * @return string
     */
    public function getGenresNameAttribute()
    {
        $genres = $this->genres->pluck('name')->toArray();

        return implode(',', $genres);
    }

    public function apiObj()
    {
        $result = $this->toArray();
        $result['authors_name'] = $this->authors_name;
        $result['genres_name'] = $this->genres_name;

        return $result;
    }
}
