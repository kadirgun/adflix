<?php

namespace App\Observers;

use App\Enums\ClickStatus;
use App\Models\Click;
use Illuminate\Support\Facades\Log;

class ClickObserver {
	public function updating(Click $click): void {
		if ($click->isDirty('status')) {
			if ($click->status === ClickStatus::Approved) {
				$click->link->increment('clicks_count');
				$click->link->increment('earnings', $click->earnings);
			}
		}

		if($click->isDirty('earnings')) {
			if($click->status === ClickStatus::Approved){
				$click->link->increment('earnings', $click->earnings - $click->getOriginal('earnings'));
			}
		}
	}

	/**
	 * Handle the Click "updated" event.
	 */
	public function updated(Click $click): void {
	}

	/**
	 * Handle the Click "deleted" event.
	 */
	public function deleted(Click $click): void {
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
