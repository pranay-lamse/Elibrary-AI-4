<?php

use App\Http\Controllers\API\B1\BookItemAPIController;
use App\Http\Controllers\API\M1\AuthAPIController;
use App\Http\Controllers\API\M1\BookRequestAPIController;
use App\Http\Controllers\API\M1\CountryAPIController;
use App\Http\Controllers\API\M1\IssuedBookAPIController;
use App\Http\Controllers\API\M1\MemberAPIController;
use App\Http\Controllers\API\M1\MemberAuthController;

use App\Http\Controllers\FirebaseController;
use Illuminate\Support\Facades\Route;

/**
 * Member Auth Middleware
 */
Route::middleware(['auth:sanctum', 'member.auth', 'subscription'])->group(function () {
    // Book search
    Route::get('m1/search-books', [BookItemAPIController::class, 'searchBooks'])->name('search-books.index');
    // get logged in member details
    Route::get('m1/member-details', [MemberAPIController::class, 'getLoggedInMemberDetails'])->name('member-details');

    Route::post('m1/fcm-token', [MemberAPIController::class, 'fcmToken']);



    // update logged in member profile
    Route::post('m1/update-member-profile', [MemberAPIController::class, 'updateMemberProfile'])
        ->name('update-member-profile');
    // books history
    Route::get('m1/books-history', [IssuedBookAPIController::class, 'booksHistory'])->name('books-history.index');
    // Book history Details
    Route::get('m1/books/{book_item}/book-history', [IssuedBookAPIController::class, 'booksHistoryDetail'])
        ->name('book-history');
    // Reserve Book
    Route::post('m1/books/{book_item}/reserve-book', [IssuedBookAPIController::class, 'reserveBook'])
        ->name('reserve-book');
    // Un-Reserve Book
    Route::post('m1/books/{book_item}/un-reserve-book', [IssuedBookAPIController::class, 'unReserveBook'])
        ->name('un-reserve-book');


    // Book Requests

    Route::resource('m1/book-requests', BookRequestAPIController::class);

    Route::get('m1/countries', [CountryAPIController::class, 'index'])->name('countries.index');
    // Change Password
    Route::put('m1/change-password', [MemberAPIController::class, 'changePassword']);
});
Route::post('m1/logout', [MemberAuthController::class, 'logout']);


Route::get('m1/membership-renewal-notification', [FirebaseController::class, 'membershipRenewal']);
Route::get('m1/bookreturn-dateArriving-notification', [FirebaseController::class, 'bookReturnDateArrivingNotification']);
Route::get('m1/penalty-notification', [FirebaseController::class, 'penaltyNotification']);
Route::get('m1/newbook-arrived-notification', [FirebaseController::class, 'newBookArrivedNotification']);
Route::get('m1/new-features-notifications', [FirebaseController::class, 'newFeaturesNotifications']);



Route::post('m1/member-login', [AuthAPIController::class, 'memberLogin']);
Route::post('m1/register-member', [MemberAuthController::class, 'register'])->name('register-member');

/** Password Reset API's For Member */
Route::post('m1/send-reset-member-password-link', [MemberAuthController::class, 'sendResetPasswordLink']);
Route::post('m1/reset-member-password', [MemberAuthController::class, 'resetPassword'])
    ->name('reset-member-password.index');
