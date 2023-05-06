<?php

namespace App\Rules;

use App\Enums\LinkDomain;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LinkDomainRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (!LinkDomain::getDomain($value)) {
            $fail("The $attribute must be a valid domain.");
        }
    }
}
