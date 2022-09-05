<?php

namespace App\Http\Middleware;

use Closure;

/**
 * Classe qui gère "la police CORS" pour les requêtes JS
 */
class Cors
{
    /**
     * Send CORS headers in response
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 200);
        }

        $response
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
            ->header('Access-Control-Allow-Headers', 'Content-Type');;

        return $response;
    }
}
