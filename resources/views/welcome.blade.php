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
<style>
    .admin-wrapper .header {
        display: none !important;
    }

    body .pro-sidebar .pro-menu .pro-menu-item:first-child>.pro-inner-list-item {
        height: auto !important;
    }

    .pro-sidebar-content.sidebar-scrolling nav.pro-menu.inner-submenu-arrows,
    .pro-sidebar-content.sidebar-scrolling nav.pro-menu.inner-submenu-arrows .myDIV {
        height: 100%;
    }

    #loading {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 1;
        background-color: #fff;
        z-index: 9999;
    }

    .paytm-loader {
        color: #c27b7f;
        width: 3px;
        aspect-ratio: 1;
        border-radius: 50%;
        box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
        transform: translateX(-38px);
        animation: loader 0.5s infinite alternate linear;
        -webkit-box-shadow: 19px 0 0 7px, 38px 0 0 3px, 57px 0 0 0;
        -webkit-transform: translateX(-38px);
        -webkit-animation: loader 0.5s infinite alternate linear;
        padding: 0px !important;
    }


    .backend .table-bordered.table-striped::-webkit-scrollbar-thumb {
        background: #ccc !important;
    }

    .backend .table-bordered.table-striped::-webkit-scrollbar {
        height: 14px;
    }

    .backend .table-bordered.table-striped {
        overflow-y: auto;
        max-height: 60vh;
    }


    .backend .table-responsive {
        overflow-y: auto;
        max-height: 60vh;
    }

    .backend .table-responsive::-webkit-scrollbar-thumb {
        background: #ccc !important;
    }

    .backend .table-responsive::-webkit-scrollbar {
        height: 14px !important;
    }

    .field-focused {
        background-color: lightblue;
    }


    img#loader-welcome,
    .spinner img {
        width: 46px;
    }

    @keyframes loader {
        50% {
            box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px;
        }

        100% {
            box-shadow: 19px 0 0 0, 38px 0 0 3px, 57px 0 0 7px;
        }
    }

    @-webkit-keyframes loader {
        50% {
            box-shadow: 19px 0 0 3px, 38px 0 0 7px, 57px 0 0 3px;
        }

        100% {
            box-shadow: 19px 0 0 0, 38px 0 0 3px, 57px 0 0 7px;
        }
    }

    #loading-image {
        z-index: 9999;
    }


    .frontend .table-bordered::-webkit-scrollbar,
    .frontend .table-responsive::-webkit-scrollbar {
        height: 14px;
    }

    .frontend #resources-list .table-responsive {
        max-height: 600px !important;
    }

    .frontend #resources-list table.sheet0.gridlines {
        margin: 0px !important;
    }

    .frontend #resources-list .table-responsive::-webkit-scrollbar-thumb {
        background: #c27b7f !important;
    }

    .frontend #resources-list .table-responsive::-webkit-scrollbar {
        height: 13px;
    }

    .frontend .table-responsive::-webkit-scrollbar {
        background: #e4e5e8;
    }


    #resources-list thead,
    #resources-list tbody,
    #resources-list tfoot,
    #resources-list tr,
    #resources-list td,
    #resources-list th {
        border-color: inherit;
        border-style: solid;
        border-width: 0;
        border: 1px solid #c0bfbf !important;

        padding: 4px;
    }

    #resources-list .table-responsive {
        overflow: auto !important;
    }

    #resources-list tbody,
    #resources-list td,
    #resources-list tfoot,
    #resources-list th,
    #resources-list thead,
    #resources-list tr {
        border: 1px solid #c1c1c1 !important;
        border-color: inherit;
    }

    #resources-list table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    #resources-list td,
    #resources-list th {
        padding: 0;
        text-align: left;
    }

    #resources-list table {
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        background-color: #fff;
        border-radius: 4px;
        font-size: 12px;
        line-height: 1.25;
        margin-bottom: 24px;
        width: 100%;
    }

    #resources-list table td {
        padding: 12px 6px 12px 22px;
        word-wrap: break-word;
        font-size: 15px;
    }

    #resources-list thead th {
        background-color: #f6f6f6;
        padding: 18px 6px 18px 22px;
        font-size: 15px;
        color: #444;
        border-bottom-color: rgba(113, 110, 182, 0.15) !important;
    }

    #resources-list thead th:first-child {
        border-top-left-radius: 4px;
    }

    #resources-list thead th:last-child {
        border-top-right-radius: 4px;
    }

    #resources-list table {
        border: 1px solid rgba(113, 110, 182, 0.15);
    }

    #resources-list table tr {
        border-bottom: 1px solid rgba(113, 110, 182, 0.15);
    }

    #resources-list table tr:hover {
        background-color: rgba(113, 110, 182, 0.15);
        color: #272b37;
    }

    .book-details .product_content .description {
        font-size: 14px !important;
        margin: 25px 0px 0px 0px;
    }

    .product_content p {
        color: #111 !important;
        margin: 0px;
        font-size: 16px !important;
    }

    .product_img {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .book-details .product_content {
        background: #fff;
        padding: 35px !important;
        box-shadow: 0px 0px 2px -1px #eee;
    }

    .frontend .product_content h1 {
        font-size: 26px !important;
        margin-bottom: 0px;
        color: #111 !important;
        font-family: "Poppins";
    }

    .product_content p {
        color: #111 !important;
        margin: 0px;
        font-size: 16px !important;
    }

    .author_name span {
        color: #c27b7f;
        font-weight: bold;
        font-size: 16px;
    }

    .book-details .product_content .description {
        font-size: 14px !important;
    }

    .description span {
        display: block;
        color: #1b90bd;
        margin: 10px 0px 0px;
        font-size: 13px;
        cursor: pointer;
        font-weight: 500;
    }

    .libraries {
        margin: 20px 0px 0px 0px;
    }

    .libraries .label p {
        color: #666 !important;
        font-weight: 600;
        text-transform: uppercase;
    }

    .lib_options {
        display: block;
        margin: 15px 0px 0px 0px;
    }

    .lib_options span {
        background: #b0addb;
        padding: 8px 20px;
        border-radius: 50px;
        color: #fff;
        font-size: 13px !important;
        margin-right: 10px;
        text-align: center;
        color: #fff;
        display: inline-block;
        margin: 0px 10px 15px 0px;
    }

    .lib_options span.available {
        background: #7b5ed7;
        opacity: 1;
        color: #fff;
    }

    .avail_options span.available {
        background: #7b5ed7;
    }

    .avail_options span {
        background: #b0addb;
        padding: 8px 20px;
        border-radius: 50px;
        color: #fff;
        font-size: 13px !important;
        margin: 0px 10px 10px 0px;
    }

    .availability {
        margin: 20px 0px 0px 0px;
    }

    .availability .label p {
        color: #666 !important;
        font-weight: 600;
        text-transform: uppercase;
    }

    button.frontend-btn.e-book {
        background: #111 !important;
        border: 1px solid #111 !important;
    }

    .buttons {
        margin: 25px 0px 0px 0px;
    }

    .other_details {
        margin: 20px 0px;
    }

    .product_content p.detail_type {
        font-weight: 500;
        font-size: 14px !important;
    }

    .product_content p.detail_des {
        font-size: 14px !important;
        font-weight: 600;
        line-height: 1.3em;
    }

    .detail_image i {
        font-size: 22px;
    }

    .product_content .buttons button.e-book:hover {
        background: #444 !important;
    }

    .product_content .buttons button,
    .product_content .buttons button.e-book {
        border: 0px !important;
    }

    .book-details .product_content .description .inner_description {
        height: 95px;
        overflow: hidden;
    }

    .book-details .product_content .description.show_full_description .inner_description {
        height: auto;
        overflow: unset;
    }

    .product_content .inner_description p {
        font-size: 14px !important;
    }

    .product_content button.slick-arrow::before {
        color: #000 !important;
    }

    .product_content button.slick-arrow.slick-prev {
        left: 0px;
    }

    .product_content button.slick-arrow {
        top: 50%;
        margin: 0px !important;
        transform: translateY(-50%);
    }

    .product_content button.slick-arrow.slick-next {
        right: 2px;
    }

    .product_content button.slick-arrow.slick-prev::before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        content: "\f104";
    }

    .product_content button.slick-arrow.slick-next::before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        content: "\f105";
    }

    .product_content button.slick-arrow {
        border: 1px solid #ddd;
        padding: 5px 8px;
        width: auto !important;
        height: auto !important;
        box-shadow: 2px 2px 2px #ddd;
        border-radius: 7px;
        z-index: 999;
        transition: 0.3s all ease;
    }

    .product_content button.slick-arrow:hover {
        box-shadow: 4px 4px 4px #ddd;
    }

    .product_content button.slick-arrow:before,
    .product_content button.slick-arrow:after {
        font-size: 16px;
    }

    .details_box {
        height: auto !important;
        text-align: center;
        padding: 0px 10px;
    }

    .avail_options {
        display: flex;
        margin: 15px 0px 0px 0px;
        flex-wrap: wrap;
    }

    @media (max-width: 767px) {
        .book-details .product_content {
            margin: 40px 0px 0px 0px;
        }

        .book-details .product_content {
            margin: 40px 0px 0px 0px;
            padding: 30px 15px !important;
        }

        .frontend .product_content h1 {
            font-size: 22px !important;
        }

        .product_content p {
            font-size: 15px !important;
        }

        .author_name span {
            font-size: 15px;
        }
    }

    .book-details .product_content .description {
        font-size: 14px !important;
        margin: 10px 0px 30px 0px;
    }

    .pricing__list input[type="checkbox"] {
        -webkit-appearance: checkbox !important;
    }

    .pricing__item {
        background-color: #fff;
        padding: 40px;
        text-align: center;
        transition: 0.3s;
        box-shadow: 6px 6px 40px 15px #efefef !IMPORTANT;
        margin-bottom: 25px;
        border-radius: 25px !important;
        text-align: left;
    }

    .pricing__item.translateEffect1:hover {
        box-shadow: 11px 11px 52px 21px #ddd4d4 !important;
        -webkit-transform: translateY(-10px);
        transform: scale(1.03) !important;
    }

    .pricing h3.pricing__title {
        margin-bottom: 15px;
        font-size: 26px !important;
        text-align: left;
    }

    .pricing__item h3:not(.pricing__title) {
        margin: 10px 0px;
        color: #c27b7f !important;
        font-size: 28px !important;
    }

    .pricing__item .pricing__price span {
        position: relative;
        top: -2px;
    }

    .pricing__item h3 span {
        position: relative;
        top: -2px;
    }

    .pricing__list {
        margin: 25px 0 -10px 0px;
        padding-left: 0;
    }

    .pricing__item button {
        margin: 25px 0px 0px 0px;
    }

    .pricing__list input[type="checkbox"] {
        margin-right: 10px;
        position: relative;
        top: 1px;
    }

    .modal-open .modal {
        z-index: 99999;
    }

    #book_search_home_page_form input.form-control {
        height: 45px !important;
    }

    @media (max-width:767px) {
        section#pricing {
            padding: 50px 0 0px 0px;
        }





        #book_search_home_page_form {
            z-index: unset !important;
        }

        .navbar .navbar-menu-wrapper .navbar-nav .btn-contact-us {
            margin-left: 0px !important;
        }



        ul#resources-filter li button {
            font-size: 14px !IMPORTANT;
            padding: 13px 10px;
        }

        body #resources-filter.filter-buttons li {
            margin: 0px 7px 0px 0px;
        }

        body .navbar .navbar-menu-wrapper .navbar-nav .btn-contact-us {
            margin-left: 0px !important;
        }

        body .reset .btn {
            z-index: unset !important;
            margin: 0px !IMPORTANT;
        }

        body #book_search_home_page_form .reset button:first-child {
            position: absolute;
            top: 0px;
            right: 0px;
            height: 45px !important;
        }



        body #books-section #book_search_home_page_form .search-bar .searchByBook {
            padding: 0px !important;
        }

        body #book_search_home_page_form {
            padding: 0px !important;
        }


        .btn-contact-us li.nav-item.dropdown {
            padding: 10px 0px !important;
        }

        .navbar .navbar-menu-wrapper .navbar-nav .btn-contact-us li>.nav-link {
            padding: 10px 0px !IMPORTANT;
        }



        #resources-filter.filter-buttons li:last-child {
            margin-right: 0px;
        }

        #resources-list #book_search_home_page_form .book_drop input.form-control {
            padding-right: 60px !IMPORTANT;
        }

        #book_search_home_page_form .book_drop input.form-control {
            padding-right: 60px !IMPORTANT;
        }

        .video-list .search-bar input {
            max-width: 100% !important;
        }



        .o-hidden {
            overflow-y: hidden;
        }

        section#resources-list .common-heading {
            padding-top: 0px !IMPORTANT;
        }




    }




    .admin-video-list .video_block {
        position: relative;
        margin-bottom: 25px;
    }

    .admin-video-list .admin-video-list article.video_col {
        background: #fff;
        margin-left: 24px;
        margin-top: 24px;
        width: calc(33.33% - 24px);
        padding: 0px 0px 25px 0px;
        border-radius: 0px;
        text-align: left;
        box-shadow: 1px 0px 8px #ddd;
    }

    .admin-video-list .module {
        display: flex;
        flex-wrap: wrap;
        margin: 0px -15px;
    }

    .admin-video-list .video_col h4 {
        font-weight: 800;
        font-size: 17px;
        line-height: 26px;
        margin-bottom: 10px;
    }

    .admin-video-list .video_block img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0px;
    }

    span.video-block-btn svg {
        width: 30px !important;
        height: 30px !important;
    }

    .admin-video-list .video-block-btn {
        align-items: center;
        background-color: #fff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 30px rgba(1, 6, 33, 0.06);
        color: #876585;
        display: flex;
        font-size: 22px;
        height: 70px;
        justify-content: center;
        position: absolute;
        text-align: center;
        width: 70px;
        transition: 0.3s all ease;
        cursor: pointer;
        top: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        bottom: 0px;
    }


    .admin-video-list .video-block-btn:hover {
        transform: scale(1.2);
    }

    .admin-video-list .video_popup {
        position: fixed;
        top: 0px;
        height: 100vh;
        justify-content: center;
        align-items: center;
        width: 100%;
        left: 0px;
        background: rgba(0, 0, 0, 0.3);
        overflow-y: auto;
        padding: 0px 15px;
        z-index: 999;
        display: flex;
    }

    .admin-video-list .video_close_btn {
        position: absolute;
        right: -35px;
        background: transparent !important;
        color: #fff;
        font-size: 45px !important;
        top: 0px;
        cursor: pointer;
    }

    .admin-video-list .video_popup_container {
        position: relative;
    }

    .show_video {
        overflow: hidden;
    }

    .show_video .video_popup {
        display: flex;

    }

    .bpl .pricing__list {
        margin: 86px 0px 55px 0px;
    }

    .pricing__item {
        height: 100%;
    }

    .pricing .row>div {
        margin-bottom: 25px !IMPORTANT;
    }




    .video_block {
        position: relative;
        margin-bottom: 25px;
    }

    article.video_col {
        background: #fff;
        margin-left: 24px;
        margin-top: 24px;
        width: calc(33.33% - 24px);
        padding: 0px 0px 25px 0px;
        border-radius: 0px;
        text-align: left;
        box-shadow: 1px 0px 8px #ddd;
    }

    .video-list .module {
        display: flex;
        flex-wrap: wrap;
        margin: 0px -24px;
    }

    .video_col h4 {
        font-weight: 800;
        font-size: 26px;
        line-height: 30px;
        margin-bottom: 10px;
    }

    .admin-video-list {
        padding: 0px !Important;
        z-index: 999;
    }

    .video_col h4 {
        padding: 0px 20px !IMPORTANT;
    }

    .video_block img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0px;
    }

    .video-block-btn {
        align-items: center;
        background-color: #fff;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 30px rgba(1, 6, 33, 0.06);
        color: #876585;
        display: flex;
        font-size: 22px;
        height: 70px;
        justify-content: center;
        position: absolute;
        text-align: center;
        width: 70px;
        transition: 0.3s all ease;
        cursor: pointer;
        top: 0px;
        left: 0px;
        right: 0px;
        margin: auto;
        bottom: 0px;
    }

    .video-block-btn:hover {
        transform: scale(1.2);
    }

    section.video-list {
        z-index: unset;
    }

    #header-section {
        position: relative;
        z-index: 9999;
    }

    .video_popup {
        position: fixed;
        top: 0px;
        height: 100vh;
        justify-content: center;
        align-items: center;
        width: 100%;
        left: 0px;
        background: rgba(0, 0, 0, 0.7);
        overflow-y: auto;
        padding: 0px 15px;
        display: flex;
        z-index: 999999;
    }

    .video_close_btn {
        position: absolute;
        right: -35px;
        background: transparent !important;
        color: #fff;
        font-size: 45px !important;
        top: -40px;
        cursor: pointer;
    }

    .video-list #book_search_home_page_form input.form-control {
        border: 1px solid #ced4da !important;
        border-radius: 0.313rem !important;
    }

    .video_popup_container {
        position: relative;
    }

    .show_video {
        overflow: hidden;
    }

    .show_video .video_popup {
        display: flex;

    }

    section.video-list h4 {
        font-size: 24px;
    }

    @media (max-width:767px) {

        .btn-contact-us .nav-item.dropdown button#navbarDropdownMenuLink {
            padding: 15px 0px !important;
        }


        .video-list #book_search_home_page_form {
            padding: 0px 0px 40px 0px;
        }

        section.video-list {
            padding: 40px 0px;
            z-index: unset;
        }

        .video-list .module {
            flex-direction: column;
            margin: 0px !important;
        }

        span.video_close_btn {
            right: 0px;
            top: -20px;
        }

        .video_popup iframe {
            height: 300px;
        }
    }



    .video-list .search-bar input {
        width: 350px;
        background: transparent;
        border: 1px solid #ddd;
        height: 45px !important;
        border-radius: 5px;
        padding: 10px 15px;
    }

    .video-list .search-bar {
        text-align: center;
        margin-bottom: 30px;
    }

    .admin-wrapper section.video-list h4 {
        font-size: 20px;
        font-weight: 600;
    }

    .admin-wrapper .video-list .search-bar {
        max-width: 400px;
    }

    .admin-wrapper section.video-list {
        padding: 20px 0px !IMPORTANT;
    }

    .pricing__item p {
        color: #000 !important;
        font-size: 14px !important;
        text-align: left;
    }

    .pricing__item .pricing {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 10px;
        align-items: flex-end;
        margin-top: 25px;
    }

    .pricing__item h3:not(.pricing__title) {
        margin: 0px;
        color: #000 !important;
        font-size: 28px !important;
        line-height: 1em;
        margin-right: 5px;
    }

    .pricing__list {
        margin: 25px 0 -10px 0px;
        padding-left: 0;
    }

    .pricing__list li {
        list-style: none;
        padding: 10px 0;
        display: flex;
        align-items: flex-start;
        text-align: left;
    }

    .pricing__list input[type="checkbox"] {
        margin-right: 10px;
        position: relative;
        top: 3px;
        width: 20px !important;
        height: 20px !important;
    }

    ul.pricing__list label {
        margin: 0px;
        min-height: 24px;
        display: flex;
        align-items: center;
        width: calc(100% - 35px);
    }

    .pricing_bottom {
        margin: 25px 0px 0px 0px;
    }

    .pricing_bottom h5 {
        margin-left: 35px;
        font-size: 14px;
        font-weight: 600;
        font-family: 'Poppins';
        color: #000 !important;
        margin-bottom: 0px;
    }

    .pricing_bottom button {
        margin: 0px;
    }

    .pricing_bottom {
        margin: 25px 0px 0px 0px;
        display: flex;
        align-items: center;
    }

    .video_block img {
        height: auto;
    }

    .video_col h4 {
        padding: 0px 0px !IMPORTANT;
    }

    article.video_col {
        width: calc(33.33% - 24px);
        padding: 20px;
    }

    section.video-list h4 {
        font-size: 22px;
    }

    .admin-wrapper article.video_col {
        width: calc(33.33% - 30px);
        padding: 15px;
    }

    .admin-wrapper section.video-list h4 {
        font-size: 17px;
        font-weight: 600;
        line-height: 1.5em;
    }

    .admin-wrapper section.video-list {
        max-width: 1500px;
    }

    @media (max-width:767px) {
        .admin-video-list article.video_col {
            width: 100% !important;
            padding: 15px;
            margin: 0px 0px 25px 0px;
        }

        article.video_col {
            width: 100%;
            padding: 15px;
            margin: 0px 0px 25px 0px;
        }

        .admin-video-list .module {
            flex-direction: column;
            margin: 0px !important;
        }

        .admin-video-list span.video_close_btn {
            right: 0px;
            top: -60px;
        }

        .pricing_bottom h5 {
            margin-left: 15px !important;
        }

        .pricing__item {
            padding: 25px;
        }

        section {
            padding: 50px 0px !important;
        }

        .pricing__item h3:not(.pricing__title) {
            font-size: 25px !important;
        }

        .pricing__item .btn {
            padding: 10px 15px 12px 15px !important;
        }
    }

    #pricing {
        z-index: unset;
    }

    .navbar .navbar-menu-wrapper .navbar-nav .btn-contact-us {
        margin-left: 20px !important;
    }

    #resources-list .module article,
    #resources-list .module article {
        background: #f5ebe6;
    }

    @media (min-width:992px) and (max-width:1200px) {
        header .container {
            max-width: 1100px;
            margin: 0 auto;
        }
    }

    .description .buttons span {
        margin: 0px !important;
    }

    #books-section .search-bar .css-2b097c-container .css-1g6gooi {
        padding: 2px 0px !important;
    }

    #books-section .search-bar input {
        height: 100%;
        border: 1px solid #e4e7ea !important;
        padding: 5px 10px !important;
    }

    #books-section .search-bar .css-2b097c-container input {
        border: 0px !important;
        padding: 5px 0px !important;
    }

    #books-section .search-bar .css-2b097c-container .css-1g6gooi {
        padding: 2px 0px !important;
    }

    @media (max-width:767px) {
        #books-section .search-bar input {
            padding: 10px 10px !important;
        }
    }

    .modalcss>div {
        max-width: 600px !important;
        padding: 50px 30px !important;
    }

    .modalcss>div input {
        margin-bottom: 15px !important;
    }

    .backend .table-responsive {
        overflow-x: auto !important;
    }

    .video-container {
        width: 100%;
        max-width: 100%;
        height: auto;
        overflow: hidden;
    }

    .video-container video {
        width: 100%;
        height: auto;
    }

    #resources-list #book_search_home_page_form .book_drop input.form-control {
        width: 350px;
        background: transparent;
        border: 1px solid #ddd !IMPORTANT;
        height: 45px !important;
        border-radius: 5px !important;
        padding: 10px 15px !IMPORTANT;
        max-width: 100% !important;
    }

    #resources-filter.filter-buttons li {
        margin-right: 15px;
    }

    #resources-list div#book_search_home_page_form {
        margin: 0 0 60px 0px;
        padding: 0px;
    }

    @media (max-width:767px) {
        #resources-list .searchByBook {
            flex-direction: column;
        }

        #resources-list div#book_search_home_page_form {
            margin: 0 0 90px 0px;
            padding: 0px;
        }

        #resources-list #book_search_home_page_form .book_drop input.form-control {
            width: 100%;
        }



        #resources-filter.filter-buttons {
            justify-content: center;
        }
    }

    @media (max-width:344px) {
        body ul#resources-filter li button {
            font-size: 13px !IMPORTANT;
            padding: 13px 7px;
        }


    }

    .fab-wrapper {
        position: fixed;
        bottom: 3rem;
        right: 3rem;
    }

    .fab-checkbox {
        display: none;
    }

    .fab {
        position: absolute;
        bottom: -1rem;
        right: -1rem;
        width: 4rem;
        height: 4rem;
        background: blue;
        border-radius: 50%;
        background: #126ee2;
        box-shadow: 0px 5px 20px #81a4f1;
        transition: all 0.3s ease;
        z-index: 1;
        border-bottom-right-radius: 6px;
        border: 1px solid #0c50a7;
    }

    .fab:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
    }

    .fab-checkbox:checked~.fab:before {
        width: 90%;
        height: 90%;
        left: 5%;
        top: 5%;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .fab:hover {
        background: #2c87e8;
        box-shadow: 0px 5px 20px 5px #81a4f1;
    }

    .fab-dots {
        position: absolute;
        height: 8px;
        width: 8px;
        background-color: white;
        border-radius: 50%;
        top: 50%;
        transform: translateX(0%) translateY(-50%) rotate(0deg);
        opacity: 1;
        animation: blink 3s ease infinite;
        transition: all 0.3s ease;
    }

    .fab-dots-1 {
        left: 15px;
        animation-delay: 0s;
    }

    .fab-dots-2 {
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        animation-delay: 0.4s;
    }

    .fab-dots-3 {
        right: 15px;
        animation-delay: 0.8s;
    }

    .fab-checkbox:checked~.fab .fab-dots {
        height: 6px;
    }

    .fab .fab-dots-2 {
        transform: translateX(-50%) translateY(-50%) rotate(0deg);
    }

    .fab-checkbox:checked~.fab .fab-dots-1 {
        width: 32px;
        border-radius: 10px;
        left: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
    }

    .fab-checkbox:checked~.fab .fab-dots-3 {
        width: 32px;
        border-radius: 10px;
        right: 50%;
        transform: translateX(50%) translateY(-50%) rotate(-45deg);
    }

    @keyframes blink {
        50% {
            opacity: 0.25;
        }
    }

    .fab-checkbox:checked~.fab .fab-dots {
        animation: none;
    }

    .fab-wheel {
        position: absolute;
        bottom: 0;
        right: 0;
        border: 1px solid #;
        width: 10rem;
        height: 10rem;
        transition: all 0.3s ease;
        transform-origin: bottom right;
        transform: scale(0);
    }

    .fab-checkbox:checked~.fab-wheel {
        transform: scale(1);
    }

    .fab-action {
        position: absolute;
        background: #0f1941;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: White;
        box-shadow: 0 0.1rem 1rem rgba(24, 66, 154, 0.82);
        transition: all 1s ease;

        opacity: 0;
    }

    .fab-checkbox:checked~.fab-wheel .fab-action {
        opacity: 1;
    }

    .fab-action:hover {
        background-color: #f16100;
    }

    .fab-wheel .fab-action-1 {
        right: -1rem;
        top: 0;
    }

    .fab-wheel .fab-action-2 {
        right: 3.4rem;
        top: 0.5rem;
    }

    .fab-wheel .fab-action-3 {
        left: 0.5rem;
        bottom: 3.4rem;
    }

    .fab-wheel .fab-action-4 {
        left: 0;
        bottom: -1rem;
    }

    .fab-action i {
        color: #fff;
    }

    .promo-video iframe {
        width: 100% !important;
    }


    .navbar-nav,
    .navbar-nav>div {
        width: 100%;
    }

    .pro-sidebar .pro-sidebar-inner .pro-sidebar-layout {
        height: 100vh;
    }

    .aside-menu-container .sidebar-scrolling {
        height: calc(100% - 150px) !important;
    }

    .pro-sidebar .pro-menu .pro-menu-item .pro-inner-list-item ul {
        padding: 0 !important;
    }

    footer div.text-gray-600 {
        color: #666 !important;
    }

    .pro-sidebar .pro-menu .pro-menu-item .pro-inner-item {
        background: transparent !IMPORTANT;
    }

    .pro-sidebar .pro-inner-item.sec_tabs li button span {
        color: #fff;
        font-weight: 400;
        font-size: 14px !important;
    }

    li.pro-menu-item.pro-sub-menu.myDIV>.pro-inner-item {
        display: none;
    }


    body .pro-sidebar .pro-sidebar-inner {
        height: 100vh;
    }

    li.pro-menu-item.pro-sub-menu.myDIV {
        height: calc(100vh - 70px);
    }

    body .pro-sidebar .pro-sidebar-inner {
        background-color: #333 !important;
    }

    .pro-sidebar .pro-inner-item.sec_tabs {
        padding: 0px !IMPORTANT;
    }

    .pro-sidebar .pro-inner-item.sec_tabs li {
        padding: 0px;
        width: 50%;
        text-align: center;
        {{-- border-bottom: 2px solid #ddd; --}}
    }

    .pro-sidebar .pro-inner-item.sec_tabs {
        padding: 0px !IMPORTANT;
        display: flex;
    }

    .pro-sidebar .pro-menu .pro-menu-item .pro-inner-list-item ul span.pro-item-content {
        font-size: 13px;
    }


    .pro-sidebar .pro-inner-item.sec_tabs li span {
        font-size: 13px !important;
    }

    body .pro-sidebar .pro-menu .pro-menu-item .pro-icon-wrapper>span.pro-icon {
        margin-right: 8px;
    }

    .pro-sidebar .pro-menu .pro-menu-item:first-child>.pro-inner-list-item {
        height: calc(100vh - 196px) !important;
    }

    li.pro-menu-item.pro-sub-menu.myDIV .dropdown {
        background: #333;
        border-top: 1px solid #555;
    }

    .d-flex.align-items-stretch.dropdown button#dropdown-basic {
        width: 100%;
        background: transparent !important;
        padding: 10px !important;
    }

    .d-flex.align-items-stretch.dropdown button#dropdown-basic svg {
        margin-left: auto !important;
    }

    body footer.border-top.w-100.pt-4.mt-7.d-flex.justify-content-between {
        background: transparent !important;
    }

    footer.admin_footer p {
        color: #000 !IMPORTANT;
    }

    li.pro-menu-item.pro-sub-menu.myDIV .dropdown {
        width: 100%;
    }

    .navbar-nav {
        width: 100%;
    }

    nav.navbar.navbar-expand-lg.navbar-light,
    nav.navbar.navbar-expand-lg.navbar-light>div {
        width: 100% !important;
    }

    ul.dropdown-new {
        padding: 25px 23px !important;
        border-top: 1px solid #dee2e659 !important;
    }

    a.px-5.fs-6.dropdown-item {
        color: #fff !important;
        font-size: 13px !important;
    }

    .dropdown-new h5 {
        color: #fff;
        font-size: 15px;
    }

    nav.pro-menu.inner-submenu-arrows {
        padding-bottom: 50px !important;
    }

    ._failed {
        border-bottom: solid 4px red !important;
    }

    ._failed i {
        color: red !important;
    }

    ._success {
        box-shadow: 0 15px 25px #00000019;
        padding: 45px;
        width: 100%;
        text-align: center;
        margin: 40px auto;
        border-bottom: solid 4px #28a745;
    }

    ._success i {
        font-size: 55px;
        color: #28a745;
    }

    ._success h2 {
        margin-bottom: 12px;
        font-size: 40px;
        font-weight: 500;
        line-height: 1.2;
        margin-top: 10px;
    }

    ._success p {
        margin-bottom: 0px;
        font-size: 18px;
        color: #495057;
        font-weight: 500;
    }

    .Toastify__toast-container {
        z-index: 99999 !important;
    }

    .assign-subscription .assign-table-new {
        max-width: 100% !important;
        margin: 15px auto 0px auto !important;
        padding: 0px 0 !important;
        background-color: unset !important;
        box-shadow: unset !important;
        border: 0px !important;
    }

    .assign-subscription {
        margin-top: 20px !important;
        margin-bottom: 15px !important;
    }

    .assign-table-new .css-yk16xz-control {
        padding-left: 0px;
    }

    .assign-subscription label input[type="text"] {
        width: calc(50% - 13px);
        border-radius: 0.313rem !important;
        border: 1px solid #ced4da !important;
    }

    .assign-subscription .css-2b097c-container,
    .assign-subscription .css-14jk2my-container {
        width: calc(50% - 13px);
    }

    .plan-input-label {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .plan-input-label input[type="checkbox"] {
        margin-right: 10px;
    }

    .plan-input-label label {
        margin-right: 20px !important;
    }

    .css-1wa3eu0-placeholder.pay-placeholder {
        padding-left: 20px;
    }


    .assign-subscription {
        margin-top: 20px !important;
        margin-bottom: 15px !important;
    }

    .assign-subscription .assign-table-new label {
        display: block;
    }

    .assign-table-new .css-yk16xz-control {
        padding-left: 0px;
    }

    .plan-input-label {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .plan-input-label input[type="checkbox"] {
        margin-right: 10px;
    }

    .plan-input-label label {
        margin-right: 20px !important;
    }

    .css-1wa3eu0-placeholder.pay-placeholder {
        padding-left: 20px;
    }
</style>

<body class="antialiased" id="body" data-spy="scroll" data-target=".app-navbar" data-offset="100">
    <div id="loading">
        <img id="loader-welcome" src="/public/images/301.gif">
    </div>
    <div id="root"></div>
</body>

{{-- <script type="text/javascript">
    window.addEventListener("load", (e) => {
        const loader = document.getElementById(".spinner");
        if (loader) {
            loader.style.display = "none";
        }
    });
</script> --}}

<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js"
    integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="{{ asset('css/vendors/jquery/jquery.min.js') }}"></script>
<script src="{{ asset('css/vendors/bootstrap/bootstrap.min.js') }}"></script>
<script src="{{ asset('css/vendors/owl-carousel/js/owl.carousel.min.js') }}"></script>
<script src="{{ asset('css/vendors/aos/js/aos.js') }}"></script>
{{-- <script src="{{ asset('js/choices.js') }}"></script> --}}
<script src="{{ asset('js/landingpage.js') }}"></script>


<script>
    jQuery(function() {



        jQuery(".video_block .video-block-btn").click(function() {
            jQuery("body").toggleClass("show_video");
        });
        jQuery(".video_block .video_close_btn").click(function() {
            jQuery("body").removeClass("show_video");
        });

        jQuery(document).mouseup(function(e) {
            var container = jQuery(".video_popup iframe");

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                jQuery("body").removeClass("show_video");
            }
        });
    });

    $(window).on('load', function() {
        $('#loading').fadeOut();

    });
    jQuery(document).ready(function() {

        jQuery(".navbar-toggler.collapsed").click(function() {
            jQuery("html, body").addClass("o-hidden");
        });
        jQuery("button.navbar-toggler.close-button, .navbar-menu-wrapper.navbar-collapse.show a").click(
            function() {
                jQuery("html, body").removeClass("o-hidden");
            });

        setInterval(() => {




            jQuery(".genres select").click(function() {

                jQuery('.genres select option:first-child').attr("selected", false);


            });


            jQuery(".publisher select").click(function() {

                jQuery('.publisher select option:first-child').attr("selected", false);


            });
            jQuery(".reset button").click(function() {

                jQuery('.genres select option:first-child').attr("selected", true);
                jQuery('.publisher select option:first-child').attr("selected", true);
            });

            jQuery("div:not(.admin-wrapper) .data-table > div:nth-child(2)").addClass(
                "table-bordered table-striped  mt-2");
        }, 100);


        setInterval(() => {

            jQuery(".genres select").click(function() {
                jQuery('.genres select option:first-child').attr("selected", false);
            });
            jQuery(".publisher select").click(function() {

                jQuery('.publisher select option:first-child').attr("selected", false);

            });
            jQuery(".reset button").click(function() {

                jQuery('.genres select option:first-child').attr("selected", true);
                jQuery('.publisher select option:first-child').attr("selected", true);
            });
        }, 1000);
        var src = jQuery('.video_popup iframe').attr('src');

        setInterval(function() {
            jQuery('.video-btn').click(function() {
                jQuery('.video_popup iframe').attr('src', src);
            });
            jQuery('.video_popup .close').click(function() {
                jQuery('.video_popup iframe').attr('src', '');
            });

            if (window.location.href.indexOf("admin") > -1) {
                jQuery("body").removeClass("frontend");
            } else {
                jQuery("body").addClass("frontend");
            }


        }, 1000);

        if (window.location.href.indexOf("admin") > -1) {
            jQuery("body").removeClass("frontend");
        } else {
            jQuery("body").addClass("frontend");
        }


        jQuery(document).on('click', '.elibrary', function() {
            jQuery(this).addClass("active_dash");
            jQuery('.erp').removeClass("active_dash");
            //   window.location.href="#/admin/pos/lms-dashboard";

        });
        jQuery(document).on('click', '.erp', function() {
            jQuery(this).addClass("active_dash");
            jQuery('.elibrary').removeClass("active_dash");

        });


        setInterval(() => {

            jQuery(".image__holder button:contains('Cancel')").addClass("remove");

            jQuery(".frontend .navbar .navbar-menu-wrapper.navbar-collapse.show li:not(.dropdown)")
                .each(function() {

                    jQuery(this).find("a").click(function() {
                        jQuery(
                                ".frontend .navbar .navbar-menu-wrapper.navbar-collapse.show"
                            )
                            .removeClass("show");
                    });
                });
        }, 1000);


    });

    if (jQuery(".inner_description p").height() > 95) {
        jQuery(".show_more").show();
    }
</script>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"
    integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous">
</script>
<script src="{{ mix('js/manifest.js') }}"></script>
<script src="{{ mix('/js/vendor.js') }}"></script>


</html>
