<?php

namespace App\Models;

use App\Enums\ClickStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model {
    use HasFactory;

    protected $guarded = ['id'];
    protected $casts = [
        'status' => ClickStatus::class,
        'earnings' => 'float',
    ];

    protected $attributes = [
        'status' => ClickStatus::Pending,
        'earnings' => 0,
    ];

    public function link() {
        return $this->belongsTo(Link::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function conversions() {
        return $this->hasMany(Conversion::class);
    }

    public function visitor() {
        return $this->belongsTo(Visitor::class);
    }

    public function scopeApproved(Builder $query) {
        $query->where('status', ClickStatus::Approved);
    }

    public function scopeWithEarnings(Builder $query) {
        $query->withSum('conversions', 'earnings');
    }
}
