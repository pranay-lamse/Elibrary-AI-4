<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use GuzzleHttp\Client;
use Exception;
use Log;
class OrderController extends Controller
{
   /*  public function orderCreate()
    {
        $headers = ["alg" => "HS256", "clientid" => 'uatnmcldv2'];

        $payload = [
            "mercid" => 'UATNMCLDV2',
            "orderid" => uniqid(),
            "amount" => "300.00",
            "order_date" => now()->toIso8601String(),
            "currency" => "356", // for INR
            "ru" => 'https://www.billdesk.io',
            "additional_info" => [
                "additional_info1" => 'q34324',
                "additional_info2" => 'dsaasaasd',
            ],
            "itemcode" => "DIRECT",
            "device" => [
                'init_channel' => 'internet',
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ],
        ];

        $secretKey = 'VgIxCnK1qwKnL1cVRplFObflO6i6QG3q';

        $jwt = JWT::encode($payload, $secretKey, 'HS256', null, $headers);

        $client = new Client();
        $url = 'https://pguat.billdesk.io/payments/ve1_2/orders/create';

        $response = $client->post($url, [
            'headers' => [
                'Content-Type' => 'application/jose',
                'accept' => 'application/jose',
                'BD-Traceid' => uniqid(), // you may want to generate a unique string for each request
                'BD-Timestamp' => now()->format('YmdHis'),
            ],
            'body' => $jwt,
        ]);

        $result = $response->getBody()->getContents();



        try {
            $decoded = JWT::decode($result, new Key('VgIxCnK1qwKnL1cVRplFObflO6i6QG3q', 'HS256'));

            $resultArray = (array) $decoded;

            if ($decoded->status == 'ACTIVE') {
                return response()->json($resultArray);
            } else {
                return response()->json(['error' => 'Response error'], 400);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    } */

    public function orderCreate()
    {


        // Corrected usage of env variables
        $headers = ["alg" => "HS256", "clientid" => 'VgIxCnK1qwKnL1cVRplFObflO6i6QG3q'];

        $payload = [
            "mercid" => 'UATNMCLDV2',
            "orderid" => uniqid(),
            "amount" => "300.00",
            "order_date" =>date('c'),
            "currency" => "356", // for INR
            "ru" => 'https://www.billdesk.io',
            "additional_info" => [
                "additional_info1" => 'q34324',
                "additional_info2" => 'dsaasaasd',
            ],
            "itemcode" => "DIRECT",
            "device" => [
                'init_channel' => 'internet',
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ],
        ];


        $secretKey = 'VgIxCnK1qwKnL1cVRplFObflO6i6QG3q';

        try {
            // Encode the payload
            $jwt = JWT::encode($payload, $secretKey, "HS256", null, $headers);



            // Initialize Guzzle HTTP client
            $client = new Client();
            $url = 'https://pguat.billdesk.io/payments/ve1_2/orders/create';

            // $url =curl_init('https://pguat.billdesk.io/payments/ve1_2/orders/create');

            // Send POST request
            $response = $client->post($url, [
                'headers' => [
                    'Content-Type' => 'application/jose',
                    'Accept' => 'application/jose',
                    'BD-Traceid' => uniqid(), // Generate a unique trace ID for each request
                    'BD-Timestamp' => now()->format('YmdHis'),
                ],
                'body' => $jwt,
                'verify' => true,
            ]);

            $result = $response->getBody()->getContents();

            try {
                // Decode the JWT response
                $decoded = JWT::decode($result, new Key($secretKey, 'HS256'));
                $resultArray = (array) $decoded;

                if (isset($decoded->status) && $decoded->status === 'ACTIVE') {
                    return response()->json($resultArray);
                } else {
                    return response()->json(['error' => 'Response error'], 400);
                }
            }

            catch (Exception $e) {
                \Log::error('JWT decode error: ' . $e->getMessage());
                return response()->json(['error' => 'JWT decode error: ' . $e->getMessage()], 500);
            }
        } catch (Exception $e) {
            \Log::error('Error: ' . $e->getMessage());
            return response()->json(['error' => 'Error: ' . $e->getMessage()], 500);
        }
    }

}
