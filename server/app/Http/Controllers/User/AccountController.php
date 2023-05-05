<?php

namespace App\Http\Controllers\User;

use App\Helpers\UserSettingsHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\User\AccountResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AccountController extends Controller {
    public function get() {
        return response()->json(new AccountResource(auth()->user()));
    }

    public function update(Request $request) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'nullable|string|max:10',
            'last_name' => 'nullable|string|max:10',
            'email' => 'nullable|email|max:255',
            'settings' => 'nullable|array'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $user = auth()->user();

        if($request->has('settings')){
            $settings = UserSettingsHelper::parse($request->settings);
            $validator->setValue('settings', $settings);
        }

        $user->fill($validator->validated());
        $user->save();

        return response()->json(new AccountResource($user));
    }

    public function password() {
    }

    public function avatar() {
    }
}
