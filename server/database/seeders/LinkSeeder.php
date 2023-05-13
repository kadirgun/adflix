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
        Link::factory()->count(10)->create([
            'user_id' => 1
        ]);
    }
}
