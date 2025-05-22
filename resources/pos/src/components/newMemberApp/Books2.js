import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";

import {
    fetchBooksAll2,
    fetchBooksByNameOrAuthors,
} from "../../member/store/actions/bookAction";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import { getCurrentMember } from "../../shared/sharedMethod";

import ReactPaginate from "react-paginate";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Header from "./Header";
import Footer from "./Footer";
import { fetchGenresWithout } from "../../admin/store/actions/genreAction";
import { fetchPublishersWithout } from "../../admin/store/actions/publisherAction";
import { fetchAuthorsWithoutToken } from "../../member/store/actions/authorAction";
import { fetchBookLanguagesWithout } from "../../admin/store/actions/bookLanguageAction";
import libraryStatus from "./libraryStatus.json";
import { isEmpty } from "lodash";
import { Tooltip as ReactToolTip } from "react-tooltip";
import ReactSelect from "../../shared/select/reactSelect";
import { useTransition } from "react";

const renderToolTips = (data) =>
    data.map((item, i) => (
        <ReactToolTip
            key={i}
            id={item.id}
            place="bottom"
            content={item.content}
            style={{ zIndex: 999 }}
        />
    ));

function Items({ currentItems: books, handleDetails }) {
    return books ? (
        books.map((book, i) => {
            // const modifiedUrl = book.image_path;

            const modifiedUrl = book.image_path
                ? book.image_path.replace(/\/(books)(\/|$)/, "/$1/thumbnail$2")
                : null;
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
                                onClick={() =>
                                    book.items.length
                                        ? handleDetails(
                                              book.id,
                                              book.name,
                                              book.items[0].format,
                                              book.library_id
                                          )
                                        : handleDetails(
                                              book.id,
                                              book.name,
                                              null,
                                              book.library_id
                                          )
                                }
                            >
                                <div className="card-image">
                                    <img
                                        // src="images/Group95.svg"
                                        loading="lazy"
                                        src={modifiedUrl}
                                        className="case-studies-card-img"
                                        alt=""
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src =
                                                "https://cdn-icons-png.flaticon.com/512/3845/3845824.png";
                                        }}
                                    />
                                </div>
                                <div className="card-details text-center pt-3">
                                    <h6 className="m-0 pb-1">
                                        {book.name
                                            ? book.name.length > 40
                                                ? book.name
                                                      .slice(0, 20)
                                                      .concat("...")
                                                : book.name
                                            : "NA"}
                                    </h6>
                                </div>
                                <div className="card-desc-box d-flex flex-column align-items-center justify-content-around">
                                    <div
                                        className=""
                                        style={{
                                            width: "fit-content",
                                            padding: "auto 5px",
                                        }}
                                    >
                                        <div className="d-flex flex-column align-items-center library_badge">
                                            <span className="badge badge-info">
                                                {!isEmpty(
                                                    book?.items.find(
                                                        (item) =>
                                                            item.format === 3
                                                    ) &&
                                                        book?.items.find(
                                                            (item) =>
                                                                item.format ===
                                                                1
                                                        )
                                                )
                                                    ? "E-Book / Book"
                                                    : book?.items.find(
                                                          (item) =>
                                                              item.format === 3
                                                      )
                                                    ? "E-Book"
                                                    : "Book"}
                                            </span>

                                            {book?.library_id === 111 ? (
                                                <span className="badge badge-danger">
                                                    Dindayal Upadhyay Library
                                                </span>
                                            ) : book?.library_id === 222 ? (
                                                <span className="badge badge-danger">
                                                    Kundanlal Gupta Library
                                                </span>
                                            ) : (
                                                <span className="badge badge-danger">
                                                    Rashtramata Kasturba Library
                                                </span>
                                            )}
                                        </div>
                                        <div className="available_book">
                                            {book.items.find(
                                                (item) => item.status === 1
                                            ) ? (
                                                <span className="badge badge-success">
                                                    Available
                                                </span>
                                            ) : (
                                                <span className="badge badge-danger">
                                                    Unavailable
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-white frontend-btn"
                                        onClick={() =>
                                            handleDetails(book.id, book.name)
                                        }
                                    >
                                        <span>Read More</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    ) : (
        <div className="card-details text-center pt-3">
            <h6 className="m-0 pb-1">No Books Available.</h6>
        </div>
    );
}

const BookList = (props) => {
    const {
        fetchBooksByNameOrAuthors,
        books,
        goTo,
        genres,
        publishers,
        authors,
        filteredBooks,
        setFilteredBooks,
        bookLanguage,
        newBookSearch,
        skip,
        setSkip,
        toPage,
        setToPage,
    } = props;
    const [filter, setFilter] = useState("book");
    const [isSpinner, setIsSpinner] = useState(true);
    const navigate = useNavigate();
    const itemsPerPage = 12;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems =
        filteredBooks.length && filteredBooks.slice(itemOffset, endOffset);
    const pageCount = parseInt(Math.ceil(filteredBooks.length / itemsPerPage));
    const [isPending, startTransition] = useTransition();

    const [value, setValue] = useState("");

    const [genreId, setGenreId] = useState("");
    const [publisherId, setPublisherId] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [languageId, setLanguageId] = useState("");
    const [libraryId, setLibraryId] = useState("");
    const [formatId, setFormatId] = useState("");
    const [inputText, setInputText] = useState("");

    const dispatch = useDispatch();

    const handlePageClick = (event) => {
        window.scroll({ top: 0, behavior: "smooth" });
        const newOffset = (event.selected * itemsPerPage) % books.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };
    // console.log(
    //     `Loading items from ${itemOffset} to ${endOffset} pagecount ${pageCount} toPage ${toPage} currentItems : ${currentItems.length}`
    // );

    const handleDetails = (id, name, format, library_id) => {
        if (format && format === 3) {
            navigate("/ebook-details/" + id + "/" + library_id);
        } else {
            navigate(
                "/search/book&" +
                    name.replaceAll(" ", "") +
                    "/" +
                    id +
                    "/" +
                    library_id
            );
        }
    };

    const genreOnChange = (obj) => {
        setGenreId(obj);
    };
    const publisherOnChange = (obj) => {
        setPublisherId(obj);
    };
    const authorOnChange = (obj) => {
        setAuthorId(obj);
    };
    const languageOnChange = (obj) => {
        setLanguageId(obj);
    };
    const libraryOnChange = (obj) => {
        setLibraryId(obj);
    };
    const formatOnChange = (obj) => {
        setFormatId(obj);
    };

    useEffect(() => {
        let fb = [];
        if (libraryId) {
            if (fb.length) {
                fb = fb.filter((book) => book.library_id == libraryId.value);
                setFilteredBooks(fb);
            } else {
                fb = books.filter((book) => book.library_id == libraryId.value);
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (formatId) {
            if (fb.length) {
                fb = fb.filter((book) =>
                    book.items.find((book) => book.format == formatId.value)
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter((book) =>
                    book.items.find((book) => book.format == formatId.value)
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }

        if (genreId) {
            if (fb.length) {
                fb = fb.filter((book) => book.genres[0]?.id == genreId.value);
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) => book.genres[0]?.id == genreId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (publisherId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.items.find(
                            (item) => item.publisher_id == publisherId.value
                        )
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.items.find(
                            (item) => item.publisher_id == publisherId.value
                        )
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (authorId) {
            if (fb.length) {
                fb = fb.filter((book) => book.authors[0]?.id == authorId.value);
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) => book.authors[0]?.id == authorId.value
                );
                setFilteredBooks(fb);
            }
        }
        if (languageId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0].language.id == languageId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0]?.language?.id == languageId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (authorId && genreId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.genres[0]?.id == genreId.value &&
                        book.authors[0]?.id == authorId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.genres[0]?.id == genreId.value &&
                        book.authors[0]?.id == authorId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (languageId && genreId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0]?.id == genreId.value &&
                        book.items[0]?.language.id == languageId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0]?.id == genreId.value &&
                        book.items[0]?.language.id == languageId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (publisherId && genreId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0]?.id == genreId.value &&
                        book.items[0]?.publisher_id == publisherId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0]?.id == genreId.value &&
                        book.items[0]?.publisher_id == publisherId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (publisherId && authorId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0]?.id == authorId.value &&
                        book.items[0]?.publisher_id == publisherId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0]?.id == authorId.value &&
                        book.items[0]?.publisher_id == publisherId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (publisherId && languageId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0]?.language.id == languageId.value &&
                        book.items[0]?.publisher_id == publisherId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.items[0]?.language.id == languageId.value &&
                        book.items[0]?.publisher_id == publisherId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (languageId && authorId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0]?.id == authorId.value &&
                        book.items[0]?.language?.id == languageId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.authors[0]?.id == authorId.value &&
                        book.items[0]?.language?.id == languageId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        if (genreId && publisherId && authorId && languageId) {
            if (fb.length) {
                fb = fb.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0]?.id == genreId.value &&
                        book.items[0]?.publisher_id == publisherId.value &&
                        book.authors[0]?.id == authorId.value &&
                        book.items[0]?.language.id == languageId.value
                );
                setFilteredBooks(fb);
            } else {
                fb = books.filter(
                    (book) =>
                        book.items.length &&
                        book.genres[0]?.id == genreId.value &&
                        book.items[0]?.publisher_id == publisherId.value &&
                        book.authors[0]?.id == authorId.value &&
                        book.items[0]?.language.id == languageId.value
                );
                setFilteredBooks(fb);
            }
            setToPage(0);
        }
        console.log({
            fb,
            genreId,
            publisherId,
            authorId,
            languageId,
            libraryId,
            formatId,
        });
    }, [genreId, publisherId, authorId, languageId, libraryId, formatId]);

    useEffect(() => {
        let fb = [];
        if (location.origin.includes("dindayalupadhyay")) {
            setLibraryId(111);
        } else if (location.origin.includes("kundanlalgupta")) {
            setLibraryId(222);
        } else {
            setLibraryId(333);
        }
        setFilteredBooks(fb);
    }, [location.hash]);

    const itemsOptions = {
        currentItems,
        handleDetails,
    };

    const handleOnSearch = useCallback(
        (string) => {
            startTransition(() => {
                if (string.length) {
                    if (parseInt(string)) {
                        const tempBooks = books.filter((book) =>
                            book.isbn.includes(string)
                        );
                        dispatch({
                            type: "NEW_BOOK_SEARCH",
                            payload: tempBooks,
                        });
                    } else {
                        const tempBooks = books.filter(
                            (book) =>
                                book.name
                                    .toLowerCase()
                                    .includes(string.toLowerCase()) ||
                                book.name.toLowerCase() == string.toLowerCase()
                        );
                        dispatch({
                            type: "NEW_BOOK_SEARCH",
                            payload: tempBooks,
                        });
                    }
                } else {
                    dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
                }
            });
            // console.log(string, results, bookFilter);
        },
        [books]
    );

    const handleOnSelect = (item) => {
        const format = item?.items[0].format;

        // the item selected
        const value = item.name.replaceAll(" ", "");

        if (format === 3) {
            goTo(`/ebook-details/${item.id}/${item.library_id}`);
        } else {
            location.hash = `search/books&${value}/${item.id}/${item.library_id}`;
        }
        dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
        dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
        setGenreId("");
        setPublisherId("");
        setAuthorId("");
        setLanguageId("");
        setLanguageId("");
        setFormatId("");
    };

    const handleFilter = (e) => {
        setFilter((prev) => (prev = e.target.id));
    };

    const formatResult = (item) => {
        return (
            <div className="form-result">
                {item.map((book, i) => {
                    return (
                        <span
                            key={i}
                            style={{ display: "block", textAlign: "left" }}
                            onClick={() => handleOnSelect(book)}
                        >
                            <i className="fa fa-book nav-icons pr-2"></i>{" "}
                            {book.name}{" "}
                            {book?.library_id === 111 ? (
                                <span className="badge badge-info">: L1</span>
                            ) : book?.library_id === 222 ? (
                                <span className="badge badge-info">: L2</span>
                            ) : (
                                <span className="badge badge-info">: L3</span>
                            )}
                        </span>
                    );
                })}
            </div>
        );
    };

    useEffect(() => {
        if (books.length) {
            setTimeout(() => setIsSpinner(false), 2000);
        }
    }, [books.length]);

    useEffect(() => {
        dispatch({ type: "NEW_BOOK_SEARCH", payload: [] });
    }, []);

    useEffect(() => {
        const ele = document.querySelector("#onSearch");
        if (ele) {
            ele.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    if (newBookSearch.length) {
                        navigate("/search-results");
                    }
                }
            });
        }
    }, [newBookSearch.length]);

    const data = [
        {
            id: "genre",
            content: "Filter books by Genre.",
        },
        {
            id: "publisher",
            content: "Filter books by Publisher.",
        },
        {
            id: "author",
            content: "Filter books by Author.",
        },
        {
            id: "language",
            content: "Filter books by Language.",
        },
        {
            id: "format",
            content: "Filter books by Format.",
        },
        {
            id: "library",
            content: "Filter books by Librarries.",
        },
        {
            id: "search",
            content: "Search books by name or isbn.",
        },
        {
            id: "reset",
            content: "Reset all fields.",
        },
    ];

    return (
        <section className="case-studies" id="books-section">
            {!isSpinner ? (
                <div className="container">
                    <div
                        className="s003 d-flex flex-column align-items-center"
                        id="book_search_home_page_form"
                    >
                        <div className="search-bar">
                            <div
                                className="searchByBook"
                                data-tooltip-id="search"
                            >
                                <input
                                    id="onSearch"
                                    className="form-control"
                                    type="text"
                                    placeholder="Search here..."
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                        handleOnSearch(e.target.value);
                                    }}
                                    value={inputText}
                                />
                                {newBookSearch.length && inputText
                                    ? formatResult(newBookSearch)
                                    : null}
                            </div>
                            <div className="reset" data-tooltip-id="reset">
                                <button
                                    className="btn btn-danger frontend-btn ml-2"
                                    onClick={() => {
                                        setInputText("");
                                        setFilteredBooks(newBookSearch);
                                    }}
                                >
                                    <span className="fa fa-search"></span>
                                </button>
                            </div>
                            <div className="reset" data-tooltip-id="reset">
                                <button
                                    className="btn btn-danger frontend-btn ml-2"
                                    onClick={() => {
                                        dispatch({
                                            type: "NEW_BOOK_SEARCH",
                                            payload: [],
                                        });
                                        setGenreId("");
                                        setPublisherId("");
                                        setAuthorId("");
                                        setLanguageId("");
                                        setLanguageId("");
                                        setFormatId("");
                                        setInputText("");
                                        setLibraryId("");
                                    }}
                                >
                                    <span>Reset</span>
                                </button>
                            </div>
                        </div>
                        <div className="search-bar">
                            <div className="col-md-3">
                                <ReactSelect
                                    title="Genre"
                                    placeholder="Select Genre"
                                    value={genreId}
                                    data={
                                        genres
                                            ? genres.map((genre, i) => ({
                                                  label: genre.name,
                                                  value: genre.id,
                                              }))
                                            : []
                                    }
                                    onChange={genreOnChange}
                                    // errors={errors["product_category_id"]}
                                />
                            </div>
                            <div className="col-md-3">
                                <ReactSelect
                                    title="Publisher"
                                    placeholder="Select Publisher"
                                    value={publisherId}
                                    data={
                                        publishers
                                            ? publishers.map(
                                                  (publisher, i) => ({
                                                      label: publisher.name,
                                                      value: publisher.id,
                                                  })
                                              )
                                            : []
                                    }
                                    onChange={publisherOnChange}
                                />
                            </div>
                            <div className="col-md-3">
                                <ReactSelect
                                    title="Author"
                                    placeholder="Select Author"
                                    value={authorId}
                                    data={
                                        authors
                                            ? authors.map((author, i) => ({
                                                  label: author.name,
                                                  value: author.id,
                                              }))
                                            : []
                                    }
                                    onChange={authorOnChange}
                                    // errors={errors["product_category_id"]}
                                />
                            </div>
                            <div className="col-md-3">
                                <ReactSelect
                                    title="Language"
                                    placeholder="Select Language"
                                    value={languageId}
                                    data={
                                        bookLanguage
                                            ? bookLanguage.map(
                                                  (language, i) => ({
                                                      label: language.name,
                                                      value: language.id,
                                                  })
                                              )
                                            : []
                                    }
                                    onChange={languageOnChange}
                                    // errors={errors["product_category_id"]}
                                />
                            </div>
                            <div className="col-md-3">
                                <ReactSelect
                                    title="Format"
                                    placeholder="Select Format"
                                    value={formatId}
                                    data={[
                                        { value: 1, label: "Hardcover" },
                                        { value: 2, label: "PaperBack" },
                                        { value: 3, label: "E-Book" },
                                    ]}
                                    onChange={formatOnChange}
                                    // errors={errors["product_category_id"]}
                                />
                            </div>

                            <div className="col-md-3">
                                <ReactSelect
                                    title="Library"
                                    placeholder="Select Library"
                                    value={libraryId}
                                    data={libraryStatus}
                                    onChange={libraryOnChange}
                                    // errors={errors["product_category_id"]}
                                />
                            </div>
                        </div>
                    </div>
                    {renderToolTips(data)}
                    <div className="col-12 common-heading text-center pb-5">
                        <h2>Our Books Collection</h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>
                    <div className="col-12 common-heading text-left">
                        <div className="book-count-wrapper">
                            <span className="book-count">
                                Showing {currentItems.length} of{" "}
                                {filteredBooks.length} Books
                            </span>
                        </div>
                    </div>
                    <div className="row grid-margin">
                        <Items {...itemsOptions} />
                    </div>
                </div>
            ) : (
                <div className="spinner">
                    <img src="/public/images/301.gif" />
                </div>
            )}

            <div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    // forcePage={toPage}
                />
            </div>
        </section>
    );
};

function Books2(props) {
    const {
        fetchBooksByNameOrAuthors,
        books,
        fetchBooksAll2,
        fetchGenresWithout,
        fetchPublishersWithout,
        fetchAuthorsWithoutToken,
        fetchBookLanguagesWithout,
        genres,
        publishers,
        authors,
        bookLanguage,
        newBookSearch,
    } = props;
    const navigate = useNavigate();
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [skip, setSkip] = useState(0);
    const [toPage, setToPage] = useState(-1);
    const goTo = (url) => {
        navigate(url);
    };

    useEffect(() => {
        fetchGenresWithout({
            order_By: "name",
            direction: "asc",
            search: "",
        });
        fetchPublishersWithout({
            order_By: "name",
            direction: "asc",
            search: "",
        });
        fetchAuthorsWithoutToken({
            order_By: "first_name",
            direction: "asc",
            search: "",
        });
        fetchBookLanguagesWithout({
            order_By: "language_name",
            direction: "asc",
            search: "",
        });
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        setFilteredBooks(books);
    }, [books]);

    useEffect(() => {
        fetchBooksAll2();
    }, []);

    return (
        <>
            <Header getCurrentMember={getCurrentMember} goTo={goTo} />
            <div className="content-wrapper">
                <ProgressBar />
                <div className="container-fluid">
                    <BookList
                        toPage={toPage}
                        setToPage={setToPage}
                        skip={skip}
                        setSkip={setSkip}
                        fetchBooksByNameOrAuthors={fetchBooksByNameOrAuthors}
                        newBookSearch={newBookSearch}
                        books={books}
                        goTo={goTo}
                        genres={genres}
                        publishers={publishers}
                        authors={authors}
                        filteredBooks={filteredBooks}
                        setFilteredBooks={setFilteredBooks}
                        bookLanguage={bookLanguage}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}

const mapStateToProps = (state) => {
    const { books, genres, publishers, authors, bookLanguage, newBookSearch } =
        state;
    return {
        newBookSearch,
        books: books.toReversed(),
        genres:
            genres.length &&
            genres.map((genre) => ({ id: genre.id, name: genre.name })),
        authors:
            authors.length &&
            authors.map((author) => ({
                id: author.id,
                name: author.first_name + author.last_name,
            })),
        publishers:
            publishers.length &&
            publishers.map((publisher) => ({
                id: publisher.id,
                name: publisher.name,
            })),
        bookLanguage:
            bookLanguage.length &&
            bookLanguage.map((language) => ({
                id: language.id,
                name: language.language_name,
            })),
    };
};

export default connect(
    mapStateToProps,
    {
        fetchBooksByNameOrAuthors,
        fetchBookLanguagesWithout,
        fetchAuthorsWithoutToken,
        fetchGenresWithout,
        fetchPublishersWithout,
        fetchBooksAll2,
    },
    null
)(React.memo(Books2));
