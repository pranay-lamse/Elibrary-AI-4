<?php

namespace App\Repositories;

use App\Models\Author;
use App\Models\Author2;
use App\Repositories\Contracts\AuthorRepositoryInterface2;

/**
 * Class AuthorRepository
 */
class AuthorRepository2 extends BaseRepository2 implements AuthorRepositoryInterface2
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'first_name',
        'last_name',
    ];

    public function all2($search = [], $skip = null, $limit = null, $columns = ['*'])
    {
        $query = $this->allQuery($search, $skip, $limit);

        $query->orWhereRaw('LOWER(first_name) LIKE ?', [trim(strtolower($search['search'])) . '%'])->orWhereRaw('LOWER(last_name) LIKE ?', [trim(strtolower($search['search'])) . '%']);
        $result = $query->get($columns);

        return $result;
    }

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Author2::class;
    }
}
