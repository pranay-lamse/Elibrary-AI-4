<?php

use App\Models\Book;
use App\Models\Book2;
use App\Models\Book3;
use App\Models\BookSeries;
use App\Traits\ImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PdfController;
use App\Repositories\BookSeriesRepository;
use App\Http\Controllers\MemberExcelImport;
use App\Http\Controllers\DeleteMemberShipPlan;
use App\Http\Controllers\API\AuthAPIController;
use App\Http\Controllers\Marc21ParserController;
use App\Http\Controllers\API\B1\TagAPIController;
use App\Http\Controllers\API\B1\BookAPIController;
use App\Http\Requests\API\UpdateBookSeriesRequest;
use App\Http\Controllers\API\B1\GenreAPIController;
use App\Http\Controllers\API\B1\AuthorAPIController;
use App\Http\Controllers\API\B1\CommonAPIController;
use App\Http\Controllers\API\B1\MemberAPIController;
use App\Http\Controllers\API\B1\AccountAPIController;
use App\Http\Controllers\API\B1\CountryAPIController;
use App\Http\Controllers\API\B1\PenaltyAPIController;
use App\Http\Controllers\API\B1\BookItemAPIController;
use App\Http\Controllers\API\B1\PublisherAPIController;
use App\Http\Controllers\API\B1\BookSeriesAPIController;
use App\Http\Controllers\API\B1\IssuedBookAPIController;
use App\Http\Controllers\API\B1\PermissionAPIController;
use App\Http\Controllers\API\B1\SeriesBookAPIController;
use App\Http\Controllers\API\B1\AboutUsCardAPIController;
use App\Http\Controllers\API\B1\BookRequestAPIController;
use App\Http\Controllers\API\B1\TestimonialAPIController;
use App\Http\Controllers\API\B1\TransactionAPIController;
use App\Http\Controllers\API\B1\AuthAPIElibraryController;
use App\Http\Controllers\API\B1\BookLanguageAPIController;
use App\Http\Controllers\API\B1\RoleAPIElibraryController;
use App\Http\Controllers\API\B1\SubscriptionAPIController;
use App\Http\Controllers\API\B1\UserAPIElibraryController;
use App\Http\Controllers\API\B1\MembershipPlanAPIController;
use App\Http\Controllers\API\B1\SettingAPIElibraryController;
use App\Http\Controllers\API\B1\DashboardAPIControllerElibrary;
use App\Http\Controllers\API\B1\HomepageSettingAPIElibraryController;
use App\Http\Controllers\API\V1\TransactionAPIController as V1TransactionAPIController;

/**
 * user Auth Middleware
 */
Route::get('b1/transactions-without-token', [V1TransactionAPIController::class, 'getAll']);
Route::post('b1/pdf-upload', [BookAPIController::class, 'addBook']);
Route::resource('b1/publishers', PublisherAPIController::class);
Route::get('b1/get-book-details', [BookAPIController::class, 'getBookDetails']);
Route::resource('b1/book-languages', BookLanguageAPIController::class);
Route::middleware(['auth:sanctum', 'user.auth'])->group(function () {
    // Genre Routes
    // Route::middleware('permission:manage_genres')->group(function () {
    //     Route::resource('b1/genres', GenreAPIController::class);
    //     Route::post('b1/genres/{genre}/update-genres-flag', [GenreAPIController::class, 'updateGenresFlag'])
    //         ->name('genres.update-genres-flag');
    //     Route::get('b1/offline-subscriptions', [SubscriptionAPIController::class, 'getOfflineSubscriptions']);
    //     Route::post('b1/offline-subscription-status/{id}', [SubscriptionAPIController::class, 'changeStatus']);
    // });
    Route::resource('b1/genres', GenreAPIController::class);
    Route::get('b1/library-details', [AuthAPIController::class, 'getLibraryDetails']);

    Route::post('b1/genres/{genre}/update-genres-flag', [GenreAPIController::class, 'updateGenresFlag'])
        ->name('genres.update-genres-flag');
    Route::get('b1/offline-subscriptions', [SubscriptionAPIController::class, 'getOfflineSubscriptions']);
    Route::post('b1/offline-subscription-status/{id}', [SubscriptionAPIController::class, 'changeStatus']);

    // Author Routes
    // Route::middleware('permission:manage_authors')->group(function () {
    //     Route::resource('b1/authors', AuthorAPIController::class);
    // });

    Route::resource('b1/authors', AuthorAPIController::class);

    // Publishers Routes
    // Route::middleware('permission:manage_publishers')->group(function () {
    //     Route::resource('b1/publishers', PublisherAPIController::class);
    // });

    // Route::resource('b1/publishers', PublisherAPIController::class);

    // Tags Routes
    // Route::middleware('permission:manage_tags')->group(function () {
    //     Route::resource('b1/tags', TagAPIController::class);
    // });
    Route::resource('b1/tags', TagAPIController::class);
    // Book Language Routes
    // Route::middleware('permission:manage_book_languages')->group(function () {
    //     Route::resource('b1/book-languages', BookLanguageAPIController::class);
    // });
    // Route::resource('b1/book-languages', BookLanguageAPIController::class);
    // Route::middleware('permission:manage_roles')->group(function () {
    //     // Roles
    //     Route::resource('b1/roles', RoleAPIElibraryController::class);
    //     Route::post('b1/roles/{role}', [RoleAPIElibraryController::class, 'update']);

    //     // Permissions
    //     Route::resource('b1/permissions', PermissionAPIController::class);
    // });

    Route::resource('b1/roles', RoleAPIElibraryController::class);
    Route::post('b1/roles/{role}', [RoleAPIElibraryController::class, 'update']);

    // Permissions
    Route::resource('b1/permissions', PermissionAPIController::class);

    Route::resource('b1/books', BookAPIController::class);

    Route::get('b1/upcomming-books', [BookAPIController::class, 'upcommingBooks']);
    Route::post('b1/books/{book}', [BookAPIController::class, 'update']);
    Route::post('b1/books/{book}/remove-image', [BookAPIController::class, 'removeImage']);
    Route::post('b1/books/{book}/update-books-flag', [BookAPIController::class, 'updateBookFlag'])
        ->name('books.update-books-flag');

    // add book items
    Route::post('b1/books/{book}/items', [BookAPIController::class, 'addItem'])->name('books.add-items');
    Route::delete('b1/book-items/{book_item}', [BookItemAPIController::class, 'destroy']);
    // Get available books
    Route::get('b1/books/{book}/available-books', [BookItemAPIController::class, 'availableBooks'])
        ->name('books.available-books');

    // Get available booksbybookItem
    Route::get('b1/books/available-books-by-bookitem-id/{bookId}/{memberId}', [BookItemAPIController::class, 'availableBooksByBookItem']);

    Route::get('b1/books/available-books-by-bookitem-id/{bookId}', [BookItemAPIController::class, 'availableBooksByBookItemWithoutMember']);

    // Update book status
    Route::put('b1/books/{book_item}/update-book-status', [BookItemAPIController::class, 'updateBookStatus'])
        ->name('books.update-book-status');

    // import/export books
    Route::get('b1/books-export', [BookAPIController::class, 'exportBooks']);
    Route::get('b1/members-export', [MemberAPIController::class, 'exportMembers']);
    Route::get('b1/popular-books-export', [BookAPIController::class, 'exportPopularBooks']);
    Route::get('b1/popular-books-by-genre-export', [BookAPIController::class, 'exportPopularBooksByGenre']);
    Route::post('b1/books-import', [BookAPIController::class, 'importBooks']);
    Route::post('b1/member-import', [MemberAPIController::class, 'importMembers']);


    // Book API Routes
    // Route::middleware('permission:manage_books')->group(function () {
    //     Route::resource('b1/books', BookAPIController::class);
    //     Route::post('b1/books/{book}', [BookAPIController::class, 'update']);
    //     Route::post('b1/books/{book}/remove-image', [BookAPIController::class, 'removeImage']);
    //     Route::post('b1/books/{book}/update-books-flag', [BookAPIController::class, 'updateBookFlag'])
    //         ->name('books.update-books-flag');

    //     // add book items
    //     Route::post('b1/books/{book}/items', [BookAPIController::class, 'addItem'])->name('books.add-items');
    //     Route::delete('book-items/{book_item}', [BookItemAPIController::class, 'destroy']);
    //     // Get available books
    //     Route::get('b1/books/{book}/available-books', [BookItemAPIController::class, 'availableBooks'])
    //         ->name('books.available-books');

    //     // Update book status
    //     Route::put('b1/books/{book_item}/update-book-status', [BookItemAPIController::class, 'updateBookStatus'])
    //         ->name('books.update-book-status');

    //     // import/export books
    //     Route::get('b1/books-export', [BookAPIController::class, 'exportBooks']);
    //     Route::post('b1/books-import', [BookAPIController::class, 'importBooks']);
    // });
    // Get book details from third-party api


    // Book search
    Route::get('b1/search-books', [BookItemAPIController::class, 'searchBooks'])->name('books.search-books');

    // get e-books
    Route::get('b1/e-books', [BookAPIController::class, 'getEBooks'])->name('e-books');

    Route::get('b1/e-books2', [BookAPIController::class, 'getEBooks2']);

    Route::get('b1/subscribe-ebook', [BookAPIController::class, 'show2']);



    // Users
    // Route::middleware('permission:manage_users')->group(function () {
    //     Route::resource('b1/users', UserAPIElibraryController::class);
    //     Route::post('b1/users/{user}', [UserAPIElibraryController::class, 'update']);
    //     Route::post('b1/users/{user}/remove-image', [UserAPIElibraryController::class, 'removeImage'])
    //         ->name('users.remove-image');
    //     Route::get('b1/users/{user}/update-status', [UserAPIElibraryController::class, 'updateStatus'])
    //         ->name('users.update-status');
    // });
    Route::resource('b1/users', UserAPIElibraryController::class);
    Route::post('b1/users/{user}', [UserAPIElibraryController::class, 'update']);
    Route::post('b1/users/{user}/remove-image', [UserAPIElibraryController::class, 'removeImage'])
        ->name('users.remove-image');
    Route::get('b1/users/{user}/update-status', [UserAPIElibraryController::class, 'updateStatus'])
        ->name('users.update-status');

    // get logged in user details
    Route::get('b1/user-details', [UserAPIElibraryController::class, 'getLoggedInUserDetails'])->name('users.user-details');

    // update logged in user profile
    Route::post('b1/update-user-profile', [UserAPIElibraryController::class, 'updateUserProfile'])
        ->name('users.update-user-profile');

    // Members
    // Route::middleware('permission:manage_members')->group(function () {
    //     Route::delete('members/{member}', [MemberAPIController::class, 'destroy'])->name('members.destroy');
    // });

    Route::delete('b1/members/{member}', [MemberAPIController::class, 'destroy'])->name('members.destroy');
    Route::resource('b1/members', MemberAPIController::class)->except(['destroy']);
    Route::post('b1/members/{member}', [MemberAPIController::class, 'update']);

    Route::get('b1/members/{member}/update-status', [MemberAPIController::class, 'updateStatus'])
        ->name('members.update-status');

    Route::get('b1/members/{member}/update-book-status', [MemberAPIController::class, 'updateBookStatus'])
        ->name('members.update-book-status');

    Route::get('b1/members/{member}/update-ebook-status', [MemberAPIController::class, 'updateEbookStatus'])
        ->name('members.update-ebook-status');

    Route::get('b1/members/{member}/update-library-status', [MemberAPIController::class, 'updateLibraryStatus'])
        ->name('members.update-library-status');
    Route::post('b1/members/{member}/remove-image', [MemberAPIController::class, 'removeImage'])
        ->name('members.remove-image');

    //send re-activation mail
    Route::post('b1/members/{member}/re-activation', [MemberAPIController::class, 'sendReActivationMail']);

    // Route::middleware('permission:manage_book_series')->group(function () {
    //     // book series routes
    //     Route::resource('b1/book-series', BookSeriesAPIController::class);
    //     Route::post('b1/book-series/{book_series}', [BookSeriesAPIController::class, 'update']);

    //     // series book routes
    //     Route::resource('b1/series-books', SeriesBookAPIController::class);
    //     Route::post('b1/series-books/{series_book}', [SeriesBookAPIController::class, 'update']);
    // });

    Route::post('b1/book-series/{id}', function (BookSeries $bookSeries, Request $request, BookSeriesRepository $bookSeriesRepository) {
        if ($request->id) {
            if ($request->file('cover')) {
                $input['cover'] = ImageTrait::makeImage($request->file('cover'), 'series');
            } else {
                $input['cover'] = $request->cover;
            }

            $bookSeries = BookSeries::with('seriesItems.book')->findOrFail($request->id);

            $input = $request->all();
            $bookSeries = $bookSeriesRepository->update($input, $bookSeries->id);

            return response()->json([
                "data" => $bookSeries,
                "message" => "Book Series Updated Successfully."
            ]);
        }
    });
    // Route::resource('b1/book-series', BookSeriesAPIController::class);
    // Route::post('b1/book-series/{book_series}', [BookSeriesAPIController::class, 'update']);

    // series book routes
    Route::resource('b1/series-books', SeriesBookAPIController::class);
    Route::post('b1/series-books/{series_book}', [SeriesBookAPIController::class, 'update']);

    Route::middleware('permission:manage_finance')->group(function () {
        // Membership Plans
        Route::resource('b1/membership-plans', MembershipPlanAPIController::class);
    });

    Route::get('b1/membership-plans', [MembershipPlanAPIController::class, 'index'])->name('membership-plans.index');
    Route::post('b1/membership-plans', [MembershipPlanAPIController::class, 'store'])->name('membership-plans.store');
    Route::delete("b1/membership-plans/{id}", [DeleteMemberShipPlan::class, 'deletePlan']);
    Route::delete("b1/membership-plans-subscription/{id}", [DeleteMemberShipPlan::class, 'deleteMemberSubscriptionPlan']);
    /* Route::match(array('GET', 'POST'),'b1/membership-plans', [MembershipPlanAPIController::class, 'index'])->name('membership-plans.index');  */



    // Reserve Book
    Route::post('b1/books/{book_item}/reserve-book', [IssuedBookAPIController::class, 'reserveBook'])
        ->name('reserve-book');
    // Un-Reserve Book
    Route::post('b1/books/{book_item}/un-reserve-book', [IssuedBookAPIController::class, 'unReserveBook'])
        ->name('un-reserve-book');

    // Update issued book status
    Route::put('b1/books/{book_item}/update-issued-book-status', [IssuedBookAPIController::class, 'updateIssuedBookStatus'])
        ->name('update-issued-book-status');

    // books history
    Route::get(
        'b1/members/{member}/books-history',
        [IssuedBookAPIController::class, 'memberBooksHistory']
    )->name('members.book-history');

    // Route::middleware('permission:issue_books')->group(function () {
    //     // Issue Book
    //     Route::post('b1/books/{book_item}/issue-book', [IssuedBookAPIController::class, 'issueBook'])
    //         ->name('issue-book');
    //     // Return Book
    //     Route::post('b1/books/{book_item}/return-book', [IssuedBookAPIController::class, 'returnBook'])
    //         ->name('return-book');

    //     // get books history for admin users
    //     Route::get('b1/books-history', [IssuedBookAPIController::class, 'index'])->name('books-history');
    //     Route::get('b1/issued-books/{issued_book}', [IssuedBookAPIController::class, 'show'])->name('issued-book.show');
    //     Route::delete('books-history/{id}', [IssuedBookAPIController::class, 'destroy']);

    //     Route::get('b1/export-books-circulation', [IssuedBookAPIController::class, 'exportBooks']);

    //     Route::get('b1/get-subscriptions', [SubscriptionAPIController::class, 'index']);
    //     Route::post('b1/subscriptions/{id}', [SubscriptionAPIController::class, 'update']);
    //     Route::get('b1/get-transactions', [TransactionAPIController::class, 'index']);
    // });

    Route::post('b1/books/{book_item}/issue-book', [IssuedBookAPIController::class, 'issueBook'])
        ->name('issue-book');
    // Return Book
    Route::post('b1/books/{book_item}/return-book', [IssuedBookAPIController::class, 'returnBook'])
        ->name('return-book');

    Route::post('b1/books/{book_item}/re-issue-book', [IssuedBookAPIController::class, 'reIssueBook'])
        ->name('re-issue-book');

    // get books history for admin users
    Route::get('b1/books-history', [IssuedBookAPIController::class, 'index'])->name('books-history');
    Route::get('b1/issued-books/{issued_book}', [IssuedBookAPIController::class, 'show'])->name('issued-book.show');
    Route::delete('b1/books-history/{id}', [IssuedBookAPIController::class, 'destroy']);

    Route::get('b1/export-books-circulation', [IssuedBookAPIController::class, 'exportBooks']);

    Route::get('b1/get-subscriptions', [SubscriptionAPIController::class, 'index']);
    Route::post('b1/subscriptions/{id}', [SubscriptionAPIController::class, 'update']);
    Route::get('b1/get-transactions', [TransactionAPIController::class, 'index']);

    /** Get App Config */
    Route::get('b1/config', [AuthAPIElibraryController::class, 'getAppConfig'])->name('config');

    // Route::middleware('permission:manage_settings')->group(function () {
    //     // Settings
    //     Route::resource('b1/settings', SettingAPIElibraryController::class);
    //     Route::post('b1/settings/{setting}', [SettingAPIElibraryController::class, 'update']);
    //     // Upload library logo
    //     Route::post('b1/upload-logo', [SettingAPIElibraryController::class, 'uploadLogo'])->name('upload-logo');
    //     Route::post('b1/upload-favicon', [SettingAPIElibraryController::class, 'uploadFaviconIcon'])->name('upload-favicon');

    //     /** Homepage settings */
    //     Route::get('b1/homepage-settings', [HomepageSettingAPIElibraryController::class, 'index'])->name('homepage-settings.index');
    //     Route::put('b1/homepage-settings', [HomepageSettingAPIElibraryController::class, 'bulkUpdate'])->name('homepage-settings.update');

    //     // Manage Testimonials
    //     Route::resource('b1/testimonials', TestimonialAPIController::class);
    //     Route::post('b1/testimonials/{testimonial}', [TestimonialAPIController::class, 'update'])->name('testimonials.update');
    // });

    Route::resource('b1/settings', SettingAPIElibraryController::class);
    Route::post('b1/settings/{setting}', [SettingAPIElibraryController::class, 'update']);
    // Upload library logo
    Route::post('b1/upload-logo', [SettingAPIElibraryController::class, 'uploadLogo'])->name('upload-logo');
    Route::post('b1/upload-favicon', [SettingAPIElibraryController::class, 'uploadFaviconIcon'])->name('upload-favicon');

    /** Homepage settings */
    Route::get('b1/homepage-settings', [HomepageSettingAPIElibraryController::class, 'index'])->name('homepage-settings.index');
    Route::put('b1/homepage-settings', [HomepageSettingAPIElibraryController::class, 'bulkUpdate'])->name('homepage-settings.update');

    // Manage Testimonials
    Route::resource('b1/testimonials', TestimonialAPIController::class);
    Route::post('b1/testimonials/{testimonial}', [TestimonialAPIController::class, 'update'])->name('testimonials.update');

    // Route::middleware('permission:manage_book_requests')->group(function () {
    //     Route::get('b1/book-requests', [BookRequestAPIController::class, 'index'])
    //         ->name('book-requests.index');

    //     Route::put('b1/book-requests/{book_request}/status/{status}', [BookRequestAPIController::class, 'updateStatus'])
    //         ->name('book-requests.update-status');
    // });

    Route::get('b1/book-requests', [BookRequestAPIController::class, 'index'])
        ->name('book-requests.index');

    Route::put('b1/book-requests/{book_request}/status/{status}', [BookRequestAPIController::class, 'updateStatus'])
        ->name('book-requests.update-status');

    // Countries
    Route::get('b1/countries', [CountryAPIController::class, 'index'])->name('countries.index');

    // Currencies
    Route::get('b1/currencies', [CommonAPIController::class, 'currencies'])->name('currencies');
    Route::get('b1/dashboard-details', [DashboardAPIControllerElibrary::class, 'dashboardDetails'])->name('dashboard-details');

    /** Members issued/reserved books count */
    Route::get('b1/members/{member}/status/{status}', [MemberAPIController::class, 'isAllowToReserveOrIssueBook'])
        ->name('members.check-books-limit');
    /** Penalties */
    // Route::middleware('permission:manage_penalties')->group(function () {
    //     Route::get('b1/penalties', [PenaltyAPIController::class, 'index']);
    // });
    Route::get('b1/penalties', [PenaltyAPIController::class, 'index']);
    Route::get('b1/transactions', [V1TransactionAPIController::class, 'getAll']);
    Route::get('b1/books/{book_item_id}/is-due', [PenaltyAPIController::class, 'checkIsBookItemDue']);

    Route::put('b1/change-password', [UserAPIElibraryController::class, 'changePassword']);

    Route::post('b1/book-history/{issued_book_id}/send-book-due-mail', [PenaltyAPIController::class, 'sendBookDueMail']);

    Route::resource('b1/about-us-cards', AboutUsCardAPIController::class);
    Route::post('b1/about-us-cards/{about_us_card}/update-status', [AboutUsCardAPIController::class, 'updateStatus'])
        ->name('about-us-cards.update-status');
    Route::post('b1/xml-import', [Marc21ParserController::class, "parseAndStore"]);
});

Route::get('b1/activate-user', [AuthAPIElibraryController::class, 'verifyAccount'])->name('activate-user');

/** Password Reset API's For User */
Route::post('b1/send-reset-password-link', [AccountAPIController::class, 'sendResetPasswordLink']);
Route::post('b1/reset-password', [AccountAPIController::class, 'resetPassword'])->name('reset-password');
Route::get('b1/settings', [SettingAPIElibraryController::class, 'index'])->name('settings.index');

Route::get("b1/testing/{id}", function (Request $request) {
    $id = $request->id;
    $bookIds = DB::table("book_genres")->where('genre_id', $id)->pluck('book_id')->toArray();
    $books = Book::whereIn('id', $bookIds)->select("name", "isbn")->get();

    return response()->json([
        'data' => $books,
        'count' => count($books),
        "genreId" => $bookIds
    ]);
});

Route::resource('b1/book-series', BookSeriesAPIController::class);
Route::post('b1/book-series/{book_series}', [BookSeriesAPIController::class, 'update']);
