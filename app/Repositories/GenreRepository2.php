<?php

namespace App\Repositories;

use App\Models\Genre2;
use App\Repositories\Contracts\GenreRepositoryInterface2;

/**
 * Class GenreRepository
 */
class GenreRepository2 extends BaseRepository implements GenreRepositoryInterface2
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
    ];

    public function all2($search = [], $skip = null, $limit = null, $columns = ['*'])
    {


        $query = $this->allQuery($search, $skip, $limit);

        $query->orWhereRaw('LOWER(name) LIKE ?', [trim(strtolower($search['search'])) . '%']);
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
        return Genre2::class;
    }
}
