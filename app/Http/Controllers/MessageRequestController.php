<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\MessageRequest;
use App\Models\User;
use App\Repositories\ChatRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MessageRequestController extends Controller
{

    public function __construct(private ChatRepository $chat)
    {
        $this->chat = $chat;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $requests = $this->chat->getAllMessagesRequests($user->id);
        return Inertia::render('MessageRequest', [
            'requests' => $requests,
        ]);
    }

    public function hidden()
    {
        return Inertia::render('HiddenRequests');
    }

    public function requestChat(Request $request, ?int $senderId = null)
    {
        $userId = $request->user()->id;
        $messageRequest = MessageRequest::where(['receiver_id' => $userId, 'sender_id' => $senderId])->first();
        $requests = $this->chat->getAllMessagesRequests($userId);
        $sender = User::find($senderId);

        return Inertia::render('MessRequestChat', [
            'sender'         => $sender,
            'requests'         => $requests,
            'messageRequest' => $messageRequest,
        ]);
    }

    public function acceptRequest($requestId)
    {
        $messageRequest = MessageRequest::findOrFail($requestId);

        Message::create([
            'sender_id' => $messageRequest->sender_id,
            'receiver_id' => $messageRequest->receiver_id,
            'message' => $messageRequest->message,
            'created_at' => $messageRequest->created_at,
            'updated_at' => $messageRequest->updated_at,
        ]);

        $messageRequest->delete();

        return Redirect::route('chat.index', ['userId' => $messageRequest->sender_id]);
    }

    public function delete($id) {
        $request = MessageRequest::find($id);
        $request->delete();
        return Redirect::route('messages.requests');
    }

    // public function sendRequest(Request $request)
    // {
    //     // Validate and get necessary data from the request

    //     // Store the message request
    //     $request = MessageRequest::create([
    //         'sender_id' => auth()->id(),
    //         'receiver_id' => $receiverId,
    //         'content' => $request->input('content'),
    //         // Add other necessary fields
    //     ]);

    //     // Additional logic if needed

    //     return response()->json(['message' => 'Message request sent successfully']);
    // }

}
