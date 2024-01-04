<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function login(Request $req) {
        $validation = Validator::make($req -> all(),[
            'name' => 'required',
            'password' => 'required'
        ]);

        if($validation -> fails()) {
            return response([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validation -> errors()
            ], 403);
        }

        if(!Auth::attempt(
            ['name' => $req -> get('name'), 'password' => $req -> get('password')]
        )) {
            return response([
                'status' => false,
                'message' => 'Wrong credentials',
                'errors' => ['auth' => 'Wrong credentials']
            ], 401);
        }

        $user = User::where('name', $req -> get('name')) -> first();

        return response() -> json([
            'status' => true,
            'message' => 'Logged In',
            'name' => $req -> get('name'),
            'token' => $user -> createToken("API TOKEN", expiresAt:now() -> addDay()) -> plainTextToken
        ], 200);
    }
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
