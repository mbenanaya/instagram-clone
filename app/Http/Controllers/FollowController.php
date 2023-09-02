<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function follow(Request $request)
    {
        $followerId = $request->user()->id;
        $followingId = $request->input('following_id');

        $follow = Follow::create([
            'follower_id' => $followerId,
            'following_id' => $followingId,
        ]);

        // return response()->json($follow, 201);
    }

    public function unfollow(Request $request)
    {
        $followerId = $request->user()->id;
        $followingId = $request->input('following_id');

        $follow = Follow::where('follower_id', $followerId)
            ->where('following_id', $followingId)
            ->first();

        if ($follow) {
            $follow->delete();
            // return response()->json('Unfollowed successfully', 200);
        }

        // return response()->json('Follow relationship does not exist', 404);
    }
}
