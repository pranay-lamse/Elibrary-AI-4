<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuotationToPurchasesItems extends Model
{
    use HasFactory;
    public $table  = "quotation_to_purchases_items";
    protected $fillable = [
        "purchase_id",
        "quotation_id",
        "quotation_item_id",
        "price",
        "category",
        "name",
        "quantity",
        "notes"
    ];
}
