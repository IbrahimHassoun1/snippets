<?php



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SnippetController;

Route::group(["prefix" => "v0.1"], function () {
    Route::group(["middleware" => "auth:api"], function () {
        Route::post("/snippet", [SnippetController::class, "addOrUpdate"]);
        Route::delete("/snippet", [SnippetController::class, "delete"]);
    });
    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/login", [AuthController::class, "login"]);

});


