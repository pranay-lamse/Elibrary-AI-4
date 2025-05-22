import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { Button, Col, Row, Table } from "react-bootstrap-v5";
import { useLocation, useParams } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    currencySymbolHendling,
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLocationDot,
    faMobileAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchSanctionQuotation } from "../../store/action/sanctionQuotationAction ";
import { fetchSanctionLetters } from "../../store/action/sanctionLetterAction";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { fetchUsers } from "../../store/action/userAction";
import Spinner from "../../shared/components/loaders/Spinner";
import PDFviewerModal from "./PDFviewerModal";
import {
    fetchQuotationPurchase,
    fetchQuotationPurchases,
} from "../../store/action/quotationToPurchaseAction";

const PurchaseDetails = (props) => {
    const {
        fetchQuotationPurchases,
        quotationPurchase,
        fetchQuotationPurchase,
        users,
        fetchUsers,
        sanctionLetter,
        singleSanctionQuotation,
        fetchFrontSetting,
        frontSetting,
        allConfigData,
        fetchSanctionQuotation,
        supplier,
        fetchAllSuppliers,
        fetchSanctionLetters,
        isLoading,
    } = props;
    const { id } = useParams();
    const location = useLocation();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    useEffect(() => {
        fetchAllSuppliers();
        fetchSanctionLetters();
        fetchUsers();
        fetchQuotationPurchases();
    }, [location.pathname]);

    useEffect(() => {
        if (quotationPurchase) {
            fetchSanctionQuotation(quotationPurchase.quotation_id);
        }
    }, [quotationPurchase]);

    console.log({
        singleSanctionQuotation,
        quotationPurchase,
        sanctionLetter,
        supplier,
        frontSetting,
    });
    let selectedUser;

    if (singleSanctionQuotation.created_by) {
        const loginUser = JSON.parse(localStorage.getItem("loginUserArray"));
        const tempUser = users.find(
            (user) => user.id == quotationPurchase.created_by
        );
        if (tempUser) {
            selectedUser = tempUser;
        }
        if (loginUser.id == quotationPurchase.created_by) {
            selectedUser = loginUser;
        }
    }
    const pdfModalOptions = {
        modal,
        toggle,
        filePath:
            quotationPurchase && quotationPurchase
                ? quotationPurchase.quotation_pdf_file
                : null,
        libraryId: quotationPurchase && quotationPurchase.library_id,
    };
    console.log({ pdfModalOptions });

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("purchases.details.title")}
                to="/admin/pos/purchases"
            >
                <div className="d-flex justify-content-end">
                    <Button
                        onClick={() => toggle()}
                        size="md"
                        color="primary ml-2 text-white"
                    >
                        Quotation Preview
                    </Button>
                </div>
            </HeaderTitle>
            <TabTitle title={placeholderText("purchases.details.title")} />
            {!isLoading ? (
                <div className="card">
                    <div className="card-body">
                        <Form>
                            <div className="row">
                                <div className="col-12">
                                    <h4 className="font-weight-bold text-center mb-5">
                                        {getFormattedMessage(
                                            "purchases.details.title"
                                        )}{" "}
                                        :{" "}
                                        {quotationPurchase &&
                                            quotationPurchase.reference_code}
                                    </h4>
                                </div>
                            </div>
                            <Row className="custom-line-height">
                                {!_.isEmpty(supplier) ? (
                                    <Col md={4}>
                                        <h5 className="text-gray-800 bg-light p-4 mb-0 text-uppercase">
                                            Supplier Details
                                        </h5>
                                        <div className="p-4">
                                            <div className="d-flex align-items-center pb-1">
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {supplier &&
                                                    supplier.attributes.name}
                                            </div>
                                            <div className="d-flex align-items-center pb-1">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {supplier &&
                                                    supplier.attributes.email}
                                            </div>
                                            <div className="d-flex align-items-center pb-1">
                                                <FontAwesomeIcon
                                                    icon={faMobileAlt}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {supplier &&
                                                    supplier.attributes.phone}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <FontAwesomeIcon
                                                    icon={faLocationDot}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {supplier &&
                                                    supplier.attributes.country}
                                                ,
                                                {supplier &&
                                                    supplier.attributes.city}
                                                {supplier &&
                                                    supplier.attributes.address}
                                            </div>
                                        </div>
                                    </Col>
                                ) : null}
                                {!_.isEmpty(frontSetting) ? (
                                    <Col md={4} className="m-md-0 m-4">
                                        <h5 className="text-gray-800 bg-light p-4 mb-0 text-uppercase">
                                            {getFormattedMessage(
                                                "globally.detail.company.info"
                                            )}
                                        </h5>
                                        <div className="p-4">
                                            <div className="d-flex align-items-center pb-1">
                                                <FontAwesomeIcon
                                                    icon={faUser}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {frontSetting.value &&
                                                    frontSetting.value
                                                        .company_name}
                                            </div>
                                            <div className="d-flex align-items-center pb-1">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {frontSetting.value &&
                                                    frontSetting.value.email}
                                            </div>
                                            <div className="d-flex align-items-center pb-1">
                                                <FontAwesomeIcon
                                                    icon={faMobileAlt}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {frontSetting.value &&
                                                    frontSetting.value.phone}
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <FontAwesomeIcon
                                                    icon={faLocationDot}
                                                    className="text-primary me-2 fs-5"
                                                />
                                                {frontSetting.value &&
                                                    frontSetting.value.address}
                                            </div>
                                        </div>
                                    </Col>
                                ) : null}
                                <Col md={4}>
                                    <h5 className="text-gray-800 bg-light p-4 mb-0 text-uppercase">
                                        Purchase Details
                                    </h5>
                                    <div className="p-4">
                                        <div className="pb-1">
                                            <span className="me-2">
                                                {getFormattedMessage(
                                                    "globally.detail.reference"
                                                )}{" "}
                                                :
                                            </span>
                                            <span>
                                                {quotationPurchase &&
                                                    quotationPurchase.reference_code}
                                            </span>
                                        </div>
                                        <div className="pb-1">
                                            <span className="me-2">
                                                {getFormattedMessage(
                                                    "globally.detail.status"
                                                )}{" "}
                                                :
                                            </span>
                                            {(quotationPurchase &&
                                                quotationPurchase?.purchase_status ===
                                                    1 && (
                                                    <span className="badge bg-light-success">
                                                        <span>Received</span>
                                                    </span>
                                                )) ||
                                                (quotationPurchase?.purchase_status ===
                                                    2 && (
                                                    <span className="badge bg-light-info">
                                                        <span>Pending</span>
                                                    </span>
                                                )) ||
                                                (quotationPurchase?.purchase_status ===
                                                    3 && (
                                                    <span className="badge bg-light-warning">
                                                        <span>Ordered</span>
                                                    </span>
                                                ))}
                                        </div>
                                        <div className="pb-1">
                                            <span className="me-2">
                                                Created By :
                                            </span>
                                            <span>
                                                {selectedUser
                                                    ? selectedUser.first_name +
                                                      " " +
                                                      selectedUser.last_name
                                                    : null}
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="mt-5">
                                <h5 className="text-gray-800 bg-light p-4 mb-5 text-uppercase">
                                    {getFormattedMessage(
                                        "globally.detail.order.summary"
                                    )}
                                </h5>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            {/* <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.product"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.net-unit-price"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.quantity"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.unit-price"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.discount"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.tax"
                                            )}
                                        </th>
                                        <th colSpan={2}>
                                            {getFormattedMessage(
                                                "globally.detail.subtotal"
                                            )}
                                        </th> */}
                                            <th>
                                                {getFormattedMessage(
                                                    "product.title"
                                                )}
                                            </th>
                                            <th>
                                                {getFormattedMessage(
                                                    "sale.order-item.table.net-unit-price.column.label"
                                                )}
                                            </th>
                                            {/* <th>
                        {getFormattedMessage(
                            "purchase.order-item.table.stock.column.label"
                        )}
                    </th> */}
                                            <th>
                                                {getFormattedMessage(
                                                    "purchase.order-item.table.qty.column.label"
                                                )}
                                            </th>
                                            {/* <th>
                        {getFormattedMessage(
                            "purchase.order-item.table.discount.column.label"
                        )}
                    </th> */}
                                            {/* <th>
                        {getFormattedMessage(
                            "purchase.order-item.table.tax.column.label"
                        )}
                    </th> */}
                                            <th>
                                                {getFormattedMessage(
                                                    "purchase.order-item.table.sub-total.column.label"
                                                )}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotationPurchase?.purchase_items &&
                                            quotationPurchase?.purchase_items.map(
                                                (details, index) => {
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className="align-middle"
                                                        >
                                                            <td className="ps-3">
                                                                {details &&
                                                                    details.name}
                                                            </td>
                                                            <td>
                                                                {currencySymbolHendling(
                                                                    allConfigData,
                                                                    frontSetting.value &&
                                                                        frontSetting
                                                                            .value
                                                                            .currency_symbol,
                                                                    details.price
                                                                )}
                                                            </td>
                                                            <td>
                                                                {
                                                                    details.quantity
                                                                }
                                                            </td>
                                                            {/* <td>
                                                            {currencySymbolHendling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.product_price
                                                            )}
                                                        </td> */}
                                                            {/* <td>
                                                            {currencySymbolHendling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.discount_amount
                                                            )}
                                                        </td> */}
                                                            {/* <td>
                                                            {currencySymbolHendling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.tax_amount
                                                            )}
                                                        </td> */}
                                                            <td>
                                                                {currencySymbolHendling(
                                                                    allConfigData,
                                                                    frontSetting.value &&
                                                                        frontSetting
                                                                            .value
                                                                            .currency_symbol,
                                                                    details.quantity *
                                                                        details.price
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                    </tbody>
                                </Table>
                            </div>
                            <div className="col-xxl-5 col-lg-6 col-md-6 col-12 float-end">
                                <div className="card">
                                    <div className="card-body pt-7 pb-2">
                                        <div className="table-responsive">
                                            <table className="table border">
                                                <tbody>
                                                    {/* <tr>
                                                    <td className="py-3">
                                                        {getFormattedMessage(
                                                            "globally.detail.order.tax"
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {currencySymbolHendling(
                                                            allConfigData,
                                                            frontSetting.value &&
                                                                frontSetting
                                                                    .value
                                                                    .currency_symbol,
                                                            quotationDetails &&
                                                                quotationDetails.tax_amount >
                                                                    0
                                                                ? quotationDetails.tax_amount
                                                                : "0.00"
                                                        )}{" "}
                                                        (
                                                        {quotationDetails &&
                                                            parseFloat(
                                                                quotationDetails.tax_rate
                                                            ).toFixed(2)}
                                                        %)
                                                    </td>
                                                </tr> */}
                                                    {/* <tr>
                                                    <td className="py-3">
                                                        {getFormattedMessage(
                                                            "globally.detail.discount"
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {currencySymbolHendling(
                                                            allConfigData,
                                                            frontSetting.value &&
                                                                frontSetting
                                                                    .value
                                                                    .currency_symbol,
                                                            quotationDetails &&
                                                                quotationDetails.discount
                                                        )}
                                                    </td>
                                                </tr> */}
                                                    {/* <tr>
                                                    <td className="py-3">
                                                        {getFormattedMessage(
                                                            "globally.detail.shipping"
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {currencySymbolHendling(
                                                            allConfigData,
                                                            frontSetting.value &&
                                                                frontSetting
                                                                    .value
                                                                    .currency_symbol,
                                                            quotationDetails &&
                                                                quotationDetails.shipping
                                                        )}
                                                    </td>
                                                </tr> */}
                                                    <tr>
                                                        <td className="py-3 text-primary">
                                                            {getFormattedMessage(
                                                                "globally.detail.grand.total"
                                                            )}
                                                        </td>
                                                        <td className="py-3 text-primary">
                                                            {currencySymbolHendling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                singleSanctionQuotation &&
                                                                    singleSanctionQuotation.grand_total
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            ) : (
                <Spinner />
            )}
            <PDFviewerModal {...pdfModalOptions} />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        quotationPurchase,
        frontSetting,
        allConfigData,
        singleSanctionQuotation,
        suppliers,
        sanctionLetters,
        users,
        isLoading,
    } = state;

    const selectedSupplier =
        suppliers.length &&
        suppliers.find(
            (supplier) => supplier.id == singleSanctionQuotation.supplier_id
        );

    const selectedSanctionLetter =
        sanctionLetters.length &&
        sanctionLetters.find(
            (letter) => letter.id == singleSanctionQuotation.sanction_letter_id
        );
    console.log({ selectedSanctionLetter });
    return {
        quotationPurchase: quotationPurchase[0],
        suppliers,
        frontSetting,
        allConfigData,
        singleSanctionQuotation: singleSanctionQuotation,
        supplier: selectedSupplier,
        sanctionLetter: selectedSanctionLetter,
        users,
        isLoading,
    };
};

export default connect(mapStateToProps, {
    fetchQuotationPurchase,
    fetchFrontSetting,
    fetchSanctionQuotation,
    fetchAllSuppliers,
    fetchSanctionLetters,
    fetchUsers,
    fetchQuotationPurchases,
})(PurchaseDetails);
