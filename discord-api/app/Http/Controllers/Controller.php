<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


trait ControllerResponse
{
    public function sendResponse($data, $message = '', $status = 200) {
        return response()->json([
            'success' => true,
            'status' => $status,
            'message' => $message,
            'data' => $data
        ], $status);
    }

    public function sendError($message, $status = 400) {
        return response()->json([
            'success' => false,
            'status' => $status,
            'error_message' => $message
        ], $status);
    }
}

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, ControllerResponse;
}
