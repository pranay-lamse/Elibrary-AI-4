<?php

namespace Database\Seeders;

use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Class CreateDefaultMemberSeeder
 */
class CreateDefaultMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $input[] = [
            'member_id'          => uniqid(),
            'first_name'         => 'LMS',
            'last_name'          => 'Member',
            'email'              => 'member@lms.com',
            'password'           => Hash::make('lms@12345'),
            'phone'              => 9999999999,
            'is_active'          => true,
            'activation_code'    => uniqid(),
            'email_verified_at'  => Carbon::now(),
        ];

        $input[] = [
            'member_id'          => uniqid(),
            'first_name'         => 'Vishal',
            'last_name'          => 'Ribdiya',
            'email'              => 'vishal@lms.com',
            'password'           => Hash::make('lms@12345'),
            'phone'              => 9898989898,
            'is_active'          => true,
            'activation_code'    => uniqid(),
            'email_verified_at'  => Carbon::now(),
        ];

        $input[] = [
            'member_id'          => uniqid(),
            'first_name'         => 'Mitul',
            'last_name'          => 'Golakiya',
            'email'              => 'mitul@lms.com',
            'password'           => Hash::make('lms@12345'),
            'phone'              => 7878787878,
            'is_active'          => true,
            'activation_code'    => uniqid(),
            'email_verified_at'  => Carbon::now(),
        ];

        foreach ($input as $member) {
            Member::create($member);
        }
    }
}
