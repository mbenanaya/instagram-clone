<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ChatRepository
{
    
    public function getUserMessages(int $senderId, int $receiverId)
    {
        return Message::whereIn('sender_id', [$senderId, $receiverId])
        					->whereIn('receiver_id', [$senderId, $receiverId])
        					->get();
    }

    public function sendMessage(array $data):Message
    {
        return Message::create($data);
    }

    public function getRecentUsersWithMessages($senderId): array
    {
        DB::statement("SET SESSION sql_mode=''");

        $recentMessages =  Message::where(function ($query) use ($senderId) {
            $query->where('sender_id', $senderId)
                ->orWhere('receiver_id', $senderId);
        })->groupBy('sender_id', 'receiver_id')
            ->select('sender_id', 'receiver_id', 'message')
            ->orderBy('id', 'desc')
            ->get();
            
        // $recentMessages = Message::where(function($query) use ($userId, $receiverId) {
        //     $query->where('sender_id', $userId)
        //           ->where('receiver_id', $receiverId);
        // })
        // ->orWhere(function($query) use ($userId, $receiverId) {
        //     $query->where('sender_id', $receiverId)
        //           ->where('receiver_id', $userId);
        // })
        // ->latest()
        // ->first();

        return $this->getFilterRecentMessages($recentMessages, $senderId);
    }

    
    public function getFilterRecentMessages(Collection $recentMessages, int $senderId): array
    {
        $recentUsersWithMessages = [];
        $usedUserIds = [];

        foreach ($recentMessages as $message) {
            $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;

            if (!in_array($userId, $usedUserIds)) {
                $recentUsersWithMessages[] = [
                    'user_id' => $userId,
                    'message' => $message->message,
                ];
                $usedUserIds[] = $userId;
            }
        }

        foreach ($recentUsersWithMessages as $key => $userMessage) {
            $recentUsersWithMessages[$key]['name'] = User::where('id', $userMessage['user_id'])->value('name') ?? '';
            $recentUsersWithMessages[$key]['file'] = User::where('id', $userMessage['user_id'])->value('file') ?? '';
        }

        return $recentUsersWithMessages;
    }

    //////////////////////////////////////////////////////////////////////////////////////

    // public function getRecentUsersWithMessages($senderId): array
    // {
    //     // DB::statement("SET SESSION sql_mode=''");

    //     $recentMessages = Message::whereIn('id', function ($query) use ($senderId) {
    //         $query->select(DB::raw('MAX(id)'))
    //             ->from('messages')
    //             ->where('sender_id', $senderId)
    //             ->orWhere('receiver_id', $senderId)
    //             ->groupBy(DB::raw('IF(sender_id = ' . $senderId . ', receiver_id, sender_id)'));
    //     })
    //     ->with(['sender', 'receiver']) // Assuming you have relationships defined
    //     ->get();

    //     return $this->getFilterRecentMessages($recentMessages);
    // }


    // public function getFilterRecentMessages(Collection $recentMessages): array
    // {
    //     $recentUsersWithMessages = [];

    //     foreach ($recentMessages as $message) {
    //         $otherUserId = $message->sender_id === $senderId ? $message->receiver_id : $message->sender_id;

    //         $recentUsersWithMessages[] = [
    //             'sender_id' => $message->sender_id,
    //             'receiver_id' => $message->receiver_id,
    //             'user_id' => $otherUserId,
    //             'message' => $message->message,
    //             'name' => $otherUserId === $message->sender_id ? $message->receiver->name : $message->sender->name,
    //             'file' => $otherUserId === $message->sender_id ? $message->receiver->file : $message->sender->file,
    //         ];
    //     }

    //     return $recentUsersWithMessages;
    // }


    // public function getRecentUsersWithMessages($userId): array
    // {
    //     $recentMessages = Message::whereIn('id', function ($query) use ($userId) {
    //         $query->select(DB::raw('MAX(id)'))
    //             ->from('messages')
    //             ->where(function ($query) use ($userId) {
    //                 $query->where('sender_id', $userId)
    //                       ->orWhere('receiver_id', $userId);
    //             })
    //             ->groupBy(DB::raw('IF(sender_id = ' . $userId . ', receiver_id, sender_id)'));
    //     })
    //     ->with(['sender', 'receiver'])
    //     ->get();

    //     return $this->getFilterRecentMessages($recentMessages, $userId);
    // }

    // public function getFilterRecentMessages(Collection $recentMessages, $currentUserId): array
    // {
    //     $recentUsersWithMessages = [];

    //     foreach ($recentMessages as $message) {
    //         $otherUserId = $message->sender_id === $currentUserId ? $message->receiver_id : $message->sender_id;

    //         $recentUsersWithMessages[] = [
    //             'sender_id' => $message->sender_id,
    //             'receiver_id' => $message->receiver_id,
    //             'user_id' => $otherUserId,
    //             'message' => $message->message,
    //             'name' => $otherUserId === $message->sender_id ? $message->receiver->name : $message->sender->name,
    //             'file' => $otherUserId === $message->sender_id ? $message->receiver->file : $message->sender->file,
    //         ];
    //     }

    //     return $recentUsersWithMessages;
    // }

    

}
