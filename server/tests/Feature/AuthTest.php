<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase {
    use WithFaker;

    /**
     * A basic feature test example.
     */
    public function test_register(): void {
        $email = $this->faker->email;
        $password = $this->faker->password;

        $response = $this->post(route('user.register'), [
            'first_name' => 'Test',
            'last_name' => 'Test',
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'access_token'
        ]);
        $user = User::where('email', $email)->first();
        $this->assertNotNull($user);
        $user->tokens()->delete();

        //Test wrong password
        $response = $this->post(route('user.login'), [
            'email' => $email,
            'password' => $password . '123',
        ]);
        $response->assertStatus(400);

        //Test login success
        $response = $this->post(route('user.login'), [
            'email' => $email,
            'password' => $password,
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'access_token'
        ]);

        $token = $response->json('access_token');

        $response = $this->get(route('user.logout'), [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertStatus(200);

        $tokens = $user->tokens()->count();
        $this->assertEquals(0, $tokens);
    }
}
