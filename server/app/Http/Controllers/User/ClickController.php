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
        $clicks = auth()->user()->clicks()->where('status', ClickStatus::Approved)->get();

        return response()->json(ClickResource::collection($clicks));
    }

    public function report(Request $request) {
        $validator = Validator::make($request->all(), [
            'from' => 'required|date',
            'to' => 'required|date',
            'filters' => 'nullable|array',
            'group' => 'nullable|in:country,platform,os,browser,date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 400);
        }

        /**
         * @var \Illuminate\Database\Eloquent\Builder $builder
         */

        $builder = Click::query()
            ->where('user_id', auth()->id())
            ->selectRaw('count(*) as clicks, sum(earnings) as earnings')
            ->whereBetween('created_at', [$request->from, $request->to])
            ->where('status', ClickStatus::Approved);

        if ($request->group) {
            $builder->addSelect($request->group);
            $builder->groupBy($request->group);
        } else {
            $builder->addSelect('DATE(created_at) as date');
            $builder->groupBy('date');
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
