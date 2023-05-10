<?php

namespace App\Observers;

use App\Models\Conversion;

class ConversionObserver {
    public function created(Conversion $conversion): void {
        $conversion->click->sync();
    }

    public function updated(Conversion $conversion): void {
        $conversion->click->sync();
    }

    public function deleted(Conversion $conversion): void {
        $conversion->click->sync();
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
