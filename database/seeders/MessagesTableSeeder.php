<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('messages')->insert([
            [
                'sender_id'   => 3,
                'receiver_id' => 1,
                'message'     => 'Message 1',
            ],
            [
                'sender_id'   => 2,
                'receiver_id' => 1,
                'message'     => 'Message 2',
            ],
            [
                'sender_id'   => 2,
                'receiver_id' => 1,
                'message'     => 'Message 3',
            ],
            [
                'sender_id'   => 1,
                'receiver_id' => 2,
                'message'     => 'Message 4',
            ],
        ]);
    }
}
