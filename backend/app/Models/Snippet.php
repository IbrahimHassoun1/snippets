<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Snippet extends Model
{
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
