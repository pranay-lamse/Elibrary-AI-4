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
                <p>Hello <strong>{{ $data['user_name']}},</strong></p>
                <p>Thank you for contacting us.</p>
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
