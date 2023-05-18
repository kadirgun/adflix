<?php

use App\Http\Controllers\AdvertController;
use App\Http\Controllers\LinkController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/publisher/auth/verify')->name('verification.verify');

Route::get('{key}', [LinkController::class, 'show']);
Route::get('banner/{id}', [AdvertController::class, 'frame']);