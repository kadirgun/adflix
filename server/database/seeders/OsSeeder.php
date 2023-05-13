<?php

namespace Database\Seeders;

use App\Models\Os;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Jenssegers\Agent\Agent;

class OsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $oses = Agent::getOperatingSystems();

        foreach ($oses as $name => $pattern) {
            Os::firstOrCreate([
                'name' => $name
            ]);
        }
    }
}
