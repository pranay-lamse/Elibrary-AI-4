<?php

namespace App\Exceptions;

use App\DTOs\JSONApiError;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        $code = $exception->getCode();
        $message = $exception->getMessage();
        if ($this->isHttpException($exception)) {
            if ($code == 404) {
                return response()->view('errors.404', [], 404);
            }
            if ($code  == 500) {
                return response()->view('errors.500', [], 500);
            }
        }
        return parent::render($request, $exception);

    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param AuthenticationException $exception
     *
     * @return \Illuminate\Http\JsonResponse|ResponseAlias|void
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->isXmlHttpRequest() || $request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], ResponseAlias::HTTP_UNAUTHORIZED);
        }

    }
}
