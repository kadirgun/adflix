<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $admin = Admin::firstOrCreate([
            'email' => 'admin@shorn.to',            
        ], [
            'password' => bcrypt('O2yXEAhkemALdVM'),
        ]);

        $admin->tokens()->firstOrCreate([
            'name' => 'admin_token',
            'token' => hash('sha256', 'jwdyucKvJ8TFzahn9q2F9drr29iAgT7L6lHLxSd9'),
        ], [
            'abilities' => ['*']
        ]);
    }
}
