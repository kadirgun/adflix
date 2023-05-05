<?php

use App\Http\Controllers\User\AccountController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ClickController;
use App\Http\Controllers\User\LinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('verify', [AuthController::class, 'verify']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('logout', [AuthController::class, 'logout']);
    });

    Route::prefix('links')->group(function () {
        Route::get('/', [LinkController::class, 'list']);
        Route::post('/', [LinkController::class, 'create'])->middleware('verified');
    
        Route::prefix('{id}')->group(function () {
            Route::get('/', [LinkController::class, 'get']);
            Route::delete('/', [LinkController::class, 'delete']);
            Route::put('/', [LinkController::class, 'update']);
            Route::get('clicks', [LinkController::class, 'clicks']);
        });
    });

    Route::prefix('clicks')->group(function () {
        Route::get('/', [ClickController::class, 'list']);
        Route::post('report', [ClickController::class, 'report']);
    });

    Route::prefix('account')->group(function(){
        Route::get('/', [AccountController::class, 'get']);
        Route::post('/', [AccountController::class, 'update']);
    });
});
