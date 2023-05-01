<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:25',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|max:25',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->sendEmailVerificationNotification();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ]);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8|max:25',
        ]);

        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
                'error' => 'E-mail or password is incorrect',
            ], 400);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
        ]);
    }

    public function logout(){
        auth()->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out',
        ]);
    }

    public function verify(Request $request){
        $validator = Validator::make($request->all(), [
            'id' => 'required|integer',
            'hash' => 'required|string',
            'expires' => 'required|integer',
            'signature' => 'required|string',
        ]);

        if ($validator->fails()){
            return response()->json([
                'error' => 'Invalid or Expired url provided',
            ], 400);
        }

        $valid = $request->hasValidSignature();

        if (!$valid){
            return response()->json([
                'error' => 'Invalid or Expired url provided',
            ], 400);
        }

        $user = User::findOrFail($request->id);

        if (!$user->hasVerifiedEmail()){
            $user->markEmailAsVerified();
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Email verified',
            'access_token' => $token,
        ]);
    }

    public function user(){
        return response()->json(auth()->user());
    }
}
