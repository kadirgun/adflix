<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Click>
 */
class ClickFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-30 days' );
        return [
            'earnings' => $this->faker->randomFloat(4, 0, 0.001),
            'platform' => $this->faker->randomElement(['desktop', 'mobile', 'tablet']),
            'os' => $this->faker->randomElement(['windows', 'mac', 'linux', 'android', 'ios']),
            'os_version' => $this->faker->randomElement(['10', '11', '12', '13', '14', '15']),
            'browser' => $this->faker->randomElement(['chrome', 'firefox', 'safari', 'edge', 'opera']),
            'browser_version' => $this->faker->randomElement(['90', '91', '92', '93', '94', '95']),
            'ip' => $this->faker->ipv4,
            'asn' => $this->faker->randomNumber(5),
            'country' => $this->faker->countryCode,
            'status' => 1,
            'created_at' => $date->getTimestamp(),
            'updated_at' => $date->getTimestamp(),
        ];
    }
}
