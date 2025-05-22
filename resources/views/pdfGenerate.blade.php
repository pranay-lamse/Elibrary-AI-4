<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>ID Card</title>
</head>

<style type="text/css">
    body {
        font-size: 12px;
    }

    @media print {

        table,
        tr,
        th,
        td {
            -webkit-print-color-adjust: exact;
        }

        .pagebreak {
            clear: both;
            margin-top: 5px;
            min-height: 1px;
            page-break-after: always;
        }

        @page {
            -webkit-print-color-adjust: exact;
            margin: 0 auto;
            /* imprtant to logo margin */
            sheet-size: 356mm 216mm;
            /* imprtant to set paper size */
        }

        html,
        body {
            -webkit-print-color-adjust: exact;
            margin: 0;
            padding: 0;
            direction: ltr;
        }

        #content {
            -webkit-print-color-adjust: exact;
            width: 950px;
            margin: auto;
            text-align: justify;
        }

        .text-center {
            text-align: center;
        }
    }
</style>

<body>
    <div class="row col-sm-12 px-2 justify-content-around" style="margin: 0 auto;">
        @foreach ($users as $key => $value)
            <div
                style="width: 315px;
                font-family: sans-serif;
                font-size: 14px;
                text-align: center;
                border: 1px solid black;
                margin: 20px;
                border-radius: 20px;
                background-color: #fefff1;
                outline: 2px solid #020144;">

                <div
                    style="padding-top: 5px !important;
                        padding-bottom: 0px !important;
                        text-align: center;
                        padding-left: 60px;
                        background-color: #f8e839;
                        position: relative;
                        margin-top: 27px;
                        border-top: 4px solid #e60606;
                        border-bottom: 4px solid #e60606;
                        color: #981b1b;">
                    <img src="/images/logo-1.jpg" width="90"
                        style="position: absolute;margin-top: 0px;left: 3px; top: 20px;">
                    <!-- <span style="font-size: 14px;font-stretch: condensed;"> Gandhi Shikshan Santha’s</span><br> -->
                    <span
                        style="font-size: 14px;font-stretch: condensed;text-transform: uppercase;font-weight: bold; font-family: garamond; text-align: justify; line-height: normal;position:relative; top: 10px;">
                        @if ($value->user_library_id == 111)
                            {{ 'Dindayalupadhyay Smartcity E-library' }}
                        @elseif ($value->user_library_id == 222)
                            {{ 'Kundanlalgupta Smartcity E-library' }}
                        @else
                            {{ 'Rashtramatakasturba Smartcity E-library' }}
                        @endif
                    </span><br>
                    <br>
                </div>

                <div style=" vertical-align: top; margin: 10px auto;">
                    <img src="{{ $value->image_path ? $value->image_path :"/images/user-avatar.png" }}"
                        style="height: 100px; width: 100px;border: 1px solid; border-radius: 0 5px 0 5px;"
                        onError="{({
                            currentTarget,
                        }) => {
                            currentTarget.onerror =
                                null; // prevents looping
                            currentTarget.src =
                                "/images/user-avatar.png";
                        }}">
                </div>
                <div class="col-sm-11" style="margin: 0 auto;">
                    <table style="margin:0 auto !important; border-collapse:separate;border-spacing:0 15px;">
                        <tr>
                            <td>Name</td>
                            <td> : </td>
                            <td style="padding-left: 10px;text-align:left">
                                {{ $value->first_name . ' ' . $value->last_name }}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td> : </td>
                            <td style="padding-left: 10px;text-align:left">{{ $value->email }}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td> : </td>
                            <td style="padding-left: 10px;text-align:left">{{ $value->phone }}</td>
                        </tr>
                        {{-- <tr>
                            <td>Contact</td>
                            <td> : </td>
                            <td style="padding-left:10px;"></td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td> : </td>
                            <td class="edt_content" style="padding-left: 10px;"></td>
                        </tr> --}}
                    </table>
                </div>
                <div style=" display: flex;justify-content: flex-end;padding-right:25px">
                    <div>
                        <img style="height: 20px;" src="">
                        <div style="font-weight: bold;">Barcode</div>
                        <div style="padding: 15px 0;">{!! DNS1D::getBarcodeHTML(str($value->id), 'C128') !!}</div>
                    </div>
                </div>
            </div>
        @endforeach
        @if ($key % 6 == 0)
            <div class="pagebreak"></div>
        @endif
    </div>
    <script type="text/javascript">
        window.print();
    </script>
</body>

</html>
