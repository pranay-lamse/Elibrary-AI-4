<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierCollection;
use App\Http\Resources\SupplierResource;
use App\Models\Purchase;
use App\Models\Supplier;
use App\Repositories\SupplierRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Prettus\Validator\Exceptions\ValidatorException;

/**
 * Class SupplierAPIController
 */
class SupplierAPIController extends AppBaseController
{
    /** @var SupplierRepository */
    private $supplierRepository;

    public function __construct(SupplierRepository $supplierRepository)
    {
        $this->supplierRepository = $supplierRepository;
    }

    /**
     * @param Request $request
     *
     * @return SupplierCollection
     */
    public function index(Request $request)
    {
        $input = $request->except(['skip', 'limit']);
        $suppliers = $this->supplierRepository->all(
            $input,
            $request->get('skip'),
            $request->get('limit')
        );

        // $search = $request->filter['search'] ?? '';
        // $perPage = getPageSize($request);
        // $suppliers = Supplier::where('name', 'LIKE', "%$search%")->orWhere('email', 'LIKE', "%$search%")->paginate($perPage);

        SupplierResource::usingWithCollection();

        return new SupplierCollection($suppliers);
    }

    /**
     * @param CreateSupplierRequest $request
     * @throws ValidatorException
     *
     * @return SupplierResource
     */
    public function store(CreateSupplierRequest $request)
    {
        $input = $request->all();
        $supplier = $this->supplierRepository->create($input);

        return new SupplierResource($supplier);
    }

    /**
     * @param $id
     * @return SupplierResource
     */
    public function show($id)
    {
        $supplier = $this->supplierRepository->find($id);

        return new SupplierResource($supplier);
    }

    /**
     * @param UpdateSupplierRequest $request
     * @param $id
     * @throws ValidatorException
     *
     * @return SupplierResource
     */
    public function update(UpdateSupplierRequest $request, $id)
    {
        $input = $request->all();
        $supplier = $this->supplierRepository->update($input, $id);

        return new SupplierResource($supplier);
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $purchaseModel = [
            Purchase::class,
        ];
        $useSupplier = canDelete($purchaseModel, 'supplier_id', $id);
        if ($useSupplier) {
            $this->sendError('Supplier can\'t be deleted.');
        }
        $this->supplierRepository->delete($id);

        return $this->sendSuccess('Supplier deleted successfully');
    }
}
