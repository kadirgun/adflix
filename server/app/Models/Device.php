<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Str;

class Device extends Model {
    use HasFactory;

    protected $guarded = ['id'];

    public static function createWihtUserAgent(string $userAgent): self {
        $agent = new Agent();
        $agent->setUserAgent($userAgent);

        $browser = Browser::firstOrCreate([
            'name' => $agent->browser(),
        ]);

        $os = Os::firstOrCreate([
            'name' => $agent->platform(),
        ]);

        $deviceType = DeviceType::firstOrCreate([
            'name' => $agent->deviceType(),
        ]);

        return self::create([
            'browser_id' => $browser->id,
            'os_id' => $os->id,
            'device_type_id' => $deviceType->id,
            'user_agent' => $userAgent,
            'uuid' => Str::uuid(),
        ]);
    }
}
