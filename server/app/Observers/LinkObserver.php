<?php

namespace App\Observers;

use App\Models\Link;

class LinkObserver {
    /**
     * Handle the Link "created" event.
     */
    public function created(Link $link): void {
        //
    }

    public function updating(Link $link): void {
        if ($link->isDirty('clicks_count')) {
            $link->user->increment('clicks_count', $link->clicks_count - $link->getOriginal('clicks_count'));
        }

        if ($link->isDirty('earnings')) {
            $link->user->increment('earnings', $link->earnings - $link->getOriginal('earnings'));
        }
    }

    /**
     * Handle the Link "updated" event.
     */
    public function updated(Link $link): void {
        //
    }

    /**
     * Handle the Link "deleted" event.
     */
    public function deleted(Link $link): void {
        //
    }

    /**
     * Handle the Link "restored" event.
     */
    public function restored(Link $link): void {
        //
    }

    /**
     * Handle the Link "force deleted" event.
     */
    public function forceDeleted(Link $link): void {
        //
    }
}
