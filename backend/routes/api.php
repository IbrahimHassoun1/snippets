<?php



use App\Http\Controllers\LikingController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SnippetController;

Route::group(["prefix" => "v0.1"], function () {
    Route::group(["middleware" => "auth:api"], function () {
        Route::post("/snippet/post", [SnippetController::class, "addOrUpdate"]);
        Route::delete("/snippet/delete", [SnippetController::class, "delete"]);
        Route::get("/snippet/get", [SnippetController::class, "get"]);

        Route::post("/snippet/like", [LikingController::class, "likeSnippet"]);
        Route::post("/snippet/unlike", [LikingController::class, "unlikeSnippet"]);
    });
    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/login", [AuthController::class, "login"]);

});


