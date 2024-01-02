<?php

namespace App\Repositories;

use App\Models\Message;
use App\Models\MessageRequest;
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

    public function sendMessage(array $data): Message
    {
        return Message::create($data);
    }

    public function sendMessageRequest(array $data): MessageRequest
    {
        return MessageRequest::create($data);
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

        return $this->getFilterRecentMessages($recentMessages, $senderId);
    }

    public function getAllMessagesRequests($receiverId): array
    {
        $requests = MessageRequest::where('receiver_id', $receiverId)
            ->orderBy('created_at', 'desc')
            ->get(['sender_id', 'receiver_id', 'message', 'created_at']);

        return $this->getMessagesRequests($requests, $receiverId);
    }

    public function getMessagesRequests(Collection $requests, int $senderId): array
    {
        $recentUsersWithMessages = [];
        $usedUserIds = [];

        foreach ($requests as $request) {
            $userId = $request->sender_id == $senderId ? $request->receiver_id : $request->sender_id;

            if (!in_array($userId, $usedUserIds)) {
                $recentUsersWithMessages[] = [
                    'user_id'    => $userId,
                    'message'    => $request->message,
                    'created_at' => $request->created_at
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

}
