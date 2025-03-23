<?php

namespace App\Http\Controllers;

use Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);

            if ($validator->fails()) {
                if ($validator->errors()->has('email')) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Email is already taken',
                        'data' => $validator->errors(),
                    ], 400);
                }

                return response()->json([
                    'success' => false,
                    'message' => 'Validation problems',
                    'data' => $validator->errors(),
                ], 400);
            }

            $user = new User();
            $user->full_name = $request->full_name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();

            $token = JWTAuth::fromUser($user);

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'data' => ['token' => $token],
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'data' => ['error' => $e->getMessage()],
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation problems',
                'data' => $validator->errors(),
            ], 400);
        }

        if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
                'data' => null,
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => ['token' => $token],
        ]);
    }

    public function me()
    {
        return response()->json([
            'success' => true,
            'message' => 'Authenticated user retrieved successfully',
            'data' => Auth::user(),
        ]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out',
            'data' => null,
        ]);
    }
}
