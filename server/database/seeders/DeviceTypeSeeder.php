<?php

namespace Database\Seeders;

use App\Models\DeviceType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Jenssegers\Agent\Agent;

class DeviceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $deviceTypes = [
            'Desktop',
            'Tablet',
            'Phone',
            'Bot',
        ];

        foreach ($deviceTypes as $name) {
            DeviceType::firstOrCreate([
                'name' => $name
            ]);
        }
    }
}
