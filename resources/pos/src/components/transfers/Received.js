import React, { useEffect, useState } from "react";
import MasterLayout from "../MasterLayout";
import { connect } from "react-redux";
import moment from "moment";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    fetchTransfers2,
    returnTransfer,
} from "../../store/action/transfersAction";
import {
    currencySymbolHendling,
    getFormattedDate,
    placeholderText,
} from "../../shared/sharedMethod";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import ActionButton from "../../shared/action-buttons/ActionButton";
import DeleteTransfer from "./DeleteTransfer";
import TransferDetails from "./TransferDetails";

const Received = (props) => {
    const {
        returnTransfer,
        fetchTransfers2,
        tansfers,
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [detailsModel, setDetailsModel] = useState(false);
    const [isDetails, setIsDetails] = useState(null);
    const [lgShow, setLgShow] = useState(false);

    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    //onClick edit function
    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/admin/pos/transfers/" + id;
    };

    const onChange = (filter) => {
        fetchTransfers2(filter, true);
    };

    const onClickDetailsModel = (isDetails = null) => {
        setLgShow(true);
        setIsDetails(isDetails);
    };

    const onClickReturnTransfer = (id) => {
        console.log({ id });
        returnTransfer(id);
    };

    const itemsValue =
        // currencySymbol &&
        tansfers.length
            ? tansfers?.map((tansfer) => {
                  return {
                      date: getFormattedDate(
                          tansfer.attributes.date,
                          allConfigData && allConfigData
                      ),
                      time: moment(tansfer.attributes.created_at).format("LT"),
                      reference_code: tansfer.attributes.reference_code,
                      from_warehouse_id: tansfer.attributes.from_warehouse.name,
                      to_warehouse_id: tansfer.attributes.to_warehouse.name,
                      items: tansfer.attributes.transfer_items.length,
                      grand_total: tansfer.attributes.grand_total,
                      status: tansfer.attributes.status,
                      id: tansfer.id,
                      currency: currencySymbol,
                  };
              })
            : [];

    const columns = [
        {
            name: getFormattedMessage("dashboard.recentSales.reference.label"),
            sortField: "reference_code",
            sortable: true,
            cell: (row) => {
                return (
                    <span className="badge bg-light-danger">
                        <span>{row.reference_code}</span>
                    </span>
                );
            },
        },
        {
            name: "From Library",
            selector: (row) => row.from_warehouse_id,
            sortField: "from_warehouse_id",
            sortable: true,
        },
        {
            name: "To Lirbrary",
            selector: (row) => row.to_warehouse_id,
            sortField: "to_warehouse_id",
            sortable: true,
        },
        {
            name: "Items",
            selector: (row) => row.items,
            sortField: "items",
            sortable: true,
        },

        {
            name: getFormattedMessage("purchase.select.status.label"),
            sortField: "status",
            sortable: true,
            cell: (row) => {
                return (
                    (row.status === 1 && (
                        <span className="badge bg-light-success">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.complated.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === 2 && (
                        <span className="badge bg-light-primary">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.sent.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === 3 && (
                        <span className="badge bg-light-warning">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.pending.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === 5 && (
                        <span className="badge bg-light-success">
                            <span>Received</span>
                        </span>
                    ))
                );
            },
        },

        {
            name: getFormattedMessage(
                "globally.react-table.column.created-date.label"
            ),
            selector: (row) => row.date,
            sortField: "date",
            sortable: true,
            cell: (row) => {
                return (
                    <span className="badge bg-light-info">
                        <div className="mb-1">{row.time}</div>
                        <div>{row.date}</div>
                    </span>
                );
            },
        },
    ];

    return (
        <MasterLayout>
            <TabTitle title={placeholderText("transfers.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isLoading={isLoading}
                ButtonValue={getFormattedMessage("transfer.create.title")}
                totalRows={totalRecord}
                to="#/admin/pos/transfers/create"
                isShowFilterField
                isTransferStatus
            />
            <DeleteTransfer
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
            {lgShow && (
                <TransferDetails
                    onClickDetailsModel={onClickDetailsModel}
                    detailsModel={detailsModel}
                    onDetails={isDetails}
                    setLgShow={setLgShow}
                    lgShow={lgShow}
                />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        tansfers,
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
    } = state;
    return {
        tansfers,
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
    };
};

export default connect(mapStateToProps, {
    fetchTransfers2,
    fetchFrontSetting,
    returnTransfer,
})(Received);
