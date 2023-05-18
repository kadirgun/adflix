<?php

namespace App\Models;

use App\Enums\AdvertCategory;
use App\Enums\AdvertType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advert extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $casts = [
        'data' => 'object',
        'type' => AdvertType::class,
        'category' => AdvertCategory::class
    ];
}
