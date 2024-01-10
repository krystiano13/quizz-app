<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Rating;

class RatingController extends Controller
{

    public function getRating(string $username, int $quizzId) {
        $result = Rating::where('username', $username)
            -> where('quizz_id', $quizzId)
            -> latest()
            -> get();

        return response([
            'status' => true,
            'result' => $result
        ], 200);
    }

    public function addRating(Request $request) {
        $validation = Validator::make($request -> all(), [
            'username' => 'required',
            'rating' => 'required',
            'quizzId' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validation -> errors()
            ], 403);
        }

        Rating::create([
            'username' => $request -> get('username'),
            'rating_value' => $request -> get('rating'),
            'quizz_id' => $request -> get('quizzId')
        ]);

        return response([
            'status' => true,
            'message' => 'Created !!!'
        ], 200);
    }

    public function editRating(int $quizzId, Request $request) {
        $validation = Validator::make($request -> all(), [
            'username' => 'required',
            'rating' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validation -> errors()
            ], 403);
        }

        Rating::where('quizz_id', $quizzId)
            -> where('username', $request -> get('username'))
            -> update([
                'rating_value' => $request -> get('rating')
            ]);

        return response([
            'status' => true,
            'message' => 'Updated !!!'
        ], 200);
    }
}
