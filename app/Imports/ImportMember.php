<?php

namespace App\Imports;

use Exception;
use Carbon\Carbon;
use App\Models\Member;
use App\Models\Address;
use App\Models\Transaction;
use Illuminate\Support\Arr;
use App\Models\Subscription;
use App\Models\MembershipPlan;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;

class ImportMember implements ToCollection
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        $row = $rows->toArray();
        $membersArray = Arr::except($row, '0');

        foreach ($membersArray as $row) {
            if (!empty($row[1])) {
                $data = [
                    'member_id'         => $row[10],
                    'first_name'        => $row[1],
                    'last_name'         => $row[2],
                    'aadhaar'           => $row[3],
                    'email'             => $row[4],
                    'phone'             => $row[5],
                    'is_active'         => $row[6] == "Yes" ? 1 : 0,
                    'password'          => Hash::make($row[7]),
                    'reciept_no'        => $row[11],
                    'challan_no'        => $row[12],
                    'activation_code'   => uniqid(),
                    'address_1'         => $row[13],
                    'city'              => $row[14],
                    'state'             => $row[15],
                    'country'           => $row[16],
                    'zip'               => $row[17],
                ];

                $member = Member::create($data);

                $userRepo = app(UserRepository::class);
                $addressArr = $userRepo->makeAddressArray($data);
                if (!empty($addressArr)) {
                    $address = new Address($addressArr);
                    $member->address()->save($address);
                }

                $plan = MembershipPlan::where('name', "LIKE", '%' . $row[9] . '%')->firstOrFail();
                $end_date = str_replace(["'"], "", explode('-', $row[8]));

                $data = [
                    'member_id'         => $member->id,
                    'transaction_id'    => uniqueTransactionId(),
                    'plan_id'           => $plan->id,
                    'plan_amount'       => $plan->price,
                    'deposit'           => $plan->deposit,
                    'renewal_price'     => $plan->renewal_price,
                    'plan_frequency'    => $plan->frequency,
                    'start_date'        => Carbon::createFromDate($end_date[2], $end_date[1], $end_date[0]),
                    'end_date'          => ($plan->frequency === MembershipPlan::YEARLY_FREQUENCY ? Carbon::createFromDate($end_date[0], $end_date[1], $end_date[2])->addYear() : $plan->frequency === MembershipPlan::LIFETIME) ? Carbon::now()->addMillennia(1) : Carbon::createFromDate($end_date[0], $end_date[1], $end_date[2])->addYear(),
                    'status'            => Subscription::ACTIVE,
                    'type'              => Subscription::RAZORPAY,
                ];

                Subscription::create($data);
                $transactionData = [
                    'member_id'      => $member->id,
                    'plan_id'        => $plan->id,
                    'payment_mode'   => Transaction::TYPE_RAZORPAY,
                    'amount'         => $plan->price + $plan->deposit,
                    'status'         => 'paid',
                    'created_at'     => Carbon::createFromDate($end_date[2], $end_date[1], $end_date[0])
                ];
                Transaction::create($transactionData);
            }
        }
    }

    public function generateMemberId()
    {
        $memberId = rand(10000, 99999);
        while (true) {
            if (!Member::whereMemberId($memberId)->exists()) {
                break;
            }
            $memberId = rand(10000, 99999);
        }

        return $memberId;
    }
}
