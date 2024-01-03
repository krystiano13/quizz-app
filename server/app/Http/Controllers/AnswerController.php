<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    public function addQuestion(Request $req) {
        $validation = Validator::make($req -> all(), [
            'answer_a' => 'required',
            'answer_b' => 'required',
            'answer_c' => 'required',
            'answer_d' => 'required',
            'true_answer' => 'required',
            'quizz_id' => 'required',
            'question' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'errors' => $validation -> errors()
            ], 403);
        }

        Answer::create([
            'answer_a' => $req -> get('answer_a'),
            'answer_b' => $req -> get('answer_b'),
            'answer_c' => $req -> get('answer_c'),
            'answer_d' => $req -> get('answer_d'),
            'true_answer' => $req -> get('true_answer'),
            'quizz_id' => $req -> get('quizz_id'),
            'question' => $req -> get('question')
        ]);

        return response([
            'status' => true,
            'message' => 'question created'
        ], 200);
    }
}
