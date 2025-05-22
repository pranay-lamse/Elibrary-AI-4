<?php

namespace App\Repositories\Contracts;

use App\Exceptions\ApiOperationFailedException;
use App\Models\BookSeries;
use App\Models\SeriesBook;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

/**
 * Interface SeriesBookRepositoryInterface
 */
interface SeriesBookRepositoryInterface
{
    /**
     * @return array
     */
    public function getFieldsSearchable();

    /**
     * @return mixed
     */
    public function model();

    /**
     * Retrieve all records with given filter criteria
     *
     * @param  array  $search
     * @param  int|null  $skip
     * @param  int|null  $limit
     * @param  array  $columns
     *
     * @return SeriesBook[]|Collection
     */
    public function all($search = [], $skip = null, $limit = null, $columns = ['*']);

    /**
     * Create model record
     *
     * @param  array  $input
     *
     * @return Model
     */
    public function create($input);

    /**
     * Update model record for given id
     *
     * @param  array  $input
     * @param  int  $id
     *
     * @return SeriesBook|Collection
     */
    public function update($input, $id);

    /**
     * @param  BookSeries  $bookSeries
     * @param  array  $seriesItems
     *
     * @throws ApiOperationFailedException
     * @throws Exception
     *
     * @return bool
     */
    public function createOrUpdateSeriesItems($bookSeries, $seriesItems);
}
