<?php

namespace App\Rules;

use App\Enums\AdsType;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ExcludesRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value)) {
            $fail('The :attribute must be an array.');
        }

        foreach ($value as $item) {
            if (is_null(AdsType::tryFrom($item))) {
                $fail('The :attribute must be an array of ads type.');
            }
        }
    }
}
