<?php

use App\Models\Currency;
use App\Models\ManageStock;
use App\Models\Setting;
use App\Models\Supplier;


use App\Resources\RandomColor;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

if (!function_exists('getPageSize')) {
    /**
     * @param $request
     *
     * @return mixed
     */
    function getPageSize($request)
    {

        return $request->input('page.size', 10);
    }
}

/**
 * @return string
 */

 if (!function_exists('getLogoUrl')) {
function getLogoUrl(): string
{

    /* static $appLogo;

    if (empty($appLogo)) {
        $appLogo = Setting::where('key', '=', 'logo')->first();
    } */

    $appLogo = Setting::where('key', '=', 'logo')->first();


    return asset($appLogo->logo);
}

 }




if (!function_exists('getSettingValue')) {
    /**
     * @param $keyName
     *
     * @return mixed
     */
    function getSettingValue($keyName)
    {
        $key = 'setting' . '-' . $keyName;

        static $settingValues;

        if (isset($settingValues[$key])) {
            return $settingValues[$key];
        }

        /** @var Setting $setting */
        $setting = Setting::where('key', '=', $keyName)->first();
        $settingValues[$key] = $setting->value;

        return $setting->value;
    }
}

/**
 * @param array $models
 * @param string $columnName
 * @param int $id
 *
 * @return bool
 */

 if (!function_exists('canDelete')) {
function canDelete(array $models, string $columnName, int $id): bool
{

    foreach ($models as $model) {
        $result = $model::where($columnName, $id)->exists();

        if ($result) {
            return true;
        }
    }

    return false;
}
 }
 if (!function_exists('getCurrencyCode')) {
function getCurrencyCode()
{

    $currencyId = Setting::where('key', '=', 'currency')->first()->value;

    return Currency::whereId($currencyId)->first()->symbol;
}

 }


 if (!function_exists('getLoginUserLanguage')) {
function getLoginUserLanguage(): string
{
    return \Illuminate\Support\Facades\Auth::user()->language;
}

 }

if (!function_exists('manageStock')) {
    /**
     * @param $request
     *
     * @return mixed
     */
    function manageStock($warehouseID, $productID, $qty = 0)
    {
        $product = ManageStock::whereWarehouseId($warehouseID)
            ->whereProductId($productID)
            ->first();

        if ($product) {

            $totalQuantity = $product->quantity + $qty;

            if (($product->quantity + $qty) < 0) {
                $totalQuantity = 0;
            }
            $product->update([
                'quantity' => $totalQuantity,
            ]);
        } else {

            if ($qty < 0) {
                $qty = 0;
            }

            ManageStock::create([
                'warehouse_id' => $warehouseID,
                'product_id'   => $productID,
                'quantity'     => $qty,
            ]);
        }
    }
}

if (!function_exists('keyExist')) {
    function keyExist($key)
    {
        $exists = Setting::where('key', $key)->exists();

        return $exists;
    }
}

if (!function_exists('getSupplierGrandTotalFilterIds')) {
function getSupplierGrandTotalFilterIds($search)
{
    $supplierData = Supplier::with('purchases')->get();
    $ids = [];
    foreach ($supplierData as $key => $supplier) {
        $value = $supplier->purchases->sum('grand_total');
        if ($search != '') {
            if ($value == $search) {
                $ids[] = $supplier->id;
            }
        }
    }

    return $ids;
}

}



if (!function_exists('replaceArrayValue')) {

    function replaceArrayValue(&$array, $key, $replaceValue)
    {
        foreach ($array as $index => $value) {
            if (is_array($value)) {
                $array[$index] = replaceArrayValue($value, $key, $replaceValue);
            }
            if ($index == $key) {
                $array[$index] = $replaceValue;
            }
        }

        return $array;
    }
}

if (!function_exists('getLogo')) {

    function getLogo()
    {
        /** @var Setting $setting */
        $logoImage = Setting::where('key', '=', 'logo')->first()->value;

        $logo = base64_encode(file_get_contents($logoImage));

        return 'data:image/png;base64,' . $logo;
    }
}

if (!function_exists('currencyAlignment')) {

    function currencyAlignment($amount)
    {
        if (getSettingValue('is_currency_right') != 1) {
            return getCurrencyCode() . ' ' . $amount;
        }

        return $amount . ' ' . getCurrencyCode();
    }
}

/**
 * @param  string  $key
 *
 * @return null|string
 */

 if (!function_exists('getSettingValueByKey')) {
function getSettingValueByKey($key)
{
    /** @var Setting $setting */
    $setting = Setting::where('key', $key)->first();

    if (!empty($setting)) {
        return $setting->value;
    }
}

 }

/**
 * @param  string  $str
 * @param  string  $delimiter
 *
 * @return array
 */

 if (!function_exists('explode_trim_remove_empty_values_from_array')) {
function explode_trim_remove_empty_values_from_array($str, $delimiter = ',')
{
    $arr = explode($delimiter, trim($str));
    $arr = array_map('trim', $arr);
    $arr = array_filter($arr, function ($value) {
        return !empty($value);
    });

    return $arr;
}

 }

/**
 * @param  Builder  $query
 * @param  string  $keywords
 * @param  array  $columns
 *
 * @return mixed
 */

 if (!function_exists('filterByColumns')) {
function filterByColumns(&$query, $keywords, $columns)
{
    $keywords = explode_trim_remove_empty_values_from_array($keywords, ' ');

    $query->where(function (Builder $query) use ($keywords, $columns) {
        foreach ($keywords as $keyword) {
            foreach ($columns as $column) {
                $query->orWhereRaw("lower($column) LIKE ?", ['%' . trim(strtolower($keyword)) . '%']);
            }
        }
    });

    return $query;
}

 }

/**
 * @param  string  $startDate
 * @param  string  $endDate
 * @param  Collection  $records
 *
 * @return array
 */


 if (!function_exists('prepareCountFromDate')) {

function prepareCountFromDate($startDate, $endDate, $records)
{
    $result = [];
    if (!empty($startDate)) {
        /** @var Collection $records */
        $records = $records->groupBy('date');
        while (strtotime($startDate) <= strtotime($endDate)) {
            $monthText = date('M', strtotime($startDate)) . '_' . date('Y', strtotime($startDate));
            if (isset($records[$startDate])) {
                $result[$monthText][] = $records[$startDate]->count();
            } else {
                $result[$monthText][] = 0;
            }

            $startDate = Carbon::parse($startDate)->addDay()->toDateString();
        }
    }

    return $result;
}

 }


/**
 * @param  string  $startDate
 * @param  string  $endDate
 * @param  string  $format
 *
 * @return array
 */

 if (!function_exists('prepareDateText')) {
function prepareDateText($startDate, $endDate, $format = 'jS M')
{
    $dates = [];
    while (strtotime($startDate) <= strtotime($endDate)) {
        $dateText = date($format, strtotime($startDate));
        $dates[] = $dateText;
        $startDate = Carbon::parse($startDate)->addDay()->toDateString();
    }

    return $dates;
}

 }

/**
 * @param  int  $opacity
 * @param  string  $colorType
 * @param  string  $colorFormat
 *
 * @return array|string
 */

 if (!function_exists('getRandomColor')) {
function getRandomColor($opacity = 1, $colorType = 'bright', $colorFormat = 'rgbaCss')
{
    return RandomColor::one([
        'luminosity' => $colorType,
        'format'     => $colorFormat,
        'opacity'    => $opacity,
    ]);
}

 }

/**
 * @return mixed
 */

 if (!function_exists('getLogoURLLibrary')) {
function getLogoURLLibrary()
{
    $setting = Setting::where('key', Setting::LIBRARY_LOGO)->first();

    return $setting->logo_url;
}

 }

/**
 * @return mixed
 */

 if (!function_exists('getCurrencySymbol')) {
function getCurrencySymbol()
{
    $currencyPath = file_get_contents(storage_path() . '/currencies/currencies.json');
    $currenciesData = json_decode($currencyPath, true)['currencies'];
    $currencySymbol = Setting::where('key', '=', 'currency')->value('value');

    $currencySymbol = collect($currenciesData)->where(
        'code',
        strtoupper($currencySymbol)
    )->pluck('symbol')->first();

    return $currencySymbol;
}

 }

 if (!function_exists('uniqueTransactionId')) {

function uniqueTransactionId()
{
    $uniqueTransactionId = Str::random(8);
    while (\App\Models\Subscription::where('transaction_id', $uniqueTransactionId)->exists()) {
        $uniqueTransactionId = Str::random(8);
    }
    return $uniqueTransactionId;
}

 }
