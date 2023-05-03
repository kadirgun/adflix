<?php

namespace App\Models;

use App\Enums\ClickStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $casts = [
        'status' => ClickStatus::class,
        'earnings' => 'float',
    ];
}
