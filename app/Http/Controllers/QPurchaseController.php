<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Exception;
use Illuminate\Http\Request;
use App\Models\QuotationToPurchases;
use App\Models\QuotationToPurchasesItems;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class QPurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function findLetter($data, $id)
    {
        $filteredArray = array();
        foreach ($data as $key => $value) {
            if ($value->id == $id) {
                array_push($filteredArray, $value);
            }
        }
        return $filteredArray;
        // return array_filter($data, fn ($item) => $item["id"] == $id);
        // return [$data, $id];
    }

    public function prepareArray($parent, $child)
    {
        // $filteredItems = array_filter($child, fn ($item) => $item["letter_id"] == 8);
        $data = array();
        if (count($parent) > 0) {
            foreach ($parent as $pk => $pv) {
                $items = [];
                $data[$pk] = $pv;
                foreach ($child as $ck => $cv) {
                    if ($pv->id == $cv->purchase_id) {
                        $items[] = $cv;
                    }
                }
                $data[$pk]["purchase_items"] = $items;
            }
            return $data;
        } else {
            return $data;
        }
    }

    public function removeElement(&$array, $key_to_remove)
    {
        if (is_array($key_to_remove)) {
            foreach ($key_to_remove as $element) {
                foreach ($array as $key => &$value) {
                    if ($key === $element) {
                        unset($array[$element]);
                    }
                    if (is_array($value)) {
                        $this->removeElement($value, $element);
                    }
                }
            }
        } else {
            foreach ($array as $key => &$value) {
                if ($key === $key_to_remove) {
                    unset($array[$key_to_remove]);
                }
                if (is_array($value)) {
                    $this->removeElement($value, $key_to_remove);
                }
            }
        }
    }

    public function index(Request $request)
    {
        // $direction = "desc";
        $pageSize = $request->query("limit");
        $direction = $request->query("direction");
        $filter = $request->query("filter");
        $order_by = $request->query("order_by");

        if ($pageSize) {
            $sanctionQuotation = QuotationToPurchases::orderBy("created_at", $direction ? $direction : "desc")->limit($pageSize)->get();
        } else if ($order_by) {
            $sanctionQuotation = QuotationToPurchases::orderBy("reference_code", $direction ? $direction : "desc")->limit($pageSize)->get();
        } else {
            $sanctionQuotation = QuotationToPurchases::orderBy("created_at", $direction ? $direction : "desc")->get();
        }

        if ($filter) {
            $sanctionQuotation = QuotationToPurchases::where("reference_code", "like", "%" . $filter["search"] . "%")->get();
        }

        $sanctioQuotaionItems = QuotationToPurchasesItems::all();
        try {
            return response()->json([
                "data" => $this->prepareArray($sanctionQuotation, $sanctioQuotaionItems),
                "message" => "Purchases Retrieved Successfully."
            ]);
        } catch (Exception $error) {
            return $error;
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {

            $recordId = $request["id"];

            if ($recordId) {
                $isEmpty = DB::table("quotation_to_purchases")->count();
                $isRecordExist =  DB::table("quotation_to_purchases")->where("quotation_id", $recordId)->exists();
                // dd($isRecordExist, $isEmpty);
                if ($isEmpty && $isRecordExist) {
                    throw new Exception('Purchase Order is Already Created.');
                }
            }

            $data["date"] = $request->date;
            $data["quotation_id"] = $request->id;
            $data["discount"] = $request->discount;
            $data["sanction_letter_id"] = $request->sanction_letter_id;
            $data["supplier_id"] = $request->supplier_id;
            $data["shipping"] = $request->shipping;
            $data["quotation_pdf_file"] = $request->quotation_pdf_file;
            $data["grand_total"] = $request->grand_total;
            // $data["status"] = $request->status;
            $data["created_by"] = $request->created_by;
            $data["modified_by"] = $request->modified_by;
            $data["note"] = $request->note;

            // if (isset($request->quotation_pdf_file)) {
            //     $fileName = $this->makeAttachment(
            //         $request['quotation_pdf_file'],
            //         "QuotationLetters",
            //         config('app.media_disc')
            //     );
            //     $data["quotation_pdf_file"] = $fileName;
            // }
            $result = QuotationToPurchases::create($data);
            QuotationToPurchases::where("id", $result->id)->update(["reference_code" => "PO_111" . $result->id]);
            if (isset($result->id) && isset($request->quotation_items)) {
                foreach ($request["quotation_items"] as $value) {
                    $value["purchase_id"] = $result->id;
                    // $value["quotation_id"] = $value["quotation_id"];
                    $value["quotation_item_id"] = $value["id"];
                    QuotationToPurchasesItems::create($value);
                }
            }
            return response()->json([
                "data" => $result,
                "message" => "Quotation Created Successfully."
            ]);
        } catch (Exception $error) {
            // dd($error);
            return response()->json([
                "data" => null,
                "message" => $error->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = $this->prepareArray(QuotationToPurchases::all(), QuotationToPurchasesItems::all());
            return response()->json([
                "data" => $this->findLetter($data, $id),
                "message" => "Purchase Fetched Successfully"
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error->getMessage(),
                "message" => $error->getMessage()
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $data["date"] = $request->date;
            $data["quotation_id"] = $request->quotation_id;
            $data["discount"] = $request->discount;
            // $data["purchase_item_id"] = $request->purchase_item_id;
            $data["sanction_letter_id"] = $request->sanction_letter_id;
            $data["supplier_id"] = $request->supplier_id;
            $data["shipping"] = $request->shipping;
            $data["quotation_pdf_file"] = $request->quotation_pdf_file;
            $data["grand_total"] = $request->grand_total;
            $data["purchase_status"] = $request->purchase_status;
            $data["payment_status"] = $request->payment_status;
            $data["payment_type"] = $request->payment_type;
            $data["created_by"] = $request->created_by;
            $data["modified_by"] = $request->modified_by;
            $data["note"] = $request->note;

            if ($request->purchase_status == 1 && $request->payment_status == 1) {
                $data["paid_amount"] = $request->grand_total;
            }
            // if (isset($request->quotation_pdf_file)) {
            //     $fileName = $this->makeAttachment(
            //         $request['quotation_pdf_file'],
            //         "QuotationLetters",
            //         config('app.media_disc')
            //     );
            //     $data["quotation_pdf_file"] = $fileName;
            // }
            QuotationToPurchases::where("id", $id)->update($data);
            QuotationToPurchases::where("id", $id)->update(["reference_code" => "PO_111" . $id]);

            if ($request->purchase_status == 1 && $request->payment_status == 1) {
                $isExists = DB::table("expenses")->where("purchase_id", $id)->exists();
                if (!$isExists) {
                    $expense["date"] = Carbon::now()->format("Y-m-d");
                    $expense["warehouse_id"] = 1;
                    $expense["purchase_id"] = $id;
                    $expense["expense_category_id"] = 1;
                    $expense["amount"] = $request->grand_total;
                    $expense["reference_code"] = "EX_111" . $id;
                    $expense["details"] = $request->note;
                    $expense["title"] = "PO_111" . $id;
                    Expense::create($expense);
                }
            }
            if (isset($request->purchase_items)) {
                foreach ($request["purchase_items"] as $value) {

                    $isExists = DB::table("quotation_to_purchases_items")->where("id", $value["id"])->exists();
                    // $this->removeElement($value, ["isEdit", "id", "sub_total", "newItem"]);
                    // $value["purchase_id"] = $id;
                    // $value["quotation_id"] = $value["quotation_id"];
                    // $value["quotation_item_id"] = $value["id"];
                    QuotationToPurchasesItems::where("id", $value["id"])->update(["quantity" => $value["quantity"]]);
                }
            }
            return response()->json([
                "data" => $isExists,
                "message" => "Quotation Updated Successfully."
            ]);
        } catch (Exception $error) {
            // dd($error);
            return response()->json([
                "data" => null,
                "message" => $error->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {

            $result1 = QuotationToPurchases::where("id", $id)->delete();
            $result2 = QuotationToPurchasesItems::where("purchase_id", $id)->delete();
            return response()->json([
                "data" => $result1 || $result2,
                "message" => "Purchase Deleted Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => "Purchase Deleted Successfully."
            ]);
        }
    }
}
