<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Report extends Model {
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

    public function link() {
        return $this->belongsTo(Link::class);
    }

    public function clicks() {
        return $this->link->clicks()
            ->approved()
            ->whereDate('clicks.created_at', $this->date)
            ->whereHas('visitor', function (Builder $query) {
                $query->whereHas('network', function (Builder $query) {
                    $query->where('country_id', $this->country_id);
                })->whereHas('device', function (Builder $query) {
                    $query
                        ->where('browser_id', $this->browser_id)
                        ->where('os_id', $this->os_id)
                        ->where('device_type_id', $this->device_type_id);
                });
            });
    }

    public function earnings() {
        return $this->clicks()
            ->whereHas('conversions')
            ->join('conversions', 'conversions.click_id', '=', 'clicks.id')
            ->sum('conversions.earnings');
    }

    public function clicksCount() {
        return $this->clicks()->count();
    }

    public function sync() {
        $this->earnings = $this->earnings();
        $this->clicks_count = $this->clicksCount();
        $this->save();
    }
}
