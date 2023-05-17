<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\LinkController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:admin')->group(function(){
  Route::get('account', [AccountController::class, 'get']);

  Route::prefix('links')->group(function(){
    Route::post('list', [LinkController::class, 'list']);
    Route::post('/', [LinkController::class, 'create']);

    Route::prefix('{id}')->group(function(){
      Route::get('/', [LinkController::class, 'get']);
      Route::delete('/', [LinkController::class, 'delete']);
      Route::get('restore', [LinkController::class, 'restore']);
    });
  });

  Route::prefix('users')->group(function(){
    Route::post('list', [UserController::class, 'list']);

    Route::prefix('{id}')->group(function(){
      Route::get('/', [UserController::class, 'get']);
    });
  });
});