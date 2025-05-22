<?php

namespace App\Http\Controllers\API;

use App\Models\ManageStock;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use App\Http\Resources\ManageStockResource;
use App\Repositories\ManageStockRepository;
use App\Http\Resources\ManageStockCollection;

/**
 * Class UserAPIController
 */
class ManageStockAPIController extends AppBaseController
{
    /** @var $manageStockRepository */
    private $manageStockRepository;

    /**
     * @param ManageStockRepository $manageStockRepository
     */
    public function __construct(ManageStockRepository $manageStockRepository)
    {
        $this->manageStockRepository = $manageStockRepository;
    }

    /**
     * @param Request $request
     *
     * @return ManageStockCollection
     */
    public function stockReport(Request $request): ManageStockCollection
    {
        $request->request->remove('filter');
        $perPage = getPageSize($request);
        $search = $request->get('search');
        $warehouseId = $request->get('warehouse_id');

        if ($search && $search != "null") {
            $stocks = $this->manageStockRepository->whereHas(
                'product.productCategory',
                function ($query) use ($search) {
                    $query->where('products.code', 'like', '%' . $search . '%')
                        ->orWhere('products.name', 'like', '%' . $search . '%')
                        ->orWhere('products.product_cost', 'like', '%' . $search . '%')
                        ->orWhere('products.product_price', 'like', '%' . $search . '%')
                        ->orWhere('products.product_price', 'like', '%' . $search . '%')
                        ->orWhere('product_categories.name', 'like', '%' . $search . '%');
                }
            )->where('warehouse_id', $warehouseId)->paginate($perPage);
        }
        $stocks = ManageStock::where('warehouse_id', $warehouseId)->paginate($perPage);
        ManageStockResource::usingWithCollection();

        return new ManageStockCollection($stocks);
    }
}
