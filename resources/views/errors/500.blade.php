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

    <link rel="stylesheet" href="{{ asset('css/style.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/bookSearch.css') }}">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/vendors/owl-carousel/css/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendors/owl-carousel/css/owl.theme.default.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendors/mdi/css/materialdesignicons.min.css') }}">
    <link rel="stylesheet" href="{{ asset('css/vendors/aos/css/aos.css') }}">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Philosopher:wght@400;700&display=swap" rel="stylesheet">



    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    {{-- <link rel="stylesheet" href="{{ asset('css/style.min.css?v=' . filemtime(public_path('css/style.min.css'))) }}" /> --}}

</head>



<body>
    <style>
        section.not_found_section {
            display: flex;
            align-items: center;
            min-height: 100vh;
            padding: 30px 0px;
        }

        .not_found_text h2 {
            font-size: 60px;
            font-weight: bold;
            font-family: 'Poppins';
        }

        .not_found_text h6 {
            font-size: 40px;
            margin-bottom: 18px;
        }

        .not_found_text p {
            color: #2f4858 !important;
            margin-bottom: 30px;
        }

        @media (max-width:767px) {
            section.not_found_section .row {
                flex-direction: column-reverse;
                justify-content: center;
                text-align: center;
            }

            .not_found_text {
                margin: 15px 0px 0px 0px;
            }

            .not_found_text h2 {
                font-size: 36px;
            }

            .not_found_text h6 {
                font-size: 20px;
            }

            .not_found_text p {
                font-size: 15px !important;
                margin-bottom: 20px;
            }
        }

        .not_found_image img {
            max-width: 100%;
        }
    </style>
    <section class="not_found_section">
        <div class="container">
            <div class="row align-items-center d-flex">
                <div class="col-sm-6">
                    <div class="not_found_text">
                        <h2>
                            500</h2>
                        <h6>Time to get going!</h6>
                        <p>Unfortunately, looks like
                            the page you are looking for has vanished into infinity.</p>
                        <a href="https://dindayalupadhyay.smartcitylibrary.com/"
                            class="btn btn-white frontend-btn">Hurry Back<span>&gt;</span></a>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="not_found_image">
                        <img src="https://dindayalupadhyay.smartcitylibrary.com/uploads/404-Page-Templates-Kite.jpg">
                    </div>
                </div>
            </div>
        </div>
    </section>
</body>

</html>
