<?php

namespace App\Models;

use App\Enums\AdsType;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Link extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];
    protected $casts = [
        'type' => 'int',
        'earnings' => 'float',
        'clicks' => 'int',
        'excludes' => AsArrayObject::class.':'.AdsType::class,
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function clicks(){
        return $this->hasMany(Click::class);
    }
}
