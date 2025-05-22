<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Importing the DB facade
use Carbon\Carbon;
use Illuminate\Support\Facades\Log as FacadesLog; // Correcting the import
use Exception;

class AttendanceController extends Controller
{
    public function store(Request $request)
{
    try {
        // Get the member ID from the request
        $member_id = $request->member;

        // Validate that the member ID exists in the members table
        $memberExists = DB::table('members')->where('id', $member_id)->exists();

        if (!$memberExists) {
            return response()->json(['error' => 'Invalid member ID'], 404);
        }

        // Get current date and time in IST
        $currentDate = Carbon::now('Asia/Kolkata')->format('Y-m-d'); // Current date in 'Y-m-d' format
        $currentTime = Carbon::now('Asia/Kolkata'); // Current timestamp in IST

        // Check if the user has already logged in today
        $attendance = DB::table('attendances')
            ->where('user_id', $member_id)
            ->where('attendance_date', $currentDate)
            ->first();

        if ($attendance) {
            // If the user has logged in today, update the logout time with the latest scan
            DB::table('attendances')
                ->where('id', $attendance->id)
                ->update(['logout_time' => $currentTime]);

            FacadesLog::info("User {$member_id} has logged out at {$currentTime}");
            return response()->json(['message' => 'Logout time updated'], 200);
        } else {
            // If the user is logging in for the first time today, insert a new record with login time
            DB::table('attendances')->insert([
                'user_id' => $member_id,
                'attendance_date' => $currentDate,
                'login_time' => $currentTime, // Set the login time
                'logout_time' => null, // Initialize logout_time as null
                'created_at' => $currentTime, // Optional: set created_at
                'updated_at' => $currentTime, // Optional: set updated_at
            ]);

            FacadesLog::info("User {$member_id} has logged in at {$currentTime}");
            return response()->json(['message' => 'Login time recorded'], 201);
        }
    } catch (Exception $e) {
        FacadesLog::error('Error in attendance logging: ' . $e->getMessage());
        return response()->json(['error' => 'Something went wrong'], 500);
    }
}


public function getTodayLogins(Request $request)
{
    try {
        // Get start_date and end_date from the request, or default to today's date
        $startDate = $request->start_date;
        $endDate = $request->end_date;

        $currentDate = Carbon::now('Asia/Kolkata')->format('Y-m-d'); // Current date in 'Y-m-d' format

        // Get user_id from the request, if provided
        $userId = $request->user_id;

        // Initialize the query
        $query = DB::table('attendances as a')
            ->join('members as m', 'a.user_id', '=', 'm.id') // Join on user_id and member id
            ->whereNotNull('a.login_time'); // Ensure there is a login time

        // Apply date filtering based on the presence of user_id
        if ($userId) {
            $query->where('a.user_id', $userId);
        }

        // Apply date filters
        if (!empty($startDate) && empty($endDate)) {
            $query->whereDate('a.attendance_date', $startDate);
        } elseif (!empty($endDate) && empty($startDate)) {
            $query->whereDate('a.attendance_date', $endDate);
        } elseif (!empty($startDate) && !empty($endDate)) {
            $query->whereBetween('a.attendance_date', [$startDate, $endDate]);
        } else {
            if(empty($userId))
            {
                $query->whereDate('a.attendance_date', $currentDate);
            }

        }

        // Execute the query and select the required fields
        $logins = $query->orderBy('a.attendance_date', 'asc')
            ->select([
                'a.user_id',
                'm.first_name',
                'm.last_name',
                'a.login_time',
                'a.logout_time',
                'a.attendance_date'
            ])
            ->get();

        // Check if any records were found
        if ($logins->isEmpty()) {
            return response()->json(['message' => 'No logins found for the specified criteria'], 404);
        }

        return response()->json($logins, 200);
    } catch (Exception $e) {
        // Log the error message
        FacadesLog::error('Error fetching logins: ' . $e->getMessage());
        return response()->json(['error' => 'Something went wrong'], 500);
    }
}









}
