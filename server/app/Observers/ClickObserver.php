<?php

namespace App\Observers;

use App\Enums\ClickStatus;
use App\Models\Click;

class ClickObserver {
    /**
     * Handle the Click "created" event.
     */
    public function created(Click $click): void {
        //
    }

    /**
     * Handle the Click "updated" event.
     */
    public function updated(Click $click): void {
        if($click->status == ClickStatus::Completed){
            $report = $click->report();
            $report->earnings += $click->conversions->sum('earnings');
            $report->clicks_count += 1;
            $report->save();
        }
    }

    /**
     * Handle the Click "deleted" event.
     */
    public function deleted(Click $click): void {
        //
    }

    /**
     * Handle the Click "restored" event.
     */
    public function restored(Click $click): void {
        //
    }

    /**
     * Handle the Click "force deleted" event.
     */
    public function forceDeleted(Click $click): void {
        //
    }
}
