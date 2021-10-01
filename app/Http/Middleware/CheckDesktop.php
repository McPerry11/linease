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
        }
        return $next($request);
    }
}
