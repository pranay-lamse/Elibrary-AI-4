<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\FileUploadController;
use App\Http\Controllers\API\B1\BookAPIController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BillDeskController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\MailController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\FirebaseController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PythonController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TestControllerBackend;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/download-usercard', [PdfController::class, 'generatePdf']);
Route::get('image-upload', [FileUploadController::class, 'imageUpload'])->name('image.upload');
Route::post('image-upload', [BookAPIController::class, 'addItem'])->name('image.upload.post');
Route::get('firebase-notification', [FirebaseController::class, 'sendNotificationrToUser']);

Route::get('/app', function () {
    return view('Simple');
});

Route::get('/', function () {
    return view('welcome');
});


Route::get('/clear-cache-test', function () {
    // Create a response with headers to instruct browsers to clear cache
    $response = response('Clear Cache', 200);

    // Add headers to prevent caching
    $response->header('Cache-Control', 'no-cache, no-store, must-revalidate');
    $response->header('Pragma', 'no-cache');
    $response->header('Expires', '0');

    return $response;
});

Route::get('/clear-cache', function () {

    Artisan::call('cache:clear');

    Artisan::call('route:clear');


    Artisan::call('view:clear');

    return "Cache is cleared.";
});

Route::get('/call-migrate', function () {

    Artisan::call('migrate');

    return "Migration ran successfully...";
});


Route::get('send-email', function () {
    $mailData = [
        "name" => "Membership Created.",
        "dob" => "12/12/1990"
    ];

    Mail::to("pranaylamsecode@gmail.com")->send(new TestEmail($mailData));

    dd("Mail Sent Successfully!");
});

Route::get('/order/create', [OrderController::class, 'orderCreate']);

Route::post('/submitAttendance', [AttendanceController::class, 'store']);

Route::post('/attendance/today-logins', [AttendanceController::class, 'getTodayLogins']);



Route::get('send-mail2', [MailController::class, 'index']);
/* Route::get('bill-desk-payment', [BillDeskController::class, 'index']);
Route::get('bill-desk-payment-create-order', [BillDeskController::class, 'index']); */


Route::get('/test-payment-init', [TestController::class, 'PaymentInit']);
Route::match(array('GET', 'POST'),'/test-payment/{price}/{checkbox1}/{checkbox2}/{checkbox3}', [TestController::class, 'index']);
Route::match(array('GET', 'POST'),'/test-payment-penalty/{price}', [TestController::class, 'PenaltyPriceIndex']);
Route::match(array('GET', 'POST'),'/test-payment2/{price}/{checkbox1}/{checkbox2}/{checkbox3}', [TestController::class, 'index2']);
Route::match(array('GET', 'POST'),'/test-payment3/{price}/{checkbox1}/{checkbox2}/{checkbox3}/{memberOne}/{memberTwo}/{memberThree}', [TestController::class, 'index3']);
Route::match(array('GET', 'POST'),'/test-payment-response', [TestController::class, 'PaymentResponse']);
Route::match(array('GET', 'POST'),'/test-payment-response-penalty', [TestController::class, 'PenaltyPriceResponse']);
Route::match(array('GET', 'POST'),'/test-payment-response2', [TestController::class, 'PaymentResponse2']);
Route::match(array('GET', 'POST'),'/test-payment-response3', [TestController::class, 'PaymentResponse3']);


/* logic for create admin offline  */
Route::match(array('GET', 'POST'),'/test-payment-backend/{price}/{checkbox1}/{checkbox2}/{checkbox3}', [TestControllerBackend::class, 'index']);
Route::match(array('GET', 'POST'),'/test-payment-backend-penalty/{price}', [TestControllerBackend::class, 'PenaltyPriceIndex']);
Route::match(array('GET', 'POST'),'/test-payment2-backend/{price}/{checkbox1}/{checkbox2}/{checkbox3}', [TestControllerBackend::class, 'index2']);
Route::match(array('GET', 'POST'),'/test-payment3-backend/{price}/{checkbox1}/{checkbox2}/{checkbox3}/{memberOne}/{memberTwo}/{memberThree}', [TestControllerBackend::class, 'index3']);
Route::match(array('GET', 'POST'),'/test-payment-backend-response', [TestControllerBackend::class, 'PaymentResponse']);
Route::match(array('GET', 'POST'),'/test-payment-backend-response-penalty', [TestControllerBackend::class, 'PenaltyPriceResponse']);
Route::match(array('GET', 'POST'),'/test-payment-backend-response2', [TestControllerBackend::class, 'PaymentResponse2']);
Route::match(array('GET', 'POST'),'/test-payment-backend-response3', [TestControllerBackend::class, 'PaymentResponse3']);


Route::match(array('GET', 'POST'),'/test-payment-backend-offline-response', [TestControllerBackend::class, 'PaymentResponseOffline']);
Route::match(array('GET', 'POST'),'/test-payment-backend-offline-response-penalty', [TestControllerBackend::class, 'PenaltyPriceResponseOffline']);
Route::match(array('GET', 'POST'),'/test-payment-backend-offline-response2', [TestControllerBackend::class, 'PaymentResponse2Offline']);
Route::match(array('GET', 'POST'),'/test-payment-backend-offline-response3', [TestControllerBackend::class, 'PaymentResponse3Offline']);


/* logic for create admin offline backend end  */

Route::get('/test-session-value', [TestController::class, 'PaymentResponseTestSession']);


Route::get('/create-order', [BillDeskController::class, 'createOrder']);

Route::get('/python-test', [PythonController::class, 'index']);

Route::get('public_uploads_ebooks/{pdf_name}', function (Request $request) {


    $pdf_name = $request->pdf_name;

    if (file_exists(public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.pdf'))) {

        $pdfPath =  public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.pdf') ;
       /*  return response()->file(public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.pdf'), ['content-type' => 'application/pdf']); */

            return response()->stream(
                function () use ($pdfPath) {
                    readfile($pdfPath);
                },
                200,
                ['Content-Type' => 'application/pdf']
            );
    } else {
       /*  return response()->file(public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.PDF'), ['content-type' => 'application/pdf']); */

       $pdfPath =  public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.pdf') ;

       return response()->stream(
        function () use ($pdfPath) {
            readfile($pdfPath);
        },
        200,
        ['Content-Type' => 'application/pdf']
    );
    }
});

Route::get('PDFPreview/{pdf_name}', function (Request $request) {


    $pdf_name = $request->pdf_name;

    if (file_exists(public_path('uploads/PDFPreview/' . $pdf_name))) {

        $pdfPath = public_path('uploads/PDFPreview/' . $pdf_name);

        return response()->stream(
            function () use ($pdfPath) {
                readfile($pdfPath);
            },
            200,
            ['Content-Type' => 'application/pdf']
        );


       /*  return response()->file(public_path('uploads/PDFPreview/' . $pdf_name), ['content-type' => 'application/pdf']); */
    } else {
        $pdfPath = public_path('uploads/PDFPreview/' . $pdf_name);

        return response()->stream(
            function () use ($pdfPath) {
                readfile($pdfPath);
            },
            200,
            ['Content-Type' => 'application/pdf']
        );
    }
});;

// Route::get('public_uploads_ebooks_epub/{pdf_name}', function (Request $request) {
//     $pdf_name = $request->pdf_name;
//     if (file_exists(public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.epub'))) {
//         return response()->file(public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.epub'), ['content-type' => 'application/epub']);
//     } else {
//         return response()->file(public_path('uploads/ebooks/' . $pdf_name . '/' . $pdf_name . '.epub'), ['content-type' => 'application/epub']);
//     }
// });

include "upgrade.php";
