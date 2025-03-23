<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Exception;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Validator;

class SnippetController extends Controller
{
    public function addOrUpdate(Request $request)
    {
        try {
            $user = auth()->user();
            $validate = Validator::make($request->all(), [
                "id" => "nullable|string",
                "title" => "required|string",
                "language" => "required|string",
                "code" => "required|string",
            ]);

            if (!$validate) {
                return response()->json("Missing or incorrect fields", 400);
            }
            if ($request->id) {
                $snippet = Snippet::find($request->id);
                if ($snippet->user_id != $user->id) {
                    return response()->json("You're not allowed to edit this snippet", 400);
                }
            } else {
                $snippet = new Snippet();
            }
            ;
            $snippet->user_id = $user->id;
            $snippet->title = $request->title;
            $snippet->language = $request->language;
            $snippet->code = $request->code;
            if (!$snippet->save()) {
                return response()->json("Couldn't save snippet", 400);
            }
            return response()->json("Snippet saved successfully", 200);
            ;

        } catch (Exception $e) {
            return response()->json("an error occured: " . $e);
        }

    }

    public function delete(Request $request)
    {
        try {
            $user = auth()->user();
            $validate = Validator::make($request->all(), [
                "id" => "required|integer|exists:snippets,id"
            ]);
            if (!$validate) {
                return response()->json("Please enter an ID of an existing snippet!", 404);
            }

            $deleted = Snippet::where("id", $request->id)
                ->where("user_id", $user->id)
                ->delete();
            if ($deleted) {
                return response()->json("Snippet deleted successfully", 200);
            } else {
                return response()->json("Row not found or couldn't delete", 404);
            }

        } catch (Exception $e) {
            return response()->json("An error occured: " . $e);
        }
    }


}
