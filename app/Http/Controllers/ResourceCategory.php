<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use App\Models\ResourceCategoryModel;

class ResourceCategory extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            if ($request->search) {
                return response()->json([
                    'data' => ResourceCategoryModel::where('name', 'LIKE', '%' . $request->search . '%')->get(),
                    'message' => "Resources Category Fetched successfully"
                ]);
            }
            return response()->json([
                'data' => ResourceCategoryModel::all(),
                'message' => "Resources Category Fetched successfully"
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            $resourceCategory = ResourceCategoryModel::create(['name' => $request->name]);
            return response()->json([
                'data' => $resourceCategory,
                'message' => "Resources Category added successfully"
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
        //
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
    public function update(Request $request, string $id)
    {
        try {
            $category = ResourceCategoryModel::whereId($id)->update(['name' => $request->name]);
            return response()->json([
                'data' => $category,
                'message' => "Resource Category Edited Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                'data' => $error->getMessage(),
                'message' => $error->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $category = ResourceCategoryModel::whereId($id)->delete();
            return response()->json([
                'data' => $category,
                'message' => "Resource Category Deleted Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                'data' => $error->getMessage(),
                'message' => $error->getMessage()
            ]);
        }
    }
}
