<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $req) {
        $validation = Validator::make($req -> all(), [
            'name' => ['required', 'unique:users','max:32'],
            'email' => ['required', 'unique:users', 'email'],
            'password' => ['required', 'confirmed', 'min:8']
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validation -> errors()
            ], 403);
        }

        User::create([
            'name' => $req -> get('name'),
            'email' => $req -> get('email'),
            'password' => Hash::make(
                $req -> get('password')
            )
        ]);

        return response([
            'status' => true,
            'message' => 'Account Created'
        ], 200);
    }
}
