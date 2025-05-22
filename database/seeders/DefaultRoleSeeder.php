<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DefaultRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* $roles = [
            [
                'name'         => 'admin',
                'display_name' => ' Admin',
            ],
        ]; */

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
            $role1 = Role::whereName($role['name'])->first();
            if (empty($role1)) {
                $role = Role::create($role);
            }
        }
        /** @var Role $adminRole */
        $adminRole = Role::whereName('admin')->first();

        $allPermissions = Permission::pluck('name', 'id');
        $adminRole->givePermissionTo($allPermissions);
    }
}
