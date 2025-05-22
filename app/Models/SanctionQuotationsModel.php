<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanctionQuotationsModel extends Model
{
    use HasFactory;
    public $table = "sanction_quotations";
    protected $fillable = [
        "date",
        "reference_code",
        "sanction_letter_id",
        "supplier_id",
        "discount",
        "shipping",
        "quotation_pdf_file",
        "grand_total",
        "status",
        "created_by",
        "modified_by",
        "note"
    ];
}
