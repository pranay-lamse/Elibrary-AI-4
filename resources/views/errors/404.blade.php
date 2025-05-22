<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Elibrary</title>
    <!-- Fonts -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="{{ asset('css/style.min.css') }}">


    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap" rel="stylesheet">



    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

</head>



<body style="margin-buttom: 0px  !important">
    <style>
        section.not_found_section {
            display: flex;
            align-items: center;
            min-height: 100vh;
            padding: 80px 0px;
            background: #f8ba22;
        }

        .not_found_text h2 {
            font-size: 275px;
            font-weight: 600;
            font-family: "Roboto", sans-serif;
            color: #fff;
            line-height: 1em;
        }

        .not_found_text p,
        .not_found_text a {
            font-family: "Playfair Display", serif;
        }


        .not_found_text p {
            color: #000;
            margin-bottom: 5px;
            font-size: 30px;
        }

        .not_found_text p a:hover {
            text-decoration: underline;
        }

        .not_found_text p a {
            font-weight: bold;
            color: #cf4745;
            transition: 0.3s all ease;
        }

        .not_found_text {
            text-align: center;
        }

        .not_found_image img {
            max-width: 100%;
            object-fit: contain;
        }

        .not_found_image {
            position: absolute;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
            width: 50%;
        }

        section.not_found_section .container,
        section.not_found_section .row,
        section.not_found_section .row>div {
            position: unset;
        }

        @media (max-width:767px) {
            section.not_found_section .row {
                justify-content: center;
                text-align: center;
            }

            .not_found_image {
                position: unset;
                transform: unset;
                width: 100%;
            }

            section.not_found_section .container {
                padding: 0px;
            }

            section.not_found_section {
                padding: 30px 0px;
            }

            .not_found_text {
                margin: 15px 0px 0px 0px;
            }

            .not_found_text h2 {
                font-size: 90px;
                margin: 0px;
                line-height: 1em !important;
            }

            .not_found_text p {
                font-size: 20px;
            }

            .not_found_image {
                margin: 0px 0px 0px 0px;
                text-align: left;
            }

            .not_found_image img {
                max-height: 500px;
                /* width: 100%; */
            }
        }
    </style>
    <section class="not_found_section">
        <div class="container">
            <div class="row align-items-center d-flex">

                <div class="col-sm-6" style="padding:0px">
                    <div class="not_found_image">
                        <img src="https://dindayalupadhyay.smartcitylibrary.com/uploads/404-Page-Templates-Kite.png">
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="not_found_text">
                        <h2>
                            404</h2>

                        <p>Oops!<br> The page you're looking for is hiding.</p>
                        <p>Check the URL for typos, return to the <a href="<?php echo url(''); ?>">Homepage</a> for
                            access
                            to all our
                            literary treasures, or use <a href="<?php echo url(''); ?>/#/books-list">Search</a>.</p>
                        <p>Happy reading!
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </section>
</body>

</html>
