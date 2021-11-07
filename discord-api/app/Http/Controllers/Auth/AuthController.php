<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $creds = $request->only('username', 'password');
        $validator = Validator::make($creds, [
            'username' => 'required|min:8',
            'password' => 'required|min:6|string',
        ]);

        if($validator->fails()) {
            $this->sendError($validator->errors()->first(), 422);
        }

        if(!$token = JWTAuth::attempt($creds) ) {
            return $this->sendError('Creds not found', 401);
        } else {
            return $this->sendResponse([
                'token' => $token,
                'user' => auth()->user()
            ], 'Login successfully !');
        }
    }

    public function register(Request $request) {
        $data = $request->only('username', 'password', 'name');
        $validator = Validator::make($data, [
            'username' => 'required|min:8|unique:users,username',
            'password' => 'required|min:6|string',
            'name' => 'required|unique:users,name|min:5'
        ]);

        if($validator->fails()) {
            return $this->sendError($validator->errors()->first(), 402);
        } else {
            $user = new User();
            foreach($data as $key => $value) {
                $user->{$key} = $value;
            }

            $user->password = \bcrypt($user->password);
            try {
                $user->save();
                return $this->sendResponse($user, 'Register successful');
            } catch(Exception $e) {
                return $this->sendError($e->getMessage(), 402);
            }

        }
    }
}
