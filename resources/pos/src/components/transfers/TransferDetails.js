import React, { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import moment from "moment";
import { Table } from "reactstrap";
import { fetchTransferDetails } from "../../store/action/transferDetailsAction";
import {
    currencySymbolHendling,
    getFormattedDate,
    getFormattedMessage,
} from "../../shared/sharedMethod";
import { fetchSingleBook } from "../../member/store/actions/bookAction";

const TransferDetails = (props) => {
    const {
        onDetails,
        lgShow,
        setLgShow,
        fetchFrontSetting,
        frontSetting,
        transferDetails,
        fetchTransferDetails,
        allConfigData,
        fetchSingleBook,
    } = props;

    useEffect(() => {
        fetchFrontSetting();
    }, [transferDetails]);

    useEffect(() => {
        fetchSingleBook();
    }, []);

    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    useEffect(() => {
        if (onDetails !== null) {
            fetchTransferDetails(onDetails);
        }
    }, [onDetails]);

    const onsetLgShow = () => {
        setLgShow(false);
    };

    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="example-custom-modal-styling-title"
                show={lgShow}
                onHide={() => onsetLgShow()}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {getFormattedMessage("transfer.details.title")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <tbody>
                            <tr>
                                <td>
                                    {getFormattedMessage(
                                        "react-data-table.date.column.label"
                                    )}
                                </td>
                                <td>
                                    {transferDetails &&
                                        transferDetails.attributes &&
                                        getFormattedDate(
                                            transferDetails.attributes.date,
                                            allConfigData
                                        )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {getFormattedMessage(
                                        "globally.detail.reference"
                                    )}
                                </td>
                                <td>
                                    {transferDetails &&
                                        transferDetails.attributes &&
                                        transferDetails.attributes
                                            .reference_code}
                                </td>
                            </tr>
                            <tr>
                                <td>From Library</td>
                                <td>
                                    {
                                        transferDetails?.attributes
                                            ?.from_warehouse?.name
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>To Library</td>
                                <td>
                                    {
                                        transferDetails?.attributes
                                            ?.to_warehouse?.name
                                    }
                                </td>
                            </tr>
                            {/* <tr>
                                <td>
                                    {getFormattedMessage(
                                        "globally.detail.grand.total"
                                    )}
                                </td>
                                <td>
                                    {currencySymbolHendling(
                                        allConfigData,
                                        currencySymbol,
                                        transferDetails?.attributes?.grand_total
                                    )}
                                </td>
                            </tr> */}
                            <tr>
                                <td>
                                    {getFormattedMessage(
                                        "globally.detail.status"
                                    )}
                                </td>
                                <td>
                                    {(transferDetails?.attributes?.status ===
                                        1 &&
                                        "Completed") ||
                                        (transferDetails?.attributes?.status ===
                                            2 &&
                                            "Sent") ||
                                        (transferDetails?.attributes?.status ===
                                            3 &&
                                            "Pending") ||
                                        (transferDetails?.attributes?.status ===
                                            5 &&
                                            "Transferred")}
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>ISBN</th>
                                <th>
                                    {getFormattedMessage(
                                        "dashboard.stockAlert.quantity.label"
                                    )}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transferDetails &&
                            transferDetails.attributes &&
                            transferDetails.attributes?.transfer_items ? (
                                <tr>
                                    <td>
                                        {
                                            transferDetails.attributes
                                                ?.transfer_items[0].book_item
                                                .book.name
                                        }
                                    </td>
                                    <td>
                                        {
                                            transferDetails.attributes
                                                ?.transfer_items[0].book_item
                                                .book.isbn
                                        }
                                    </td>
                                    <td>
                                        {
                                            transferDetails.attributes
                                                ?.transfer_items.length
                                        }
                                    </td>
                                    {/* <td>
                                                    {currencySymbolHendling(
                                                        allConfigData,
                                                        currencySymbol,
                                                        item.sub_total
                                                    )}
                                                </td> */}
                                </tr>
                            ) : null}
                        </tbody>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { transferDetails, isLoading, frontSetting, allConfigData, books } =
        state;
    return { transferDetails, isLoading, frontSetting, allConfigData, books };
};

export default connect(mapStateToProps, {
    fetchFrontSetting,
    fetchTransferDetails,
    fetchSingleBook,
})(TransferDetails);
