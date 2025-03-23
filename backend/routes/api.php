<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(["prefix" => "v0.1"], function () {
    Route::group(["middleware" => "auth:api"], function () { });
    Route::get("/test",function(){
        return "test";
    });
    Route::post("/register",[AuthController::class,"register"]);
    Route::post("/login", function (Request $request) {
            return response()->json(['message' => 'Hello, World!']);
    });
   
});


