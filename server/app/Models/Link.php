<?php

namespace App\Models;

use App\Enums\AdvertCategory;
use Illuminate\Database\Eloquent\Casts\AsArrayObject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class Link extends Model {
    use HasFactory, SoftDeletes;

    protected $guarded = ['id', 'status'];
    protected $casts = [
        'type' => 'int',
        'earnings' => 'float',
        'clicks_count' => 'int',
        'excluded_categories' => AsArrayObject::class . ':' . AdvertCategory::class,
        'cpm' => 'float'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function clicks() {
        return $this->hasMany(Click::class);
    }

    public function summary() {
        return $this->hasOne(LinkSummary::class);
    }

    public function reports() {
        return $this->hasMany(Report::class);
    }

    public function conversions() {
        return $this->hasManyThrough(Conversion::class, Click::class);
    }

    public function domain(){
        return $this->belongsTo(Domain::class);
    }

    public static function boot() {
        parent::boot();

        static::saving(function (Link $link) {
            $link->cpm = $link->clicks_count > 0 ? $link->earnings / $link->clicks_count * 1000 : 0;
        });
    }
}
