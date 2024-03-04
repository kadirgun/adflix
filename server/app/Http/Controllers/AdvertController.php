<?php

namespace App\Http\Controllers;

use App\Enums\AdvertType;
use App\Models\Advert;
use App\Models\Click;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdvertController extends Controller {
    public function get(Request $request) {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Bad Request'
            ], 400);
        }

        $click = Click::where('token', $request->token)->first();

        if(!$click) {
            return response()->json([
                'error' => 'Not Found'
            ], 404);
        }

        $advert = Advert::query()->whereNotIn('category', $click->link->excluded_categories)->inRandomOrder()->where('type', AdvertType::Banner)->first();

        if(!$advert) {
            return response()->json([
                'error' => 'Not Found'
            ], 404);
        }

        if($advert->type == AdvertType::Banner){
            $advert->setHidden(['data']);
        }

        return response()->json($advert);
    }

    public function frame($id){
        $advert = Advert::query()->where('id', $id)->first();

        return view('banner', ['html' => $advert->data->html]);
    }
}
