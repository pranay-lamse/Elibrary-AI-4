<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class BillDeskService
{


    private $clientId;
    private $secretKey;
    private $verifyKey;
    private $apiUrl;

    public function __construct()
    {
        $this->clientId = env('BILLDESK_CLIENT_ID');
        $this->secretKey = env('BILLDESK_SECRET_KEY');
        $this->verifyKey = env('BILLDESK_VERIFY_KEY');
        $this->apiUrl = env('BILLDESK_API_URL');
    }


    public function createOrder()
    {
        $headers = [
            "alg" => "HS256",
            "clientid" => $this->clientId
        ];

        $payload = [
            "mercid" => 'UATNMCLDV2',
            "orderid" => uniqid(),
            "amount" => "300.00",
            "order_date" => now()->format(DATE_W3C),
            "currency" => "356",
            "ru" => 'Return Url',
            "additional_info" => [
                "additional_info1" => 'q34324',
                "additional_info2" => 'dsaasaasd',
            ],
            "itemcode" => "DIRECT",
            "device" => [
                'init_channel' => 'internet',
                'ip' => request()->ip(),
                'user_agent' => request()->userAgent()
            ]
        ];

        $jwtPayload = JWT::encode($payload, $this->secretKey, 'HS256', null, $headers);

        $response = Http::withHeaders([
            "Content-Type" => "application/jose",
            "accept" => "application/jose",
            "BD-Traceid" => Str::random(16),
            "BD-Timestamp" => now()->format('YmdHis')
        ])->post($this->apiUrl, $jwtPayload);

        return $this->handleResponse($response->body());
    }

    private function handleResponse($response)
    {
        try {
            $decodedResponse = JWT::decode($response, new Key($this->verifyKey, 'HS256'));
            $responseArray = (array) $decodedResponse;

            if ($decodedResponse->status == 'ACTIVE') {
                return $responseArray;
            } else {
                return "Response error";
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
