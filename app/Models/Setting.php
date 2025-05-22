<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

use App\Traits\ImageTrait;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;

use Illuminate\Support\Carbon;

/**
 * App\Models\Setting
 *
 * @property int $id
 * @property string $key
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $logo
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|Media[] $media
 * @property-read int|null $media_count
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereValue($value)
 * @mixin \Eloquent
 */
class Setting extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    use ImageTrait;
    const RESERVE_DUE_DAYS = 'reserve_due_days';

    const RETURN_DUE_DAYS = 'return_due_days';

    const LIBRARY_LOGO = 'library_logo';

    const LIBRARY_NAME = 'library_name';

    const FAVICON_ICON = 'favicon_icon';

    const RESERVE_BOOKS_LIMIT = 'reserve_books_limit';

    const ISSUE_BOOKS_LIMIT = 'issue_books_limit';

    const DEFAULT_LOGO_NAME = 'logo-blue-black.png';

    const DEFAULT_FAVICON_NAME = 'favicon.ico';

    const PENALTY_PER_DAY = 'penalty_per_day';

    const BOOK_DUE_REMINDER_DAYS = 'book_due_reminder_before_days';

    const LOGO_PATH = 'images';


    const PATH = 'settings';
    protected $table = 'settings';
    /**
     * @var string[]
     */
    protected $fillable = [
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
     * @return string
     */
    public function getLogoAttribute(): string
    {
        /** @var Media $media */
        $media = $this->media->last();
        if (!empty($media)) {
            return $media->getFullUrl();
        }

        return asset('images/infyom.png');
    }

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

    /**
     * @return string
     */
    public function getLogoUrlAttribute()
    {
        if (!empty($this->value)) {
            return $this->imageUrl(self::LOGO_PATH . DIRECTORY_SEPARATOR . $this->value);
        }
    }

    /**
     * @return string
     */
    public function getCurrencySymbolAttribute()
    {
        if (!empty($this->value)) {
            return getCurrencySymbol();
        }
    }
}
