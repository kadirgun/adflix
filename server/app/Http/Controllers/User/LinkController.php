<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\ClickResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class LinkController extends Controller {
    public function list(Request $request) {
        return response()->json($request->user()->links);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'target_url' => 'required|url',
            'password' => 'nullable|string|min:8|max:25',
            'type' => 'nullable|integer|between:1,3'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        $link = $request->user()->links()->create([
            'target_url' => $request->target_url,
            'password' => $request->password,
            'key' => Str::random(6),
        ]);

        return response()->json($link);
    }

    public function get($id){
        $link = auth()->user()->links()->where('id', $id)->first();

        if (!$link) {
            return response()->json([
                'message' => 'Link not found',
            ], 404);
        }

        return response()->json($link);
    }

    public function delete($id){
        $link = auth()->user()->links()->where('id', $id)->first();

        if (!$link) {
            return response()->json([
                'message' => 'Link not found',
            ], 404);
        }

        $link->delete();

        return response()->json([
            'message' => 'Link deleted',
        ]);
    }

    public function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'target_url' => 'required|url',
            'password' => 'nullable|string|min:8|max:25',
        ]);

        $link = $request->user()->links()->where('id', $id)->first();

        if (!$link) {
            return response()->json([
                'message' => 'Link not found',
            ], 404);
        }

        $link->update([
            'target_url' => $request->target_url,
            'password' => $request->password,
        ]);

        return response()->json($link);
    }

    public function clicks($id){
        $link = auth()->user()->links()->where('id', $id)->first();

        if (!$link) {
            return response()->json([
                'message' => 'Link not found',
            ], 404);
        }

        return response()->json(ClickResource::collection($link->clicks));
    }
}
