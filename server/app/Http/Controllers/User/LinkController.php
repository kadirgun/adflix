<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\LinkResource;
use App\Rules\ExcludesRule;
use App\Rules\LinkDomainRule;
use App\Rules\LinkTargetRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class LinkController extends Controller {
    public function list(Request $request) {
        $links = $request->user()->links()->orderBy('id', 'desc')->get();
        return response()->json(LinkResource::collection($links));
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'target' => ['required', 'url', new LinkTargetRule],
            'password' => 'nullable|string|min:4|max:25',
            'type' => 'nullable|integer|between:1,3',
            'excludes' => ['nullable', new ExcludesRule],
            'domain' => ['required', 'integer', new LinkDomainRule]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        $link = $request->user()->links()->create([
            ...$validator->validated(),
            'key' => Str::random(6),
        ]);

        return response()->json(new LinkResource($link->fresh()));
    }

    public function get($id) {
        $link = auth()->user()->links()->where('id', $id)->first();

        if (!$link) {
            return response()->json([
                'message' => 'Link not found',
            ], 404);
        }

        return response()->json(new LinkResource($link));
    }

    public function delete($id) {
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

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'target' => 'required|url',
            'password' => 'nullable|string|min:8|max:25',
            'excludes' => ['nullable', new ExcludesRule],
        ]);

        $link = $request->user()->links()->where('id', $id)->first();

        if (!$link) {
            return response()->json([
                'message' => 'Link not found',
            ], 404);
        }

        $link->update($validator->validated());

        return response()->json($link);
    }
}
