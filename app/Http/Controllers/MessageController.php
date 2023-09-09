<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\User;
use App\Repositories\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MessageController extends Controller
{
    
    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;
    }

    public function index(Request $request, ?int $receiverId = null)
    {
        $userId = $request->user()->id;
        $messages = empty($receiverId) ? [] : $this->chat->getUserMessages($userId, $receiverId);

        $recentMessages = $this->chat->getRecentUsersWithMessages($userId);

        return Inertia::render('Messages', [
            'messages'       => $messages,
            'recentMessages' => $recentMessages,
        ]);
        
        // dd($recentMessages);
    }

    // public function index(Request $request)
    // {
    //     // Get the authenticated user's ID
    //     $userId = $request->user()->id;

    //     // Query to get the last message of each other user
    //     $lastMessages = DB::table('messages')
    //         ->select('sender_id', 'receiver_id', DB::raw('MAX(created_at) as last_message_time'))
    //         ->where(function ($query) use ($userId) {
    //             $query->where('sender_id', $userId)
    //                 ->orWhere('receiver_id', $userId);
    //         })
    //         ->groupBy('sender_id', 'receiver_id')
    //         ->get();

    //     // Create an empty array to store the last messages
    //     $lastMessageArray = [];

    //     foreach ($lastMessages as $lastMessage) {
    //         $otherUserId = ($lastMessage->sender_id == $userId) ? $lastMessage->receiver_id : $lastMessage->sender_id;

    //         // Get the last message for each other user
    //         $message = Message::where(function ($query) use ($userId, $otherUserId) {
    //             $query->where('sender_id', $userId)
    //                 ->where('receiver_id', $otherUserId);
    //         })
    //         ->orWhere(function ($query) use ($userId, $otherUserId) {
    //             $query->where('sender_id', $otherUserId)
    //                 ->where('receiver_id', $userId);
    //         })
    //         ->where('created_at', $lastMessage->last_message_time)
    //         ->first();

    //         // Add the last message to the array
    //         $lastMessageArray[] = $message;
    //     }

    //     // Pass the last messages to the Inertia view
    //     return Inertia::render('Messages', [
    //         'lastMessages' => $lastMessageArray,
    //     ]);

    //     // dd($lastMessageArray);
    // }

    public function chat(Request $request, int $receiverId)
    {
        $userId = $request->user()->id;
        $messages = empty($receiverId) ? [] : $this->chat->getUserMessages($userId, $receiverId);

        $recentMessages = $this->chat->getRecentUsersWithMessages($userId);

        $receiver = User::find($receiverId);
        // $lastMessage = Message::where(function($query) use ($userId, $receiverId) {
        //         $query->where('sender_id', $userId)
        //             ->where('receiver_id', $receiverId);
        //     })
        //     ->orWhere(function($query) use ($userId, $receiverId) {
        //         $query->where('sender_id', $receiverId)
        //               ->where('receiver_id', $userId);
        //     })
        //     ->latest()
        //     ->first();

        return Inertia::render('Chat', [
            'receiver'       => $receiver,
            'messages'       => $messages,
            'recentMessages' => $recentMessages,
            // 'lastMessage'    => $lastMessage,
        ]);

        // dd($lastMessage);
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Message $message)
    {
        //
    }

    public function edit(Message $message)
    {
        //
    }

    public function update(Request $request, Message $message)
    {
        //
    }

    public function destroy(Message $message)
    {
        //
    }

}
