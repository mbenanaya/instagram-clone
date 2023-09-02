<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            DB::table('users')->insert([
                'name'     => $faker->name,
                'username' => $faker->unique()->userName,
                'email'    => $faker->unique()->safeEmail,
                'password' => Hash::make('12341234'),
                'bio'      => $faker->sentence,
                'website'  => $faker->url,
                'file'     => 'user-placeholder.png',
            ]);
        }
    }
}
