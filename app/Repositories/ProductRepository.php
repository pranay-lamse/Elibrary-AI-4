<?php

namespace App\Repositories;

use App\Models\Product;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class ProductCategoryRepository
 */
class ProductRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'name',
        'code',
        'product_cost',
        'product_price',
        'product_unit',
        'sale_unit',
        'purchase_unit',
        'stock_alert',
        'order_tax',
        'notes',
        'created_at',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'name',
        'code',
        'product_cost',
        'product_price',
        'product_unit',
        'sale_unit',
        'purchase_unit',
        'stock_alert',
        'order_tax',
        'notes',
    ];

    /**
     * @return array
     */
    public function getAvailableRelations(): array
    {
        return array_values(Product::$availableRelations);
    }

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model(): string
    {
        return Product::class;
    }

    /**
     * @param $input
     *
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function storeProduct($input)
    {
        try {
            DB::beginTransaction();


            if(empty($input['product_price'])){
                $input['product_price'] = 1;

            }

            if(empty($input['barcode_symbol'])){
                $input['barcode_symbol'] = 1;

            }

            if(empty($input['product_unit'])){
                $input['product_unit'] = 1;

            }

            if(empty($input['sale_unit'])){
                $input['sale_unit'] = 1;

            }



            $product = $this->create($input);
            if (isset($input['images']) && !empty($input['images'])) {
                foreach ($input['images'] as $image) {
                    $product['image_url'] = $product->addMedia($image)->toMediaCollection(Product::PATH,
                        config('app.media_disc'));
                }
            }
            $reference_code = 'PR_'.$product->id;
            $this->generateBarcode($input, $reference_code);
            $product['barcode_image_url'] = Storage::url('product_barcode/barcode-'.$reference_code.'.png');

            DB::commit();

            return $product;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param $input
     * @param $id
     *
     * @return LengthAwarePaginator|Collection|mixed
     */
    public function updateProduct($input, $id)
    {
        try {
            DB::beginTransaction();
            $product = $this->update($input, $id);
            if (isset($input['images']) && !empty($input['images'])) {
                foreach ($input['images'] as $image) {
                    $product['image_url'] = $product->addMedia($image)->toMediaCollection(Product::PATH,
                        config('app.media_disc'));
                }
            }
            $product->clearMediaCollection(Product::PRODUCT_BARCODE_PATH);
            $reference_code = 'PR_'.$product->id;
            $this->generateBarcode($input, $reference_code);
            $product['barcode_image_url'] = Storage::url('product_barcode/barcode-'.$reference_code.'.png');

            DB::commit();

            return $product;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @param $input
     *
     * @return bool
     */
    public function generateBarcode($input, $reference_code): bool
    {
        $barcodeType = null;
        $generator = new BarcodeGeneratorPNG();
        switch ($input['barcode_symbol']) {
            case Product::CODE128;
                $barcodeType = $generator::TYPE_CODE_128;
                break;
            case Product::CODE39;
                $barcodeType = $generator::TYPE_CODE_39;
                break;
            case Product::EAN8;
                $barcodeType = $generator::TYPE_EAN_8;
                break;
            case Product::EAN13;
                $barcodeType = $generator::TYPE_EAN_13;
                break;
            case Product::UPC;
                $barcodeType = $generator::TYPE_UPC_A;
                break;
        }

        Storage::disk(config('app.media_disc'))->put('product_barcode/barcode-'.$reference_code.'.png',
            $generator->getBarcode($input['code'], $barcodeType, 4, 70));

        return true;
    }
}
