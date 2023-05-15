<?php

namespace App\Models;

use App\Enums\DomainStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domain extends Model {
    use HasFactory;

    public $timestamps = false;
    protected $guarded = ['id'];
    protected $casts = [
        'status' => DomainStatus::class
    ];

    public function links() {
        return $this->hasMany(Link::class);
    }
}
