<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Quizz;

class QuizzController extends Controller
{
    public function search(Request $req) {
        $validation = Validator::make($req -> all(),[
            'search' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'errors' => $validation -> errors()
            ], 403);
        }

        $text = $req -> get('search');
        $result = Quizz::where('title','like','%'.$text.'%') -> get();

        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function getLatest() {
        $result = Quizz::latest() -> take(10) -> get();
        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function deleteQuizz(int $id, Request $req) {
        $validation = Validator::make($req -> all(), [
            'username' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'errors' => $validation -> errors()
            ], 403);
        }

        Quizz::where('id', $id)
            -> where('author', $req -> get('username'))
            -> delete();

        // Also
        // Add there deleting questions later :)

        return response([
            'status' => true,
            'message' => 'Deleted'
        ], 200);
    }
}
