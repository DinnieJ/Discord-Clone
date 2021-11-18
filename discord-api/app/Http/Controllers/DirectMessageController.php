<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DirectMessageController extends Controller
{
    public function sendMessage(Request $request, $id)
    {
        $data = $request->only('content');
    }
}
