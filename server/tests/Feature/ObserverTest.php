<?php

namespace Tests\Feature;

use App\Enums\AdvertCategory;
use App\Enums\AdvertType;
use App\Enums\ClickStatus;
use App\Models\Advert;
use App\Models\Device;
use App\Models\Link;
use App\Models\Network;
use App\Models\User;
use App\Models\Visitor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Str;

class ObserverTest extends TestCase {
    /**
     * A basic feature test example.
     */
    public function test_observers(): void {
        $user = User::find(1);

        $link = Link::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('links', [
            'id' => $link->id
        ]);

        $device = Device::createWihtUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36');
        $network = Network::factory()->create();
        $visitor = Visitor::create([
            'device_id' => $device->id,
            'network_id' => $network->id,
            'fingerprint' => hash('sha1', Str::random(16)),
        ]);

        $click = $link->clicks()->create([
            'user_id' => $user->id,
            'visitor_id' => $visitor->id,
            'token' => hash('sha1', Str::random(16)),
            'status' => ClickStatus::Pending
        ]);

        $link = $link->fresh();
        $link->load('reports');

        $this->assertEquals(0, $link->reports()->count(), 'The link should not have any reports when the click is pending');

        $advert = Advert::create([
            'name' => 'Test Advert',
            'type' => AdvertType::Direct,
            'category' => AdvertCategory::Software,
            'data' => [
                'url' => 'https://google.com',
            ]
        ]);

        $click->conversions()->create([
            'advert_id' => $advert->id,
            'earnings' => 0.5
        ]);

        $this->assertEquals(0, $link->reports()->count(), 'The link should not have any reports when the click is pending');

        $click->status = ClickStatus::Completed;
        $click->save();

        $report = $link->reports()->first();

        $this->assertNotNull($report, 'The link should have a report when the click is completed');
        $this->assertEquals(0.5, $report->earnings, 'The report should have the correct earnings');
        $this->assertEquals(1, $report->clicks_count, 'The report should have the correct clicks count');
        $this->assertEquals(500, $report->cpm, 'The report should have the correct CPM');

        $click->conversions()->create([
            'advert_id' => $advert->id,
            'earnings' => 0.5
        ]);

        $report->refresh();

        $this->assertEquals(1, $report->clicks_count, 'The report should have the correct clicks count');
        $this->assertEquals(1, $report->earnings, 'The report should have the correct earnings');
        $this->assertEquals(1000, $report->cpm, 'The report should have the correct CPM');
    }
}
