<?php

namespace App\Http\Controllers\User;

use App\Enums\ClickStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\ClickResource;
use Illuminate\Http\Request;

class ClickController extends Controller
{
    public function list(){
        $clicks = auth()->user()->clicks()->where('status', ClickStatus::Approved)->get();

        return response()->json(ClickResource::collection($clicks));
    }
}
