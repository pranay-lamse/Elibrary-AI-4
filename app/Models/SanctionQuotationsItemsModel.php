<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanctionQuotationsItemsModel extends Model
{
    use HasFactory;
    public $table = "sanction_quotations_items";
    protected $fillable = [
        "quotation_id",
        "sanction_letter_id",
        "sanction_letter_item_id",
        "price",
        "category",
        "name",
        "quantity",
        "notes"
    ];
}
