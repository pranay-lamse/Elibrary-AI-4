<?php

namespace Database\Seeders;

use App\Models\Role;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CreateDefaultUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $input[] = [
            'first_name'        => 'LMS',
            'last_name'         => 'Admin',
            'email'             => 'admin@lms.com',
            'password'          => Hash::make('lms@12345'),
            'email_verified_at' => Carbon::now(),
            'is_active'         => true,
        ];

        $input[] = [
            'first_name'        => 'LMS',
            'last_name'         => 'Librarian',
            'email'             => 'librarian@lms.com',
            'password'          => Hash::make('lms@12345'),
            'email_verified_at' => Carbon::now(),
            'is_active'         => true,

        ];

        /** @var User $user */
        $user = User::create($input[0]);
        /** @var Role $adminRole */
        $adminRole = Role::whereName('admin')->first();
        $user->roles()->attach($adminRole);

        /** @var User $user */
        $user = User::create($input[1]);
        /** @var Role $adminRole */
        $adminRole = Role::whereName('librarian')->first();
        $user->roles()->attach($adminRole);
    }
}
