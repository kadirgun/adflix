<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\ValidatorAwareRule;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Validator;

class ReCaptchaV3Rule implements ValidationRule, ValidatorAwareRule {

    protected $action = null;
    protected $threshold = 0.5;
    protected $validator;
    protected $host;

    public function __construct(float $threshold = 0.5, string $action = null, string $host = null) {
        $this->action = $action;
        $this->threshold = $threshold;
        $this->host = $host;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $response = $this->verify($value);

        if (!$response->success) {
            $fail('The reCAPTCHA was invalid.');
        }

        if ($response->score < $this->threshold) {
            $fail('The reCAPTCHA score was too low.');
        }

        if ($this->action && $response->action !== $this->action) {
            $fail('The reCAPTCHA action was invalid.');
        }

        if ($this->host && $response->hostname !== $this->host) {
            $fail('The reCAPTCHA hostname was invalid.');
        }

        $this->validator->setValue($attribute, $response);
    }

    public function verify(string $token) {
        $data = [
            'secret' => config('services.recaptcha.secret'),
            'response' => $token
        ];

        if ($this->action) $data['action'] = $this->action;

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', $data);

        if ($response->failed()) {
            return (object) [
                'success' => false,
                'score' => 0,
                'action' => null
            ];
        }

        return (object) $response->json();
    }


    public function setValidator(Validator $validator): static {
        $this->validator = $validator;

        return $this;
    }
}
