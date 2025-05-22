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
                                Dear {{ $firstName . ' ' . $lastName }},
                                We hope this message finds you well. This is a friendly reminder regarding the book you
                                borrowed from {{ env('LIBRARY_NAME') }}, titled "{{ $books }}." We appreciate
                                your support in taking care of our library materials.
                                It appears that the due date for the book is approaching, and we kindly request that you
                                return it by {{ $dueDate }}. If you've already returned the book, please disregard
                                this message.
                                Here are a few options for returning the book:
                                In-Person Return: You can visit our library and return the book at the circulation desk
                                during our operating hours.
                                Warm regards,

                                {{ env('LIBRARY_NAME') }}

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
