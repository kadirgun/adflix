<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;

class LinkController extends Controller {
    public function show($key) {
        $host = request()->host();
        $domain = Domain::query()->where('name', $host)->first();

        if (!$domain) {
            abort(404);
        }

        $link = $domain->links()->where('key', $key)->first();

        if (!$link) {
            abort(404);
        }

        $link->append('password_hash');
 
        $link->setVisible(['id', 'name', 'password_hash', 'protected']);
        
        return view('app', [
            'link' => $link,
            'host' => hash_hmac('sha256', $host, config('app.secret'))
        ]);
    }
}
