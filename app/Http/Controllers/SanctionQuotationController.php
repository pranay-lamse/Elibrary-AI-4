<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\SanctionQuotationsModel;
use Illuminate\Support\Facades\Storage;
use App\Models\SanctionQuotationsItemsModel;
use App\Exceptions\ApiOperationFailedException;

class SanctionQuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

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

    public function prepareArray($parent, $child)
    {
        // $filteredItems = array_filter($child, fn ($item) => $item["letter_id"] == 8);
        $data = array();
        if (count($parent) > 0) {
            foreach ($parent as $pk => $pv) {
                $items = [];
                $data[$pk] = $pv;
                foreach ($child as $ck => $cv) {
                    if ($pv->id == $cv->quotation_id) {
                        $items[] = $cv;
                    }
                }
                $data[$pk]["quotation_items"] = $items;
            }
            return $data;
        } else {
            return $data;
        }
    }

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

    public static function makeAttachment($file, $path, $disk)
    {
        try {
            $fileName = '';
            if (!empty($file)) {
                $extension = $file->getClientOriginalExtension();
                if (!in_array(strtolower($extension), ['pdf', 'doc', 'docx', 'txt'])) {
                    throw new ApiOperationFailedException('Invalid Attachment', Response::HTTP_BAD_REQUEST);
                }
                $originalName = $file->getClientOriginalName();
                // $date = Carbon::now()->format('Y-m-d');
                // $originalName = sha1($originalName . time());
                $fileName = $originalName;
                $contents = file_get_contents($file->getRealPath());
                Storage::disk($disk)->put($path . DIRECTORY_SEPARATOR . $fileName, $contents);
            }

            return $fileName;
        } catch (Exception $e) {
            throw new ApiOperationFailedException($e->getMessage(), $e->getCode());
        }
    }

    public function index(Request $request)
    {
        $direction = $request->query("direction");
        $pageSize = $request->query("pageSize");
        $search = $request->query("search");
        $filter = $request->query("filter");

        if ($direction) {
            $sanctionQuotation = SanctionQuotationsModel::orderBy("created_at", $direction)->get();
        } else if ($pageSize) {
            $sanctionQuotation = SanctionQuotationsModel::orderBy("created_at", $direction)->limit($pageSize)->get();
        } else {
            $sanctionQuotation = SanctionQuotationsModel::orderBy("created_at", "desc")->get();
        }

        if ($filter) {
            $sanctionQuotation = SanctionQuotationsModel::where("reference_code", "like", "%" . $filter["search"] . "%")->get();
        } else {
        }
        $sanctioQuotaionItems = SanctionQuotationsItemsModel::all();
        try {
            return response()->json([
                "data" => $this->prepareArray($sanctionQuotation, $sanctioQuotaionItems),
                "message" => "Letter Retrieved Successfully."
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
        //
        // dd($request->all());

        try {
            $data["date"] = $request->date;
            $data["sanction_letter_id"] = $request->sanction_letter_id;
            $data["supplier_id"] = $request->supplier_id;
            $data["discount"] = $request->discount;
            $data["shipping"] = $request->shipping;
            $data["quotation_pdf_file"] = $request->quotation_pdf_file;
            $data["grand_total"] = $request->grand_total;
            $data["status"] = $request->status;
            $data["created_by"] = $request->created_by;
            $data["modified_by"] = $request->modified_by;
            $data["note"] = $request->note;

            if (isset($request->quotation_pdf_file)) {
                $fileName = $this->makeAttachment(
                    $request['quotation_pdf_file'],
                    "QuotationLetters",
                    config('app.media_disc')
                );
                $data["quotation_pdf_file"] = $fileName;
            }
            $result = SanctionQuotationsModel::create($data);
            SanctionQuotationsModel::where("id", $result->id)->update(["reference_code" => "QA_111" . $result->id]);
            // $result = DB::table("sanction_quotation")->create($request->all())->get();
            if (isset($result->id) && isset($request->quotation_items)) {
                foreach ($request["quotation_items"] as $value) {
                    $value["quotation_id"] = $result->id;
                    $value["sanction_letter_id"] = $value["letter_id"];
                    $value["sanction_letter_item_id"] = $value["id"];

                    SanctionQuotationsItemsModel::create($value);
                }
            }
            return response()->json([
                "data" => $result,
                "message" => "Quotation Created Successfully."
            ]);
        } catch (Exception $error) {
            // dd($error);
            return response()->json([
                "data" => $error,
                "message" => "Something went wrong"
            ]);
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
            $data = $this->prepareArray(SanctionQuotationsModel::all(), SanctionQuotationsItemsModel::all());
            return response()->json([
                // "data" => $data,
                "data" => $this->findLetter($data, $id),
                "message" => "Quotation Fetched Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                // "data" => $data,
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
        // try {

        //     if (!count($request->all())) {
        //         dd($request->all());
        //     }

        //     $data["date"] = $request->date;
        //     $data["sanction_letter_id"] = $request->sanction_letter_id;
        //     $data["supplier_id"] = $request->supplier_id;
        //     $data["discount"] = $request->discount;
        //     $data["shipping"] = $request->shipping;
        //     $data["quotation_pdf_file"] = $request->quotation_pdf_file;
        //     $data["grand_total"] = $request->grand_total;
        //     $data["status"] = $request->status;
        //     $data["created_by"] = $request->created_by;
        //     $data["modified_by"] = $request->modified_by;
        //     $data["note"] = $request->note;

        //     if (isset($request->quotation_pdf_file)) {
        //         $fileName = $this->makeAttachment(
        //             $request['quotation_pdf_file'],
        //             "QuotationLetters",
        //             config('app.media_disc')
        //         );
        //         $data["quotation_pdf_file"] = $fileName;
        //     }
        //     $result = SanctionQuotationsModel::where("id", $id)->update($data);
        //     // SanctionQuotationsModel::where("id", $result)->update(["reference_code" => "QA_111" . $result->id]);
        //     // $result = DB::table("sanction_quotation")->create($request->all())->get();
        //     if (isset($result) && isset($request->quotation_items)) {
        //         foreach ($request["quotation_items"] as $value) {
        //             if (isset($value["isEdit"])) {
        //                 $this->removeElement($value, ['newItem', 'isEdit', 'sub_total', 'quotation_item_id']);
        //                 SanctionQuotationsItemsModel::where("id", $value["id"])->update($value);
        //             } else {
        //                 $value["quotation_id"] = $id;
        //                 $value["sanction_letter_id"] = $value["letter_id"];
        //                 $value["sanction_letter_item_id"] = $value["id"];
        //                 SanctionQuotationsItemsModel::create($value);
        //             }
        //         }
        //     }
        //     return response()->json([
        //         "data" => $request->all(),
        //         "message" => "Quotation Updated Successfully."
        //     ]);
        // } catch (Exception $error) {
        //     // dd($error);
        //     return response()->json([
        //         "data" => $error,
        //         "message" => "Something went wrong"
        //     ]);
        // }
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

            $result = SanctionQuotationsItemsModel::where("quotation_id", $id)->delete();
            SanctionQuotationsModel::where("id", $id)->delete();
            return response()->json([
                "data" => $result,
                "message" => 'Quotation deleted successfully.'
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => 'Something went wrong.'
            ]);
        }
    }
}
