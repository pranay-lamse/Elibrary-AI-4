<?php

namespace App\Http\Controllers;

use App\Models\MembershipPlan;
use App\Models\Subscription;
use Exception;
use Illuminate\Http\Request;

class DeleteMemberShipPlan extends Controller
{
    public function deletePlan($id)
    {
        try {
            $result = MembershipPlan::where("id", $id)->delete();
            return response()->json([
                'data' => $result,
                "message" => "Plan deleted successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                'data' => $error->getMessage(),
                "message" => $error->getMessage()
            ]);
        }
    }

    public function deleteMemberSubscriptionPlan($id)
    {
        try {
            $result = Subscription::where("id", $id)->delete();
            return response()->json([
                'data' => $result,
                "message" => "Subscription  deleted successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                'data' => $error->getMessage(),
                "message" => $error->getMessage()
            ]);
        }
    }
}
