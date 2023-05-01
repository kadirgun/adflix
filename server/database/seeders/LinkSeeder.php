<?php

namespace Database\Seeders;

use App\Models\Link;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $link = Link::firstOrCreate([
            'id' => 1
        ], [
            'user_id' => 1,
            'target_url' => 'https://google.com',
            'key' => Str::random(6)
        ]);
    }
}
