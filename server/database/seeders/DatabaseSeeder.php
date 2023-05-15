<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Device;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $this->call([
            UserSeeder::class,
            DomainSeeder::class,
            LinkSeeder::class,
            ClickSeeder::class,
            BrowserSeeder::class,
            OsSeeder::class,
            DeviceTypeSeeder::class,
            CountrySeeder::class,
        ]);
    }
}
