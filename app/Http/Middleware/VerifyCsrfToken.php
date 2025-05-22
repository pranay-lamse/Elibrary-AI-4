<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/submitAttendance', // Add your route here
        '/attendance/today-logins',
        '/api/upload',
        'test-payment-response',
        '/test-payment-response',
        '/test-payment-response2',
        '/test-payment-response3',
        'test-payment-response',
        'test-payment-response2',
        'test-payment-response3',
        'test-payment-response-penalty',

        'test-payment-backend-response',
        '/test-payment-backend-response',
        '/test-payment-backend-response2',
        '/test-payment-backend-response3',
        'test-payment-backend-response',
        'test-payment-backend-response2',
        'test-payment-backend-response3',
        'test-payment-backend-response-penalty',

        'test-payment-backend-offline-response',
        '/test-payment-backend-offline-response',
        '/test-payment-backend-offline-response2',
        '/test-payment-backend-offline-response3',
        'test-payment-backend-offline-response',
        'test-payment-backend-offline-response2',
        'test-payment-backend-offline-response3',
        'test-payment-backend-offline-response-penalty',

        'api/v1/create-offline-membership-payment-session2/{id}',
        '/api/v1/create-offline-membership-payment-session2/{id}',
        'api/v1/create-offline-membership-payment-session2',
        '/api/v1/create-offline-membership-payment-session2',



    ];
}
