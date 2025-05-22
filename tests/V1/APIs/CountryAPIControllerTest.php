<?php

namespace Tests\V1\APIs;

use App\Models\Country;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\Traits\MockRepositories;

/**
 * Class CountryAPIControllerTest
 */
class CountryAPIControllerTest extends TestCase
{
    use DatabaseTransactions, MockRepositories;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithMember();
    }

    /** @test */
    public function test_can_get_all_country_list()
    {
        $this->mockRepo(self::$country);

        /** @var Country[] $countries */
        $countries = Country::factory()->count(2)->create();

        $this->countryRepository->expects('all')->andReturn($countries);

        $response = $this->getJson(route('api.v1.countries.index'));

        $this->assertSuccessDataResponse($response, $countries->toArray(), 'Countries retrieve successfully.');
    }

    /** @test */
    public function test_can_search_and_get_countries()
    {
        /** @var Country[] $countries */
        $countries = Country::factory()->count(5)->create();

        $response = $this->getJson(route('api.v1.countries.index'));
        $take3 = $this->getJson(route('api.v1.countries.index', ['limit' => 3]));
        $skip2 = $this->getJson(route('api.v1.countries.index', ['skip' => 2, 'limit' => 2]));
        $searchByName = $this->getJson(route('api.v1.countries.index', ['search' => $countries[0]->name]));

        $this->assertCount(251, $response->original['data'], '246 default');
        $this->assertCount(3, $take3->original['data']);
        $this->assertCount(2, $skip2->original['data']);

        $search = $searchByName->original['data'];
        $this->assertTrue(count($search) > 0 && count($search) < 251);
    }
}
