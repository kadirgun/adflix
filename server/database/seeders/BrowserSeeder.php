<?php

namespace Database\Seeders;

use App\Models\Browser;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Jenssegers\Agent\Agent;

class BrowserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $browsers = Agent::getBrowsers();

        foreach ($browsers as $name => $pattern) {
            Browser::firstOrCreate([
                'name' => $name
            ]);
        }
    }
}
