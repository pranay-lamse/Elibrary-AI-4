<?php

namespace App\Http\Middleware;

use Closure;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use App\Traits\CommonMiddlewareFunctions;
use Illuminate\Validation\UnauthorizedException;

/**
 * Class UserAuth
 */
class UserAuth
{
    use CommonMiddlewareFunctions;

    /**
     * @param  Request  $request
     * @param  Closure  $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (App::runningUnitTests()) {
            return $next($request);
        }

        /** @var User $user */
        $user = Auth::user();

        //        if (! $user->email_verified_at) {
        //            throw new UnauthorizedException('Please verify your email.', 401);
        //        }

        if (!$user->is_active) {
            throw new UnauthorizedException('Your account is not active.', 401);
        }

        return $next($request);
    }
}
