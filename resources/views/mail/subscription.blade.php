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
                            <h2 style="margin: 0px;padding-bottom: 25px;font-size:22px;"> Your Membership at
                                {{ env('LIBRARY_NAME') }} is About to Expire
                            </h2>
                            <p style=" margin: 0px 40px;padding-bottom: 25px;line-height: 2; font-size: 15px;">
                                Dear {{ $data['firstName'] . ' ' . $data['lastName'] }},<br />
                                We hope you've been enjoying your time as a valued member of {{ env('LIBRARY_NAME') }}.
                                We wanted to bring to your attention that your membership is about to expire. We would
                                love for you to continue benefiting from all that {{ env('LIBRARY_NAME') }} has to
                                offer. <br />
                                Here are a few key details about your membership:<br />
                                Renewal Date: {{ $data['endDate'] }}<br />
                                To ensure uninterrupted access to our library resources and services, we encourage you
                                to renew your membership before the expiration date. Renewing is quick and easy.
                                Here's how to renew your membership:<br />
                                Online Renewal: You can conveniently renew your membership by logging into your library
                                account on our website at {{ url('/') }}. Look for the "Renew Membership" option.
                                In-Person Renewal: If you prefer, you can visit our library in person during our
                                operating hours, and our friendly staff will assist you with the renewal process. Our
                                email address is info@digitallibrary.com.<br />
                                Contact Us: Should you have any questions or require assistance with your renewal,
                                please don't hesitate to get in touch with our team at info@digitallibrary.com / (+91)
                                898 105 5565.<br />

                                We value your continued support and look forward to having you as an ongoing member of
                                {{ env('LIBRARY_NAME') }}. Your membership helps us maintain a vibrant and thriving
                                community of
                                readers.<br />

                                Thank you for being a part of our library family. We can't wait to continue serving your
                                literary needs.
                                Warm regards,<br />

                                {{ env('LIBRARY_NAME') }}

                            </p>

                            <h2 style="margin: 0px; padding-bottom: 25px;">Expire: {{ $data['endDate'] }}</h2>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a type="button" href="{{ url('/') }}"
                                style="width:fit-content;background-color:#36b445; color:white; padding:15px 97px; outline: none; display: block; margin: auto; border-radius: 31px;
                                font-weight: bold; margin-top: 25px; margin-bottom: 25px; border: none; text-transform:uppercase; ">Renew</a>
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
