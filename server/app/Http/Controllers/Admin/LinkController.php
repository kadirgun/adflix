<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ScrapeHelper;
use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Rules\LinkDomainRule;
use App\Rules\LinkExcludedCategoriesRule;
use App\Rules\LinkTargetRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class LinkController extends Controller {
    public function list(Request $request) {
        $links = Link::query()->orderBy('id', 'desc')->get();
        return response()->json($links);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'target' => ['required', new LinkTargetRule],
            'password' => 'nullable|string|min:1',
            'type' => 'nullable|integer|between:1,3',
            'excluded_categories' => ['nullable', new LinkExcludedCategoriesRule],
            'domain_id' => ['required', 'integer', new LinkDomainRule],
            'user_id' => 'required|integer|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        $scrape = ScrapeHelper::fetch($request->target);

        $link = Link::create([
            ...$validator->validated(),
            'name' => $scrape->title,
            'key' => Str::random(6),
        ]);

        return response()->json($link->fresh());
    }

    public function get($id) {
        $link = Link::query()->find($id);

        if (!$link) {
            return response()->json([
                'error' => 'Link not found'
            ], 404);
        }

        return response()->json($link);
    }

    public function delete($id) {
        $link = Link::query()->withTrashed()->find($id);

        if (!$link) {
            return response()->json([
                'error' => 'Link not found'
            ], 404);
        }

        if ($link->trashed()) {
            return response()->json([
                'error' => 'Link already deleted'
            ], 404);
        }

        $link->delete();

        return response()->json([
            'message' => 'Link deleted'
        ]);
    }

    public function restore($id) {
        $link = Link::query()->withTrashed()->find($id);

        if (!$link) {
            return response()->json([
                'error' => 'Link not found'
            ], 404);
        }

        if (!$link->trashed()) {
            return response()->json([
                'error' => 'Link not deleted'
            ], 404);
        }

        $link->restore();

        return response()->json([
            'message' => 'Link restored'
        ]);
    }
}
