<?php

use App\Http\Controllers\ConfigController;
use App\Http\Controllers\User\AccountController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ClickController;
use App\Http\Controllers\User\LinkController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('user.register');
    Route::post('login', [AuthController::class, 'login'])->name('user.login');
    Route::post('verify', [AuthController::class, 'verify'])->name('user.verify');
});

Route::middleware('auth:user')->group(function () {
    Route::get('config', [ConfigController::class, 'get'])->name('config.get');
    
    Route::prefix('auth')->group(function () {
        Route::get('logout', [AuthController::class, 'logout'])->name('user.logout');
    });

    Route::prefix('links')->group(function () {
        Route::post('/list', [LinkController::class, 'list'])->name('user.links.list');
        Route::post('/', [LinkController::class, 'create'])->middleware('verified')->name('user.links.create');
    
        Route::prefix('{id}')->group(function () {
            Route::get('/', [LinkController::class, 'get'])->name('user.links.get');
            Route::delete('/', [LinkController::class, 'delete'])->name('user.links.delete');
            Route::put('/', [LinkController::class, 'update'])->name('user.links.update');
        });
    });

    Route::prefix('clicks')->group(function () {
        Route::post('report', [ClickController::class, 'report'])->name('user.clicks.report');
    });

    Route::prefix('account')->group(function(){
        Route::get('/', [AccountController::class, 'get'])->name('user.account.get');
        Route::post('/', [AccountController::class, 'update'])->name('user.account.update');
    });
});
