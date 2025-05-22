import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "../../";

import Header from "./Header";
import Footer from "./Footer";
import Book from "./bookGet";

import Select from "react-select";

const Books = () => {
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
    /* variable for search */
    const inputRef = useRef(null);
    const inputRefAuthor = useRef(null);
    const inputRefGenre = useRef(null);
    const [optionsuggestions, setoptionsuggestions] = useState([]);
    const [optionsuggestionsAuthor, setoptionsuggestionsAuthor] = useState([]);
    const [optionsuggestionsGenres, setoptionsuggestionsGenres] = useState([]);

    const [details, setDetails] = useState([]);
    const [prevLimit, setPrevLimit] = useState(8);
    const [prevSkip, setPrevSkip] = useState(0);
    /* const [checkprevLimit, setCheckPrevLimit] = useState(20);
    const [checkprevSkip, setCheckPrevSkip] = useState(10); */
    const [term, setTerm] = useState("");
    const [termAuthor, setTermAuthor] = useState("");
    const [termGenre, setTermGenre] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState("");
    const [showValidTextModal, setShowValidTextModal] = useState(false);
    const [genres, setGenre] = useState([]);
    const [authors, setAuthor] = useState([]);
    const [publishers, setPublisher] = useState([]);
    const [languages, setLanguage] = useState([]);
    const [formats, setFormat] = useState([]);
    const [searchText, setsearchText] = useState("");
    const [library, setLibrary] = useState([
        { value: 111, label: "Dindayal Upadhyay Library" },
        { value: 222, label: "Kundanlal Gupta Library" },
        { value: 333, label: "Rashtra Matakasturba Library" },
    ]);

    const [formgenre, setformGenre] = useState("");
    const [formauthors, setformauthors] = useState("");
    const [formpublishers, setformpublishers] = useState("");
    const [formlanguages, setformlanguages] = useState(0);
    const [formformats, setformformats] = useState(0);
    const [formlibrary_id, setLibraryId] = useState(current_library_id);
    const [isLoadMoreAvailable, setIsLoadMoreAvailable] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [inputValueAuthor, setInputValueAuthor] = useState("");
    const [inputValueGenre, setInputValueGenre] = useState("");
    const [selectedValueLibrary, setSelectedValueLibrary] = useState(null);
    const [selectedValuegenres, setSelectedValuegenres] = useState(null);
    const [selectedValueauthors, setSelectedValueauthors] = useState(null);
    const [selectedValuepublishers, setSelectedValuepublishers] =
        useState(null);
    const [selectedValuelanguages, setSelectedValuelanguages] = useState(null);
    const [selectedValueformats, setSelectedValueformats] = useState(null);
    const [checkprevvalue, setcheckprevvalue] = useState("N/A");
    const [checkprevvalueAuthor, setcheckprevvalueAuthor] = useState("N/A");
    const [checkprevvalueGenre, setcheckprevvalueGenre] = useState("N/A");

    function refreshPage() {
        window.location.reload(false);
    }

    /* book fetch start first  */

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            setPrevLimit(8);
            setPrevSkip(0);

            /* setCheckPrevLimit(20) */ /* setCheckPrevSkip(10); */

            const resources = await axios.get(
                `${window.location.origin.toString()}/api/v1/books?order_by=id&limit=${8}&skip=${0}&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${formformats}`
            );

            /*  const resources2 = await axios.get(
                `${window.location.origin.toString()}/api/v1/books?order_by=name&limit=${checkprevLimit}&skip=${checkprevSkip}&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${formformats}`
            ); */
            setDetails(resources.data.data);
            setIsLoading(false);
            /* if (resources2.data.data.length > 0) {
                setIsLoadMoreAvailable(1);
            } */
        };
        fetchDetails();
    }, [
        term,
        termAuthor,
        termGenre,
        formgenre,
        formauthors,
        formpublishers,
        formlanguages,
        formformats,
        formlibrary_id,
    ]);
    /* book fetch start first end  */

    /* other book  on term change start */

    useEffect(() => {
        if (term.trim() !== "" && term != checkprevvalue) {
            fetch(
                `${window.location.origin.toString()}/api/v1/books-name?search=${term}&limit=15`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.data) {
                        // If data.data is present
                        setoptionsuggestions(data.data);
                    } else {
                        // If data.data is not present
                        setoptionsuggestions([]);
                        // Optionally, you can also setDetails to an empty array or null if needed
                    }
                });
        } else {
            setoptionsuggestions([]);
        }

        if (termAuthor !== "" && termAuthor != checkprevvalueAuthor) {
            fetch(
                `${window.location.origin.toString()}/api/v1/authors?search=${termAuthor}&limit=25&order_by=first_name&direction=asc`
            )
                .then((res) => res.json())
                .then((data) => setoptionsuggestionsAuthor(data.data));
        }

        if (termGenre !== "" && termGenre != checkprevvalueGenre) {
            fetch(
                `${window.location.origin.toString()}/api/v1/genres?order_by=name&direction=asc&search=${termGenre}&limit=10`
            )
                .then((res) => res.json())
                .then((data) => setoptionsuggestionsGenres(data.data));
        }

        /*  */
    }, [term, termAuthor, termGenre]);

    /* other book fetch on term change end */
    useEffect(() => {
        /* const fetchGenre = async () => {
            const resources = await axios.get(``);
            setGenre(resources.data.data);
        }; */
        /* const fetchAuthor = async () => {
            const resources = await axios.get(
                `${window.location.origin.toString()}/api/v1/authors?limit=4&order_by=first_name&direction=asc`
            );
            setAuthor(resources.data.data);
        }; */
        const fetchPublisher = async () => {
            const resources = await axios.get(
                `${window.location.origin.toString()}/api/v1/publishers?order_by=name&direction=asc`
            );
            setPublisher(resources.data.data);
        };
        const fetchLanguage = async () => {
            const resources = await axios.get(
                `${window.location.origin.toString()}/api/b1/book-languages?order_by=created_at&direction=asc`
            );
            setLanguage(resources.data.data);
        };
        const fetchFormat = async () => {
            setFormat([
                { value: 1, label: "Hardcover" },
                { value: 2, label: "PaperBack" },
                { value: 3, label: "E-Book" },
            ]);
        };
        /* fetchGenre(); */
        /* fetchAuthor(); */
        fetchPublisher();
        fetchLanguage();
        fetchFormat();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === "" || !text.trim()) {
            setShowValidTextModal(true);
            return;
        }
        /* searchText(text); */
    };
    const handleButtonClick = (e) => {
        setTerm(e);
        setcheckprevvalue(e);
        setInputValue(e);
        setoptionsuggestions([]);
    };
    const handleButtonClickAuthor = (e) => {
        setTermAuthor(e);
        setInputValueAuthor(e);
        setformauthors(e);
        setcheckprevvalueAuthor(e);
        setoptionsuggestionsAuthor([]);
    };

    const handleButtonClickGenre = (e) => {
        setTermGenre(e);
        setInputValueGenre(e);
        setformGenre(e);
        setcheckprevvalueGenre(e);
        setoptionsuggestionsGenres([]);
    };
    const onChangevalue = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
        /* setcheckprevvalue(""); */
        setTerm(e.target.value);
    };
    const onChangevalueAuthor = (e) => {
        e.preventDefault();
        setInputValueAuthor(e.target.value);
        setformauthors(e.target.value);
        setTermAuthor(e.target.value);
    };

    const onChangevalueGenre = (e) => {
        e.preventDefault();
        setInputValueGenre(e.target.value);
        setformGenre(e.target.value);
        setTermGenre(e.target.value);
    };

    const filterformGenre = (e) => {
        setSelectedValuegenres(e);

        setformGenre(e.value);
    };
    const filterformAuthor = (e) => {
        setformauthors(e.value);
        setSelectedValueauthors(e);
    };
    const filterformPublishers = (e) => {
        setformpublishers(e.value);
        setSelectedValuepublishers(e);
    };
    const filterformLanguages = (e) => {
        setSelectedValuelanguages(e);

        setformlanguages(e.value);
    };
    const filterformFormat = (e) => {
        setSelectedValueformats(e);
        setformformats(e.value);
    };

    const filterformLibrary = (e) => {
        setSelectedValueLibrary(e);
        setLibraryId(e.value);
    };

    /* variable for search end */

    const fetchDetails2 = async () => {
        setIsLoading(true);
        setPrevLimit(8);
        setPrevSkip(0);

        const resources = await axios.get(
            `${window.location.origin.toString()}/api/v1/books?order_by=id&limit=${8}&skip=${0}&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${formformats}`
        );

        setDetails(resources.data.data);
        setIsLoading(false);
    };

    const loadMore = async () => {
        const getprevLimit = prevLimit + 8;
        const getprevSkip = prevSkip + 8;

        setPrevLimit(getprevLimit);
        setPrevSkip(getprevSkip);

        /*  const getcheckPrevLimit = getprevLimit + 8;
        const getcheckPrevSkip = getprevSkip + 8;
        setCheckPrevLimit(getcheckPrevLimit);
        setCheckPrevSkip(getcheckPrevSkip); */

        const resources = await axios.get(
            `${window.location.origin.toString()}/api/v1/books?order_by=id&limit=${8}&skip=${getprevSkip}&search=${term}&genre=${formgenre}&library_id=${formlibrary_id}&author=${formauthors}&publisher=${formpublishers}&language=${formlanguages}&format=${formformats}`
        );

        setDetails((oldDetails) => [...oldDetails, ...resources.data.data]);
    };

    return (
        <>
            <Header />

            <section className="case-studies" id="books-section">
                <div className="container">
                    {/* search logic  */}

                    <div
                        className="s003 d-flex flex-column align-items-center"
                        id="book_search_home_page_form"
                    >
                        <div className="search-bar">
                            <div
                                className="searchByBook"
                                data-tooltip-id="search"
                            >
                                <form onSubmit={handleSubmit}>
                                    <div className="book_drop">
                                        <input
                                            id="onSearch"
                                            value={inputValue}
                                            className="form-control"
                                            type="text"
                                            placeholder="Search here..."
                                            ref={inputRef}
                                            onChange={onChangevalue}
                                        />

                                        {optionsuggestions.length !== 0 ? (
                                            <ul class="search-result">
                                                {optionsuggestions?.map((r) => (
                                                    <li key={r.id}>
                                                        <a
                                                            className=""
                                                            onClick={() =>
                                                                handleButtonClick(
                                                                    r.name
                                                                )
                                                            }
                                                        >
                                                            <i class="fa fa-book nav-icons pr-2"></i>{" "}
                                                            {r.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div
                                        className="reset"
                                        data-tooltip-id="reset"
                                    >
                                        <button
                                            className="btn btn-danger frontend-btn ml-2"
                                            onClick={() => {
                                                fetchDetails2();
                                            }}
                                        >
                                            <span className="fa fa-search"></span>
                                        </button>
                                        <a
                                            className="btn btn-danger frontend-btn ml-2"
                                            onClick={() => {
                                                setInputValue("");
                                                setTerm("");
                                                setTermAuthor("");
                                                setTermGenre("");
                                                setInputValueAuthor("");
                                                setInputValueGenre("");
                                                setformGenre(0);
                                                setformauthors(0);
                                                setformpublishers(0);
                                                setformlanguages(0);
                                                setformformats(0);
                                                setLibraryId(
                                                    current_library_id
                                                );
                                                setPrevLimit(4);
                                                setPrevSkip(0);
                                                fetchDetails2();
                                                setSelectedValueLibrary(null);
                                                setSelectedValuegenres(null);
                                                setSelectedValueauthors(null);
                                                setSelectedValuepublishers(
                                                    null
                                                );
                                                setSelectedValuelanguages(null);
                                                setSelectedValueformats(null);
                                                setoptionsuggestions([]);
                                                setoptionsuggestionsAuthor([]);
                                                setoptionsuggestionsGenres([]);
                                            }}
                                        >
                                            <span>Reset</span>
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="search-bar">
                        <div className="col-md-3">
                            {/*  <Select
                                title="Genre"
                                placeholder="Select Genre"
                                value={selectedValuegenres}
                                options={
                                    genres
                                        ? genres.map((genre, i) => ({
                                              label: genre.name,
                                              value: genre.name,
                                          }))
                                        : []
                                }
                                onChange={filterformGenre}
                            /> */}

                            <input
                                id="Genre"
                                value={inputValueGenre}
                                className="form-control"
                                type="text"
                                placeholder="Genre"
                                ref={inputRefGenre}
                                onChange={onChangevalueGenre}
                            />

                            {optionsuggestionsGenres.length !== 0 ? (
                                <ul class="search-result">
                                    {optionsuggestionsGenres?.map((r) => (
                                        <li key={r.id}>
                                            <a
                                                className=""
                                                onClick={() =>
                                                    handleButtonClickGenre(
                                                        r.name
                                                    )
                                                }
                                            >
                                                <i class="fa fa-book nav-icons pr-2"></i>{" "}
                                                {r.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <></>
                            )}
                        </div>

                        <div className="col-md-3">
                            <input
                                id="onAuthrs"
                                value={inputValueAuthor}
                                className="form-control"
                                type="text"
                                placeholder="Author"
                                ref={inputRefAuthor}
                                onChange={onChangevalueAuthor}
                            />

                            {optionsuggestionsAuthor.length !== 0 ? (
                                <ul class="search-result">
                                    {optionsuggestionsAuthor?.map((r) => (
                                        <li key={r.id}>
                                            <a
                                                className=""
                                                onClick={() =>
                                                    handleButtonClickAuthor(
                                                        r.full_name
                                                    )
                                                }
                                            >
                                                <i class="fa fa-book nav-icons pr-2"></i>{" "}
                                                {r.full_name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <></>
                            )}
                        </div>

                        <div className="col-md-3">
                            <Select
                                title="Publishers"
                                value={selectedValuepublishers}
                                placeholder="Select Publishers"
                                options={
                                    publishers
                                        ? publishers.map((publisher, i) => ({
                                              label: publisher.name,
                                              value: publisher.name,
                                          }))
                                        : []
                                }
                                onChange={filterformPublishers}
                            />
                        </div>

                        <div className="col-md-3">
                            <Select
                                title="Languages"
                                placeholder="Select Languages"
                                value={selectedValuelanguages}
                                options={
                                    languages
                                        ? languages.map((language, i) => ({
                                              label: language.language_name,
                                              value: language.id,
                                          }))
                                        : []
                                }
                                onChange={filterformLanguages}
                            />
                        </div>

                        <div className="col-md-3">
                            <Select
                                title="Formats"
                                placeholder="Select Formats"
                                value={selectedValueformats}
                                options={
                                    formats
                                        ? formats.map((genre, i) => ({
                                              label: genre.label,
                                              value: genre.value,
                                          }))
                                        : []
                                }
                                onChange={filterformFormat}
                            />
                        </div>

                        <div className="col-md-3">
                            <Select
                                title="Library"
                                value={selectedValueLibrary}
                                placeholder="Select Library"
                                options={
                                    library
                                        ? library.map((genre, i) => ({
                                              label: genre.label,
                                              value: genre.value,
                                          }))
                                        : []
                                }
                                onChange={filterformLibrary}
                            />
                        </div>
                    </div>

                    {/* search logic end  */}

                    {isLoading ? (
                        <div className="spinner">
                            <img src="/public/images/301.gif" />
                        </div>
                    ) : !details ? (
                        <h1
                            className="loading-name"
                            style={{
                                background: "white",
                                borderRadius: "1rem",
                                color: "#DB4437",
                                padding: "1rem",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                fontSize: 33,
                                fontFamily: "Inria Serif",
                                transform: "translate(-50%,-50%)",
                                textTransform: "capitalize",
                            }}
                        >
                            😞 Couldn't find books about {term}
                        </h1>
                    ) : (
                        <>
                            <div className="col-12 common-heading text-center pt-4 pb-5">
                                <h2>Our Books Collection</h2>
                                <div className="section-divider divider-traingle"></div>
                            </div>
                            <div className="col-12 common-heading text-left">
                                <div className="book-count-wrapper">
                                    <span className="book-count"></span>
                                </div>
                            </div>
                            <div className="row grid-margin">
                                {details.map((book, index) => (
                                    <Book {...book} key={index} />
                                ))}
                            </div>
                            {isLoadMoreAvailable ? (
                                <div className="load-more pt-5">
                                    <button
                                        className="btn btn-white frontend-btn"
                                        onClick={() => loadMore()}
                                    >
                                        Load More
                                    </button>
                                </div>
                            ) : (
                                <>No Book Found</>
                            )}
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Books;
