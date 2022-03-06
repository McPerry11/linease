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
        if ($agent->isDesktop() && !$request->is('desktop'))
            return redirect('desktop');
        else if (!$agent->isDesktop() && $request->is('desktop'))
            return redirect(route('dashboard'));
        return $next($request);
    }
}
