<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LikingController extends Controller
{

    public function likeSnippet($snippetId)
{
    $snippet = Snippet::findOrFail($snippetId);  
    $user = auth()->user();  
    $user->snippets()->attach($snippet);
    return back()->with('success', 'Snippet liked!');
}

}
