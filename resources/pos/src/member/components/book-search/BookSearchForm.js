import React, { useState } from "react";
import { connect } from "react-redux";
import { Col, Row, Button } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import PropTypes from "prop-types";
import "./BookSearch.scss";
import Radio from "../../../shared/components/Radio";
import Select from "../../../shared/components/Select";
import {
    getFormattedMessage,
    placeholderText,
} from "../../../shared/sharedMethod";
import { resetSearchBooks } from "../../store/actions/bookSearchAction";

const BookSearchForm = (props) => {
    const {
        books,
        authors,
        change,
        onSearchBook,
        resetSearchBooks,
        setSearch,
        handleSubmit,
        isAuthorSelected,
        isBookSelected,
        isDisabledSearch,
    } = props;
    const [isAuthorChecked, setIsAuthorChecked] = useState(isAuthorSelected);
    const [isBookChecked, setIsBookChecked] = useState(isBookSelected);
    const [isDisabled, setIsDisabled] = useState(isDisabledSearch);

    const prepareParams = (item) => {
        if (isBookChecked && item) {
            return `id=${item.id}&search_by_book=${true}`;
        } else if (isAuthorChecked && item) {
            return `id=${item.id}&search_by_author=${true}`;
        }
    };

    const searchBook = (formValues) => {
        onSearchBook(prepareParams(formValues.item));
        setSearch(true);
    };

    const onSelectItem = () => {
        setIsDisabled(false);
    };

    const onCheckedBook = () => {
        change("item", null);
        setIsDisabled(true);
        setSearch(false);
        setIsBookChecked((prev) => (prev = !isBookChecked));
        setIsAuthorChecked((prev) => (prev = false));
        resetSearchBooks();
    };

    const onCheckedAuthor = () => {
        change("item", null);
        setIsDisabled((prev) => (prev = true));
        setSearch(false);
        setIsAuthorChecked((prev) => (prev = !isAuthorChecked));
        setIsBookChecked((prev) => (prev = false));
        resetSearchBooks();
    };

    const onResetSearch = () => {
        change("item", null);
        setIsDisabled(true);
        setSearch(false);
        resetSearchBooks();
    };

    return (

        <Row className="filters">
            <Col
                xs={12} sm={3}
                className="book-form__filter-by text-center justify-content-center"
            >
                <span className="book-form__filter-by-label">
                    {placeholderText("books.search-by.label")}
                </span>
                <div className="ml-3">
                    <Field
                        name="filter_by"
                        label={placeholderText(
                            "books.radio.book.label"
                        )}
                        checked={isBookChecked}
                        onChange={onCheckedBook}
                        component={Radio}
                    />
                </div>
                <div className="ml-2">
                    <Field
                        name="filter_by"
                        label={placeholderText(
                            "books.radio.author.label"
                        )}
                        checked={isAuthorChecked}
                        onChange={onCheckedAuthor}
                        component={Radio}
                    />
                </div>
            </Col>
            <Col xs={12} sm={6}>
                <div className="form-group book-form__input-book">
                    <Field
                        name="item"
                        options={isBookChecked ? books : authors}
                        placeholder={
                            isBookChecked
                                ? "books.select.book.placeholder"
                                : "books.select.author.placeholder"
                        }
                        onChange={onSelectItem}
                        // groupText={
                        //     isBookChecked ? "book" : "user-circle-o"
                        // }
                        component={Select}
                        isSearchable={true}
                    />
                </div>
            </Col>
            <Col xs={12} sm={3} className="book-form__btn">
                <Button
                    onClick={handleSubmit(searchBook)}
                    disabled={isDisabled}
                    className="frontend-btn"
                >
                    <span>{placeholderText("global.input.search-btn.label")}</span>
                </Button>
                <Button
                    className="ml-2"
                    onClick={() => onResetSearch()}
                >
                    <span>{placeholderText("global.input.reset-btn.label")}</span>
                </Button>
            </Col>

        </Row >
    );
};

BookSearchForm.propTypes = {
    books: PropTypes.array,
    authors: PropTypes.array,
    isAuthorSelected: PropTypes.bool,
    isBookSelected: PropTypes.bool,
    isDisabledSearch: PropTypes.bool,
    onSearchBook: PropTypes.func,
    resetSearchBooks: PropTypes.func,
    setSearch: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

const bookSearchForm = reduxForm({ form: "bookSearchForm" })(BookSearchForm);
export default connect(null, { resetSearchBooks })(bookSearchForm);
