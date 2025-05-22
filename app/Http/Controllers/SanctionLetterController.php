<?php

namespace App\Http\Controllers;

use Exception;
use Carbon\Carbon;
use function Aws\filter;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use App\Models\SanctionLetter;

use Illuminate\Support\Facades\DB;
use App\Models\SanctionLetterItems;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use App\Exceptions\ApiOperationFailedException;
use PhpParser\Node\Stmt\Else_;
use Ramsey\Uuid\Uuid;

class SanctionLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function prepareArray($parent, $child)
    {
        // $filteredItems = array_filter($child, fn ($item) => $item["letter_id"] == 8);
        $data = array();
        if (count($parent) > 0) {
            foreach ($parent as $pk => $pv) {
                $items = [];
                $data[$pk] = $pv;
                foreach ($child as $ck => $cv) {
                    if ($pv->id == $cv->letter_id) {
                        $items[] = $cv;
                    }
                }
                $data[$pk]["items"] = $items;
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

        if ($direction) {
            $letter = SanctionLetter::orderBy("created_at", $direction)->get();
        } else if ($pageSize) {
            $letter = SanctionLetter::orderBy("created_at", $direction)->limit($pageSize)->get();
        } else {
            $letter = SanctionLetter::orderBy("created_at", "desc")->get();
        }

        if ($search) {
            $letter = SanctionLetter::where("subject", "like", "%" . $search . "%")->orWhere("description", "like", "%" . $search . "%")->get();
        } else {
        }
        $letterItem = SanctionLetterItems::all();
        try {
            return response()->json([
                "data" => $this->prepareArray($letter, $letterItem),
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
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $data["subject"] = $request->subject;
        $data["description"] = $request->description;
        $data["pdf_file"] = $request->pdf_file;
        $data["letter_status"] = $request->letter_status;
        try {
            if ($request->file("pdf_file")) {
                $fileName = $this->makeAttachment(
                    $request['pdf_file'],
                    "SanctionLetters",
                    config('app.media_disc')
                );
                // $data["pdf_file"] = Uuid::uuid4()->toString() . $fileName;
                $data["pdf_file"] =  $fileName;

                // SanctionLetter::where("id", $request->id)->update(["letter_status" => 2]);
                // SanctionLetter::where("id", $request->id)->update(()"pdf_file" => $fileName]);
                SanctionLetter::updateOrCreate(["id" => $request->id], $data);
            }

            $result = SanctionLetter::updateOrCreate(["id" => $request->id], $data);

            if ($result && $request["items"]) {
                foreach ($request["items"] as $value) {
                    $value["letter_id"] = $result->id;
                    SanctionLetterItems::create($value);
                }
            }

            return response()->json([
                "data" => $result,
                "message" => "Letter created Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => "Something Went Wrong."
            ]);
        }


        // return response()->json([
        //     "data" => $request->all(),
        //     "message" => "Letter created Successfully."
        // ]);
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
            $data = $this->prepareArray(SanctionLetter::all(), SanctionLetterItems::all());
            return response()->json([
                // "data" => $data,
                "data" => $this->findLetter($data, $id),
                "message" => "Letter Fetched Successfully"
            ]);
        } catch (Exception $error) {
            return $error->getMessage();
        }
        // return $id;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $result = $this->findLetter(SanctionLetter::all(), SanctionLetterItems::all(), $id);
        return "edit";
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
        $letterItem = SanctionLetterItems::updateOrCreate(["id" => $request->id], $request->all());

        // "letter_status", "pdf_file",


        // if ($id && $request->is_item_edit) {
        //     SanctionLetterItems::where("id", $request->id)->update($request->all());
        // }

        return response()->json([
            "data" => $letterItem,
            "message" => "letter updated"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        SanctionLetter::where("id", $id)->delete();
        SanctionLetterItems::where("letter_id", $id)->delete();
    }
}
