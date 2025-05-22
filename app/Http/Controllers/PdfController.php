<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PdfController extends Controller
{
    public function generatePdf()
    {
        $users = Member::all();
        return view('pdfGenerate', ['users' => $users]);
    }
}
