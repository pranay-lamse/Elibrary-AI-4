<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Repositories\Contracts\BookRepositoryInterface;
use Exception;
use Illuminate\Http\Request;

class LatestBook extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $bookRepository;
    public function __construct(BookRepositoryInterface $bookRepo)
    {
        $this->bookRepository = $bookRepo;
    }

    public function index()
    {
        $search['order_by'] = "created_at";
        try {
            $books = Book::all();
            return response()->json([
                "data" => $books,
                "message" => "Recently added Books Retrieved Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error->getMessage(),
                "message" => "Recently added Retrieved Successfully."
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
