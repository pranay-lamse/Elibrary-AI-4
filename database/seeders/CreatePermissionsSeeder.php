<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

/**
 * Class CreatePermissionsSeeder
 */
class CreatePermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions[] = [
            'name'         => 'manage_books',
            'display_name' => 'Can Manage Books',
            'description'  => 'Create/Update/Delete Books, Book Series, Book Languages, Authors, Publishers, Tags',
        ];
        $permissions[] = [
            'name'         => 'issue_books',
            'display_name' => 'Can Manage Issue Books',
            'description'  => 'Can Manage Issue Books',
        ];
        $permissions[] = [
            'name'         => 'manage_members',
            'display_name' => 'Can Manage Members',
            'description'  => 'Create/Update/Delete Members',
        ];
        $permissions[] = [
            'name'         => 'manage_finance',
            'display_name' => 'Can Manage Finance',
            'description'  => 'Manage Membership Plans, Payments',
        ];
        $permissions[] = [
            'name'         => 'manage_settings',
            'display_name' => 'Can Manage Settings',
            'description'  => 'Manage Settings',
        ];
        $permissions[] = [
            'name'         => 'manage_roles',
            'display_name' => 'Can Manage Roles',
            'description'  => 'Manage Roles',
        ];
        $permissions[] = [
            'name'         => 'manage_authors',
            'display_name' => 'Can Manage Authors',
            'description'  => 'Manage Authors',
        ];
        $permissions[] = [
            'name'         => 'manage_publishers',
            'display_name' => 'Can Manage Publishers',
            'description'  => 'Manage Publishers',
        ];
        $permissions[] = [
            'name'         => 'manage_book_series',
            'display_name' => 'Can Manage Book Series',
            'description'  => 'Manage Book Series',
        ];
        $permissions[] = [
            'name'         => 'manage_users',
            'display_name' => 'Can Manage Users',
            'description'  => 'Manage Users',
        ];
        $permissions[] = [
            'name'         => 'manage_book_languages',
            'display_name' => 'Can Manage Book Languages',
            'description'  => 'Manage Book Languages',
        ];
        $permissions[] = [
            'name'         => 'manage_plans',
            'display_name' => 'Can Manage Plans',
            'description'  => 'Manage Plans',
        ];
        $permissions[] = [
            'name'         => 'manage_tags',
            'display_name' => 'Can Manage Tags',
            'description'  => 'Manage Tags',
        ];
        $permissions[] = [
            'name'         => 'manage_genres',
            'display_name' => 'Can Manage Genres',
            'description'  => 'Manage Genres',
        ];
        $permissions[] = [
            'name'         => 'manage_book_requests',
            'display_name' => 'Can Manage Book Requests',
            'description'  => 'Manage Book Requests',
        ];
        $permissions[] = [
            'name'         => 'manage_penalties',
            'display_name' => 'Can Manage Penalties',
            'description'  => 'Manage Penalties',
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
}
