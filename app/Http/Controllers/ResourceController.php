<?php

namespace App\Http\Controllers;

use App\Exceptions\ApiOperationFailedException;
use App\Models\ResourceCategoryModel;
use App\Models\ResourceModel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public static function makeAttachment($file, $path, $disk)
    {
        try {
            $fileName = '';
            if (!empty($file)) {
                $extension = $file->getClientOriginalExtension();

                $originalName = $file->getClientOriginalName();

                //$fileName = $originalName;
                $timestamp = time(); // Get the current Unix timestamp
                  $fileName = $timestamp . '.' . $extension; // Append timestamp with extension
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




        $query = ResourceModel::select('*');
        if (!is_null($request->skip)) {
            $query->skip($request->skip);
        }

        if (!is_null($request->limit)) {
            $query->limit($request->limit);
        }

        if (!is_null($request->category_id)) {
            $query->where('category_id', $request->category_id);
        }
        try {
            if (!empty($request->search)) {
                return response()->json([
                    'data' => ResourceModel::where('title', 'LIKE', '%' . $request->search . '%')->get(),
                    'message' => "Resources Fetched successfully",

                ]);
            }

            if (!is_null($request->category_id)) {

                $count = ResourceModel::where('category_id', $request->category_id)->count();
            }else{
                $count = ResourceModel::count();
            }

            return response()->json([
                'data' => $query->get(),
                'message' => "Resources Fetched successfully",
                'total' => $count
            ]);
        } catch (Exception $error) {
            return response()->json([
                'data' => $error->getMessage(),
                'message' => $error->getMessage()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        try {
            $category = json_decode($request->category);
            if (!empty($category->__isNew__)) {
                $category_id = ResourceCategoryModel::create(["name" => $category->value])->toArray();
                $data['category_id'] = $category_id['id'];
            } else {
                $data['category_id'] = $category->value;
            }
            $data['title'] = $request->title;
            $data['note'] = $request->note;
            $data['url'] = $request->url;

            if ($request->file('file_content')) {
                $fileName = $this->makeAttachment(
                    $request['file_content'],
                    "Resources",
                    config('app.media_disc')
                );
                $data["file_content"] = $fileName;
            }
            $resource = ResourceModel::create($data);
            return response()->json([
                'data' => $resource,
                'message' => "Resources added successfully"
            ]);
        } catch (Exception $error) {
            return response()->json([
                'data' => $error->getMessage(),
                'message' => $error->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $resource = ResourceModel::findOrFail($id); // Retrieve the resource by ID
    return response()->json($resource); // Return the resource data as JSON
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update2(Request $request)
    {

        $input = $request->all();

        $id  = $request->id;

        $resource = ResourceModel::findOrFail($id); // Retrieve the resource by ID
        if(isset($request->category_id))
        {
            $category_id = $request->category_id;

        }else{
            $category_id = $resource->category_id;

        }



       if ($request->file('file_content')) {
                $fileName = $this->makeAttachment(
                    $request['file_content'],
                    "Resources",
                    config('app.media_disc')
                );
                $file_content = $fileName;


        }else{
            $file_content = $resource->file_content;

        }

        if(isset($request->url))
        {
            $url = $request->url;

        }else{
            $url = $resource->url;

        }

        if(isset($request->note))
        {
            $note = $request->note;

        }else{
            $note = $resource->note;

        }



        $resource = ResourceModel::where('id', $id)->update([

            "title"=> $request->title,
            "category_id"=> $category_id,
            "file_content"=>  $file_content,
            "url"=>  $url,
            "note"=> $note

        ]);

        return response()->json($resource);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            if (ResourceModel::where('id', '=', $id)->exists()) {

                $resource = ResourceModel::where('id', $id)->get()->toArray();
                $file = $resource[0]['file_content'];
                // $temp_arr = explode('_', $file);
                // if (isset($temp_arr[0])) unset($temp_arr[0]);
                // $file = implode('_', $temp_arr);
                if(isset($file) && !empty($file))
                {
                    $finalPath = public_path("uploads/Resources/") . $file;
                    if (file_exists($finalPath)) {
                        if (unlink($finalPath)) {
                            ResourceModel::whereId($id)->delete();
                        }
                    }
                }else{
                    ResourceModel::whereId($id)->delete();
                }


                return response()->json([
                    'data' => 'Resource Deleted Successfully.'
                ]);
            }
        } catch (Exception $error) {
            return response()->json([
                'data' => $error->getMessage(),
                'message' => $error->getMessage()
            ]);
        }
    }
}
