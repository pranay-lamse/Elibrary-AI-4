<?php

namespace Tests\B1\APIs;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class CommonAPIControllerTest
 */
class CommonAPIControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_can_get_all_country_list()
    {
        $response = $this->getJson(route('api.b1.currencies'));

        $this->assertNotEmpty($response->original);
        $this->assertArrayHasKey('country', $response->original[0]);
        $this->assertArrayHasKey('iso_code', $response->original[0]);
    }
}
