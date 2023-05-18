<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckVisitor {
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response {
        $visitorID = session('visitor');

        if (!$visitorID) {
            $visitor = Visitor::createWithRequest();
            session(['visitor' => $visitor->id]);
            return $next($request);
        }

        $visitor = Visitor::find($visitorID);
        if (!$visitor) {
            $visitor = Visitor::createWithRequest();
            session(['visitor' => $visitor->id]);
        }

        return $next($request);
    }
}
