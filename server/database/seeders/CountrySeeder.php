<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CountrySeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $data = Storage::get('data/countries.json');
        $countries = json_decode($data);
        foreach ($countries as $country) {
            Country::firstOrCreate([
                'name' => $country->name,
                'code' => $country->code,
            ]);
        }
    }
}
