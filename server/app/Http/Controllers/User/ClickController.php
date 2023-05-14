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

        $builder = $request->user()->reports()
            ->selectRaw('SUM(earnings) as earnings, SUM(clicks_count) as clicks_count, AVG(cpm) as cpm')
            ->whereBetween('date', [$request->from, $request->to]);

        if ($request->group) {
            $builder->addSelect($request->group);
            $builder->groupBy($request->group);
        } else {
            $builder->addSelect('date');
            $builder->groupBy('date');
        }

        if ($request->filters) {
            foreach ($request->filters as $filter) {
                $builder->where($filter['field'], $filter['value']);
            }
        }

        $reports = $builder->get();

        return response()->json($reports);
    }
}
