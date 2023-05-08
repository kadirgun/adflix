<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class LinkTargetRule implements ValidationRule {
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        if (!filter_var($value, FILTER_VALIDATE_URL)) {
            $fail('The :attribute must be a valid URL.');
            return;
        }

        $url = parse_url($value);
        $url = (object) $url;

        if (!isset($url->host)) {
            $fail('The :attribute must be a valid URL.');
        }else if ($url->host === 'localhost') {
            $fail('The :attribute must not be a localhost URL.');
        }else if (strpos($url->host, '.') === false) {
            $fail('The :attribute must be a valid URL.');
        }else if ($url->scheme !== 'http' && $url->scheme !== 'https') {
            $fail('The :attribute must be a valid HTTP or HTTPS URL.');
        }
    }
}
