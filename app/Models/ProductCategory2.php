<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

/**
 * Class ProductCategory
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $image_url
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|Media[] $media
 * @property-read int|null $media_count
 * @method static Builder|ProductCategory newModelQuery()
 * @method static Builder|ProductCategory newQuery()
 * @method static Builder|ProductCategory query()
 * @method static Builder|ProductCategory whereCreatedAt($value)
 * @method static Builder|ProductCategory whereId($value)
 * @method static Builder|ProductCategory whereName($value)
 * @method static Builder|ProductCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProductCategory2 extends BaseModel implements HasMedia, JsonResourceful
{
    use HasFactory, InteractsWithMedia, HasJsonResourcefulData;
    protected $connection = 'mysql2';
    protected $table = 'product_categories';

    const JSON_API_TYPE = 'product-product_categories';

    public const PATH = 'product_category';

    protected $appends = ['image_url'];

    protected $fillable = [
        'name',
    ];

    public static $rules = [
        'name' => 'required|unique:product_categories',
    ];

    /**
     *
     *
     * @return string
     */
    public function getImageUrlAttribute(): string
    {
        /** @var Media $media */
        $media = $this->getMedia(ProductCategory2::PATH)->first();
        if (!empty($media)) {
            return $media->getFullUrl();
        }

        return '';
    }

    /**
     * @return array
     */
    function prepareLinks(): array
    {
        return [
            "self" => route('product-categories.show', $this->id),
        ];
    }

    /**
     * @return array
     */
    function prepareAttributes(): array
    {
        $fields = [
            'name'           => $this->name,
            'image'          => $this->image_url,
            'products_count' => $this->products()->count(),
        ];

        return $fields;
    }

    /**
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product2::class, 'product_category_id', 'id');
    }
}
