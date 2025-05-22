<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Models\Country;
use App\Repositories\Contracts\CountryRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Class CountryAPIController
 */
class CountryAPIController extends AppBaseController
{
    /**
     * @var CountryRepositoryInterface
     */
    private $countryRepository;

    public function __construct(CountryRepositoryInterface $countryRepository)
    {
        $this->countryRepository = $countryRepository;
    }

    /**
     * @param  Request  $request
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $search = $request->except(['skip', 'limit']);

        $countries = $this->countryRepository->all(
            $search,
            $request->get('skip', null),
            $request->get('limit', null)
        );
        $countries = $countries->map(function (Country $country) {
            return $country->apiM1Obj();
        });

        return $this->sendResponse($countries, 'Countries retrieve successfully.');
    }
}
