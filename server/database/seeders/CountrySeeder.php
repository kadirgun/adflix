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
        $data = json_decode($data);
        $countries = Country::all();
        foreach ($data as $country) {
            if($countries->contains('code', $country->code)) continue;
            Country::create([
                'name' => $country->name,
                'code' => $country->code,
            ]);
        }
    }
}
