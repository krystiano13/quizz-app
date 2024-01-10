<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}
