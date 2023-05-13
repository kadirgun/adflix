<?php

namespace App\Http\Controllers\User;

use App\Enums\ClickStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\ClickResource;
use App\Models\Click;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ClickController extends Controller {
    public function list() {
        $clicks = auth()->user()->clicks()->where('status', ClickStatus::Approved)->limit(1000)->get();

        return response()->json(ClickResource::collection($clicks));
    }

    public function report(Request $request) {
        $validator = Validator::make($request->all(), [
            'from' => 'required|date',
            'to' => 'required|date',
            'filters' => 'nullable|array',
            'group' => 'nullable|in:country,platform,os,browser'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 400);
        }

        /**
         * @var \Illuminate\Database\Query\Builder $builder
         */

        $builder = Click::query()
            ->where('user_id', auth()->id())
            ->selectRaw('count(clicks.id) as clicks, sum(clicks.earnings) as earnings')
            ->whereBetween('clicks.created_at', [$request->from, $request->to])
            ->where('status', ClickStatus::Approved);

        if ($request->group) {
            $builder->addSelect($request->group);
            $builder->groupBy($request->group);
        } else {
            // $builder->addSelect(DB::raw('DATE(created_at) as date'));
            // $builder->groupBy('date');
            $builder->join('visitors', 'clicks.visitor_id', '=', 'visitors.id');
            $builder->join('browsers', 'visitors.browser_id', '=', 'browsers.id');
            $builder->addSelect('browsers.name as browser');
            $builder->groupBy('browser');
            // return $builder->toSql();
        }

        if ($request->filters) {
            foreach ($request->filters as $filter) {
                $builder->where($filter['field'], $filter['value']);
            }
        }

        $clicks = $builder->get();

        return response()->json($clicks);
    }
}
