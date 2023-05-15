<?php

namespace App\Rules;

use App\Enums\LinkDomain;
use App\Models\Domain;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LinkDomainRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (!Domain::find($value)) {
            $fail("The $attribute must be a valid domain.");
        }
    }
}
