<?php

namespace App\Http\Controllers\User;

use App\Enums\ClickStatus;
use App\Helpers\ScrapeHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\LinkResource;
use App\Jobs\ClickReport;
use App\Models\Click;
use App\Rules\LinkExcludedCategoriesRule;
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
            'order.dir' => 'nullable|string|in:asc,desc',
            'order.column' => 'nullable|string|in:id,name,clicks,earnings,cpm',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 9);
        $search = $request->get('search', false);

        /**
         * @var \Illuminate\Database\Eloquent\Builder $query
         */

        $query = $request->user()->links()->select();
        $count = $query->count();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('target', 'like', "%$search%")
                    ->orWhere('key', 'like', "%$search%")
                    ->orWhere('name', 'like', "%$search%");
            });
        }

        $query->limit($limit)->offset(($page - 1) * $limit);

        $query->orderBy($request->json('order.column', 'id'), $request->json('order.dir', 'desc'));

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
            'target' => ['required', new LinkTargetRule],
            'password' => 'nullable|string|min:1',
            'type' => 'nullable|integer|between:1,3',
            'excluded_categories' => ['nullable', new LinkExcludedCategoriesRule],
            'domain_id' => ['required', 'integer', new LinkDomainRule]
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
            'target' => ['required', new LinkTargetRule],
            'password' => 'nullable|string|min:1',
            'type' => 'nullable|integer|between:1,3',
            'excluded_categories' => ['nullable', new LinkExcludedCategoriesRule],
            'domain_id' => ['nullable', 'integer', new LinkDomainRule],
            'name' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

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
