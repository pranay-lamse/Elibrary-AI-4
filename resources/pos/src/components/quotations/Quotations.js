import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect, useDispatch, useSelector } from "react-redux";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { fetchSales } from "../../store/action/salesAction";
import DeleteQuotation from "./DeleteQuotation";
import {
    currencySymbolHendling,
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import ActionDropDownButton from "../../shared/action-buttons/ActionDropDownButton";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchQuotations } from "../../store/action/quotationAction";
import { quotationPdfAction } from "../../store/action/quotationPdfAction";
import { fetchSanctionQuotations } from "../../store/action/sanctionQuotationAction ";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import { fetchSanctionLetters } from "../../store/action/sanctionLetterAction";
import { convertQuotationToPurchase } from "../../store/action/quotationToPurchaseAction";
import { useNavigate } from "react-router";

const Quotations = (props) => {
    const {
        totalRecord,
        isLoading,
        quotationPdfAction,
        fetchFrontSetting,
        frontSetting,
        isCallSaleApi,
        fetchQuotations,
        quotations,
        allConfigData,
        sanctionQuotation,
        fetchSanctionQuotations,
        fetchAllSuppliers,
        suppliers,
        fetchSanctionLetters,
        sanctionLetters,
        convertQuotationToPurchase,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            fetchSanctionQuotations(),
            fetchFrontSetting(),
            fetchAllSuppliers(),
            fetchSanctionLetters(),
        ]);
    }, []);

    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    const onChange = (filter) => {
        fetchSanctionQuotations(filter, true);
    };

    const onCreatePurchase = (item) => {
        // console.log({ item });
        convertQuotationToPurchase(item, navigate);
    };

    //quotation edit function
    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/admin/pos/quotations/edit/" + id;
    };

    // delete quotation function
    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };
    const dispatch = useDispatch();

    //quotation sale create function
    const onCreateSaleClick = (item) => {
        const id = item.id;
        window.location.href = "#/admin/pos/quotations/Create_sale/" + id;
    };

    //quotation details function
    const goToDetailScreen = (ProductId) => {
        window.location.href = "#/admin/pos/quotations/detail/" + ProductId;
    };

    //onClick pdf function
    const onPdfClick = (id) => {
        quotationPdfAction(id);
    };

    const itemsValue =
        // currencySymbol &&
        sanctionQuotation.length >= 0
            ? sanctionQuotation.map((quotation) => {
                  const supplierName =
                      suppliers.length &&
                      suppliers.find(
                          (supplier) => supplier.id === quotation.supplier_id
                      )?.attributes?.name;
                  const sanctionLetterName = sanctionLetters.find(
                      (letter) => letter.id === quotation.sanction_letter_id
                  )?.subject;
                  return {
                      ...quotation,
                      date: getFormattedDate(
                          quotation.date,
                          allConfigData && allConfigData
                      ),
                      // date_for_payment: sale.attributes.date,
                      time: moment(quotation.created_at).format("LT"),
                      reference_code: quotation.reference_code,
                      supplier_name: supplierName,
                      sanction_letter_name: sanctionLetterName,
                      status: quotation.status,
                      grand_total: quotation.grand_total,
                      // paid_amount: quotation.attributes.paid_amount
                      //     ? sale.attributes.paid_amount
                      //     : (0.0).toFixed(2),
                      id: quotation.id,
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
            name: "SUPPLIER",
            selector: (row) => row.supplier_name,
            sortField: "supplier_name",
            sortable: true,
        },
        {
            name: "SANCTION LETTER",
            selector: (row) => row.sanction_letter_name,
            sortField: "sanction_letter_name",
            sortable: true,
        },
        {
            name: getFormattedMessage("purchase.select.status.label"),
            sortField: "status",
            sortable: true,
            cell: (row) => {
                return (
                    (row.status === 1 && (
                        <span className="badge bg-light-warning">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.sent.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === 2 && (
                        <span className="badge bg-light-danger">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.pending.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === 3 && (
                        <span className="badge bg-light-success">
                            <span>Approved</span>
                        </span>
                    ))
                );
            },
        },
        {
            name: getFormattedMessage("purchase.grant-total.label"),

            selector: (row) =>
                currencySymbolHendling(
                    allConfigData,
                    row.currency,
                    row.grand_total
                ),
            sortField: "grand_total",
            sortable: true,
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
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ActionDropDownButton
                    item={row}
                    goToEditProduct={goToEdit}
                    isEditMode={true}
                    isPdfIcon={false}
                    onClickDeleteModel={onClickDeleteModel}
                    onPdfClick={onPdfClick}
                    title={getFormattedMessage("quotation.title")}
                    isCreatesSales={false}
                    onCreateSaleClick={onCreateSaleClick}
                    isViewIcon={true}
                    isCreatePurchase={row.status == 3 ? true : false}
                    onCreatePurchase={onCreatePurchase}
                    goToDetailScreen={goToDetailScreen}
                />
            ),
        },
    ];

    // console.log({ sanctionQuotation, sanctionLetters });

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("quotations.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                to="#/admin/pos/quotations/create"
                ButtonValue={getFormattedMessage("create-quotation.title")}
                isCallSaleApi={isCallSaleApi}
                isShowDateRangeField={false}
                onChange={onChange}
                totalRows={totalRecord}
                goToEdit={goToEdit}
                isLoading={isLoading}
                isShowFilterField={false}
                isStatus
            />
            <DeleteQuotation
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        sales,
        totalRecord,
        isLoading,
        frontSetting,
        isCallSaleApi,
        quotations,
        allConfigData,
        sanctionQuotation,
        suppliers,
        sanctionLetters,
    } = state;
    return {
        sanctionQuotation,
        sales,
        totalRecord,
        isLoading,
        frontSetting,
        isCallSaleApi,
        quotations,
        allConfigData,
        suppliers,
        sanctionLetters,
    };
};

export default connect(mapStateToProps, {
    fetchSales,
    fetchFrontSetting,
    fetchQuotations,
    quotationPdfAction,
    fetchSanctionQuotations,
    fetchAllSuppliers,
    fetchSanctionLetters,
    convertQuotationToPurchase,
})(Quotations);
