<?php

namespace App\Http\Controllers;

use App\Http\Resources\AllPostsCollection;
use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $nonFollowedUsers = User::whereDoesntHave('followers', function ($query) use ($userId) {
            $query->where('follower_id', $userId);
        })
        ->where('id', '!=', $userId)
        ->take(5)
        ->get();

        $followedUserIds = Follow::where('follower_id', $userId)->pluck('following_id');

        $followedUserIds[] = $userId;

        $posts = Post::whereIn('user_id', $followedUserIds)->orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard', [
            'posts' => new AllPostsCollection($posts),
            'nonFollowedUsers' => $nonFollowedUsers,
        ]);
    }

    public function people(Request $request)
    {
        $userId = $request->user()->id;

        $nonFollowedUsers = User::whereDoesntHave('followers', function ($query) use ($userId) {
            $query->where('follower_id', $userId);
        })
        ->where('id', '!=', $userId)
        ->get();

        return Inertia::render('People', [
            'users' => $nonFollowedUsers,
        ]);
    }
}
