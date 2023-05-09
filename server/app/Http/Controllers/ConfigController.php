<?php

namespace App\Http\Controllers;

use App\Enums\AdvertCategory;
use App\Enums\AdvertType;
use App\Enums\LinkDomain;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function get(){
        return response()->json([
            'domains' => LinkDomain::getDomains(),
            'ad_categories' => AdvertCategory::labels(),
            'ad_types' => AdvertType::labels()
        ]);
    }
}
