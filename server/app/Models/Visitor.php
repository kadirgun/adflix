<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

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

    public static function createWithRequest(){
        $countryCode = request()->header('CF-IPCountry', 'XX');
        $country = Country::where('code', $countryCode)->first();

        $network = Network::firstOrCreate([
            'ip' => request()->ip(),
            'asn' => request()->header('CF-ASN', 0),
            'country_id' => $country->id,
        ]);

        $device = Device::createWihtUserAgent(request()->userAgent());

        $visitor = Visitor::create([
            'network_id' => $network->id,
            'device_id' => $device->id,
            'fingerprint' => hash('sha256', Uuid::uuid4())
        ]);

        return $visitor;
    }
}
