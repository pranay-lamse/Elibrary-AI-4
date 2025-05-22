<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\SanctionQuotationsModel;
use Illuminate\Support\Facades\Storage;
use App\Models\SanctionQuotationsItemsModel;
use App\Exceptions\ApiOperationFailedException;

class SanctionQuotationEdit extends Controller
{
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

    public function quotationUpdate(Request $request, $id)
    {
        try {

            // if (!count($request->all())) {
            //     dd($request->all());
            // }

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

            if ($request->file("quotation_pdf_file")) {
                $fileName = $this->makeAttachment(
                    $request['quotation_pdf_file'],
                    "QuotationLetters",
                    config('app.media_disc')
                );
                $data["quotation_pdf_file"] = $fileName;
            }
            $result = SanctionQuotationsModel::where("id", $id)->update($data);
            // SanctionQuotationsModel::where("id", $result)->update(["reference_code" => "QA_111" . $result->id]);
            // $result = DB::table("sanction_quotation")->create($request->all())->get();
            if (isset($result) && isset($request->quotation_items)) {
                foreach ($request["quotation_items"] as $value) {
                    if (isset($value["isEdit"])) {
                        $value["sanction_letter_id"] = $value["letter_id"];
                        $this->removeElement($value, ['newItem', 'isEdit', 'sub_total', 'quotation_item_id', 'letter_id']);
                        SanctionQuotationsItemsModel::where("id", $value["id"])->update($value);
                    } else {
                        $value["quotation_id"] = $id;
                        $value["sanction_letter_id"] = $value["letter_id"];
                        $value["sanction_letter_item_id"] = $value["id"];
                        $this->removeElement($value, 'letter_id');
                        // dd($value);
                        SanctionQuotationsItemsModel::create($value);
                    }
                }
            }
            return response()->json([
                "data" => $request->all(),
                "message" => "Quotation Updated Successfully."
            ]);
        } catch (Exception $error) {
            // dd($error);
            return response()->json([
                "data" => $error,
                "message" => "Something went wrong"
            ]);
        }
    }
}
