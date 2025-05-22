import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import "./BookItems.scss";
import { sortConfig } from "../../config/sortConfig";
import TableHeader from "../../shared/table-header/Tableheader";
import ModalAction from "../../shared/action-buttons/ModalAction";
import BookItemStatus from "../../shared/book-item-status/BookItemStatus";
import { getFormattedMessage, priceFormatter } from "../../shared/sharedMethod";
import { Tokens } from "../../constants";
import { bookFormatConstant } from "../../constants";
import Barcode from "react-barcode";

export const BookItemTable = (props) => {
    const { bookItems, onClickModal, sortAction, sortObject, currency } = props;
    const headers = [
        {
            id: "id",
            name: "Accession No.",
        },
        {
            id: "book_code",
            name: getFormattedMessage("books.items.input.book-code.label"),
        },
        {
            id: "publisher",
            name: "publisher",
        },
        {
            id: "edition",
            name: getFormattedMessage("books.items.input.edition.label"),
        },
        {
            id: "language_name",
            name: getFormattedMessage("books.items.select.language.label"),
        },
        {
            id: "format",
            name: getFormattedMessage("books.items.select.format.label"),
        },
        {
            id: "price",
            name: "price",
        },
        // {
        //     id: "pdf preview",
        //     name: "pdf preview",
        // },
        {
            id: "barcode",
            name: "barcode",
        },
        {
            id: "rack_number",
            name: "Rack Number",
        },
        // {
        //     id: "status",
        //     name: "status",
        // },
        {
            id: "transfer_status",
            name: "transfer status",
        },
    ];
    const headerProps = {
        sortAction,
        sortObject,
        sortConfig,
        headers,
        isStatusField: true,
    };
    const renderBookItemStatus = (bookItem) => {
        const statusProps = { status: bookItem.status, item: bookItem };
        return <BookItemStatus {...statusProps} item={bookItem} />;
    };

    const onClickOpenEBook = (e_book_url) => {
        const api =
            location.origin +
            "/uploads/ebooks/" +
            e_book_url.split(".")[0] +
            "/" +
            e_book_url;

        window.open(api, "_blank");
    };

    const bookFormat = (bookFormat) => {
        let field = "books-items.filter.format.e-book.label";
        if (bookFormat === bookFormatConstant.FORMAT_HARDCOVER) {
            field = "books-items.filter.format.hardcover.label";
        } else if (bookFormat === bookFormatConstant.FORMAT_PAPERBACK) {
            field = "books-items.filter.format.paperback.label";
        }

        return getFormattedMessage(field);
    };

    return (
        <div className="overflow-auto">
            <Table
                hover
                bordered
                striped
                responsive
                size="md"
                className="book-item__table"
            >
                <thead>
                    <TableHeader {...headerProps} />
                </thead>
                <tbody>
                    {bookItems.map((bookItem) => {
                        if (bookItem.language) {
                            bookItem.language_name =
                                bookItem.language.language_name;
                        }
                        const transferStatus = [
                            {
                                label: "Completed",
                                value: 1,
                            } /* ,
                            {
                                label: "Sent",
                                value: 2,
                            } */,
                            {
                                label: "Pending",
                                value: 3,
                            },
                        ].find(
                            (status) =>
                                status.value === bookItem.transfer_status
                        );
                        return (
                            <tr key={bookItem.id.toString()}>
                                <td className={"book-item__table-book-code"}>
                                    {bookItem.accession_number ? bookItem.accession_number : "Unavailable"}
                                </td>
                                <td className={"book-item__table-book-code"}>
                                    {bookItem.book_code}
                                </td>
                                <td className={"book-item__table-book-code"}>
                                    {bookItem.publisher_id
                                        ? bookItem.publisher.name
                                        : "Unavailable"}
                                </td>
                                <td>
                                    {bookItem.edition
                                        ? bookItem.edition
                                        : "Unavailable"}
                                </td>
                                <td>{bookItem.language_name}</td>
                                <td>
                                    {bookFormat(bookItem.format)}
                                    {bookFormatConstant.FORMAT_E_BOOK ===
                                        bookItem.format ? (
                                        <i
                                            className="fa fa-download fa-md cursor-pointer text-info ml-2"
                                            onClick={() =>
                                                onClickOpenEBook(
                                                    bookItem.file_name
                                                )
                                            }
                                        />
                                    ) : (
                                        ""
                                    )}
                                </td>
                                <td className="book-item__table-price">
                                    {currency}
                                    {bookItem.price === null
                                        ? "0.00"
                                        : bookItem.price}
                                </td>
                                {/* <td>
                                    {bookItem.pdf_preview_file
                                        ? "Available"
                                        : "Unavailable"}
                                </td> */}

                                <td className={"book-item__table-book-code"}>
                                    {bookItem.book_code ? (
                                        <Barcode value={bookItem.book_code} />
                                    ) : (
                                        "Unavailable"
                                    )}
                                </td>
                                <td className={"book-item__table-book-code"}>
                                    <span>
                                        {bookItem.rack_number !== "undefined"
                                            ? bookItem.rack_number
                                            : "Unavailable"}
                                    </span>
                                </td>
                                <td className="book-item__table-status">
                                    {transferStatus
                                        ? transferStatus.label
                                        : "Unavailable"}
                                </td>
                                <td className="book-item__table-status">
                                    {renderBookItemStatus(bookItem)}
                                </td>

                                <td className="text-center book-item__table-action">
                                    <ModalAction
                                        onOpenModal={onClickModal}
                                        item={bookItem}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

BookItemTable.propTypes = {
    sortObject: PropTypes.object,
    bookItems: PropTypes.array,
    currency: PropTypes.string,
    sortAction: PropTypes.func,
    onClickModal: PropTypes.func,
};

export default BookItemTable;
