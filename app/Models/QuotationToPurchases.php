<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuotationToPurchases extends Model
{
    use HasFactory;
    public $table = "quotation_to_purchases";
    protected $fillable = [
        "date",
        "reference_code",
        "sanction_letter_id",
        "quotation_id",
        "supplier_id",
        "discount",
        "shipping",
        "quotation_pdf_file",
        "grand_total",
        "paid_amount",
        "due",
        "purchase_status",
        "payment_status",
        "delivery_status",
        "payment_type",
        "created_by",
        "modified_by",
        "note"
    ];
}
