<?php

namespace App\Models;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Testimonial
 *
 * @property int $id
 * @property string $name
 * @property string $occupation
 * @property string $description
 * @property string|null $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial whereOccupation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Testimonial whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Testimonial extends Model
{
    use HasFactory;
    use ImageTrait;

    const IMAGE_PATH = 'testimonials';

    public static $rules = [
        'name'        => 'required',
        'occupation'  => 'required',
        'description' => 'required',
    ];

    public $table = 'testimonials';

    public $appends = ['image_path'];

    protected $fillable = [
        'name',
        'occupation',
        'description',
        'image',
    ];

    public function getImagePathAttribute()
    {
        if (! empty($this->image)) {
            return $this->imageUrl(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image);
        }
    }

    public function deleteTestimonialImage()
    {
        if (! empty($this->image)) {
            self::deleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image); // thumbnail

            $this->update(['image' => null]);
        }
    }
}
