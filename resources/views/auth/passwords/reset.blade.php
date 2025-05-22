<html xmlns="http://www.w3.org/1999/html">
<head>
    <!-- Styles -->
    <style>
        .contact_us_mail {
            width: 512px;
            padding: 10px;
            margin: auto;
        }

        .contact_us_mail__table {
            width: 100%;
        }

        .text-center {
            text-align: center;
        }

        .divider {
            color: #e0e0e0;
            border: none;
            background-color: #e0e0e0;
            height: 3px;
            margin-top: 20px;
        }

        td, th, p, h2 {
            font-family: 'Lato', sans-serif;
        }

        .logo {
            width: 80px;
            height: 35px;
            margin-top: 10px
        }

        td p {
            margin: 17px 0;
            font-size: 13px;
            color: #6D6C6C
        }
    </style>
</head>
<body>

<div class="contact_us_mail">
    <table class="contact_us_mail__table">
        <tr>
            <td class="text-center">
                <img class="logo" src="{{ $data['logo_url'] }}" alt="">
            </td>
        </tr>
        <tr>
            <td>
                <hr class="divider"/>
            </td>
        </tr>
        <tr>
            <td>
                <p>Hello <strong>{{ $data['first_name']. " ".$data['last_name']}},</strong></p>
                <p>You are receiving this email because we received a password reset request for your account.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>Click <a href="{{$data['link']}}">Here</a> to reset your password.</p>
            </td>
        </tr>
        <tr>
            <td>
                <p>This password reset link will expire in 60 minutes.</p>
                <p>If you did not request a password reset, no further action is required.</p>
            </td>
        </tr>
    <tr>
        <td>
            <p>Thank you</p>
        </td>
    </tr>
    <tr>
        <td>
            <hr class="divider"/>
        </td>
    </tr>
    </table>
</div>
</body>
</html>
