<?php

use App\Http\Controllers\AdvertController;
use App\Http\Controllers\ClickController;
use App\Http\Middleware\CheckVisitor;
use Illuminate\Support\Facades\Route;

Route::middleware([CheckVisitor::class, 'encrypted'])->group(function(){
  Route::post('clicks', [ClickController::class, 'create']);
  Route::post('advert', [AdvertController::class, 'get']);
  Route::post('/events', [ClickController::class, 'event']);
});
