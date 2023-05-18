<?php

namespace Database\Seeders;

use App\Enums\AdvertCategory;
use App\Enums\AdvertType;
use App\Models\Advert;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdvertSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Advert::firstOrCreate([
            'id' => 1,
        ], [
            'name' => 'Adsterra Banner',
            'type' => AdvertType::Banner,
            'category' => AdvertCategory::Erotic,
            'data' => [
                'html' => ""
            ],
            'cpc' => 0.05
        ]);
    }
}
