<?php

namespace Database\Seeders;

use App\Models\MembershipPlan;
use Illuminate\Database\Seeder;

class CreatePlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plans[] = [
            'name'        => 'Silver',
            'price'       => 300,
            'description' => 'Borrow 2 books at a time.',
            'frequency'   => MembershipPlan::MONTHLY_FREQUENCY,
        ];
        $plans[] = [
            'name'        => 'Golden',
            'price'       => 400,
            'description' => 'Borrow 4 books at a time.',
            'frequency'   => MembershipPlan::MONTHLY_FREQUENCY,
        ];

        foreach ($plans as $plan) {
            MembershipPlan::create($plan);
        }
    }
}
