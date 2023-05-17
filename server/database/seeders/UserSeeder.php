<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate([
            'id' => 1
        ], [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'test@gmail.com',
            'password' => bcrypt('123456789'),
            'email_verified_at' => now(),
        ]);

        $user->tokens()->firstOrCreate([
            'token' => hash('sha256', 'JT9nZjrCfkuM6FdRMYKsqV7bdeeHHxDScZ4PjgIP'),
        ], [
            'name' => 'auth_token',
            'abilities' => ['*']
        ]);
    }
}
