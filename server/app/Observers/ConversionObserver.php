<?php

namespace App\Observers;

use App\Enums\ClickStatus;
use App\Models\Conversion;

class ConversionObserver {
    /**
     * Handle the Conversion "created" event.
     */
    public function created(Conversion $conversion): void {
        $click = $conversion->click;
        if($click->status == ClickStatus::Success){
            $click->report()->increment('earnings', $conversion->earnings);
        }
    }

    /**
     * Handle the Conversion "updated" event.
     */
    public function updated(Conversion $conversion): void {
        //
    }

    /**
     * Handle the Conversion "deleted" event.
     */
    public function deleted(Conversion $conversion): void {
        //
    }

    /**
     * Handle the Conversion "restored" event.
     */
    public function restored(Conversion $conversion): void {
        //
    }

    /**
     * Handle the Conversion "force deleted" event.
     */
    public function forceDeleted(Conversion $conversion): void {
        //
    }
}
