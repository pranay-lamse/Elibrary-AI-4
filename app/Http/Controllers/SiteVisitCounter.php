<?php

namespace App\Http\Controllers;

use App\Models\SiteVisitCounter as ModelsSiteVisitCounter;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SiteVisitCounter extends Controller
{
    public function index()
    {
        $count = 7;
        $days = [];
        $date = Carbon::tomorrow();
        for ($i = 0; $i < $count; $i++) {
            $days[] = $date->subDay()->format('Y-m-d');
        }

        $day['days'] = array_reverse($days);
        $count = ModelsSiteVisitCounter::select("count", "created_at")->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->get()->toArray();
        $period = CarbonPeriod::create(Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek());
        $data['dates'] = array_map(function ($datePeriod) {
            return $datePeriod->format("Y-m-d");
        }, iterator_to_array($period));


        $getMaxDateCount = array_map(function ($item) {
            return $item['count'];
        }, $count);

        if(!empty($getMaxDateCount))
        {
            $maxCount = max($getMaxDateCount);
        }else{
            $maxCount = $getMaxDateCount;
        }
        return response()->json([
            'data' => ['count' => array_map(function ($item) {
                return $item['count'];
            }, $count),

            'dates' => $data['dates'], 'max' => $maxCount]
        ]);
    }

    public function addCount(Request $request)
    {
        $record = ModelsSiteVisitCounter::whereDay('created_at', now()->day)->get()->toArray();
        if (!empty($record)) {
            $count = ModelsSiteVisitCounter::updateOrCreate(['created_at' => ModelsSiteVisitCounter::where('created_at', '>', DB::raw('CURDATE()'))->first()->created_at ?? null], ['count' => $record[0]['count'] + $request->count]);
        } else {
            $count = ModelsSiteVisitCounter::create(["count" => $request->count]);
        }
        return response()->json([
            'data' => $count,
            'message' => "Visit Counter Incremented Succesfully."
        ]);
    }
}
