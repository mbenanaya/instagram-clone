<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use App\Models\MessageRequest;
use App\Models\User;
use App\Repositories\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
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
        $user = User::find($userId);
        $messages = empty($receiverId) ? [] : $this->chat->getUserMessages((int) $userId, (int) $receiverId);
        $recentMessages = $this->chat->getRecentUsersWithMessages($userId);
        $followingIds = $user->following()->pluck('following_id');
        $messageRequestsCount = MessageRequest::where('receiver_id', $userId)->count();

        $followingUsers = User::whereIn('id', $followingIds)
            ->select('id', 'name', 'username', 'file')
            ->get();

        return Inertia::render('Messages', [
            'messages'             => $messages,
            'recentMessages'       => $recentMessages,
            'receiver'             => User::find($receiverId),
            'followingUsers'       => $followingUsers,
            'messageRequestsCount' => $messageRequestsCount,
        ]);
    }

    public function chat(Request $request, int $receiverId)
    {
        $userId = $request->user()->id;
        $messages = empty($receiverId) ? [] : $this->chat->getUserMessages($userId, $receiverId);
        $recentMessages = $this->chat->getRecentUsersWithMessages($userId);
        $messageRequestsCount = MessageRequest::where('receiver_id', $userId)->count();

        $receiver = User::find($receiverId);

        return Inertia::render('Chat', [
            'receiver'             => $receiver,
            'userId'               => $receiverId,
            'messages'             => $messages,
            'recentMessages'       => $recentMessages,
            'messageRequestsCount' => $messageRequestsCount,
        ]);
    }

    public function store(Request $request, ?int $receiverId = null)
    {
        $request->validate([
            'message' => 'required|string',
        ]);

        if (empty($receiverId)) {
            return;
        }

        $senderId = $request->user()->id;

        $isFollower = User::find($senderId)->followers()->where('follower_id', $receiverId)->exists();
        $messageHistory = $this->chat->getUserMessages($senderId, $receiverId);

        if ($isFollower || $messageHistory->isNotEmpty()) {
            $message = $this->chat->sendMessage([
                'sender_id' => $senderId,
                'receiver_id' => $receiverId,
                'message' => $request->message,
            ]);

            event(new MessageSent($message));

            return Redirect::route('chat.index', $receiverId);
        } else {
            $this->chat->sendMessageRequest([
                'sender_id' => $senderId,
                'receiver_id' => $receiverId,
                'message' => $request->message,
            ]);

            // Send message request notification

            return Redirect::route('chat.index', $receiverId);
        }
    }


    public function getFollowingUsers(Request $request)
    {
        $user = $request->user()->id;
        $followingUsers = $user->following;
    }

    function delete(Request $request, $receiverId)
    {
        $userId = $request->user()->id;
        Message::where(function ($query) use ($userId, $receiverId) {
            $query->where('sender_id', $userId)
                ->where('receiver_id', $receiverId);
        })->orWhere(function ($query) use ($userId, $receiverId) {
            $query->where('sender_id', $receiverId)
                ->where('receiver_id', $userId);
        })->delete();
        return Redirect::route('messages.index');
    }
}
