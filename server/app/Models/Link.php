<?php

namespace App\Models;

use App\Enums\AdvertCategory;
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
        'excluded_categories' => AsArrayObject::class.':'.AdvertCategory::class,
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function clicks(){
        return $this->hasMany(Click::class);
    }

    public function getCPMAttribute(){
        if($this->clicks == 0) return 0;
        return ($this->earnings / $this->clicks) * 1000;
    }
}
