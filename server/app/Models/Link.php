<?php

namespace App\Models;

use App\Enums\AdvertCategory;
use App\Enums\ClickStatus;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class Link extends Model {
    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];
    protected $casts = [
        'type' => 'int',
        'earnings' => 'float',
        'clicks' => 'int',
        'excluded_categories' => AsArrayObject::class . ':' . AdvertCategory::class,
        'cpm' => 'float'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function clicks() {
        return $this->hasMany(Click::class);
    }

    public function scopeWithCPM(Builder $query){
        $query->addSelect(['cpm' => DB::raw('(earnings / clicks_count) * 1000 as cpm')]);
    }

    public function sync(){
        $this->clicks_count = $this->clicks()->count();

        $this->save();
    }
}
