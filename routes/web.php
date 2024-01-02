<?php

use App\Http\Controllers\FollowController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MessageRequestController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return to_route('login');
});

Route::get('/dashboard', [HomeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/people', [HomeController::class, 'people'])->name('people');

    Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::post('/profile', [ProfileController::class, 'updateImage'])->name('profile.updateImage');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/{user}/post/{id}', [PostController::class, 'index'])->name('post.index');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::post('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');

    Route::post('/follow', [FollowController::class, 'follow'])->name('follow');
    Route::post('/unfollow', [FollowController::class, 'unfollow'])->name('unfollow');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');

    Route::get('/chat/{userId}', [MessageController::class, 'chat'])->name('chat.index');
    Route::post('/chat/{receiverId?}', [MessageController::class, 'store'])->name('chat.store');
    Route::delete('/chat/{id}', [MessageController::class, 'delete'])->name('chat.delete');

    Route::get('/messages/requests', [MessageRequestController::class, 'index'])->name('messages.requests');
    Route::post('/messages/requests/{id}', [MessageRequestController::class, 'acceptRequest'])->name('acceptRequest');
    Route::delete('/messages/requests/{id}', [MessageRequestController::class, 'delete'])->name('deleteRequest');
    Route::get('/messages/request/{senderId}', [MessageRequestController::class, 'requestChat'])->name('request.index');
    Route::get('/messages/requests/hidden', [MessageRequestController::class, 'hidden'])->name('requests.hidden');


});

require __DIR__.'/auth.php';
