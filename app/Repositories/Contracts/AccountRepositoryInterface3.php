<?php

namespace App\Repositories\Contracts;

use App\Models\Member3;

use Exception;

/**
 * Interface AccountRepositoryInterface
 */
interface AccountRepositoryInterface3
{
    /**
     * @param  Member  $member
     * @param  array $options
     *
     * @throws Exception
     */
    public function sendConfirmEmail($member, $options = []);

    /**
     * @param  array  $data
     *
     * @throws Exception
     *
     * @return bool
     */
    public function sendResetPasswordLinkMail($data);

    /**
     * @param  User  $user
     * @param  array  $options
     *
     * @throws Exception
     */
    public function sendConfirmEmailForUser($user, $options = []);
}
