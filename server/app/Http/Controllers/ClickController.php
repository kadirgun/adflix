<?php

namespace App\Http\Controllers;

use App\Models\Advert;
use App\Models\Click;
use App\Models\Link;
use App\Rules\ReCaptchaV3Rule;
use Illuminate\Encryption\Encrypter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;

class ClickController extends Controller {
    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'link_id' => 'required|integer',
            'recaptcha' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Bad Request'
            ], 400);
        }

        $link = Link::find($request->link_id);

        if (!$link) {
            return response()->json([
                'error' => 'Not Found'
            ], 404);
        }

        $validator->setRules([
            'recaptcha' => new ReCaptchaV3Rule(0.5, 'click', $link->domain->name)
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Bad Request'
            ], 400);
        }

        $click = $link->clicks()->create([
            'visitor_id' => session('visitor'),
            'user_id' => $link->user_id,
            'token' => hash('sha1', $request->recaptcha)
        ]);

        return response()->json([
            'token' => $click->token
        ]);
    }

    public function event(Request $request){
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'advert_id' => 'required|integer'
        ]);

        if($validator->fails()){
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

        $advert = Advert::find($request->advert_id);

        if(!$advert) {
            return response()->json([
                'error' => 'Not Found'
            ], 404);
        }

        $click->conversions()->create([
            'advert_id' => $request->advert_id,
            'earnings' => $advert->cpc
        ]);

        return response()->json([
            'success' => true
        ]);
    }
}
