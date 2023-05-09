<?php

namespace Database\Seeders;

use App\Enums\AdvertCategory;
use App\Models\Link;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LinkSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Link::firstOrCreate([
            'id' => 1
        ], [
            'user_id' => 1,
            'target' => 'https://google.com',
            'domain' => 1,
            'key' => Str::random(6)
        ]);

        Link::firstOrCreate([
            'id' => 2
        ], [
            'user_id' => 1,
            'target' => 'https://google.com',
            'domain' => 1,
            'key' => Str::random(6),
            'excluded_categories' => [AdvertCategory::Erotic, AdvertCategory::Gambling]
        ]);
    }
}
