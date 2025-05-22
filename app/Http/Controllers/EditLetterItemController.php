<?php

namespace App\Http\Controllers;

use App\Models\SanctionLetterItems;
use Exception;
use Illuminate\Http\Request;

class EditLetterItemController extends Controller
{
    public function editLetterItem(Request $request)
    {
        try {
            $letterItem = SanctionLetterItems::where("id", $request->id)->update($request->all());
            return response()->json([
                "data" => $letterItem,
                "message" => "Letter Item Edited Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => "Letter Item Edited Successfully."
            ]);
        }
    }
}
