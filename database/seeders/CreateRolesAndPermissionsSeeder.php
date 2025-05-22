<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

/**
 * Class PopulateRolesAndPermissionsSeeder
 */
class CreateRolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /** @var Role $admin */
        $admin = Role::whereName('admin')->first();
        /** @var Role $librarian */
        $librarian = Role::whereName('librarian')->first();

        $permissions = Permission::all();
        $admin->givePermissionTo($permissions);

        $permissions = Permission::whereNotIn('name', ['manage_roles', 'manage_finance', 'manage_plans'])->get();
        $librarian->givePermissionTo($permissions);
    }
}
