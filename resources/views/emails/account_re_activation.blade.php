<html>
<head>
    <!-- Styles -->
    <style>
        .verification-btn {
            font-size: 13px;
            text-align: center;
            white-space: nowrap;
            cursor: pointer;
            padding: 10px;
            background-color: #66CC33;
            color: #FFFFFF;
            text-decoration: none;
        }

        .account-verification {
            width: 512px;
            padding: 10px;
            margin: auto;
        }

        .account-verification__table {
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

        td {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }

        .logo {
            width: 80px;
            height: 35px;
            margin-top: 10px
        }

        td p {
            margin: 17px;
            font-size: 13px;
            color: #6D6C6C
        }
    </style>
</head>
<body>

<div class="account-verification">
    <table class="account-verification__table">
        <tr>
            <td class="text-center">
                <img class="logo" src="{{ $data['logo_url'] }}">
            </td>
        </tr>
        <tr>
            <td>
                <hr class="divider"/>
            </td>
        </tr>
        <tr>
            <td>
                <p>Dear {{ucfirst($data['username'])}},</p>
                <p>Click the link below to activate your account.</p>
            </td>
        </tr>
        <tr>
            <td class="text-center">
                <a href="{{$data['link']}}" class="verification-btn">
                    <strong>Activate your account</strong>
                </a>
            </td>
        </tr>
        <tr>
            <td>
                <p>Thank you for using LMS!</p>
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
