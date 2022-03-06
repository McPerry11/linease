<?php

namespace App\Http\Middleware;

use Auth;
use Closure;

class CheckAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $route)
    {
        if (Auth::user()->type == 'ADMIN' || Auth::user()->type == 'SUPER')
            return $next($request);
        else if ($route == 'logs' && Auth::user()->type != 'USER')
            return $next($request);
        return redirect(route('dashboard'));
    }
}
