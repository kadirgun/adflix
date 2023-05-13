<?php

namespace App\Jobs;

use App\Models\Click;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ClickReport implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $click;

    /**
     * Create a new job instance.
     */
    public function __construct(Click $click) {
        $this->click = $click;
    }

    /**
     * Execute the job.
     */
    public function handle(): void {
        $this->click->earnings = $this->click->conversions()->sum('earnings');
       
        $report = $this->click->link->reports()->firstOrCreate([
            'user_id' => $this->click->user_id,
            'link_id' => $this->click->link_id,
            'date' => $this->click->created_at->toDateString(),
            'browser_id' => $this->click->visitor->device->browser_id,
            'os_id' => $this->click->visitor->device->os_id,
            'device_type_id' => $this->click->visitor->device->device_type_id,
            'country_id' => $this->click->visitor->network->country_id,
        ], [
            'clicks_count' => 0,
            'earnings' => 0,
        ]);

        $report->sync();
    }
}
