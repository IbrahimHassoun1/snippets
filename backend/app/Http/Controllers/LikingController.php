<?php

namespace App\Http\Controllers;

use App\Models\Snippet;
use Illuminate\Http\Request;

class LikingController extends Controller
{

    public function likeSnippet()
    {
        try {
            $snippetId = request()->snippet_id;
            if (empty($snippetId)) {
                return response()->json(['message' => 'insert a snippet id!'], 400);
            }
            $user = auth()->user();
            $snippet = Snippet::findOrFail($snippetId);

            if (!$user->likedSnippets()->where('snippet_id', $snippetId)->exists()) {
                $user->likedSnippets()->attach($snippetId);
                return response()->json(['message' => 'Snippet liked!']);
            }

            return response()->json(['message' => 'You already liked this snippet.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while liking the snippet: ' . $e], 500);
        }
    }

    public function unlikeSnippet()
    {
        try {
            $snippetId = request()->snippet_id;
            if (empty($snippetId)) {
                return response()->json(['message' => 'insert a snippet id!'], 400);
            }
            $user = auth()->user();
            $user->likedSnippets()->detach($snippetId);

            return response()->json(['message' => 'Snippet unliked.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while unliking the snippet: ' . $e], 500);
        }
    }

}
