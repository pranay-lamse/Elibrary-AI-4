<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

/**
 * Class CreateRolesSeeder
 */
class CreateRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles[] = [
            'name'         => 'admin',
            'display_name' => 'Library Admin',
            'description'  => 'Library Admin',
        ];
        $roles[] = [
            'name'         => 'librarian',
            'display_name' => 'Librarian',
            'description'  => 'Librarian',
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}
