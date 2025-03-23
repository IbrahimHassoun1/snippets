<?php

namespace App\Models;

use app\Models\User;
use Illuminate\Database\Eloquent\Model;

class Snippet extends Model
{
    public function user(){
        return $this->belongsTo(User::class);
    }
}
