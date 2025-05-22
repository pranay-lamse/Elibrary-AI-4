<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>{{ __('messages.pdf.customer_pdf') }}</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon.ico') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <!-- General CSS Files -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
    <style>
        * {
            font-family: DejaVu Sans, Arial, "Helvetica", Arial, "Liberation Sans", sans-serif;
        }

        @if(getLoginUserLanguage() !='ar')
            .fw-bold {
            font-weight: 500;
            color: #333;
        }

        @else
        .fw-bold {
            /*font-weight: 500;*/
            color: #333;
        }

        @endif

        .fw-light {
            font-weight: 500;
            color: grey;
        }
    </style>

</head>
<body>

<table width="100%">
    <tr>
        <td align="center" style="vertical-align: bottom">
            <h2 style="color: dodgerblue;">client : {{$customer->name}}</h2>
        </td>
    </tr>
</table>
<table width="100%" style="margin-top: 40px;">
    <tr style="vertical-align: top;">
        <td style="width: 50%;">
            <table width="95%" cellpadding="0">
                <tr style="background-color: dodgerblue;">
                    <td style="color: #fff;padding: 10px;font-size: 18px;">{{ __('messages.pdf.customer_info') }}</td>
                </tr>
                <tr style="background-color: #f5f3f3;">
                    <td style="padding: 10px;">
                        <p class="fw-bold">{{ __('messages.pdf.name') }}: <span
                                    class="fw-light">{{ isset($customer->name) ? $customer->name : 'N/A' }}</span>
                        </p>
                        <p class="fw-bold">{{ __('messages.pdf.phone') }}: <span
                                    class="fw-light">{{ isset($customer->phone) ? $customer->phone : 'N/A' }}</span>
                        </p>
                        <p class="fw-bold">{{ __('messages.pdf.address') }}: <span class="fw-light">
                                {{ isset($customer->address) ? $customer->address : '' }}
                                {{ isset($customer->city) ? $customer->city : '' }}
                                {{ isset($customer->country) ? $customer->country : '' }}
                            </span></p>
                        <p class="fw-bold">{{ __('messages.pdf.email') }}: <span
                                    class="fw-light">{{ isset($customer->email) ? $customer->email : ''}}</span>
                        </p>
                    </td>
                </tr>
            </table>
        </td>
        <td style="width: 50%;">
            <table width="95%" align="right">
                <tr style="background-color: dodgerblue;">
                    <td style="color: #fff;padding: 10px;font-size: 18px;">{{ __('messages.pdf.company_info') }}</td>
                </tr>
                <tr style="background-color: #f5f3f3;">
                    <td style="padding: 10px;">
                        <h3 style="color: #333;">{{ getSettingValue('company_name') }}</h3>
                        <p class="fw-bold">{{ __('messages.pdf.address') }}: <span
                                    class="fw-light">{{ getSettingValue('address') }}</span></p>
                        <p class="fw-bold">{{ __('messages.pdf.phone') }}: <span
                                    class="fw-light">{{ getSettingValue('phone') }}</span></p>
                        <p class="fw-bold">{{ __('messages.pdf.email') }}: <span
                                    class="fw-light">{{ getSettingValue('email') }}</span></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<table width="40%" align="right" cellspacing="0" cellpadding="10" style="margin-top: 40px;">
    <tbody style="background-color: #f5f3f3;">
    <tr>
        <td>{{ __('messages.pdf.total_sales') }}:</td>
        <td>{{ currencyAlignment($salesData['totalSale']) }}</td>
    </tr>
    <tr>
        <td>{{ __('messages.pdf.total_amount') }}:</td>
        <td>{{ currencyAlignment($salesData['totalAmount']) }}</td>
    </tr>
    <tr>
        <td>{{ __('messages.pdf.total_paid') }}:</td>
        <td>{{ currencyAlignment($salesData['totalPaid']) }}</td>
    </tr>
    <tr>
        <td>{{ __('messages.pdf.total_sale_due') }}:</td>
        <td>{{  currencyAlignment($salesData['totalSalesDue']) }}</td>
    </tr>
    </tbody>
</table>
<table width="100%" cellspacing="0" cellpadding="10" style="margin-top: 40px;">
    <thead>
    <tr style="background-color: dodgerblue;">
        <th style="color: #fff;">{{ __('messages.pdf.date') }}</th>
        <th style="color: #fff;">{{ __('messages.pdf.reference') }}</th>
        <th style="color: #fff;">{{ __('messages.pdf.paid_amount') }}</th>
        <th style="color: #fff;">{{ __('messages.pdf.due_amount') }}</th>
        <th style="color: #fff;">{{ __('messages.pdf.payment_status') }}</th>
    </tr>
    </thead>
    <tbody style="background-color: #f5f3f3;">
    @if(isset($customer->sales))
        @foreach($customer->sales  as $sale)
            <tr align="center" style="border-bottom: 2px solid darkgrey;!important;">
                <td>{{$sale->date->format('Y-m-d')}}</td>
                <td>{{$sale->reference_code}}</td>
                <td align="right">{{currencyAlignment($sale->payments->sum('amount'))}}</td>
                <td align="right">{{currencyAlignment(number_format((float)$sale->grand_total - $sale->payments->sum('amount')))}}</td>
                <td>
                    @if($sale->payment_status == \App\Models\Sale::PAID)
                        Paid
                    @elseif($sale->payment_status == \App\Models\Sale::UNPAID)
                        Unpaid
                    @elseif($sale->payment_status == \App\Models\Sale::PARTIAL_PAID)
                        Partial
                    @endif
                </td>
            </tr>
        @endforeach
    @endif
    </tbody>
</table>
</body>
</html>
