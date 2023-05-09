<?php

namespace Database\Seeders;

use App\Enums\ClickStatus;
use App\Models\Click;
use App\Models\Link;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class HugeSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    for ($i = 0; $i < 1; $i++) {
      $clicks = [];
      for($f=0; $f < 1000; $f++) {
        $click= Click::factory()
        ->make([
          'link_id' => 1,
          'user_id' => 1,
        ])->toArray();

        $date = Carbon::now()->subDays(rand(0, 30));
        $click['created_at'] = $date;
        $click['updated_at'] = $date;

        $clicks[] = $click;
      }

      Click::insert($clicks);
    }
  }
}
