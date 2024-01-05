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
}
