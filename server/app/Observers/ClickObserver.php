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
		if ($click->status == ClickStatus::Approved) {
			$click->link()->increment('clicks');
			$click->link()->increment('earnings', $click->earnings);
			$click->user()->increment('earnings', $click->earnings);
		} else if ($click->status == ClickStatus::Rejected) {
			$click->user()->decrement('earnings', $click->earnings);
			$click->link()->decrement('earnings', $click->earnings);
			$click->link()->increment('clicks');
		}
	}

	/**
	 * Handle the Click "deleted" event.
	 */
	public function deleted(Click $click): void {
		$click->user()->decrement('earnings', $click->earnings);
		$click->link()->decrement('earnings', $click->earnings);
		$click->link()->increment('clicks');
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
