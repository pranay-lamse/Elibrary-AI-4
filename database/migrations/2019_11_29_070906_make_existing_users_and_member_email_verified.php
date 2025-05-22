<?php

use App\Models\Member;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;

class MakeExistingUsersAndMemberEmailVerified extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $users = User::all();
        foreach ($users as $user) {
            $user->update(['email_verified_at' => Carbon::now()]);
        }

        $members = Member::all();
        foreach ($members as $member) {
            $member->update(['email_verified_at' => Carbon::now()]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
