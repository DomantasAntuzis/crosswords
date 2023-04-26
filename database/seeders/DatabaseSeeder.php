<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//         \App\Models\User::factory(10)->create();

        $data = [
            [
                'name' => 'admin',
                'role' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin'), // assuming you want to hash the password
                'remember_token' => Str::random(10), // assuming you want to generate a random remember token
                'created_at' => now(),
                'updated_at' => now(),
            ],     [
                'name' => 'user',
//                'role' => 'admin',
                'email' => 'user@gmail.com',
                'password' => bcrypt('user'), // assuming you want to hash the password
                'remember_token' => Str::random(10), // assuming you want to generate a random remember token
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more data as needed
        ];

        // Insert data into the "users" collection
        DB::collection('users')->insert($data);
    }
}
