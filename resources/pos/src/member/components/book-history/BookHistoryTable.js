import React from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import "./BookHistory.scss";
import { bookCirculationStatusConstant } from "../../constants";
import {
    dateFormatter,
    getFormattedMessage,
    placeholderText,
} from "../../../shared/sharedMethod";
import BookStatus from "../../../shared/book-status/book-status";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import { icon } from "../../../constants";
import libraryStatus from "../../../components/newMemberApp/libraryStatus.json";

const BookHistoryTable = (props) => {
    const {
        bookHistory,
        onOpenModal,
        onChangeFilter,
        totalRecordMember,
        isLoading,
    } = props;

    const columns = [
        {
            sortable: true,
            wrap: true,
            selector: (row) =>
                row.book_item?.book ? row.book_item?.book.name : "N/A",
            name: placeholderText("books.select.book.label"),
            cell: (row) =>
                row.book_item?.book ? row.book_item?.book.name : "N/A",
        },

        {
            sortable: true,
            selector: (row) => (row) =>
                row.book_item?.book_code ? row.book_item?.book_code : "N/A",

            name: placeholderText("book-history.table.book-code.column"),
            cell: (row) => row.book_item?.book_code,
        },
        {
            sortable: true,
            selector: (row) => (row.issued_on ? row.issued_on : "N/A"),
            name: placeholderText("book-history.table.issue-date.column"),

            cell: (row) => (
                <span>{row.issued_on ? renderDate(row.issued_on) : "N/A"}</span>
            ),
        },

        {
            sortable: true,
            selector: (row) => (row.issued_on ? row.issued_on : "N/A"),
            name: placeholderText("Due Date"),

            cell: (row) => (
                <span>
                    {row.issued_on ? dateFormatter(new Date(new Date(row.issued_on).setDate(new Date(row.issued_on).getDate() + 15))) : "N/A"}{" "}
                </span>
            ),
        },
        /*  {
            sortable: true,
            selector: (row) =>
                row.issue_due_date ? row.issue_due_date : "N/A",
            name: placeholderText("book-history.table.issue-due-date.column"),
            width: "180px",
            cell: (row) => (
                <span>
                    {row.issue_due_date
                        ? renderDate(row.issue_due_date)
                        : "N/A"}
                </span>
            ),
        }, */
        /* {
            sortable: true,
            selector: (row) => (row.reserved_on ? row.reserved_on : "N/A"),
            name: placeholderText("book-history.table.reserve-date.column"),
            width: "180px",
            cell: (row) => (
                <span>
                    {row.reserve_date ? renderDate(row.reserve_date) : "N/A"}
                </span>
            ),
        },
        {
            sortable: true,
            selector: (row) =>
                row.return_due_date ? row.return_due_date : "N/A",
            name: placeholderText("book-history.table.return-due-date.column"),
            width: "180px",
            cell: (row) => (
                <span>
                    {row.return_due_date
                        ? renderDate(row.return_due_date)
                        : "N/A"}
                </span>
            ),
        }, */
        {
            sortable: true,
            selector: (row) => (row.return_date ? row.return_date : "N/A"),
            name: placeholderText("book-history.table.return-date.column"),

            cell: (row) => (
                <span>
                    {row.return_date ? renderDate(row.return_date) : "N/A"}
                </span>
            ),
        },
        {
            sortable: true,
            selector: (row) => (row.status ? row.status : "N/A"),
            name: placeholderText("react-data-table.status.column"),

            cell: (row) => renderBookStatus(row),
        },

        {
            sortable: true,
            wrap: true,
            selector: (row) =>
                row.book_item?.book ? row.book_item?.book.library_id : "N/A",
            name: "LIBRARY",
            cell: (row) =>
                row.book_item?.book
                    ? libraryStatus.find(
                        (status) =>
                            row.book_item?.book.library_id === status.value
                    ).label
                    : "N/A",
        },
        {
            name: placeholderText("react-data-table.action.column"),
            selector: (row) => (row.id ? row.id : "N/A"),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            center: true,

            cell: (row) => renderAction(row),
        },
    ];

    const renderBookStatus = (bookHistory) => {
        const statusProps = { status: bookHistory.status, item: bookHistory };
        return <BookStatus {...statusProps} item={bookHistory} />;
    };

    const renderAction = (bookHistory) => {
        if (
            bookHistory.status === bookCirculationStatusConstant.BOOK_RESERVED
        ) {
            return (
                <Button
                    className="frontend-btn"
                    size="sm"
                    color="danger text-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal(bookHistory);
                    }}
                >
                    {placeholderText("book-history.input.unreserve-btn.label")}
                </Button>
            );
        }
        return "";
    };

    const renderDate = (date) => {
        return <span>{date ? dateFormatter(date) : ""}</span>;
    };

    return (
        <ReactDataTable
            items={bookHistory}
            columns={columns}
            emptyStateMessageId="books-history.empty-state.title"
            emptyNotFoundStateMessageId="books-history.not-found.empty-state.title"
            loading={isLoading}
            className={"table-bordered table-striped mt-2"}
            totalRows={totalRecordMember}
            onChange={onChangeFilter}
            icon={icon.BOOK_CIRCULATION}
            pagination={bookHistory?.length >= 10 ? true : false}
        />
    );
};

BookHistoryTable.propTypes = {
    bookHistory: PropTypes.array,
    totalRecordMember: PropTypes.number,
    isLoading: PropTypes.bool,
    onOpenModal: PropTypes.func,
    onChangeFilter: PropTypes.func,
};

export default BookHistoryTable;
