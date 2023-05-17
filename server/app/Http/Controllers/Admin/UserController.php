<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {
    public function list(Request $request) {
        $users = User::query()->orderBy('id', 'desc')->get();
        return response()->json($users);
    }

    public function get($id) {
        $user = User::query()->find($id);

        if (!$user) {
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }

        return response()->json($user);
    }
}
