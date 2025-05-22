<?php

namespace App;

use App\Models\Address;
use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;




/**
 * App\User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property string $password
 * @property float $phone
 * @property boolean $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Address $address
 * @property-read mixed $image_path
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[]
 *     $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Role[] $roles
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $image
 * @property string|null $remember_token
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User withRole($role)
 */
class User extends Authenticatable
{
    use HasFactory;
    use Notifiable, HasRoles, ImageTrait, HasApiTokens;

    const IMAGE_PATH = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'image',
        'is_active',
        'email_verified_at',
    ];

    protected $appends = ['image_path'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active'         => 'boolean',
    ];

    public static $createRules = [
        'first_name' => 'required',
        'last_name'  => 'required',
        'email'      => 'required|unique:users,email',
        'password'   => 'required|min:6',
        'role_id'    => 'required|integer',
    ];

    public static $messages = [
        'role_id.required' => 'User must have at least one role.',
    ];

    public static $updateRules = [
        'first_name' => 'required',
        'last_name'  => 'required',
        'email'      => 'required|unique:users,email',
        'role_id'    => 'nullable|integer',
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return ['issued_for' => 'user'];
    }

    public function getImagePathAttribute()
    {
        if (! empty($this->image)) {
            return $this->imageUrl(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image);
        }
    }

    public function deleteUserImage()
    {
        self::deleteImage(self::IMAGE_PATH.DIRECTORY_SEPARATOR.$this->image); // thumbnail

        $this->update(['image' => null]);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function address()
    {
        return $this->morphOne(Address::class, 'owner')->with('country');
    }

    /**
     * @return string
     */
    public function getFullNameAttribute()
    {
        $fullName = ucfirst($this->first_name);

        if (! empty($this->last_name)) {
            $fullName .= ' '.ucfirst($this->last_name);
        }

        return $fullName;
    }

    /**
     * @param  Builder  $query
     * @param  array  $keywords
     *
     * @return mixed
     */
    public static function filterByMemberName(&$query, $keywords)
    {
        $query->where(function (Builder $query) use ($keywords) {
            foreach ($keywords as $keyword) {
                $query->orWhereRaw('lower(first_name) LIKE ?', [trim(strtolower($keyword))]);
                $query->orWhereRaw('lower(last_name) LIKE ?', [trim(strtolower($keyword))]);
            }
        });

        return $query;
    }
}
