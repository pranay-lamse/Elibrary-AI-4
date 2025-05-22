<?php

namespace App\Http\Controllers;

use App\Models\EbookLimitModel;
use Exception;
use Illuminate\Http\Request;

class EbookLimitController extends Controller
{
    public function getSubscriptionLimit()
    {
        try {
            return response()->json([
                'data' => EbookLimitModel::all(),
                'message' => "Ebook Subscription Limit Retrieved Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                'message' => $error->getMessage()
            ]);
        }
    }
}
