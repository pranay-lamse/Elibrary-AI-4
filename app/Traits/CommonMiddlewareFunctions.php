<?php

namespace App\Traits;

use App;
use Tymon\JWTAuth\Http\Middleware\Authenticate;

/**
 * Class CommonMiddlewareFunctions
 */
trait CommonMiddlewareFunctions
{
    protected $app;

    protected $parser;

    protected $passable;

    private $authSuccess;

    /**
     * Register the bindings for the Auth provider.
     */
    private function registerAuthProvider()
    {
        $this->app->singleton('tymon.jwt.provider.auth', function ($app) {
            return $this->getConfigInstance($this->jwtConfig('providers.auth'));
        });
    }

    /**
     * Register the bindings for the main JWTAuth class.
     */
    private function registerJWTAuth()
    {
        $this->app->singleton('tymon.jwt.auth', function ($app) {
            $auth = new \Tymon\JWTAuth\JWTAuth(
                $app['tymon.jwt.manager'],
                $app['tymon.jwt.provider.auth'],
                $this->parser
            );

            return $auth;
        });
    }

    /**
     * Helper to get the config values.
     *
     * @param  string $key
     *
     * @return string
     */
    private function jwtConfig($key, $default = null)
    {
        return config("jwt.$key", $default);
    }

    /**
     * Register the bindings for the User provider.
     */
    protected function registerUserProvider()
    {
        $this->app->singleton('tymon.jwt.provider.user', function ($app) {
            $provider = $this->jwtConfig('providers.user');
            $model = $app->make($this->jwtConfig('user'));

            return new $provider($model);
        });
    }

    /**
     * Get an instantiable configuration instance. Pinched from dingo/api :).
     *
     * @param  mixed $instance
     *
     * @return object
     */
    private function getConfigInstance($instance)
    {
        if (is_callable($instance)) {
            return call_user_func($instance, $this->app);
        } elseif (is_string($instance)) {
            return $this->app->make($instance);
        }

        return $instance;
    }

    /**
     * @return bool
     */
    public function authenticationSuccess()
    {
        return true;
    }

    /**
     * @return bool|mixed
     */
    protected function checkJWTAuth()
    {
        /** @var Authenticate $auth */
        $auth = App::make(Authenticate::class);
        $response = $auth->handle($this->passable, $this->authSuccess);
        if ($response === true) {
            return true;
        }

        return $response;
    }
}
