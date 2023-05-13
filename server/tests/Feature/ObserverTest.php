<?php

namespace Tests\Feature;

use App\Enums\ClickStatus;
use App\Enums\LinkDomain;
use App\Enums\LinkType;
use App\Models\Link;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Str;

class ObserverTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_click_observer(): void
    {
        $user = User::factory()->create();

        $link = Link::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('links', [
            'id' => $link->id,
            'clicks_count' => 0,
        ]);

        $link->clicks()->create([
            'user_id' => $user->id,
            'earnings' => 0.000000,
            'platform' => 'Desktop',
            'os' => 'Windows',
            'os_version' => '10',
            'browser' => 'Chrome',
            'browser_version' => '90.0.4430.93',
            'ip' => '31.254.11.22',
            'asn' => 2545,
            'country' => 'TR',
            'status' => ClickStatus::Pending
        ]);

        $link = $link->fresh();

        $this->assertEquals(1, $link->clicks_count);
    }
}
