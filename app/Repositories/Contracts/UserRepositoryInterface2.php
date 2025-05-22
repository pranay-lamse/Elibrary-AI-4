<?php

namespace App\Repositories\Contracts;

/**
 * Interface UserRepositoryInterface
 */
interface UserRepositoryInterface2
{
    /**
     * @return array
     */
    public function getFieldsSearchable();

    /**
     * @return mixed
     */
    public function model();
}
