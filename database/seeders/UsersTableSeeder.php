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
        DB::table('users')->insert([
            [
                'name'     => 'Mouhcine BEN ANAYA',
                'username' => 'mbenanaya',
                'email'    => 'mmouhcine203@gmail.com',
                'password' => Hash::make('12341234'),
                'bio'      => 'Full Stack Web Developer',
                'website'  => 'https://mbenanaya.netlify.app/',
                'file'     => 'user-placeholder.png',
            ],
            [
                'name'     => 'Issam SABIR',
                'username' => 'isabir22',
                'email'    => 'issam22@gmail.com',
                'password' => Hash::make('12341234'),
                'bio'      => 'Seller',
                'website'  => 'https://isabir.co/',
                'file'     => 'user-placeholder.png',
            ],
        ]);

        foreach (range(1, 18) as $index) {
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
