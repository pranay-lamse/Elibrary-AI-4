<?php

namespace App\Repositories;

use App\Models\Genre3;
use App\Repositories\Contracts\GenreRepositoryInterface3;

/**
 * Class GenreRepository
 */
class GenreRepository3 extends BaseRepository implements GenreRepositoryInterface3
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
        return Genre3::class;
    }
}
