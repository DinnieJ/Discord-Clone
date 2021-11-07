<?php

/**
 * 
 */
trait ControllerResponse
{
    public function sendResponse($data, $status = 200) {
        return response()->json([
            'success' => true,
            'status' => $status,
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