<?php

namespace App\Http\Controllers;

use App\Enums\AdsType;
use App\Enums\LinkDomain;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function get(){
        return response()->json([
            'domains' => LinkDomain::list(),
            'ads_types' => AdsType::labels(),
        ]);
    }
}
