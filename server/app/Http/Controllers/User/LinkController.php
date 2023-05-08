<?php

namespace App\Http\Controllers\User;

use App\Helpers\ScrapeHelper;
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
        $validator = Validator::make($request->all(), [
            'page' => 'nullable|integer',
            'limit' => 'nullable|integer|max:100',
            'search' => 'nullable|string|max:100',
            'filters' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 10);
        $search = $request->get('search', false);

        /**
         * @var \Illuminate\Database\Query\Builder $query
         */

        $query = $request->user()->links();
        $count = $query->count();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('target', 'like', "%$search%")
                    ->orWhere('key', 'like', "%$search%")
                    ->orWhere('name', 'like', "%$search%");
            });
        }

        $query->orderBy('id', 'desc')
            ->limit($limit)
            ->offset(($page - 1) * $limit);

        if ($request->has('filters')) {
            $filters = (object) $request->get('filters');

            if (isset($filters->domain)) {
                $query->where('domain', $filters->domain);
            }

            if (isset($filters->type)) {
                $query->where('type', $filters->type);
            }

            if (isset($filters->excludes)) {
                $query->whereJsonContains('excludes', $filters->excludes);
            }
        }

        $links = $query->get();

        return response()->json([
            'links' => LinkResource::collection($links),
            'count' => $count,
            'next' => $count > ($page * $limit),
        ]);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'target' => ['required', 'url', new LinkTargetRule],
            'password' => 'nullable|string|min:1',
            'type' => 'nullable|integer|between:1,3',
            'excludes' => ['nullable', new ExcludesRule],
            'domain' => ['required', 'integer', new LinkDomainRule]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        $scrape = ScrapeHelper::fetch($request->target);

        $link = $request->user()->links()->create([
            ...$validator->validated(),
            'name' => $scrape->title,
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
