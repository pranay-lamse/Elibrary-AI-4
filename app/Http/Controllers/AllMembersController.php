<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Exception;
use Illuminate\Http\Request;

class AllMembersController extends Controller
{
    public function getAllMembers()
    {
        try {
            return response()->json([
                "data" => Member::count(),
                "message" => "Members fetched successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error->getMessage(),
                "message" => $error->getMessage()
            ]);
        }
    }
}
