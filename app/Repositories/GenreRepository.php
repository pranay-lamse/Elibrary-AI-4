<?php

namespace App\Repositories;

use App\Models\Genre;
use App\Repositories\Contracts\GenreRepositoryInterface;

/**
 * Class GenreRepository
 */
class GenreRepository extends BaseRepository implements GenreRepositoryInterface
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
        return Genre::class;
    }
}
