<?php

namespace App\Http\Controllers;

use App\Services\BillDeskService;
use Illuminate\Http\Request;

class BillDeskController extends Controller
{
    protected $billDeskService;

    public function __construct(BillDeskService $billDeskService)
    {
        $this->billDeskService = $billDeskService;
    }

    public function createOrder()
    {
        $result = $this->billDeskService->createOrder();
        return response()->json($result);
    }
}
