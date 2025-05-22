import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import "./BookCirculationDetails.scss";
import BookCirculationDetailsModal from "./BookCirculationDetailsModal";
import { bookFormatOptions } from "../../constants";
import { Routes } from "../../constants";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import {
    dateFormatter,
    getFormattedMessage,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import BookStatus from "../../shared/book-status/book-status";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import { fetchBookCirculation } from "../../admin/store/actions/bookCirculationAction";
import { toggleModal } from "../../store/action/modalAction";
import { useParams, useNavigate } from "react-router-dom";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const BookCirculationDetail = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [isToggle, setIsToggle] = useState(false);
    useEffect(() => {
        fetchBookCirculation(params.id);
    }, []);
    const { bookHistory, fetchBookCirculation, toggleModal, history, match } =
        props;
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);

    if (!bookHistory) {
        return <TopProgressBar />;
    }

    const onOpenModal = () => {
        setIsToggle(true);
        toggleModal();
    };

    const goBack = () => {
        navigate(-1);
    };

    const renderBookStatus = (bookHistory) => {
        const statusProps = { status: bookHistory.status, item: bookHistory };
        return <BookStatus {...statusProps} item={bookHistory} />;
    };

    const cardModalProps = { isToggle, toggleModal, bookHistory };
    const { book_item } = bookHistory;
    const { book } = book_item;
    const bookItemFormat = booksFormatOptions.find(
        (bookFormat) => bookFormat.id === +book_item.format
    );

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle
                title={placeholderText("book-circulation-details.title")}
            />
            <div className="animated fadeIn">
                {/* <HeaderTitle title="Book Circulation Details" /> */}
                <Row>
                    <Col
                        sm={12}
                        className="mb-2 d-block d-sm-flex justify-content-between"
                    >
                        <h5 className="page-heading w-100">
                            {placeholderText("book-circulation-details.title")}
                        </h5>
                        <div className="d-block d-sm-flex">
                            <Button
                                className="mr-2"
                                color="primary text-white"
                                onClick={() => onOpenModal()}
                            >
                                {placeholderText(
                                    "books-circulation.modal.edit.title"
                                )}
                            </Button>
                            <Button
                                className="float-right"
                                onClick={() => goBack()}
                            >
                                {placeholderText("global.input.back-btn.label")}
                            </Button>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card>
                                <CardBody>
                                    <Row className="no-gutters">
                                        <div className="book-history-detail">
                                            <div className="book-history-detail__item-container">
                                                <div className="book-history-detail__item-name">
                                                    <span className="book-history-detail__item-name-heading">
                                                        {placeholderText(
                                                            "books-circulation.select.book.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        <Link
                                                            to={`${
                                                                Routes.BOOKS +
                                                                book.id
                                                            }/details`}
                                                        >
                                                            {book.name}
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="book-history-detail__item-container">
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {placeholderText(
                                                            "books.items.input.book-code.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {book_item.book_code}
                                                    </span>
                                                </div>
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {placeholderText(
                                                            "books-circulation.select.member.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        <Link
                                                            to={`${
                                                                Routes.MEMBERS +
                                                                bookHistory.member_id
                                                            }/details`}
                                                        >
                                                            {bookHistory.member
                                                                .first_name +
                                                                " " +
                                                                bookHistory
                                                                    .member
                                                                    .last_name}
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {placeholderText(
                                                            "books.items.select.language.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {book_item.language
                                                            ? book_item.language
                                                                  .language_name
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {placeholderText(
                                                            "books.items.select.publisher.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {book_item.publisher
                                                            ? book_item
                                                                  .publisher
                                                                  .name
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {placeholderText(
                                                            "books.items.select.format.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {bookItemFormat
                                                            ? bookItemFormat.name
                                                            : null}
                                                    </span>
                                                </div>
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {placeholderText(
                                                            "books.items.input.edition.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {book_item.edition}
                                                    </span>
                                                </div>
                                                <div className="book-history-detail__item">
                                                    <span className="book-history-detail__item-heading">
                                                        {placeholderText(
                                                            "books-circulation.select.status.label"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {" "}
                                                        {renderBookStatus(
                                                            bookHistory
                                                        )}
                                                    </span>
                                                </div>
                                                {bookHistory.issuer_name ? (
                                                    <div className="book-history-detail__item">
                                                        <span className="book-history-detail__item-heading">
                                                            {placeholderText(
                                                                "books-circulation.table.issuer.column"
                                                            )}
                                                        </span>
                                                        <span>
                                                            <Link
                                                                to={`${
                                                                    Routes.USERS +
                                                                    bookHistory.issuer_id
                                                                }/details`}
                                                            >
                                                                {
                                                                    bookHistory.issuer_name
                                                                }
                                                            </Link>
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {bookHistory.returner_name ? (
                                                    <div className="book-history-detail__item">
                                                        <span className="book-history-detail__item-heading">
                                                            {placeholderText(
                                                                "books-circulation.table.returner.column"
                                                            )}
                                                        </span>
                                                        <span>
                                                            <Link
                                                                to={`${
                                                                    Routes.USERS +
                                                                    bookHistory.returner_id
                                                                }/details`}
                                                            >
                                                                {
                                                                    bookHistory.returner_name
                                                                }
                                                            </Link>
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {bookHistory.issued_on ? (
                                                    <div className="book-history-detail__item">
                                                        <span className="book-history-detail__item-heading">
                                                            {placeholderText(
                                                                "books-circulation.table.issue-date.column"
                                                            )}
                                                        </span>
                                                        <span>
                                                            {dateFormatter(
                                                                bookHistory.issued_on
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {bookHistory.issue_due_date ? (
                                                    <div className="book-history-detail__item">
                                                        <span className="book-history-detail__item-heading">
                                                            {placeholderText(
                                                                "books-circulation.table.issue-due-date.column"
                                                            )}
                                                        </span>
                                                        <span>
                                                            {dateFormatter(
                                                                bookHistory.issue_due_date
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {bookHistory.return_date ? (
                                                    <div className="book-history-detail__item">
                                                        <span className="book-history-detail__item-heading">
                                                            {placeholderText(
                                                                "books-circulation.table.return-date.column"
                                                            )}
                                                        </span>
                                                        <span>
                                                            {dateFormatter(
                                                                bookHistory.return_date
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {bookHistory.return_due_date ? (
                                                    <div className="book-history-detail__item">
                                                        <span className="book-history-detail__item-heading">
                                                            {placeholderText(
                                                                "books-circulation.table.return-due-date.column"
                                                            )}
                                                        </span>
                                                        <span>
                                                            {dateFormatter(
                                                                bookHistory.return_due_date
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {bookHistory.note ? (
                                                    <div className="book-history-detail__item-note">
                                                        <span className="book-history-detail__item-heading">
                                                            {placeholderText(
                                                                "books-circulation.input.note.label"
                                                            )}
                                                        </span>
                                                        <span>
                                                            {bookHistory.note}
                                                        </span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </Row>
                                    <BookCirculationDetailsModal
                                        {...cardModalProps}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </MasterLayout>
    );
};

BookCirculationDetail.propTypes = {
    bookHistory: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    fetchBookCirculation: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state, ownProp) => {
    const { booksCirculation } = state;
    return {
        bookHistory: booksCirculation.find(
            (bookCirculation) => bookCirculation
        ),
    };
};
export default connect(mapStateToProps, {
    fetchBookCirculation: fetchBookCirculation,
    toggleModal,
})(BookCirculationDetail);
