<?php

namespace Tests\B1\APIs\Validations;

use App\Models\Testimonial;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

/**
 * Class TestimonialAPIValidationControllerTest
 */
class TestimonialAPIControllerValidationTest extends TestCase
{
    use DatabaseTransactions;

    protected function setUp(): void
    {
        parent::setUp();
        $this->signInWithDefaultAdminUser();
    }

    /** @test */
    public function test_unable_to_create_testimonial_without_name()
    {
        $response = $this->postJson(route('api.b1.testimonials.store'), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_unable_to_create_testimonial_without_occupation()
    {
        $response = $this->postJson(route('api.b1.testimonials.store'), ['name' => 'Vishal', 'occupation' => '']);

        $this->assertExceptionMessage($response, 'The occupation field is required.');
    }

    /** @test */
    public function test_unable_to_update_testimonial_without_name()
    {
        $testimonial = Testimonial::factory()->create();

        $response = $this->putJson(route('api.b1.testimonials.update', $testimonial->id), ['name' => '']);

        $this->assertExceptionMessage($response, 'The name field is required.');
    }

    /** @test */
    public function test_unable_to_update_testimonial_without_occupation()
    {
        $testimonial = Testimonial::factory()->create();

        $response = $this->putJson(route('api.b1.testimonials.update', $testimonial->id),
            ['name' => 'Vishal', 'occupation' => '']
        );

        $this->assertExceptionMessage($response, 'The occupation field is required.');
    }

    /** @test */
    public function test_unable_to_update_non_existing_testimonial()
    {
        $response = $this->putJson(route('api.b1.testimonials.update', 999));

        $this->assertExceptionMessage($response, 'Testimonial not found.');
    }

    /** @test */
    public function test_unable_to_delete_non_existing_testimonial()
    {
        $response = $this->putJson(route('api.b1.testimonials.destroy', 999));

        $this->assertExceptionMessage($response, 'Testimonial not found.');
    }

    /** @test */
    public function test_unable_to_get_non_existing_testimonial()
    {
        $response = $this->getJson(route('api.b1.testimonials.show', 999));

        $this->assertExceptionMessage($response, 'Testimonial not found.');
    }
}
