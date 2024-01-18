<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Quizz;
use App\Models\Answer;

class QuizzController extends Controller
{

    public function getById(int $id) {
        $result = Quizz::where('id', $id)
            -> latest()
            -> get();

        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function hideQuizz(int $id, Request $req) {
        $validation = Validator::make($req -> all(),[
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
            -> update([
                'hidden' => true
            ]);

        return response([
            'status' => true,
            'message' => 'Hidden'
        ], 200);
    }

    public function showQuizz(int $id, Request $req) {
        $validation = Validator::make($req -> all(),[
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
            -> update([
                'hidden' => false
            ]);

        return response([
            'status' => true,
            'message' => 'Hidden'
        ], 200);
    }

    public function getHighestRated(Request $req) {
        $result = Quizz::where('hidden', false)
            -> orderByRaw('rating_sum / rates_count DESC')
            -> take(10)
            -> get();

        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

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
        $result = Quizz::where('title','like','%'.$text.'%')
            -> where('hidden', false)
            -> get();

        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function getLatest() {
        $result = Quizz::where('hidden', false) -> latest() -> take(10) -> get();
        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function getUsersQuizzes(string $username) {
        $result = Quizz::where('author', $username) -> get();
        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function addQuizz(Request $req) {
        $validation = Validator::make($req -> all(), [
            'title' => 'required',
            'description' => 'required',
            'username' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'errors' => $validation -> errors()
            ], 403);
        }

        $quizz = Quizz::create([
            'title' => $req -> get('title'),
            'description' => $req -> get('description'),
            'author' => $req -> get('username'),
            'rating_sum' => 0,
            'rates_count' => 0,
            'hidden' => false,
        ]);

        return response([
            'status' => true,
            'message' => 'Created',
            'id' => $quizz['id']
        ], 200);
    }

    public function editQuizz(int $id, Request $req) {
        $validation = Validator::make($req -> all(), [
            'title' => 'required',
            'description' => 'required',
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
            -> update([
                'title' => $req -> get('title'),
                'description' => $req -> get('description')
            ]);

        return response([
            'status' => true,
            'message' => 'Updated'
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

        Answer::where('quizz_id', $id) -> delete();

        return response([
            'status' => true,
            'message' => 'Deleted'
        ], 200);
    }
}
