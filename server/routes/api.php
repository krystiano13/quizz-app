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
Route::middleware('auth:sanctum') -> post('/ratings/edit/{id}', [RatingController::class, 'editRating']);
Route::middleware('auth:sanctum') -> post('/ratings/add', [RatingController::class, 'addRating']);

//Profile
Route::get('/profile/{username}', [ProfileController::class, 'get']);
Route::get('/profile/about/{username}', [ProfileController::class, 'getAbout']);
Route::middleware('auth:sanctum') -> post('/profile/solveQuizz', [ProfileController::class, 'solveQuizz']);
Route::middleware('auth:sanctum') -> post('/profile/makeQuizz', [ProfileController::class, 'makeQuizz']);
Route::middleware('auth:sanctum') -> post('/profile/rateQuizz', [ProfileController::class, 'rateQuizz']);
Route::middleware('auth:sanctum') -> post('/profile/edit', [ProfileController::class, 'editDescription']);

//Auth
Route::post('/auth/register', [UserController::class, 'register']);
Route::post('/auth/login', [UserController::class, 'login']);

//Quizz API routes
Route::get('/quizz/id/{id}', [QuizzController::class, 'getById']);
Route::get('/quizz/latest', [QuizzController::class, 'getLatest']);
Route::get('/quizz/highestRated', [QuizzController::class, 'getHighestRated']);
Route::get('/quizz/user/{username}', [QuizzController::class, 'getUsersQuizzes']);
Route::post('/quizz/search',[QuizzController::class, 'search']);
Route::middleware('auth:sanctum') -> post('/quizz/delete/{id}', [QuizzController::class, 'deleteQuizz']);
Route::middleware('auth:sanctum') -> post('/quizz/edit/{id}', [QuizzController::class, 'editQuizz']);
Route::middleware('auth:sanctum') -> post('/quizz/add', [QuizzController::class, 'addQuizz']);

//Questions API routes
Route::get('/question/all/{quizzId}', [AnswerController::class, 'getAllQuestions']);
Route::middleware('auth:sanctum') -> post('/question/create', [AnswerController::class, 'addQuestion']);
Route::middleware('auth:sanctum') -> post('/question/delete', [AnswerController::class, 'deleteQuestion']);
Route::middleware('auth:sanctum') -> post('/question/edit/{id}', [AnswerController::class, 'editQuestion']);
