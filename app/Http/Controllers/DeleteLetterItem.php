<?php

namespace App\Http\Controllers;

use App\Models\SanctionLetterItems;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeleteLetterItem extends Controller
{
    public function deleteLetterItem(Request $request)
    {

        try {
            $letterItem = DB::table('sanction_letter_items')->where("id", $request->id)->delete();
            return response()->json([
                "data" => $letterItem,
                "message" => "Letter Item Deleted Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => "Something went wrong."
            ]);
        }
    }
}
