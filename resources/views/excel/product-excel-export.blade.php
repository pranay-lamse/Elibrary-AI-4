<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "//www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Products Excel Export</title>
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon.ico') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- Fonts -->
    <!-- General CSS Files -->
    <link href="{{ asset('assets/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
</head>
<body>
<table width="100%" cellspacing="0" cellpadding="10" style="margin-top: 40px;">
    <thead>
    <tr style="background-color: dodgerblue;">
        <th style="width: 200%">Product</th>
        <th style="width: 200%">Code</th>
        <th style="width: 200%">Brand</th>
        <th style="width: 200%">Price</th>
        <th style="width: 200%">Product unit</th>
        <th style="width: 200%">In stock</th>
        <th style="width: 200%">Created on</th>
    </tr>
    </thead>
    <tbody>
    @foreach($products  as $product)
        <tr align="center">
            <td>{{$product->name}}</td>
            <td>{{$product->code}}</td>
            <td>{{$product->brand->name}}</td>
            <td>{{$product->product_price}}</td>
            <td>
                @if($product->product_unit == 1)
                    Piece
                @elseif($product->product_unit == 2)
                    Meter
                @elseif($product->product_unit == 3)
                    Kilogram
                @endif
            </td>
            <td>
                <?php
                $totalQuantity = App\Models\Managestock::where('product_id', $product->id)->sum('quantity');
                ?>
                {{$totalQuantity}}
            </td>
            <td>{{ \Carbon\Carbon::parse($product->created_at)->isoFormat('Do MMM, YYYY')}}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
