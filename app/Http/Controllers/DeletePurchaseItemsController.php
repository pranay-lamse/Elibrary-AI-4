<?php

namespace App\Http\Controllers;

use App\Models\QuotationToPurchasesItems;
use Exception;
use Illuminate\Http\Request;

class DeletePurchaseItemsController extends Controller
{
    public function deletePurchaseItems($id)
    {
        try {
            $result = QuotationToPurchasesItems::where("id", $id)->delete();
            if ($result) {
                return response()->json([
                    "data" => $result,
                    "message" => "Purchase Items deleted Successfully."
                ]);
            }
        } catch (Exception $error) {
            return response()->json([
                "message" => $error->getMessage()
            ]);
        }
    }
}
