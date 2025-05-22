import React, { useEffect, useRef, useState } from "react";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import Header from "./Header";
import Footer from "./Footer";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { resourceExcelAction } from "../../store/action/resourcesAction";
import { fetchResources } from "../../store/action/resourcesAction2";

import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
import { getCurrentMember } from "../../shared/sharedMethod";
import ReactDataTable from "../../shared/table/ReactDataTable";
import ResourcePDFModal from "./ResourcePDFModal";
import { Button } from "reactstrap";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResourceVideoModal from "./ResourceVideoModal";
import axios from "axios";

function Resources(props) {
    const {
        fetchResourceCategory,

        resourceCategory,
        resourceExcelAction,
        isLoading,
    } = props;
    const [modal, setModal] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [videoFilePath, setVideoFilePath] = useState("");
    const [videoModal, setVideoModal] = useState(false);
    const [filePath, setFilePath] = useState("");
    const [itemsValue, setItemsValue] = useState([]);
    const [isSpinner, setIsSpinner] = useState(true);
    const member = getCurrentMember();
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("one");
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);
    const [details, setDetails] = useState([]);
    const [term, setTerm] = useState("");
    const [optionsuggestions, setoptionsuggestions] = useState([]);
    const [checkprevvalue, setcheckprevvalue] = useState("N/A");

    const [term2, setTerm2] = useState("");
    const [resources2, setresources] = useState([]);
    const [resources3, setresources2] = useState([]);
    const [resources4, setresources3] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumbers, setPageNumbers] = useState([]);
    const [category_id, setcategory_id] = useState(1);

    const toggle = () => setModal(!modal);

    const onChange = (filter) => {
        fetchResources(filter, true);
        fetchResourceCategory();
    };

    const categoryOnChange = (e) => setCategoryId(e.target.value);
    useEffect(() => {
        fetchResources();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);

    useEffect(() => {
        setTimeout(() => setIsSpinner(false), 500);
    }, []);

    const handleCategoryChange = (category) => {
        if (selectedCategory != category) {
            setresources([]);
            setCurrentPage(1);
        }

        if (category == "one") {
            setcategory_id(1);
        } else if (category == "two") {
            setcategory_id(2);
        } else if (category == "three") {
            setcategory_id(3);
        } else {
            setcategory_id(1);
        }

        setSelectedCategory(category);
    };

    const onChangevalue = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
        /* setcheckprevvalue(""); */
        setTerm(e.target.value);
    };

    useEffect(() => {
        if (term.trim() !== "") {
            fetch(
                `https://dindayalupadhyay.smartcitylibrary.com/api/resources?search=${term}`
            )
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.data) {
                        // If data.data is present
                        setoptionsuggestions(data.data);
                        setDetails(data.data);
                    } else {
                        // If data.data is not present
                        setoptionsuggestions([]);
                        // Optionally, you can also setDetails to an empty array or null if needed
                        setDetails([]);
                    }
                });
        } else {
            // If term is an empty string
            setoptionsuggestions([]);
            setDetails([]);
        }
    }, [term]);

    const fetchResources2 = async () => {
        const response = await fetch(
            `https://dindayalupadhyay.smartcitylibrary.com/api/resources?search=${term2}&skip=${
                (currentPage - 1) * 12
            }&limit=12&category_id=${category_id}`
        );
        const data = await response.json();

        setresources((prevResources) => [...prevResources, ...data.data]);

        setTotalPages(Math.ceil(data.total / 12)); // Assuming 2 items per page
    };

    useEffect(() => {
        fetchResources2();
    }, [term2, currentPage, category_id]);

    const handleNextPage = () => {
        /* if (currentPage < totalPages) {
        console.log("here inside"); */
        setCurrentPage(currentPage + 1);
        /*  window.scrollTo({
            top: 0,
            behavior: "smooth", // Add smooth scrolling behavior
        }); */
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleButtonClick = (e) => {
        setTerm(e);
        setcheckprevvalue(e);

        setInputValue(e);
        setoptionsuggestions([]);
    };

    const fetchDetails2 = () => {
        setDetails([]);
        setTerm("");
    };

    const hideSuggestion = () => {
        setoptionsuggestions([]);
    };

    useEffect(() => {
        const numbers = [];
        for (let i = 1; i <= totalPages; i++) {
            numbers.push(i);
        }
        setPageNumbers(numbers);
    }, [totalPages]);

    const handlePageChange = (page) => {
        /* onPageChange(page); */
        setCurrentPage(page);

        /* console.log("page", page); */
    };

    return (
        <div>
            <ProgressBar />
            <Header />

            <section id="resources-list">
                {details.length !== 0 ? (
                    <div className="container">
                        <div className="col-12 common-heading text-center pt-4 pb-5">
                            <h2>eResources</h2>
                            <div className="section-divider divider-traingle"></div>
                        </div>

                        <div
                            className="s003 d-flex flex-column align-items-center"
                            id="book_search_home_page_form"
                        >
                            <div className="search-bar">
                                <div
                                    className="searchByBook"
                                    data-tooltip-id="search"
                                >
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
                                            <ul className="search-result">
                                                {optionsuggestions?.map((r) => (
                                                    <li key={r.id}>
                                                        <a
                                                            className=""
                                                            onClick={() =>
                                                                handleButtonClick(
                                                                    r.title
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-book nav-icons pr-2"></i>{" "}
                                                            {r.title}
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
                                                hideSuggestion();
                                            }}
                                        >
                                            <span className="fa fa-search"></span>
                                        </button>
                                        <a
                                            className="btn btn-danger frontend-btn ml-2"
                                            onClick={() => {
                                                setInputValue("");
                                                setTerm("");
                                                fetchDetails2();

                                                setoptionsuggestions([]);
                                            }}
                                        >
                                            <span>Reset</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" text-center">
                            <div className="module">
                                {details.map((item) => (
                                    <article
                                        className="tag-guides sal-animate"
                                        data-sal="zoom-in"
                                        data-sal-duration="100"
                                        data-sal-delay="100"
                                        key={item.id}
                                    >
                                        <h5>
                                            {" "}
                                            {item.category_id == 1
                                                ? "Documents"
                                                : ""}
                                            {item.category_id == 2
                                                ? "Multimedia"
                                                : ""}
                                            {item.category_id == 3
                                                ? "Quick Links"
                                                : ""}
                                        </h5>
                                        <h4>
                                            <a
                                                href={`#/eresources-details/${item.id}`}
                                                className=" guides-button"
                                            >
                                                {item.title ? item.title : ""}
                                            </a>
                                        </h4>
                                        <p>
                                            {item.note
                                                ? item.note.length > 120
                                                    ? item.note.slice(0, 120) +
                                                      "..."
                                                    : item.note
                                                : ""}
                                        </p>
                                        {item.category_id == 3 ? (
                                            <a
                                                href={item.url ? item.url : "#"}
                                                className="button guides-button"
                                                target="_blank"
                                            >
                                                Visit
                                            </a>
                                        ) : (
                                            <a
                                                href={`#/eresources-details/${item.id}`}
                                                className="button guides-button"
                                            >
                                                Visit
                                            </a>
                                        )}
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="col-12 common-heading text-center pt-4 pb-5">
                            <h2>eResources</h2>
                            <div className="section-divider divider-traingle"></div>
                        </div>

                        <div
                            className="s003 d-flex flex-column align-items-center"
                            id="book_search_home_page_form"
                        >
                            <div className="search-bar">
                                <div
                                    className="searchByBook"
                                    data-tooltip-id="search"
                                >
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
                                            <ul className="search-result">
                                                {optionsuggestions?.map((r) => (
                                                    <li key={r.id}>
                                                        <a
                                                            className=""
                                                            onClick={() =>
                                                                handleButtonClick(
                                                                    r.title
                                                                )
                                                            }
                                                        >
                                                            <i className="fa fa-book nav-icons pr-2"></i>{" "}
                                                            {r.title}
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
                                                hideSuggestion();
                                            }}
                                        >
                                            <span className="fa fa-search"></span>
                                        </button>
                                        <a
                                            className="btn btn-danger frontend-btn ml-2"
                                            onClick={() => {
                                                setInputValue("");
                                                setTerm("");
                                                fetchDetails2();

                                                setoptionsuggestions([]);
                                            }}
                                        >
                                            <span>Reset</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {resources2 ? (
                            <ul
                                id="resources-filter"
                                className="nav filter-buttons nav-tabs"
                                role="tablist"
                            >
                                <li className="nav-item">
                                    <button
                                        className={`button filter-button nav-link ${
                                            selectedCategory === "one"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleCategoryChange("one")
                                        }
                                    >
                                        <i className="now-ui-icons objects_umbrella-13"></i>{" "}
                                        Documents
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`button filter-button nav-link ${
                                            selectedCategory === "two"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleCategoryChange("two")
                                        }
                                    >
                                        <i className="now-ui-icons shopping_cart-simple"></i>{" "}
                                        Multimedia
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`button filter-button nav-link ${
                                            selectedCategory === "three"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleCategoryChange("three")
                                        }
                                    >
                                        <i className="now-ui-icons objects_umbrella-13"></i>{" "}
                                        Quick Links
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            ""
                        )}

                        <div
                            className="tab-content  text-center"
                            style={{ marginBottom: "40px" }}
                        >
                            <div
                                className={`tab-pane ${
                                    selectedCategory === "one" ? "active" : ""
                                }`}
                                id="one"
                                role="tabpanel"
                            >
                                <div className="module">
                                    {resources2.map((item) => (
                                        <article
                                            className="tag-guides sal-animate"
                                            data-sal="zoom-in"
                                            data-sal-duration="100"
                                            data-sal-delay="100"
                                            key={item.id}
                                        >
                                            <h5>
                                                {" "}
                                                {item.category_id == 1
                                                    ? "Documents"
                                                    : ""}
                                                {item.category_id == 2
                                                    ? "Multimedia"
                                                    : ""}
                                                {item.category_id == 3
                                                    ? "Quick Links"
                                                    : ""}
                                            </h5>
                                            <h4>
                                                <a
                                                    href={`#/eresources-details/${item.id}`}
                                                    className=" guides-button"
                                                >
                                                    {item.title
                                                        ? item.title
                                                        : ""}
                                                </a>
                                            </h4>
                                            <p>
                                                {item.note
                                                    ? item.note.length > 120
                                                        ? item.note.slice(
                                                              0,
                                                              120
                                                          ) + "..."
                                                        : item.note
                                                    : ""}
                                            </p>

                                            <a
                                                href={`#/eresources-details/${item.id}`}
                                                className="button guides-button"
                                            >
                                                Visit
                                            </a>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={`tab-pane ${
                                    selectedCategory === "two" ? "active" : ""
                                }`}
                                id="two"
                                role="tabpanel"
                            >
                                <div className="module">
                                    {resources2.map((item) => (
                                        <article
                                            className="tag-guides sal-animate"
                                            data-sal="zoom-in"
                                            data-sal-duration="100"
                                            data-sal-delay="100"
                                            key={item.id}
                                        >
                                            <h5>
                                                {" "}
                                                {item.category_id == 1
                                                    ? "Documents"
                                                    : ""}
                                                {item.category_id == 2
                                                    ? "Multimedia"
                                                    : ""}
                                                {item.category_id == 3
                                                    ? "Quick Links"
                                                    : ""}
                                            </h5>
                                            <h4>
                                                <a
                                                    href={`#/eresources-details/${item.id}`}
                                                    className=" guides-button"
                                                >
                                                    {item.title
                                                        ? item.title
                                                        : ""}
                                                </a>
                                            </h4>
                                            <p>
                                                {item.note
                                                    ? item.note.length > 120
                                                        ? item.note.slice(
                                                              0,
                                                              120
                                                          ) + "..."
                                                        : item.note
                                                    : ""}
                                            </p>
                                            <a
                                                href={`#/eresources-details/${item.id}`}
                                                className="button guides-button"
                                            >
                                                Visit
                                            </a>
                                        </article>
                                    ))}
                                </div>
                            </div>

                            <div
                                className={`tab-pane ${
                                    selectedCategory === "three" ? "active" : ""
                                }`}
                                id="three"
                                role="tabpanel"
                            >
                                <div className="module">
                                    {resources2.map((item) => (
                                        <article
                                            className="tag-guides sal-animate"
                                            data-sal="zoom-in"
                                            data-sal-duration="100"
                                            data-sal-delay="100"
                                            key={item.id}
                                        >
                                            <h5>
                                                {" "}
                                                {item.category_id == 1
                                                    ? "Documents"
                                                    : ""}
                                                {item.category_id == 2
                                                    ? "Multimedia"
                                                    : ""}
                                                {item.category_id == 3
                                                    ? "Quick Links"
                                                    : ""}
                                            </h5>
                                            <h4>
                                                <a
                                                    href={`#/eresources-details/${item.id}`}
                                                    className=" guides-button"
                                                >
                                                    {item.title
                                                        ? item.title
                                                        : ""}
                                                </a>
                                            </h4>
                                            <p>
                                                {item.note
                                                    ? item.note.length > 120
                                                        ? item.note.slice(
                                                              0,
                                                              120
                                                          ) + "..."
                                                        : item.note
                                                    : ""}
                                            </p>
                                            {item.category_id == 3 ? (
                                                <a
                                                    href={
                                                        item.url
                                                            ? item.url
                                                            : "#"
                                                    }
                                                    className="button guides-button"
                                                    target="_blank"
                                                >
                                                    Visit
                                                </a>
                                            ) : (
                                                <a
                                                    href={`#/eresources-details/${item.id}`}
                                                    className="button guides-button"
                                                >
                                                    Visit
                                                </a>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="btn btn-white frontend-btn"
                            style={{ marginLeft: "10px" }}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>

            <br />
            <Footer />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { resourceCategory, isLoading } = state;
    return {
        resourceCategory,
        isLoading,
    };
};

export default connect(mapStateToProps, {
    fetchResources,
    fetchResourceCategory,
    resourceExcelAction,
})(Resources);
