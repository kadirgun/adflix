<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Device>
 */
class DeviceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'browser_id' => $this->faker->numberBetween(1, 5),
            'os_id' => $this->faker->numberBetween(1, 5),
            'device_type_id' => $this->faker->numberBetween(1, 5),
        ];
    }
}
