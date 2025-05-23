<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * App\Models\Expense
 *
 * @property int $id
 * @property string $date
 * @property int $warehouse_id
 * @property int $expense_category_id
 * @property float $amount
 * @property string|null $details
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ExpenseCategory $expenseCategory
 * @property-read \App\Models\Warehouse $warehouse
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense query()
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereExpenseCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereWarehouseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereReferenceCode($value)
 * @property string|null $reference_code
 * @mixin \Eloquent
 * @property string|null $title
 * @method static \Illuminate\Database\Eloquent\Builder|Expense whereTitle($value)
 */
class Expense extends BaseModel
{
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'expenses';

    const JSON_API_TYPE = 'expenses';

    protected $fillable = [
        'date',
        'warehouse_id',
        'purchase_id',
        'expense_category_id',
        'amount',
        'reference_code',
        'details',
        'title',
    ];

    public static $rules = [
        'date'                => 'required|date',

        'expense_category_id' => 'required|exists:expense_categories,id',
        'amount'              => 'required|numeric',
        'title'               => 'required',
    ];

    public $casts = [
        'date' => 'date',
    ];

    function prepareLinks(): array
    {
        return [
            "self" => route('expenses.show', $this->id),
        ];
    }

    function prepareAttributes(): array
    {
        $fields = [
            'date'                  => $this->date,
            'warehouse_id'          => $this->warehouse_id,
            'purchase_id'          => $this->purchase_id,
            'expense_category_id'   => $this->expense_category_id,
            'amount'                => $this->amount,
            'details'               => $this->details,
            'reference_code'        => $this->reference_code,
            'warehouse_name'        => $this->warehouse->name,
            'expense_category_name' => $this->expenseCategory->name,
            'title'                 => $this->title,
            'created_at'            => $this->created_at,
        ];

        return $fields;
    }

    /**
     *
     * @return BelongsTo
     */
    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class, 'warehouse_id', 'id');
    }

    /**
     *
     * @return BelongsTo
     */
    public function expenseCategory(): BelongsTo
    {
        return $this->belongsTo(ExpenseCategory::class, 'expense_category_id', 'id');
    }

    /**
     * @var string[]
     */
    public static $availableRelations = [
        'warehouse_id'        => 'warehouse',
        'expense_category_id' => 'expenseCategory',
    ];
}
