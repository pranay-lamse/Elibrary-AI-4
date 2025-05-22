<?php

namespace App\Http\Controllers;

use App\Models\SanctionLetterItems;
use Exception;
use Illuminate\Http\Request;

class AddLetterItemController extends Controller
{
    public function addLetterItem(Request $request)
    {
        try {
            $letterItem = SanctionLetterItems::create($request->all());
            return response()->json([
                "data" => $letterItem,
                "message" => "Letter Item Added Successfully"
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => "Something went wrong"
            ]);
        }
    }
}
