<?php

namespace App\Repositories;

use DB;
use App;
use Hash;
use Exception;
use Carbon\Carbon;
use App\Models\Member2;
use App\Models\Setting;
use App\Models\Address2;
use App\Models\IssuedBook2;
use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Builder;
use App\Exceptions\ApiOperationFailedException;
use App\Repositories\MembershipPlanRepository2;
use Illuminate\Container\Container as Application;
use App\Repositories\Contracts\MemberRepositoryInterface2;
use App\Repositories\Contracts\AccountRepositoryInterface2;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class MemberRepository
 */
class MemberRepository2 extends BaseRepository2 implements MemberRepositoryInterface2
{
    /** @var MembershipPlanRepository */
    private $membershipPlanRepo;

    public function __construct(Application $app, MembershipPlanRepository2 $membershipRepo)
    {
        parent::__construct($app);
        $this->membershipPlanRepo = $membershipRepo;
    }

    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
        'email',
        'phone',
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
        return Member2::class;
    }

    /**
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return Member[]|Collection|int
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $orderBy = null;
        if (!empty($search['order_by']) && ($search['order_by'] == 'membership_plan_name')) {
            $orderBy = $search['order_by'];
            unset($search['order_by']);
        }

        $query = $this->allQuery($search, $skip, $limit)->with('address', 'subscriptions');
        $query = $this->applyDynamicSearch($search, $query);

        if (!empty($search['withCount'])) {
            return $query->count();
        }

        $members = $query->orderByDesc('id')->get();

        if (!empty($orderBy)) {
            $sortDescending = ($search['direction'] == 'asc') ? false : true;
            $orderString = '';
            $members = $members->sortBy($orderString, SORT_REGULAR, $sortDescending);
        }

        return $members->values();
    }

    /**
     * @param  array  $search
     * @param  Builder  $query
     *
     * @return Builder
     */
    public function applyDynamicSearch($search, $query)
    {
        $query->when(!empty($search['search']), function (Builder $query) use ($search) {
        });

        return $query;
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     * @return Member
     */
    public function store($input)
    {
        return $this->storeMember($input);
    }

    /**
     * @param  array  $input
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function storeMember($input)
    {
        $plainPassword = $input['password'];
        $input['password'] = Hash::make($input['password']);
        $input['member_id'] = $this->generateMemberId();
        $input['activation_code'] = uniqid();
        $member = Member2::create($input);
        if (!empty($input['image'])) {
            $imagePath = Member2::makeImage($input['image'], Member2::IMAGE_PATH);
            $member->update(['image' => $imagePath]);
        }

        /** @var UserRepository $userRepo */
        $userRepo = app(UserRepository2::class);
        $addressArr = $userRepo->makeAddressArray($input);
        if (!empty($addressArr)) {
            $address = new Address2($addressArr);
            $member->address()->save($address);
        }

        $member_new = Member2::where('id', $member->id)->first();
        $token = $member_new->createToken('member_token')->plainTextToken;
        /* return Redirect::to($url . '/#lms/login?success=0&msg=token not found.'); */
    }

    /**
     * @param  int  $id
     * @param  array  $columns
     *
     * @return Member
     */
    public function find($id, $columns = ['*'])
    {
        $member = $this->findOrFail($id, ['address']);

        return $member;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function update($input, $id)
    {
        try {
            DB::beginTransaction();
            if (!empty($input['password'])) {
                $input['password'] = Hash::make($input['password']);
            }
            $image = (!empty($input['image'])) ? $input['image'] : null;
            unset($input['image']);

            /** @var Member $member */
            $member = $this->findOrFail($id);
            $member->update($input);

            if (!empty($image)) {
                $member->deleteMemberImage(); // delete old image;
                $imagePath = Member2::makeImage($image, Member2::IMAGE_PATH);
                $member->update(['image' => $imagePath]);
            }

            if (!empty($input['remove_image'])) {
                $member->deleteMemberImage();
            }

            /** @var UserRepository $userRepo */
            $userRepo = app(UserRepository2::class);
            $addressArr = $userRepo->makeAddressArray($input);
            if (!empty($addressArr)) {
                $isUpdate = $member->address()->update($addressArr);
                if (!$isUpdate) {
                    $address = new Address2($addressArr);
                    $member->address()->save($address);
                }
            }
            DB::commit();

            return Member2::with('address')->findOrFail($member->id);
        } catch (Exception $e) {
            DB::rollBack();
            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @return int
     */
    public function generateMemberId()
    {
        $memberId = rand(10000, 99999);
        while (true) {
            if (!Member2::whereMemberId($memberId)->exists()) {
                break;
            }
            $memberId = rand(10000, 99999);
        }

        return $memberId;
    }

    /**
     * @param  bool  $today
     * @param  string|null  $startDate
     * @param  string|null  $endDate
     *
     * @return array
     */
    public function membersCount($today, $startDate = null, $endDate = null)
    {
        $query = Member2::query();
        if (!empty($startDate) && !empty($endDate)) {
            $query->select('*', DB::raw('DATE(created_at) as date'));
            $query->whereRaw('DATE(created_at) BETWEEN ? AND ?', [$startDate, $endDate]);
        } elseif ($today) {
            $query->whereRaw('DATE(created_at) = ? ', [Carbon::now()->toDateString()]);
        }

        $records = $query->get();
        $members = prepareCountFromDate($startDate, $endDate, $records);

        return [$records->count(), $members];
    }

    /**
     * @param  int  $memberId
     * @param  int  $status
     *
     * @return bool
     */
    public function isAllowToReserveOrIssueBook($memberId, $status)
    {
        if (!in_array($status, [IssuedBook2::STATUS_ISSUED, IssuedBook2::STATUS_RESERVED])) {
            throw new UnprocessableEntityHttpException('Invalid status.');
        }

        $query = IssuedBook2::ofMember($memberId);
        $query = ($status == IssuedBook2::STATUS_ISSUED) ? $query->issued() : $query->reserve();
        $booksLimit = ($status == IssuedBook2::STATUS_ISSUED) ?
            getSettingValueByKey(Setting::ISSUE_BOOKS_LIMIT) :
            getSettingValueByKey(Setting::RESERVE_BOOKS_LIMIT);

        $isAllow = true;
        if ($booksLimit == $query->count()) {
            $isAllow = false;
        }

        return $isAllow;
    }

    /**
     * @param  array  $input
     * @param  int  $id
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return Member
     */
    public function updateMemberProfile($input, $id)
    {
        try {
            DB::beginTransaction();
            if (!empty($input['password'])) {
                $input['password'] = Hash::make($input['password']);
            }
            $image = (!empty($input['image'])) ? $input['image'] : null;
            unset($input['image']);

            /** @var Member $member */
            $member = $this->findOrFail($id);
            $member->update($input);

            if (!empty($image)) {
                $member->deleteMemberImage(); // delete old image;
                $imagePath = Member2::makeImage($image, Member2::IMAGE_PATH);
                $member->update(['image' => $imagePath]);
            }

            if (!empty($input['remove_image'])) {
                $member->deleteMemberImage();
            }

            /** @var UserRepository $userRepo */
            $userRepo = app(UserRepository2::class);
            $addressArr = $userRepo->makeAddressArray($input);
            if (!empty($addressArr)) {
                $isUpdate = $member->address()->update($addressArr);
                if (!$isUpdate) {
                    $address = new Address2($addressArr);
                    $member->address()->save($address);
                }
            }
            DB::commit();

            return Member2::with('address')->findOrFail($member->id);
        } catch (Exception $e) {
            DB::rollBack();
            throw  new ApiOperationFailedException($e->getMessage());
        }
    }

    /**
     * @param  array  $input
     *
     * @param  bool  $sendMail
     * @throws ApiOperationFailedException
     * @return Member
     */
    public function registerMember($input, $sendMail = true)
    {
        try {
            DB::beginTransaction();
            $plainPassword = $input['password'];
            $input['password'] = Hash::make($input['password']);
            $input['member_id'] = $this->generateMemberId();
            $input['activation_code'] = uniqid();
            $member = Member2::create($input);
            if (!empty($input['image'])) {
                $imagePath = Member2::makeImage($input['image'], Member2::IMAGE_PATH);
                $member->update(['image' => $imagePath]);
            }

            /** @var UserRepository $userRepo */
            $userRepo = app(UserRepository2::class);
            $addressArr = $userRepo->makeAddressArray($input);
            if (!empty($addressArr)) {
                $address = new Address2($addressArr);
                $member->address()->save($address);
            }
            DB::commit();

            if ($sendMail) {
                /** @var AccountRepositoryInterface $accountRepository */
                $accountRepository = App::make(AccountRepositoryInterface2::class);
                $accountRepository->sendConfirmEmail($member, ['password' => $plainPassword]);
            }

            return Member2::with('address')->findOrFail($member->id);
        } catch (Exception $e) {
            DB::rollBack();
            throw  new ApiOperationFailedException($e->getMessage());
        }
    }
}
