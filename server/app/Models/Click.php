<?php

namespace App\Models;

use App\Enums\ClickStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Click extends Model {
    use HasFactory;

    protected $guarded = ['id', 'status'];
    protected $casts = [
        'status' => ClickStatus::class,
        'earnings' => 'float',
    ];

    protected $attributes = [
        'status' => ClickStatus::Pending
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
    
    public function setStatus(ClickStatus $status){
        $this->status = $status;
        $this->save();
    }

    public function report(): Report {
        return Report::firstOrCreate([
            'user_id' => $this->user_id,
            'link_id' => $this->link_id,
            'date' => $this->created_at->toDateString(),
            'country_id' => $this->visitor->network->country_id,
            'browser_id' => $this->visitor->device->browser_id,
            'os_id' => $this->visitor->device->os_id,
            'device_type_id' => $this->visitor->device->device_type_id,
        ]);
    }

    public function scopeApproved(Builder $query) {
        $query->where('status', ClickStatus::Completed);
    }

    public function scopeWithEarnings(Builder $query) {
        $query->withSum('conversions', 'earnings');
    }
}
