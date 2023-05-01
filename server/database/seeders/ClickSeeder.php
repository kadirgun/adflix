<?php

namespace Database\Seeders;

use App\Enums\ClickStatus;
use App\Models\Click;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClickSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Click::firstOrCreate([
            'link_id' => 1,
            'user_id' => 1,
            'earnings' => 0.000000,
            'platform' => 'Desktop',
            'os' => 'Windows',
            'os_version' => '10',
            'browser' => 'Chrome',
            'browser_version' => '90.0.4430.93',
            'ip' => '31.254.11.22',
            'asn' => 2545,
            'country' => 'TR',
            'status' => ClickStatus::Pending
        ]);

        Click::firstOrCreate([
            'link_id' => 1,
            'user_id' => 1,
            'earnings' => 0.100000,
            'platform' => 'Desktop',
            'os' => 'Windows',
            'os_version' => '10',
            'browser' => 'Chrome',
            'browser_version' => '90.0.4430.93',
            'ip' => '31.254.11.22',
            'asn' => 2545,
            'country' => 'TR',
            'status' => ClickStatus::Approved
        ]);

        Click::firstOrCreate([
            'link_id' => 1,
            'user_id' => 1,
            'earnings' => 0.100000,
            'platform' => 'Desktop',
            'os' => 'Windows',
            'os_version' => '10',
            'browser' => 'Chrome',
            'browser_version' => '90.0.4430.93',
            'ip' => '31.254.11.22',
            'asn' => 2545,
            'country' => 'TR',
            'status' => ClickStatus::Rejected
        ]);
    }
}
