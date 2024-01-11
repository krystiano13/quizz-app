<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Profile;

class ProfileController extends Controller
{
    public function get(string $username) {
        $result = Profile::where('name', $username)
            -> latest()
            -> get();

        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function getAbout(string $username) {
        $result = Profile::where('name', $username)
            -> latest()
            -> get('about');

        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function editDescription(Request $req) {
        $validation = Validator::make($req -> all(), [
            'username' => 'required',
            'about' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validation -> errors()
            ], 403);
        }

        Profile::where('name', $req -> get('username'))
            -> update([
                'about' => $req -> get('about')
            ]);

        return response([
            'status' => true,
            'message' => 'Edited'
        ], 200);
    }

    public function rateQuizz(Request $request) {
        $validation = Validator::make($request -> all(), [
            'username' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validation -> errors()
            ], 403);
        }

        $username = $request -> get('username');
        $profile = Profile::where('name', $username) -> latest() -> get("quizzes_rated");

        Profile::where('name', $request -> get('name')) -> update([
            'quizzes_rated' => $profile[0]['quizzes_rated'] + 1
        ]);

        return response([
            'status' => true,
            'message' => "Updated"
        ], 200);
    }

    public function makeQuizz(Request $request) {
        $validation = Validator::make($request -> all(), [
            'username' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validation -> errors()
            ], 403);
        }

        $username = $request -> get('username');
        $profile = Profile::where('name', $username) -> latest() -> get("quizzes_made");

        Profile::where('name', $request -> get('name')) -> update([
            'quizzes_made' => $profile[0]['quizzes_made'] + 1
        ]);

        return response([
            'status' => true,
            'message' => "Updated"
        ], 200);
    }

    public function solveQuizz(Request $request) {
        $validation = Validator::make($request -> all(), [
            'username' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validation -> errors()
            ], 403);
        }

        $username = $request -> get('username');
        $profile = Profile::where('name', $username) -> latest() -> get("quizzes_solved");

        Profile::where('name', $request -> get('name')) -> update([
            'quizzes_solved' => $profile[0]['quizzes_solved'] + 1
        ]);

        return response([
            'status' => true,
            'message' => "Updated"
        ], 200);
    }
}
