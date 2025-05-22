<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nagpur Elibrary</title>
</head>

<body bgcolor="#0f3462" style="margin-top:20px;margin-bottom:20px">
    <!-- Main table -->
    <table border="0" align="center" cellspacing="0" cellpadding="0" bgcolor="white" width="650">
        <tr>
            <td>
                <!-- Child table -->
                <table border="0" cellspacing="0" cellpadding="0" style="color:#0f3462; font-family: sans-serif;">
                    <tr>
                        <td>
                            <h1
                                style="text-align:center; margin: 0px; padding-bottom: 25px; margin-top: 25px; font-size: 2rem;">
                                <i>Nagpur </i><span style="color:lightcoral">Elibrary</span>
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="text-align: center;">
                            <p style=" margin: 0px 40px;padding-bottom: 25px;line-height: 2; font-size: 15px;">
                                Dear {{ $data['name'] }},
                                <br />
                                Thank you for registering with {{ env('LIBRARY_NAME') }}. We appreciate your interest in
                                joining
                                our community.
                                <br />
                                Your registration is currently pending approval from our administrators. We will review
                                your information as soon as possible. Once approved, you will receive a confirmation
                                email with further instructions on how to access your account.
                                <br />
                                If you have any urgent inquiries or need assistance, please contact our support team at
                                info@digitallibrary.com.
                                <br />
                                Thank you for your patience.
                                <br />
                                Best regards, Nagpur E-Library
                            </p>
                        </td>
                    </tr>
                </table>
                <!-- /Child table -->
            </td>
        </tr>
    </table>
    <!-- / Main table -->
</body>

</html>
