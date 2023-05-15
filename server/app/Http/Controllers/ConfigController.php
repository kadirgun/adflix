<?php

namespace App\Http\Controllers;

use App\Enums\AdvertCategory;
use App\Enums\AdvertType;
use App\Enums\LinkDomain;
use App\Models\Domain;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function get(){
        return response()->json([
            'domains' => Domain::all(),
            'ad_categories' => AdvertCategory::labels(),
            'ad_types' => AdvertType::labels()
        ]);
    }
}
