<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizzController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Quizz API routes
Route::get('/quizz/latest', [QuizzController::class, 'getLatest']);
Route::post('/quizz/search',[QuizzController::class, 'search']);
Route::post('/quizz/delete/{id}', [QuizzController::class, 'deleteQuizz']);
