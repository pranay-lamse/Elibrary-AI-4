<?php

namespace App\Http\Controllers;
/* require 'vendor/autoload.php'; */
use Illuminate\Http\Request;
use BillDesk\BillDesk;
use BillDesk\APIs\Order;
use Dotenv\Dotenv;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Log;

class TestController extends Controller
{
    public function index(Request $request)
    {

        //Session::forget('paramsJson');

        $params = $request->all();

        $price = $request->price;



        $return_url = url('test-payment-response/' .
        '?id=' . $params['id'] . '&' .
        'plan_amount=' . $params['plan_amount'] . '&' .
        'memberTokenForPay=' . $params['memberTokenForPay'] . '&' .
        'libraryIdNew=' . $params['libraryIdNew']
    );





        if(empty($price))
        {
            echo 'Please added price';
        }
        $billDesk = BillDesk::init([
            "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
            "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
            "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
            "RETURN_URL" => $return_url,
            "MODE" => env('BILLDESK_MOOD'),
        ]);

        $order = new Order();
        $order_id = uniqid(); // Your Order ID Here
        $checkbox1 = $request->checkbox1 == 'true' ? 1 : 0;
        $checkbox2 = $request->checkbox2 == 'true' ? 1 : 0;
        $checkbox3 = $request->checkbox3 == 'true' ? 1 : 0;



        $orderResponse = $order->createOrder($order_id, $price, $checkbox1, $checkbox2, $checkbox3);



        if(env('BILLDESK_MOOD') == 'DEV') {
            //test
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";
        }elseif(env('BILLDESK_MOOD') == 'PROD'){
            //prod
            $BillDeskURL = "https://api.billdesk.com/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://pay.billdesk.com/jssdk/v1/dist";
        }else{
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";

        }




        $sdk_url = $BillDeskJSSDKURL; // Replace with your actual SDK URL

        $scripts = <<<HTML
        <script type="module" src="{$sdk_url}/billdesksdk/billdesksdk.esm.js"></script>
        <script nomodule="" src="{$sdk_url}/billdesksdk.js"></script>
        <link href="{$sdk_url}/billdesksdk/billdesksdk.css" rel="stylesheet">
        <script>
             document.addEventListener("DOMContentLoaded", function() {
                let viewportMetaTag = document.querySelector('meta[name="viewport"]');
                if (viewportMetaTag) {
                    viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.7');
                } else {
                    viewportMetaTag = document.createElement('meta');
                    viewportMetaTag.name = 'viewport';
                    viewportMetaTag.content = 'width=device-width, initial-scale=0.7';
                    document.head.appendChild(viewportMetaTag);
                }
            });
            var flow_config = {
                merchantId: "{$orderResponse['links'][1]['parameters']['mercid']}",
                bdOrderId: "{$orderResponse['links'][1]['parameters']['bdorderid']}",
                authToken: "{$orderResponse['links'][1]['headers']['authorization']}",
                returnUrl: "{$orderResponse['ru']}",
                crossButtonHandling: 'Y',
                childWindow: false,
            };

            var params = {}; // Add any additional params if required
            flow_config = Object.assign(flow_config, params);

            var responseHandler = function (txn) {
                if (txn.response) {
                    // Do Something..
                }
            };

            var config = {
                flowConfig: flow_config,
                flowType: "payments",
            };

            var ui_params = {}; // Add any UI params if required
            config = Object.assign(config, ui_params);

            window.onload = function () {
                window.loadBillDeskSdk(config);
            };
        </script>
        HTML;

        /* echo $fullpage_html; */
        echo $scripts;
    }



    public function index2(Request $request)
    {



        $params = $request->all();



        $mode = env('BILLDESK_MOOD'); // DEV or PROD

        $price = $request->price;

      $return_url = url('test-payment-response2?' .
        'id=' . $params['id'] . '&'.
        'plan_amount=' . $params['plan_amount'] . '&' .
        'memberTokenForPay=' . $params['memberTokenForPay'] . '&' .
        'subscription_id=' . $params['subscription_id']);

        if(empty($price))
        {
            echo 'Please added price';
        }
        $billDesk = BillDesk::init([
            "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
            "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
            "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
            "RETURN_URL" => $return_url,
            "MODE" => env('BILLDESK_MOOD'),
        ]);

        $order = new Order();
        $order_id = uniqid();

        $checkbox1 = $request->checkbox1 == 'true' ? 1 : 0;
        $checkbox2 = $request->checkbox2 == 'true' ? 1 : 0;
        $checkbox3 = $request->checkbox3 == 'true' ? 1 : 0;



        $orderResponse = $order->createOrder($order_id, $price, $checkbox1, $checkbox2, $checkbox3);





        if(env('BILLDESK_MOOD') == 'DEV') {
            //test
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";
        }elseif(env('BILLDESK_MOOD') == 'PROD'){
            //prod
            $BillDeskURL = "https://api.billdesk.com/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://pay.billdesk.com/jssdk/v1/dist";
        }else{
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";

        }




        $sdk_url = $BillDeskJSSDKURL; // Replace with your actual SDK URL

        $scripts = <<<HTML
        <script type="module" src="{$sdk_url}/billdesksdk/billdesksdk.esm.js"></script>
        <script nomodule="" src="{$sdk_url}/billdesksdk.js"></script>
        <link href="{$sdk_url}/billdesksdk/billdesksdk.css" rel="stylesheet">
        <script>
             document.addEventListener("DOMContentLoaded", function() {
                let viewportMetaTag = document.querySelector('meta[name="viewport"]');
                if (viewportMetaTag) {
                    viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.7');
                } else {
                    viewportMetaTag = document.createElement('meta');
                    viewportMetaTag.name = 'viewport';
                    viewportMetaTag.content = 'width=device-width, initial-scale=0.7';
                    document.head.appendChild(viewportMetaTag);
                }
            });
            var flow_config = {
                merchantId: "{$orderResponse['links'][1]['parameters']['mercid']}",
                bdOrderId: "{$orderResponse['links'][1]['parameters']['bdorderid']}",
                authToken: "{$orderResponse['links'][1]['headers']['authorization']}",
                returnUrl: "{$orderResponse['ru']}",
                crossButtonHandling: 'Y',
                childWindow: false,
            };

            var params = {}; // Add any additional params if required
            flow_config = Object.assign(flow_config, params);

            var responseHandler = function (txn) {
                if (txn.response) {
                    // Do Something..
                }
            };

            var config = {
                flowConfig: flow_config,
                flowType: "payments",
            };

            var ui_params = {}; // Add any UI params if required
            config = Object.assign(config, ui_params);

            window.onload = function () {
                window.loadBillDeskSdk(config);
            };
        </script>
        HTML;

        /* echo $fullpage_html; */
        echo $scripts;
    }

    public function index3(Request $request)
    {

        $params = $request->all();

        $price = $request->price;


      $return_url = url('test-payment-response3?' .
        'id=' . $params['id'] . '&' .
        'plan_amount=' . $params['plan_amount'] . '&' .
        'memberTokenForPay=' . $params['memberTokenForPay']);

        if(empty($price))
        {
            echo 'Please added price';
        }
        $billDesk = BillDesk::init([
            "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
            "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
            "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
            "RETURN_URL" => $return_url,
            "MODE" => env('BILLDESK_MOOD'),
        ]);

        $order = new Order();
        $order_id = uniqid(); // Your Order ID Here


        $checkbox1 = $request->checkbox1 == 'true' ? 1 : 0;
        $checkbox2 = $request->checkbox2 == 'true' ? 1 : 0;
        $checkbox3 = $request->checkbox3 == 'true' ? 1 : 0;

        $memberOne = $request->memberOne;
        $memberTwo = $request->memberTwo ;
        $memberThree = $request->memberThree;

        $orderResponse = $order->createOrder($order_id, $price, $checkbox1, $checkbox2, $checkbox3, $memberOne, $memberTwo, $memberThree);



        if(env('BILLDESK_MOOD') == 'DEV') {
            //test
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";
        }elseif(env('BILLDESK_MOOD') == 'PROD'){
            //prod
            $BillDeskURL = "https://api.billdesk.com/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://pay.billdesk.com/jssdk/v1/dist";
        }else{
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";

        }




        $sdk_url = $BillDeskJSSDKURL; // Replace with your actual SDK URL

        $scripts = <<<HTML
        <script type="module" src="{$sdk_url}/billdesksdk/billdesksdk.esm.js"></script>
        <script nomodule="" src="{$sdk_url}/billdesksdk.js"></script>
        <link href="{$sdk_url}/billdesksdk/billdesksdk.css" rel="stylesheet">
        <script>
             document.addEventListener("DOMContentLoaded", function() {
                let viewportMetaTag = document.querySelector('meta[name="viewport"]');
                if (viewportMetaTag) {
                    viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.7');
                } else {
                    viewportMetaTag = document.createElement('meta');
                    viewportMetaTag.name = 'viewport';
                    viewportMetaTag.content = 'width=device-width, initial-scale=0.7';
                    document.head.appendChild(viewportMetaTag);
                }
            });
            var flow_config = {
                merchantId: "{$orderResponse['links'][1]['parameters']['mercid']}",
                bdOrderId: "{$orderResponse['links'][1]['parameters']['bdorderid']}",
                authToken: "{$orderResponse['links'][1]['headers']['authorization']}",
                returnUrl: "{$orderResponse['ru']}",
                crossButtonHandling: 'Y',
                childWindow: false,
            };

            var params = {}; // Add any additional params if required
            flow_config = Object.assign(flow_config, params);

            var responseHandler = function (txn) {
                if (txn.response) {
                    // Do Something..
                }
            };

            var config = {
                flowConfig: flow_config,
                flowType: "payments",
            };

            var ui_params = {}; // Add any UI params if required
            config = Object.assign(config, ui_params);

            window.onload = function () {
                window.loadBillDeskSdk(config);
            };
        </script>
        HTML;

        /* echo $fullpage_html; */
        echo $scripts;
    }

    public function PenaltyPriceIndex(Request $request)
    {

        $params = $request->all();

        $price = $request->price;

        if($params['paymode'] == 'Offline'){



            $return_url2 = url('test-payment-backend-response-penalty?' .
            'price=' . $price

        );


            header('Location: ' . $return_url2);
    exit;

        }else{

        }


      $return_url = url('test-payment-response-penalty');

        if(empty($price))
        {
            echo 'Please added price';
        }
        $billDesk = BillDesk::init([
            "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
            "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
            "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
            "RETURN_URL" => $return_url,
            "MODE" => env('BILLDESK_MOOD'),
        ]);

        $order = new Order();
        $order_id = uniqid(); // Your Order ID Here


        $checkbox1 = $request->checkbox1 == 'true' ? 1 : 0;
        $checkbox2 = $request->checkbox2 == 'true' ? 1 : 0;
        $checkbox3 = $request->checkbox3 == 'true' ? 1 : 0;



        $orderResponse = $order->createOrder($order_id, $price, $checkbox1, $checkbox2, $checkbox3);



        if(env('BILLDESK_MOOD') == 'DEV') {
            //test
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";
        }elseif(env('BILLDESK_MOOD') == 'PROD'){
            //prod
            $BillDeskURL = "https://api.billdesk.com/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://pay.billdesk.com/jssdk/v1/dist";
        }else{
            $BillDeskURL = "https://uat1.billdesk.com/u2/payments/ve1_2/orders/create";
            $BillDeskJSSDKURL = "https://uat1.billdesk.com/merchant-uat/sdk/dist";

        }




        $sdk_url = $BillDeskJSSDKURL; // Replace with your actual SDK URL

        $scripts = <<<HTML
        <script type="module" src="{$sdk_url}/billdesksdk/billdesksdk.esm.js"></script>
        <script nomodule="" src="{$sdk_url}/billdesksdk.js"></script>
        <link href="{$sdk_url}/billdesksdk/billdesksdk.css" rel="stylesheet">
        <script>
             document.addEventListener("DOMContentLoaded", function() {
                let viewportMetaTag = document.querySelector('meta[name="viewport"]');
                if (viewportMetaTag) {
                    viewportMetaTag.setAttribute('content', 'width=device-width, initial-scale=0.7');
                } else {
                    viewportMetaTag = document.createElement('meta');
                    viewportMetaTag.name = 'viewport';
                    viewportMetaTag.content = 'width=device-width, initial-scale=0.7';
                    document.head.appendChild(viewportMetaTag);
                }
            });
            var flow_config = {
                merchantId: "{$orderResponse['links'][1]['parameters']['mercid']}",
                bdOrderId: "{$orderResponse['links'][1]['parameters']['bdorderid']}",
                authToken: "{$orderResponse['links'][1]['headers']['authorization']}",
                returnUrl: "{$orderResponse['ru']}",
                crossButtonHandling: 'Y',
                childWindow: false,
            };

            var params = {}; // Add any additional params if required
            flow_config = Object.assign(flow_config, params);

            var responseHandler = function (txn) {
                if (txn.response) {
                    // Do Something..
                }
            };

            var config = {
                flowConfig: flow_config,
                flowType: "payments",
            };

            var ui_params = {}; // Add any UI params if required
            config = Object.assign(config, ui_params);

            window.onload = function () {
                window.loadBillDeskSdk(config);
            };
        </script>
        HTML;

        /* echo $fullpage_html; */
        echo $scripts;

    }



    public function PaymentInit()
    {
        return view('billdesk');
    }


    public function PaymentResponse(Request $request)
{

    $responseData = $request->all();




    $billDesk = BillDesk::init([
        "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
        "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
        "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
        "RETURN_URL" => url('test-payment-response'),
        "MODE" => env('BILLDESK_MOOD'),
    ]);
    // Assuming the Order class has a method to validate the order
    $order = new Order();
    $orderResponse = $order->validateOrder($responseData);

    if($orderResponse['payment_method_type'] ==  'upi')
    {
        $response_id =  $orderResponse['bank_ref_no'];

    }else{
        $response_id =  $orderResponse['transactionid'];

    }

    if (!empty($orderResponse['orderid'])) {
    $responseData['checkbox1'] =  $orderResponse['additional_info']['additional_info2'];
    $responseData['checkbox2'] = $orderResponse['additional_info']['additional_info3'];
    $responseData['checkbox3'] = $orderResponse['additional_info']['additional_info4'];
    $responseData['payment_response'] = $response_id;
    $responseData['payment_method_type'] = $orderResponse['payment_method_type'];


        $url = url('api/v1/create-membership-payment-session/'.$request->id);

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $request->memberTokenForPay, // Add the token in the headers

            'Content-Type' => 'application/json', // Set content type as JSON
        ])->post($url, $responseData); // Use the parameters from the request body



        return redirect(url('/#/lms/current-plan'));


    } else {
        return redirect(url('/#/lms/current-plan'));

    }

}

public function PenaltyPriceResponse(Request $request)
{

     $responseData = $request->all();


            $billDesk = BillDesk::init([
                "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
                "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
                "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
                "RETURN_URL" => url('test-payment-response'),
                "MODE" => env('BILLDESK_MOOD'),
            ]);
            // Assuming the Order class has a method to validate the order
            $order = new Order();
            $orderResponse = $order->validateOrder($responseData);




            //test

            if($orderResponse['payment_method_type'] ==  'upi')
    {
        $response_id =  $orderResponse['bank_ref_no'];

    }else{
        $response_id =  $orderResponse['transactionid'];

    }

    $responseData['payment_method_type'] = $orderResponse['payment_method_type'];





            if (!empty($orderResponse['orderid'])) {

                return redirect(url('/#/admin/pos/issued-books'));


            } else {
                return redirect(url('/#/admin/pos/issued-books'));

            }

}

public function PaymentResponse2(Request $request)
{


             $responseData = $request->all();


            $billDesk = BillDesk::init([
                "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
                "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
                "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
                "RETURN_URL" => url('test-payment-response'),
                "MODE" => env('BILLDESK_MOOD'),
            ]);
            // Assuming the Order class has a method to validate the order
            $order = new Order();
            $orderResponse = $order->validateOrder($responseData);



            if($orderResponse['payment_method_type'] ==  'upi')
            {
                $response_id =  $orderResponse['bank_ref_no'];

            }else{
                $response_id =  $orderResponse['transactionid'];

            }



            if (!empty($orderResponse['orderid'])) {
                $responseData['checkbox1'] =  $orderResponse['additional_info']['additional_info2'];
            $responseData['checkbox2'] = $orderResponse['additional_info']['additional_info3'];
            $responseData['checkbox3'] = $orderResponse['additional_info']['additional_info4'];
            $responseData['payment_response'] = $response_id;
            $responseData['payment_method_type'] = $orderResponse['payment_method_type'];

                $url = url('api/v1/create-membership-payment-session4/'.$request->id);

                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $request->memberTokenForPay, // Add the token in the headers

                    'Content-Type' => 'application/json', // Set content type as JSON
                ])->post($url, $responseData); // Use the parameters from the request body



                return redirect(url('/#/lms/current-plan'));


            } else {
                return redirect(url('/#/lms/current-plan'));

            }
}

public function PaymentResponse3(Request $request)
{


             $responseData = $request->all();


            $billDesk = BillDesk::init([
                "MERCHANT_ID" => env('BILLDESK_MERCHANT_ID'),
                "CLIENT_ID" => env('BILLDESK_CLIENT_ID'),
                "SECRET_KEY" => env('BILLDESK_SECRET_KEY'),
                "RETURN_URL" => url('test-payment-response'),
                "MODE" => env('BILLDESK_MOOD'),
            ]);
            // Assuming the Order class has a method to validate the order
            $order = new Order();
            $orderResponse = $order->validateOrder($responseData);


            if($orderResponse['payment_method_type'] ==  'upi')
    {
        $response_id =  $orderResponse['bank_ref_no'];

    }else{
        $response_id =  $orderResponse['transactionid'];

    }


            if (!empty($orderResponse['orderid'])) {
            $responseData['checkbox1'] =  $orderResponse['additional_info']['additional_info2'];
            $responseData['checkbox2'] = $orderResponse['additional_info']['additional_info3'];
            $responseData['checkbox3'] = $orderResponse['additional_info']['additional_info4'];
            $responseData['payment_response'] = $response_id;
            $responseData['payment_method_type'] = $orderResponse['payment_method_type'];


            $responseData['memberOne'] =  $orderResponse['additional_info']['additional_info5'];
            $responseData['memberTwo'] = $orderResponse['additional_info']['additional_info6'];
            $responseData['memberThree'] = $orderResponse['additional_info']['additional_info7'];

                $url = url('api/v1/create-membership-payment-session3/'.$request->id);

                $response = Http::withHeaders([
                    'Authorization' => 'Bearer ' . $request->memberTokenForPay, // Add the token in the headers

                    'Content-Type' => 'application/json', // Set content type as JSON
                ])->post($url, $responseData); // Use the parameters from the request body



                return redirect(url('/#/lms/current-plan'));


            } else {
                return redirect(url('/#/lms/current-plan'));

            }
}

    public function PaymentResponseTestSession()
    {

        $paramsJson = Session::get('paramsJson');
        $params = json_decode($paramsJson, true);
        $request = (object)$params;
        print_r($request);die;




    }



}
