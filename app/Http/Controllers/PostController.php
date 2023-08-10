<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use App\Services\FileService;
use Illuminate\Http\Request;
use App\Http\Resources\AllPostsCollection;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $post = Post::findOrFail($id);

        return Inertia::render('Post', [
            'user' => $post->user->id,
            'post' => new PostResource($post)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = new Post;
        $request->validate([
            'file' => 'required|mimes:jpg,jpeg,png',
            'text' => 'required'
        ]);
        $post = (new FileService)->updateFile($post, $request, 'post');
        $post->user_id = auth()->user()->id;
        $post->text = $request->input('text');
        $post->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!empty($post->file)) {
            $currentFile = public_path() . $model->file;

            if (file_exists($currentFile)) {
                unlink($currentFile);
            }
        }

        $post->delete();
    }
}
