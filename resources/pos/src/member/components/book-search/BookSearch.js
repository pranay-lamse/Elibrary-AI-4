import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BookSearchForm from "./BookSearchForm";
import BookSearchTable from "./BookSearchTable";
import "./BookSearch.scss";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import EmptyComponent from "../../../shared/empty-component/EmptyComponent";
import {
    getFormattedMessage,
    prepareFullNames,
    placeholderText,
} from "../../../shared/sharedMethod";
import { fetchBooks } from "../../store/actions/bookAction";
import { findBooks } from "../../store/actions/bookSearchAction";
import { fetchSettings } from "../../store/actions/getLanguageAction";
import { fetchAuthors } from "../../store/actions/authorAction";

const BookSearch = (props) => {
    const {
        isLoading,
        books,
        searchBooks,
        authors,
        fetchBooks,
        findBooks,
        fetchAuthors,
        location,
        fetchSettings,
    } = props;
    const [isSearch, setSearch] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const author = params.get("author");
    const book = params.get("book");

    useEffect(() => {
        fetchSettings();
        fetchBooks();
        fetchAuthors();
    }, []);

    if (isLoading && !isSearch) {
        return <ProgressBar />;
    }
    const onSearchBook = (params) => {
        findBooks(params);
    };

    const prepareFormOption = {
        books,
        authors,
        onSearchBook,
        setSearch,
        isBookSelected: !book && author ? false : true,
        isAuthorSelected: author,
        isDisabledSearch: !(!!book || !!author),
        initialValues:
            !!author || !!book
                ? { item: { id: 0, name: book ? book : author } }
                : {},
    };

    return (
        <section className="member_books">
            <div className="container">
                <div className="animated fadeIn">
                    <div className="section-title-center text-center">

                        <h2 className="display-6">
                            {placeholderText("books.title")} </h2>
                        <div className="section-divider divider-traingle">

                        </div>
                    </div>

                    <div className="common-container book-main-section">
                        <Row>
                            <Col xs={12} className="book-search-col">
                                <BookSearchForm
                                    {...prepareFormOption}
                                />
                            </Col>
                            <Col xs={12} className="mt-3">
                                {searchBooks.length > 0 && isSearch ? (
                                    <BookSearchTable
                                        books={searchBooks}
                                    />
                                ) : searchBooks.length === 0 &&
                                    isSearch &&
                                    !isLoading ? (
                                    <EmptyComponent
                                        isShort={true}
                                        title={placeholderText(
                                            "books.empty-message"
                                        )}
                                    />
                                ) : null}
                            </Col>
                            <ProgressBar />
                        </Row>
                    </div>
                </div>
            </div>
        </section>
    );
};

BookSearch.propTypes = {
    location: PropTypes.object,
    books: PropTypes.array,
    authors: PropTypes.array,
    searchBooks: PropTypes.array,
    isLoading: PropTypes.bool,
    fetchBooks: PropTypes.func,
    fetchAuthors: PropTypes.func,
    findBooks: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { books, searchBooks, authors, isLoading } = state;
    return {
        books,
        searchBooks,
        authors: prepareFullNames(authors),
        isLoading,
    };
};
export default connect(mapStateToProps, {
    fetchSettings,
    fetchBooks,
    fetchAuthors,
    findBooks,
})(BookSearch);
