<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('messages')->truncate();
        DB::table('messages')->insert([
            [
                'sender_id'   => 1,
                'receiver_id' => 2,
                'message'     => 'السلام عليكم و رحمة الله و بركاته كيف حالك أخي',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-10-26 12:15:00'),
            ],
            [
                'sender_id'   => 2,
                'receiver_id' => 1,
                'message'     => 'و عليكم السلام و رحمة الله و بركاته.. الحمد لله بارك الله فيك',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-10-26 12:25:00'),
            ],
            [
                'sender_id'   => 1,
                'receiver_id' => 2,
                'message'     => 'جزاك الله خيرا',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-10-26 12:30:40'),
            ],
            [
                'sender_id'   => 2,
                'receiver_id' => 1,
                'message'     => 'تحياتي',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-10-26 15:55:22'),
            ],
            [
                'sender_id'   => 1,
                'receiver_id' => 3,
                'message'     => 'Hello bro, how are you? did you finish the front-end design?',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-11-26 09:06:13'),
            ],
            [
                'sender_id'   => 3,
                'receiver_id' => 1,
                'message'     => 'Not yet bro, when I\'ll finish I\'ll text you',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-11-26 12:15:00'),
            ], [
                'sender_id'   => 3,
                'receiver_id' => 4,
                'message'     => 'Hi bro, could you change my status to an admin on the website?',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-12-06 22:12:00'),
            ],
            [
                'sender_id'   => 4,
                'receiver_id' => 3,
                'message'     => 'Okay I\'ll do :)',
                'created_at'  => Carbon::createFromFormat('Y-m-d H:i:s', '2023-12-06 22:33:00'),
            ],
        ]);
    }
}
