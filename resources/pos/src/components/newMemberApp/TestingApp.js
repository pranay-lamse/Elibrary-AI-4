import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

import BookDetails from "./BookModal";
import { getCurrentMember } from "../../shared/sharedMethod";
import ProgressBar from "../../shared/progress-bar/ProgressBar";

import Header from "./Header";
import Footer from "./Footer";
import { fetchLatestBooks } from "../../member/store/actions/latestBooksAction";
import { fetchFeaturedBooks } from "../../member/store/actions/featuredBookAction";
import defaultBook from "../../../src/assets/images/defaultBook.png";

const Staff = (props) => {
    if (
        window.location.origin.toString() ==
        "https://dindayalupadhyay.smartcitylibrary.com"
    ) {
        var current_library_id = 111;
    } else if (
        window.location.origin.toString() ==
        "https://kundanlalgupta.smartcitylibrary.com"
    ) {
        var current_library_id = 222;
    } else if (
        window.location.origin.toString() ==
        "https://rashtramatakasturba.smartcitylibrary.com"
    ) {
        var current_library_id = 333;
    } else {
        var current_library_id = 111;
    }

    const [isLoading, setIsLoading] = useState(false);

    const [prevLimit, setPrevLimit] = useState(10);
    const [prevSkip, setPrevSkip] = useState(0);
    const [details, setDetails] = useState([]);
    const [formgenre, setformGenre] = useState("");
    const [formauthors, setformauthors] = useState("");
    const [formpublishers, setformpublishers] = useState("");
    const [formlanguages, setformlanguages] = useState(0);
    const [formformats, setformformats] = useState(0);
    const [formlibrary_id, setLibraryId] = useState(current_library_id);
    const [term, setTerm] = useState("");
    const navigate = useNavigate();
    const handleDetails = (previewLink) => {
        navigate("/search/book&" + previewLink);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            /* setPrevLimit(10);
            setPrevSkip(0); */

            const resources = await axios.get(
                `${window.location.origin.toString()}/api/v1/books?order_by=created_at&limit=6&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${formformats}`
            );

            setDetails(resources.data.data);
            setIsLoading(false);
        };
        fetchDetails();
    }, []);

    return (
        <section className="case-studies">
            <div className="container">
                <div
                    className="row grid-margin"
                    /*  onClick={() => handleDetails(previewLink)} */
                >
                    <div className="col-12 text-center common-heading pb-5">
                        <h2
                            style={{
                                fontSize: "3rem",
                                fontFamily: "Philosopher",
                            }}
                        >
                            Recently Added
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>
                    {details.length !== 0 ? (
                        details.slice(0, 4).map((book, i) => {
                            if (book.library_id == "111") {
                                var site_name_image_path = `https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                            } else if (book.library_id == "222") {
                                var site_name_image_path = `https://kundanlalgupta.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                            } else {
                                var site_name_image_path = `https://rashtramatakasturba.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                            }

                            return (
                                <div
                                    key={i}
                                    className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                                    data-aos="zoom-in"
                                >
                                    <div className="card color-cards">
                                        <div className="card-body p-0">
                                            <div
                                                className="text-center card-contents"
                                                style={{
                                                    backgroundColor: "#f2f2f2",
                                                }}
                                                onClick={() => {
                                                    var book_name =
                                                        book.name.replace(
                                                            /\//g,
                                                            " "
                                                        );
                                                    handleDetails(
                                                        `${book_name}/${book.id}/${book.library_id}`
                                                    );
                                                }}
                                            >
                                                <div className="card-image">
                                                    <img
                                                        loading="lazy"
                                                        src={
                                                            site_name_image_path
                                                                ? site_name_image_path
                                                                : defaultBook
                                                        }
                                                        className="case-studies-card-img"
                                                        alt=""
                                                        onError={({
                                                            currentTarget,
                                                        }) => {
                                                            currentTarget.onerror =
                                                                null; // prevents looping
                                                            currentTarget.src =
                                                                defaultBook;
                                                        }}
                                                    />
                                                </div>
                                                <div className="card-details text-center pt-4">
                                                    <h6 className="m-0 pb-1">
                                                        {book.name
                                                            ? book.name
                                                            : "NA"}
                                                    </h6>
                                                </div>

                                                <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                    <div
                                                        style={{
                                                            width: "fit-content",
                                                            padding: "auto 5px",
                                                        }}
                                                    >
                                                        <div className="d-flex align-items-center gap-3">
                                                            <span className="badge badge-info">
                                                                {book.items
                                                                    .length &&
                                                                book.items[0]
                                                                    .format ===
                                                                    3
                                                                    ? "E-Book"
                                                                    : "Book"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="btn btn-white frontend-btn"
                                                            onClick={() => {
                                                                var book_name =
                                                                    book.name.replace(
                                                                        /\//g,
                                                                        " "
                                                                    );
                                                                handleDetails(
                                                                    `${book_name}/${book.id}/${book.library_id}`
                                                                );
                                                            }}
                                                        >
                                                            <span>
                                                                Read More
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="spinner">
                            <img src="/public/images/301.gif" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const InfoSection = () => {
    return (
        <>
            <section
                className="contact-us contact-us-bgimage"
                id="contact-section"
            >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7">
                            <h3 className="commonThemeHeading ng-binding">
                                New to Nagpur Digital Library?
                            </h3>
                            <h5>
                                Here are some quick links to help you get
                                started.
                            </h5>
                            <p>
                                Signup for an account when connected to the
                                campus network or contact library administrator.
                            </p>
                            <a href="#/lms/login" className="btn frontend-btn">
                                <span>Join The Library</span>
                            </a>
                        </div>

                        <div className="col-sm-5 libraryWorkBlock">
                            <div className="ctav4__video-btn">
                                <a
                                    className="glightbox3 video-btn"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </a>
                                <div className="promo-video">
                                    <div className="waves-block">
                                        <div className="waves wave-1"></div>

                                        <div className="waves wave-2"></div>

                                        <div className="waves wave-3"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div
                className="modal fade video_popup"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <iframe
                                width="900"
                                height="615"
                                src="https://player.vimeo.com/video/808983383?h=81d7a35acb&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                                allow="autoplay; fullscreen; picture-in-picture;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                title="YouTube video player"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Trending = (props) => {
    if (
        window.location.origin.toString() ==
        "https://dindayalupadhyay.smartcitylibrary.com"
    ) {
        var current_library_id = 111;
    } else if (
        window.location.origin.toString() ==
        "https://kundanlalgupta.smartcitylibrary.com"
    ) {
        var current_library_id = 222;
    } else if (
        window.location.origin.toString() ==
        "https://rashtramatakasturba.smartcitylibrary.com"
    ) {
        var current_library_id = 333;
    } else {
        var current_library_id = 111;
    }
    const [isLoading, setIsLoading] = useState(false);

    const [prevLimit, setPrevLimit] = useState(10);
    const [prevSkip, setPrevSkip] = useState(0);
    const [details, setDetails] = useState([]);
    const [formgenre, setformGenre] = useState("");
    const [formauthors, setformauthors] = useState("");
    const [formpublishers, setformpublishers] = useState("");
    const [formlanguages, setformlanguages] = useState(0);
    const [formformats, setformformats] = useState(0);
    const [formlibrary_id, setLibraryId] = useState(current_library_id);
    const [term, setTerm] = useState("");
    const navigate = useNavigate();
    const handleDetails = (previewLink) => {
        navigate("/search/book&" + previewLink);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);

            const resources = await axios.get(
                `${window.location.origin.toString()}/api/v1/books?order_by=created_at&limit=4&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${1}&for_featured_books=true`
            );

            setDetails(resources.data.data);
            setIsLoading(false);
        };
        fetchDetails();
    }, []);
    return (
        <section className="case-studies" id="trending-section">
            {details.length !== 0 ? (
                <div className="container">
                    <div className="row grid-margin">
                        <div className="col-12 text-center common-heading pb-5">
                            <h2
                                style={{
                                    fontSize: "3rem",
                                    fontFamily: "Philosopher",
                                }}
                            >
                                Featured Books
                            </h2>
                            <div className="section-divider divider-traingle"></div>
                        </div>
                        {details.length !== 0 ? (
                            details.slice(0, 4).map((book, i) => {
                                if (book.library_id == "111") {
                                    var site_name_image_path = `https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                                } else if (book.library_id == "222") {
                                    var site_name_image_path = `https://kundanlalgupta.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                                } else {
                                    var site_name_image_path = `https://rashtramatakasturba.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                                }

                                return (
                                    <div
                                        key={i}
                                        className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                                        data-aos="zoom-in"
                                    >
                                        <div className="card color-cards">
                                            <div className="card-body p-0">
                                                <div
                                                    className="text-center card-contents"
                                                    style={{
                                                        backgroundColor:
                                                            "#f2f2f2",
                                                    }}
                                                    onClick={() => {
                                                        var book_name =
                                                            book.name.replace(
                                                                /\//g,
                                                                " "
                                                            );
                                                        handleDetails(
                                                            `${book_name}/${book.id}/${book.library_id}`
                                                        );
                                                    }}
                                                >
                                                    <div className="card-image">
                                                        <img
                                                            // src="images/Group95.svg"
                                                            loading="lazy"
                                                            className="case-studies-card-img"
                                                            alt="image"
                                                            src={
                                                                site_name_image_path
                                                                    ? site_name_image_path
                                                                    : defaultBook
                                                            }
                                                            onError={({
                                                                currentTarget,
                                                            }) => {
                                                                currentTarget.onerror =
                                                                    null; // prevents looping
                                                                currentTarget.src =
                                                                    defaultBook;
                                                            }}
                                                            onLoad={() =>
                                                                setIsLoading(
                                                                    false
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="card-details text-center pt-4">
                                                        <h6 className="m-0 pb-1">
                                                            {book.name
                                                                ? book.name
                                                                : "NA"}
                                                        </h6>
                                                    </div>
                                                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                        <div
                                                            style={{
                                                                width: "fit-content",
                                                                padding:
                                                                    "auto 5px",
                                                            }}
                                                        >
                                                            <div className="d-flex align-items-center gap-3">
                                                                <span className="badge badge-info">
                                                                    {book.items
                                                                        .length &&
                                                                    book
                                                                        .items[0]
                                                                        .format ===
                                                                        3
                                                                        ? "E-Book"
                                                                        : "Book"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn-white frontend-btn"
                                                                onClick={() => {
                                                                    var book_name =
                                                                        book.name.replace(
                                                                            /\//g,
                                                                            " "
                                                                        );
                                                                    handleDetails(
                                                                        `${book_name}/${book.id}/${book.library_id}`
                                                                    );
                                                                }}
                                                            >
                                                                <span>
                                                                    {" "}
                                                                    Read More
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="card-details text-center pt-3">
                                <h6 className="m-0 pb-1">
                                    No Books Available.
                                </h6>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="spinner">
                    <img src="/public/images/301.gif" />
                </div>
            )}
        </section>
    );
};

const ETrending = (props) => {
    if (
        window.location.origin.toString() ==
        "https://dindayalupadhyay.smartcitylibrary.com"
    ) {
        var current_library_id = 111;
    } else if (
        window.location.origin.toString() ==
        "https://kundanlalgupta.smartcitylibrary.com"
    ) {
        var current_library_id = 222;
    } else if (
        window.location.origin.toString() ==
        "https://rashtramatakasturba.smartcitylibrary.com"
    ) {
        var current_library_id = 333;
    } else {
        var current_library_id = 111;
    }
    const [isLoading, setIsLoading] = useState(false);

    const [prevLimit, setPrevLimit] = useState(10);
    const [prevSkip, setPrevSkip] = useState(0);
    const [details, setDetails] = useState([]);
    const [formgenre, setformGenre] = useState("");
    const [formauthors, setformauthors] = useState("");
    const [formpublishers, setformpublishers] = useState("");
    const [formlanguages, setformlanguages] = useState(0);
    const [formformats, setformformats] = useState(0);
    const [formlibrary_id, setLibraryId] = useState(current_library_id);
    const [term, setTerm] = useState("");
    const navigate = useNavigate();
    const handleDetails = (previewLink) => {
        navigate("/search/book&" + previewLink);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);

            const resources = await axios.get(
                `${window.location.origin.toString()}/api/v1/books?order_by=created_at&limit=${4}&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${3}&for_featured_books=true`
            );

            setDetails(resources.data.data);
            setIsLoading(false);
        };
        fetchDetails();
    }, []);
    return (
        <section className="case-studies" id="trending-section">
            {details.length !== 0 ? (
                <div className="container">
                    <div className="row grid-margin">
                        <div className="col-12 text-center common-heading pb-5">
                            <h2
                                style={{
                                    fontSize: "3rem",
                                    fontFamily: "Philosopher",
                                }}
                            >
                                Featured E-Books
                            </h2>
                            <div className="section-divider divider-traingle"></div>
                        </div>
                        {details.length !== 0 ? (
                            details.slice(0, 4).map((book, i) => {
                                if (book.library_id == "111") {
                                    var site_name_image_path = `https://dindayalupadhyay.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                                } else if (book.library_id == "222") {
                                    var site_name_image_path = `https://kundanlalgupta.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                                } else {
                                    var site_name_image_path = `https://rashtramatakasturba.smartcitylibrary.com/uploads/books/thumbnail/${book.image}`;
                                }

                                return (
                                    <div
                                        key={i}
                                        className="col-12 col-md-6 col-lg-3 stretch-card mb-3 mb-lg-0"
                                        data-aos="zoom-in"
                                    >
                                        <div className="card color-cards">
                                            <div className="card-body p-0">
                                                <div
                                                    className="text-center card-contents"
                                                    style={{
                                                        backgroundColor:
                                                            "#f2f2f2",
                                                    }}
                                                    onClick={() => {
                                                        var book_name =
                                                            book.name.replace(
                                                                /\//g,
                                                                " "
                                                            );
                                                        handleDetails(
                                                            `${book_name}/${book.id}/${book.library_id}`
                                                        );
                                                    }}
                                                >
                                                    <div className="card-image">
                                                        <img
                                                            // src="images/Group95.svg"
                                                            loading="lazy"
                                                            className="case-studies-card-img"
                                                            alt="image"
                                                            src={
                                                                site_name_image_path
                                                                    ? site_name_image_path
                                                                    : defaultBook
                                                            }
                                                            onError={({
                                                                currentTarget,
                                                            }) => {
                                                                currentTarget.onerror =
                                                                    null; // prevents looping
                                                                currentTarget.src =
                                                                    defaultBook;
                                                            }}
                                                            onLoad={() =>
                                                                setIsLoading(
                                                                    false
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="card-details text-center pt-4">
                                                        <h6 className="m-0 pb-1">
                                                            {book.name
                                                                ? book.name
                                                                : "NA"}
                                                        </h6>
                                                    </div>
                                                    <div className="card-desc-box d-flex align-items-center justify-content-around">
                                                        <div
                                                            style={{
                                                                width: "fit-content",
                                                                padding:
                                                                    "auto 5px",
                                                            }}
                                                        >
                                                            <div className="d-flex align-items-center gap-3">
                                                                <span className="badge badge-info">
                                                                    {book.items
                                                                        .length &&
                                                                    book
                                                                        .items[0]
                                                                        .format ===
                                                                        3
                                                                        ? "E-Book"
                                                                        : "Book"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                className="btn btn-white frontend-btn"
                                                                onClick={() => {
                                                                    var book_name =
                                                                        book.name.replace(
                                                                            /\//g,
                                                                            " "
                                                                        );
                                                                    handleDetails(
                                                                        `${book_name}/${book.id}/${book.library_id}`
                                                                    );
                                                                }}
                                                            >
                                                                <span>
                                                                    {" "}
                                                                    Read More
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="card-details text-center pt-3">
                                <h6 className="m-0 pb-1">
                                    No Books Available.
                                </h6>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="spinner">
                    <img src="/public/images/301.gif" />
                </div>
            )}
        </section>
    );
};

const Hero = (props) => {
    const inputRef = useRef(null);
    const [checkprevvalue, setcheckprevvalue] = useState("N/A");
    const [optionsuggestions, setoptionsuggestions] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const [term, setTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const navigate = useNavigate();
    const handleDetails = (previewLink) => {
        navigate("/search/book&" + previewLink);
    };

    const handleButtonClick = (e) => {
        setTerm(e);
        setcheckprevvalue(e);
        setInputValue(e);

        setoptionsuggestions([]);
    };

    useEffect(() => {
        if (term !== "" && term != checkprevvalue) {
            fetch(
                `${window.location.origin.toString()}/api/v1/books-name?search=${term}&limit=5`
            )
                .then((res) => res.json())
                .then((data) => setoptionsuggestions(data.data));
        }

        /*  */
    }, [term]);

    const onChangevalue = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);

        setTerm(e.target.value);
    };

    return (
        <div className="banner pt-4">
            <div className="container d-flex align-items-center">
                <div className="col-sm-6 banner_text">
                    <h1
                        className="text-4xl font-weight-semibold"
                        style={{ fontSize: "3rem", fontFamily: "Philosopher" }}
                    >
                        {location.origin.includes("dindayalupadhyay")
                            ? "Dindayal Upadhyay Digital Library"
                            : location.origin.includes("kundanlalgupta")
                            ? "Kundanlal Gupta Digital Library"
                            : location.origin.includes("rashtramatakasturba")
                            ? "Rashtramata Kasturba Digital Library"
                            : "Nagpur Digital Library"}
                    </h1>
                    <h6 className="font-weight-normal text-muted pb-3">
                        Serving You Millions of eResources | 24x7 | Everywhere
                    </h6>
                    <div className="s003" id="book_search_home_page_form">
                        <div style={{ width: 400 }}>
                            <div className="search-bar">
                                <div
                                    className="searchByBook"
                                    data-tooltip-id="search"
                                >
                                    {/*  */}

                                    <form>
                                        <div div className="book_drop">
                                            <input
                                                id="onSearch"
                                                value={inputValue}
                                                className="form-control"
                                                type="text"
                                                placeholder="Search here..."
                                                ref={inputRef}
                                                onChange={onChangevalue}
                                                /*   onChange={(e) => handleOnSearch(e.target.value)} */
                                            />

                                            {/* new logic  */}

                                            {optionsuggestions.length !== 0 ? (
                                                <ul class="search-result">
                                                    {optionsuggestions?.map(
                                                        (r) => (
                                                            <li key={r.id}>
                                                                <a
                                                                    className=""
                                                                    onClick={() =>
                                                                        handleDetails(
                                                                            `${r.name}/${r.id}/${r.library_id}`
                                                                        )
                                                                    }
                                                                >
                                                                    <i class="fa fa-book nav-icons pr-2"></i>{" "}
                                                                    {r.name}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        {/*  new logic end here  */}
                                    </form>
                                </div>
                                {/*  {newBookSearch.length ? formatResult(newBookSearch) : null} */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 banner_image">
                    <img
                        src="images/hero-brown.png"
                        alt=""
                        className="img-fluid"
                        style={{ maxWidth: "100%" }}
                    />
                </div>
            </div>
        </div>
    );
};

function TestingApp(props) {
    const searchBookRef = useRef();
    const navigate = useNavigate();
    const member = getCurrentMember();
    const location = useLocation();

    return (
        <>
            {/* <Counter addCount={addCount} siteCounter={siteCounter} /> */}
            <ProgressBar />
            <Header />
            <div className="content-wrapper">
                <Hero />
                <Staff />
                <InfoSection />
                <Trending title="Featured Books" />
                <ETrending title="Featured E-Books" />
            </div>
            <Footer />
            {/*  <BookDetails {...bookModalOptions} /> */}
        </>
    );
}

export default TestingApp;
