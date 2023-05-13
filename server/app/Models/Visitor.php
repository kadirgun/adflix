<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model {
    use HasFactory;

    protected $guarded = ['id'];

    public function browser() {
        return $this->belongsTo(Browser::class);
    }

    public function network() {
        return $this->belongsTo(Network::class);
    }

    public function device(){
        return $this->belongsTo(Device::class);
    }

    public function clicks() {
        return $this->hasMany(Click::class);
    }
}
