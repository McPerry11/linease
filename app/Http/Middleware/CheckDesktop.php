<?php

namespace App\Http\Middleware;

use Closure;
use Jenssegers\Agent\Agent;

class CheckDesktop
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $agent = new Agent();
        if ($agent->isDesktop()) {
            return redirect('desktop');
        } else if ($agent->isPhone() && $request->is('desktop')) {
            return redirect('login');
        }
        return $next($request);
    }
}
