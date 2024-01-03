<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;

class AnswerController extends Controller
{
    public function getAllQuestions(int $quizzId) {
        $questions = Answer::where('quizz_id', $quizzId) -> get();
        return response([
            'status' => true,
            'result' => $questions
        ], 200);
    }
}
