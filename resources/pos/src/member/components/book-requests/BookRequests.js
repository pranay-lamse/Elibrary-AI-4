import React, { useEffect, useState } from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BookRequestModal from "./BookRequestModal";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import { bookFormatOptions } from "../../../admin/constants";
import BookRequestStatus from "../../../shared/book-request-status/BookRequestStatus";
import {
    getFormattedMessage,
    getFormattedOptions,
    placeholderText,
} from "../../../shared/sharedMethod";
import { openModal } from "../../../shared/custom-hooks";
import { toggleModal } from "../../../store/action/modalAction";
import { fetchBookRequests } from "../../store/actions/bookRequestAction";
import { bookRequestConstants } from "../../../constants";
import { icon } from "../../../constants";

const BookRequests = (props) => {
    const {
        bookRequests,
        toggleModal,
        totalRecordMember,
        isLoading,
        fetchBookRequests,
    } = props;
    const [isCreate, isEdit, isDelete, bookRequest, onOpenModal] = openModal();
    const cardModalProps = {
        bookRequest,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
    };
    const bookFormats = getFormattedOptions(bookFormatOptions);

    const onChange = (filter) => {
        fetchBookRequests(filter, true);
    };
    const [isSpinner, setIsSpinner] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsSpinner(false), 1500);
    }, []);

    const onClickModal = (isEdit, bookRequest = null, isDelete = false) => {
        onOpenModal(isEdit, bookRequest, isDelete);
        toggleModal();
    };

    const renderModalAction = (row) => {
        switch (row.status) {
            case bookRequestConstants.APPROVED:
            case bookRequestConstants.AVAILABLE:
                return (
                    <ModalAction
                        onOpenModal={onClickModal}
                        isHideEditIcon={true}
                        isHideDeleteIcon={true}
                        item={row}
                    />
                );
            default:
                return <ModalAction onOpenModal={onClickModal} item={row} />;
        }
    };

    const columns = [
        {
            name: placeholderText("book-request.input.isbn.label"),
            selector: (row) => row.isbn,
            sortable: true,
            cell: (row) => <span>{row.isbn}</span>,
            minWidth: "200px",
        },
        {
            name: placeholderText("books.radio.book.label"),
            selector: (row) => row.book_name,
            sortable: true,
            cell: (row) => <span>{row.book_name}</span>,
        },
        {
            name: placeholderText("book-request.input.edition.label"),
            selector: (row) => row.edition,
            sortable: true,
            cell: (row) => <span>{row.edition}</span>,
        },
        {
            name: placeholderText("book-request.select.format.label"),
            selector: (row) => row.format,
            sortable: true,
            cell: (row) => {
                const format = bookFormats.find(
                    (format) => format.id === row.format
                );
                if (format) {
                    return format.name;
                }
            },
        },
        {
            name: placeholderText("react-data-table.status.column"),
            selector: (row) => row.status,
            sortable: true,
            center: true,
            cell: (row) => <BookRequestStatus status={row.status} />,
        },
        {
            name: placeholderText("react-data-table.action.column"),
            selector: (row) => row.id,
            right: true,
            cell: (row) => renderModalAction(row),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // console.log({ totalRecordMember });

    return (
        <section className="member_books_request">
            <div className="container">
                <div className="animated fadeIn">
                    <div className="section-title-center text-center">
                        <h2 className="display-6">
                            {placeholderText("book-request.title")}
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>

                    <div className="common-container">
                        <div className="float-right">
                            <Button
                                onClick={() => onClickModal(false)}
                                size="md"
                                color="primary ml-2 text-white"
                            >
                                {placeholderText(
                                    "book-request.input.new-btn.label"
                                )}
                            </Button>
                        </div>
                        <ReactDataTable
                            items={bookRequests}
                            columns={columns}
                            loading={isLoading}
                            className={"table-bordered table-striped mt-2"}
                            emptyStateMessageId="book-request.empty-state.title"
                            emptyNotFoundStateMessageId="books-request.not-found.empty-state.title"
                            totalRows={totalRecordMember}
                            onChange={onChange}
                            icon={icon.BOOK}
                            autoOverFlow={true}
                            pagination={
                                bookRequests?.length >= 10 ? true : false
                            }
                        />
                        <BookRequestModal {...cardModalProps} />
                    </div>
                </div>
            </div>
        </section>
    );
};

BookRequests.propTypes = {
    bookRequests: PropTypes.array,
    totalRecordMember: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBookRequests: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { bookRequests, isLoading, totalRecordMember } = state;
    return { bookRequests, isLoading, totalRecordMember };
};

export default connect(mapStateToProps, { fetchBookRequests, toggleModal })(
    BookRequests
);
