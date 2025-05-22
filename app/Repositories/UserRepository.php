<?php

namespace App\Repositories;


use App\Models\Role;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;



use App\Exceptions\ApiOperationFailedException;
use App\Models\Address;
use App\Repositories\Contracts\AccountRepositoryInterface;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Class UserRepository
 */
class UserRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'created_at',
        //        'roles.name',
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return User::class;
    }

    /**
     * @param $input
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function storeUser($input)
    {
        try {
            DB::beginTransaction();
            $input['password'] = Hash::make($input['password']);
            $user = $this->create($input);
            if (isset($input['role_id'])) {
                $user->assignRole($input['role_id']);
            }
            if (isset($input['image']) && !empty($input['image'])) {
                $user->addMedia($input['image'])->toMediaCollection(
                    User::PATH,
                    config('filesystems.default')
                );
            }
            DB::commit();

            return $user;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param $input
     * @param $id
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function updateUser($input, $id)
    {
        try {
            DB::beginTransaction();
            $user = $this->update($input, $id);

            if (isset($input['role_id'])) {
                $user->syncRoles($input['role_id']);
            }
            if (isset($input['image']) && $input['image']) {
                $user->clearMediaCollection(User::PATH);
                $user['image_url'] = $user->addMedia($input['image'])->toMediaCollection(
                    User::PATH,
                    config('filesystems.default')
                );
            }
            DB::commit();

            return $user;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    public function update($input, $id)
    {
        try {
            DB::beginTransaction();

            if (!empty($input['password'])) {
                $input['password'] = Hash::make($input['password']);
            }

            $image = (!empty($input['image'])) ? $input['image'] : null;
            unset($input['image']);

            /** @var User $user */
            $user = $this->findOrFail($id);
            $user->update($input);

            if (!empty($image)) {
                $user->deleteUserImage(); // delete old image;
                $imagePath = User::makeImage($image, User::IMAGE_PATH);
                $user->update(['image' => $imagePath]);
            }

            if (!empty($input['remove_image'])) {
                $user->deleteUserImage();
            }

            if (!empty($input['role_id'])) {
                $user->roles()->sync($input['role_id']);
            }

            $addressArr = $this->makeAddressArray($input);
            if (!empty($addressArr)) {
                $isUpdate = $user->address()->update($addressArr);
                if (!$isUpdate) {
                    $address = new Address($addressArr);
                    $user->address()->save($address);
                }
            }

            DB::commit();

            return $this->find($user->id);
        } catch (Exception $e) {
            DB::rollBack();

            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param $input
     *
     * @return User|\Illuminate\Contracts\Auth\Authenticatable|null
     */

    /* elibrary  */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (!empty($search['order_by']) && ($search['order_by'] == 'role_name')) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit)->with('roles', 'address');
        $query = $this->applyDynamicSearch($search, $query);

        if (!empty($search['withCount'])) {
            return $query->count();
        }

        $users = $query->orderByDesc('id')->get();

        if (!empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';

            if ($orderBy == 'role_name') {
                $orderString = 'roles';
            }

            $users = $users->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $users->values();
    }


    public function applyDynamicSearch($search, $query)
    {
        $query->when(!empty($search['search']), function (Builder $query) use ($search) {
            $query->orWhereHas('roles', function (Builder $query) use ($search) {
                filterByColumns($query, $search['search'], ['name']);
            });
        });

        return $query;
    }

    public function find($id, $columns = ['*'])
    {
        $user = $this->findOrFail($id, ['roles']);

        return $user;
    }


    public function store($input)
    {
        try {
            DB::beginTransaction();

            $plainPassword = $input['password'];
            $input['password'] = Hash::make($input['password']);
            $user = User::create($input);
            if (!empty($input['role_id'])) {
                $user->roles()->sync([$input['role_id']]);
            }

            $addressArr = $this->makeAddressArray($input);
            if (!empty($addressArr)) {
                $address = new Address($addressArr);
                $user->address()->save($address);
            }

            if (!empty($input['image'])) {
                $imagePath = User::makeImage($input['image'], User::IMAGE_PATH);
                $user->update(['image' => $imagePath]);
            }
            DB::commit();

            /** @var AccountRepositoryInterface $accountRepository */
            $accountRepository = App::make(AccountRepositoryInterface::class);
            $accountRepository->sendConfirmEmailForUser($user, ['password' => $plainPassword]);

            return $this->find($user->id);
        } catch (Exception $e) {
            DB::rollBack();

            throw  new ApiOperationFailedException($e->getMessage());
        }
    }


    public function makeAddressArray($input)
    {
        if (
            !empty($input['address_1']) || !empty($input['address_2']) || !empty($input['city']) ||
            !empty($input['state']) || !empty($input['zip']) || !empty($input['country'])
        ) {
            $addressArr = [
                'address_1'  => !empty($input['address_1']) ? $input['address_1'] : '',
                'address_2'  => !empty($input['address_2']) ? $input['address_2'] : '',
                'city'       => !empty($input['city']) ? $input['city'] : '',
                'state'      => !empty($input['state']) ? $input['state'] : '',
                'zip'        => !empty($input['zip']) ? $input['zip'] : '',
                'country_id' => !empty($input['country_id']) ? $input['country_id'] : null,
            ];

            return $addressArr;
        }

        return [];
    }

    /* elibrary end  */
    public function updateUserProfile($input)
    {
        try {
            DB::beginTransaction();
            unset($input['role_id']);

            $user = Auth::user();
            $user->update($input);

            if ((!empty($input['image']))) {
                $user->clearMediaCollection(User::PATH);
                $user->media()->delete();
                $user->addMedia($input['image'])->toMediaCollection(User::PATH, config('app.media_disc'));
            }
            DB::commit();

            return $user;
        } catch (\Exception $e) {
            DB::rollBack();

            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param $perPage
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator|\Illuminate\Support\Collection|mixed
     */
    public function getUsers($perPage)
    {
        $loginUserId = Auth::id();
        if (Auth::user()->hasRole(Role::ADMIN)) {
            // $users = $this->where('id', '!=', $loginUserId)->paginate($perPage);
            $users = User::where('id', '!=', $loginUserId)->paginate($perPage);
        } else {
            $users = $this->whereHas('roles', function ($q) {
                $q->where('name', '!=', Role::ADMIN);
            })->where('id', '!=', $loginUserId)->paginate($perPage);
        }

        return $users;
    }

    /**
     * @param array $input
     *
     * @return User
     */
    public function updatePassword(array $input): User
    {
        /** @var User $user */
        $user = Auth::user();
        if (!Hash::check($input['current_password'], $user->password)) {
            throw new UnprocessableEntityHttpException("Current password is invalid.");
        }
        $input['password'] = Hash::make($input['new_password']);
        $user->update($input);

        return $user;
    }
}
