import React from "react";
import { Table } from "reactstrap";
import PropTypes from "prop-types";
import { sortConfig } from "../../config/sortConfig";
import TableHeader from "../../shared/table-header/Tableheader";
import ModalAction from "../../shared/action-buttons/ModalAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

import { useNavigate } from "react-router-dom";

export const BookSeriesTable = (props) => {
    const navigate = useNavigate();
    const { booksSeries, onOpenModal, sortAction, sortObject, history } = props;
    const headers = [
        {
            id: "image",
            name: "Cover",
        },
        {
            id: "title",
            name: getFormattedMessage("books-series.input.title.label"),
        },
    ];
    const headerProps = { sortAction, sortObject, sortConfig, headers };
    const goToEditSeriesBook = (bookId) => {
        navigate(`/admin/pos/books-series/${bookId}/edit`);
    };
    return (
        <div className="overflow-auto">
            <Table hover bordered striped responsive size="md">
                <thead>
                    <TableHeader {...headerProps} />
                </thead>
                <tbody>
                    {booksSeries.map((bookSeries) => {
                        return (
                            <tr key={bookSeries.id.toString()}>
                                <td>
                                    <div>
                                        <img
                                            className="book_cover_img"
                                            // onClick={() => {
                                            //     openImage(imageUrl);
                                            // }}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src =
                                                    "/public/images/book-avatar.png";
                                            }}
                                            src={
                                                "/public/uploads/series/" +
                                                bookSeries.cover
                                            }
                                            height="50"
                                            alt={bookSeries.cover}
                                        />
                                    </div>
                                </td>
                                <td>{bookSeries.title}</td>
                                <td className="text-center">
                                    <ModalAction
                                        onOpenModal={onOpenModal}
                                        item={bookSeries}
                                        isEditMode={true}
                                        goToEditItem={goToEditSeriesBook}
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

BookSeriesTable.propTypes = {
    sortObject: PropTypes.object,
    history: PropTypes.object,
    booksSeries: PropTypes.array,
    sortAction: PropTypes.func,
    onOpenModal: PropTypes.func,
};

export default BookSeriesTable;
