<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Encryption\Encrypter;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class DecryptRequest {
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response {
        $validator = Validator::make($request->all(), [
            'payload' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Invalid payload'
            ], 400);
        }

        $encrypter = new Encrypter(env('APP_SECRET'));
        $data = $encrypter->decrypt($request->payload, false);
        $data = json_decode($data, true);
        $request->merge($data);

        $request->request->remove('payload');

        return $next($request);
    }
}
