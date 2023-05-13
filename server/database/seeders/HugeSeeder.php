<?php

namespace Database\Seeders;

use App\Enums\ClickStatus;
use App\Models\Click;
use App\Models\Country;
use App\Models\Device;
use App\Models\Link;
use App\Models\Network;
use App\Models\Visitor;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Console\Output\ConsoleOutput;

class HugeSeeder extends Seeder {
  /**
   * Run the database seeds.
   */
  public function run(): void {
    $device = Device::createWihtUserAgent('Mozilla/5.0 (Linux; Android 10; SM-A205U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36');

    $country = Country::inRandomOrder()->first();

    $network = Network::create([
      'ip' => '127.0.0.1',
      'country_id' => $country->id,
      'asn' => 7922
    ]);

    $visitor = Visitor::create([
      'device_id' => $device->id,
      'network_id' => $network->id,
      'fingerprint' => hash('sha1', Str::random(16)),
    ]);

    $chunk = 1000;
    $batch = 1000;

    $output = new ConsoleOutput();
    $bar = new ProgressBar($output, $chunk * $batch);

    $clicks = [];

    for ($i = 0; $i < $batch; $i++) {
      for ($f = 0; $f < $chunk; $f++) {
        // $date = Carbon::now()->subDays(rand(0, 30));
        $date = Carbon::now();
        $clicks[] = [
          'link_id' => rand(1, 10),
          'user_id' => 1,
          'visitor_id' => $visitor->id,
          'token' => hash('sha1', Str::random(16)),
          'status' => 1,
          'created_at' => $date,
          'updated_at' => $date,
        ];
      }

      Click::insert($clicks);
      $clicks = [];
      $bar->advance($batch);
    }

    $bar->finish();
  }
}
