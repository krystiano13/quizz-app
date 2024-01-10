<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizzController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RatingController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Ratings
Route::get('/ratings/{username}/{id}', [RatingController::class, 'getRating']);
Route::post('/ratings/edit/{id}', [RatingController::class, 'editRating']);
Route::post('/ratings/add', [RatingController::class, 'addRating']);

//Profile
Route::get('/profile/{username}', [ProfileController::class, 'get']);
Route::get('/profile/about/{username}', [ProfileController::class, 'getAbout']);
Route::post('/profile/edit', [ProfileController::class, 'editDescription']);

//Auth
Route::post('/auth/register', [UserController::class, 'register']);
Route::post('/auth/login', [UserController::class, 'login']);

//Quizz API routes
Route::get('/quizz/id/{id}', [QuizzController::class, 'getById']);
Route::get('/quizz/latest', [QuizzController::class, 'getLatest']);
Route::get('/quizz/highestRated', [QuizzController::class, 'getHighestRated']);
Route::get('/quizz/user/{username}', [QuizzController::class, 'getUsersQuizzes']);
Route::post('/quizz/search',[QuizzController::class, 'search']);
Route::post('/quizz/delete/{id}', [QuizzController::class, 'deleteQuizz']);
Route::post('/quizz/edit/{id}', [QuizzController::class, 'editQuizz']);
Route::post('/quizz/add', [QuizzController::class, 'addQuizz']);

//Questions API routes
Route::get('/question/all/{quizzId}', [AnswerController::class, 'getAllQuestions']);
Route::post('/question/create', [AnswerController::class, 'addQuestion']);
Route::post('/question/delete', [AnswerController::class, 'deleteQuestion']);
Route::post('/question/edit/{id}', [AnswerController::class, 'editQuestion']);
