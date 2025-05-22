import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { InputGroup, Table } from "react-bootstrap-v5";
import { searchPurchaseProduct } from "../../store/action/purchaseProductAction";
import { editPurchase } from "../../store/action/purchaseAction";
import status from "../../shared/option-lists/status.json";
import paymentType from "../../shared/option-lists/paymentType.json";
import paymentStatus from "../../shared/option-lists/paymentStatus.json";
import { fetchAllProducts } from "../../store/action/productAction";
import PurchaseTable from "../../shared/components/purchase/PurchaseTable";
import { preparePurchaseProductArray } from "../../shared/prepareArray/preparePurchaseArray";
import {
    decimalValidate,
    getFormattedMessage,
    placeholderText,
    onFocusInput,
} from "../../shared/sharedMethod";
import {
    calculateCartTotalAmount,
    calculateCartTotalTaxAmount,
} from "../../shared/calculation/calculation";
import ModelFooter from "../../shared/components/modelFooter";
import ProductSearch from "../../shared/components/product-cart/search/ProductSearch";
import { addToast } from "../../store/action/toastAction";
import { toastType } from "../../constants";
import ReactDatePicker from "../../shared/datepicker/ReactDatePicker";
import ProductMainCalculation from "./ProductMainCalculation";
import ReactSelect from "../../shared/select/reactSelect";
import PurchaseProductTableBody from "./tables/PurchaseProductTableBody";
import { editQuotationPurchase } from "../../store/action/quotationToPurchaseAction";
import PurchaseItemSearch from "./PurchaseItemSearch";
import _ from "lodash";

const PurchaseForm = (props) => {
    const {
        addPurchaseData,
        id,
        editQuotationPurchase,
        customProducts,
        singlePurchase,
        sanctionQuotation,
        suppliers,
        fetchAllProducts,
        products,
        frontSetting,
        allConfigData,
    } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newCost, setNewCost] = useState("");
    const [newDiscount, setNewDiscount] = useState("");
    const [newTax, setNewTax] = useState("");
    const [newPurchaseUnit, setNewPurchaseUnit] = useState("");
    const [subTotal, setSubTotal] = useState("");
    const [updateProducts, setUpdateProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [quotationItem, setQuotationItem] = useState([]);

    const [purchaseValue, setPurchaseValue] = useState({
        date: singlePurchase
            ? moment(singlePurchase.created_at).toDate()
            : new Date(),
        quotation_id: singlePurchase ? singlePurchase.quotation_id : "",
        // delivery_status: singlePurchase ? singlePurchase.delivery_status : "",
        payment_status: singlePurchase
            ? paymentStatus.find(
                  (status) => status.value == singlePurchase.payment_status
              )
            : "",
        payment_type: singlePurchase
            ? paymentType.find(
                  (type) => type.value == singlePurchase.payment_type
              )
            : "",
        supplier_id: singlePurchase ? singlePurchase.supplier_id : "",
        // tax_rate: singlePurchase ? singlePurchase.tax_rate.toFixed(2) : "0.00",
        // tax_amount: singlePurchase
        //     ? singlePurchase.tax_amount.toFixed(2)
        //     : "0.00",
        shipping: singlePurchase ? singlePurchase.shipping : "0.00",
        discount: singlePurchase ? singlePurchase.discount : "0.00",
        grand_total: singlePurchase ? singlePurchase.grand_total : "0.00",
        note: singlePurchase ? singlePurchase.note : "",
        purchase_status: singlePurchase
            ? singlePurchase.purchase_status
            : { label: "Received", value: 1 },
    });

    const [errors, setErrors] = useState({
        date: "",
        quotation_id: "",
        supplier_id: "",
        details: "",
        tax_rate: "",
        discount: "",
        shipping: "",
        purchase_status: "",
    });

    useEffect(() => {
        setUpdateProducts(updateProducts);
    }, [
        updateProducts,
        quantity,
        newCost,
        newDiscount,
        newTax,
        subTotal,
        newPurchaseUnit,
    ]);

    useEffect(() => {
        updateProducts.length >= 1
            ? dispatch({ type: "DISABLE_OPTION", payload: true })
            : dispatch({ type: "DISABLE_OPTION", payload: false });
    }, [updateProducts]);

    // useEffect(() => {
    //     if (!_.isEmpty(purchaseValue.quotation_id)) {
    //         setQuotationItem(santionQuotationOptions.items);
    //     }
    // }, [purchaseValue.quotation_id]);

    useEffect(() => {
        if (singlePurchase) {
            setPurchaseValue((prev) => {
                return {
                    ...prev,
                    date: singlePurchase
                        ? moment(singlePurchase.created_at).toDate()
                        : new Date(),
                    quotation_id: singlePurchase
                        ? singlePurchase.quotation_id
                        : "",
                    delivery_status: singlePurchase
                        ? singlePurchase.delivery_status
                        : "",
                    payment_status: singlePurchase
                        ? singlePurchase.payment_status
                        : "",
                    payment_type: singlePurchase
                        ? singlePurchase.payment_type
                        : "",
                    supplier_id: singlePurchase
                        ? singlePurchase.supplier_id
                        : "",
                    // tax_rate: singlePurchase ? singlePurchase.tax_rate.toFixed(2) : "0.00",
                    // tax_amount: singlePurchase
                    //     ? singlePurchase.tax_amount.toFixed(2)
                    //     : "0.00",
                    shipping: singlePurchase ? singlePurchase.shipping : "0.00",
                    discount: singlePurchase ? singlePurchase.discount : "0.00",
                    grand_total: singlePurchase
                        ? singlePurchase.grand_total
                        : "0.00",
                    note: singlePurchase ? singlePurchase.note : "",
                    purchase_status: singlePurchase
                        ? singlePurchase.purchase_status
                        : { label: "Received", value: 1 },
                    modified_by: singlePurchase
                        ? JSON.parse(localStorage.getItem("loginUserArray")).id
                        : "",
                };
            });
        }
    }, [singlePurchase]);

    useEffect(() => {
        if (singlePurchase) {
            setUpdateProducts(singlePurchase.purchase_items);
        }
        // setItems(singlePurchase.purchase_items);
    }, []);

    const customQuotationItems = [];
    if (sanctionQuotation.length) {
        sanctionQuotation.map((quotation, i) => {
            if (quotation?.quotation_items?.length) {
                quotation.quotation_items.map((item) =>
                    customQuotationItems.push(item)
                );
            }
        });
    }

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        const qtyCart = updateProducts.filter((a) => a.quantity === 0);
        if (!purchaseValue.date) {
            errorss["date"] = getFormattedMessage(
                "globally.date.validate.label"
            );
        } else if (!purchaseValue.quotation_id) {
            errorss["quotation_id"] = "Please Select Quotation";
        } else if (!purchaseValue.supplier_id) {
            errorss["supplier_id"] = getFormattedMessage(
                "purchase.select.supplier.validate.label"
            );
        } else if (qtyCart.length > 0) {
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "globally.product-quantity.validate.message"
                    ),
                    type: toastType.ERROR,
                })
            );
        } else if (updateProducts.length < 1) {
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "purchase.product-list.validate.message"
                    ),
                    type: toastType.ERROR,
                })
            );
        } else if (!purchaseValue.purchase_status) {
            errorss["purchase_status"] = getFormattedMessage(
                "globally.status.validate.label"
            );
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onQuotationChange = (obj) => {
        setPurchaseValue((inputs) => ({ ...inputs, quotation_id: obj }));
        setErrors("");
    };

    const onSupplierChange = (obj) => {
        setPurchaseValue((inputs) => ({ ...inputs, supplier_id: obj }));
        setErrors("");
    };

    const onStatusChange = (obj) => {
        setPurchaseValue((inputs) => ({ ...inputs, purchase_status: obj }));
    };

    // const onDeliveryChange = (obj) => {
    //     setPurchaseValue((inputs) => ({ ...inputs, delivery_status: obj }));
    // };
    const onPaymentStatusChange = (obj) => {
        setPurchaseValue((inputs) => ({ ...inputs, payment_status: obj }));
    };
    const onPaymentTypeChange = (obj) => {
        setPurchaseValue((inputs) => ({ ...inputs, payment_type: obj }));
    };

    const updateCost = (item) => {
        setNewCost(item);
    };

    const updateDiscount = (item) => {
        setNewDiscount(item);
    };

    const updateTax = (item) => {
        setNewTax(item);
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        const { value } = e.target;
        // check if value includes a decimal point
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            // restrict value to only 2 decimal places
            if (decimal?.length > 2) {
                // do nothing
                return;
            }
        }
        setPurchaseValue((inputs) => ({
            ...inputs,
            [e.target.name]: value && value,
        }));
    };

    const onNotesChangeInput = (e) => {
        e.preventDefault();
        setPurchaseValue((inputs) => ({ ...inputs, note: e.target.value }));
    };

    const handleCallback = (date) => {
        setPurchaseValue((previousState) => {
            return { ...previousState, date: date };
        });
        setErrors("");
    };

    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const updateSubTotal = (item) => {
        setSubTotal(item);
    };

    const updatePurchaseUnit = (item) => {
        setNewPurchaseUnit(item);
    };

    const prepareData = (prepareData) => {
        const formValue = {
            ...singlePurchase,
            date: moment(prepareData.date).toDate(),
            quotation_id: prepareData.quotation_id.value
                ? prepareData.quotation_id.value
                : prepareData.quotation_id,
            supplier_id: prepareData.supplier_id.value
                ? prepareData.supplier_id.value
                : prepareData.supplier_id,
            // discount: prepareData.discount,
            // tax_rate: prepareData.tax_rate,
            // tax_amount: calculateCartTotalTaxAmount(
            //     updateProducts,
            //     purchaseValue
            // ),
            purchase_items: updateProducts,
            // shipping: prepareData.shipping,
            grand_total: updateProducts.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            ),
            // received_amount: "",
            // paid_amount: "",
            payment_type: prepareData.payment_type.value
                ? prepareData.payment_type.value
                : prepareData.payment_type,
            payment_status: prepareData.payment_status.value
                ? prepareData.payment_status.value
                : prepareData.payment_status,
            note: prepareData.note,
            // reference_code: "",
            purchase_status: prepareData.purchase_status.value
                ? prepareData.purchase_status.value
                : prepareData.purchase_status,
        };
        return formValue;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            if (singlePurchase) {
                // console.log({ formValues: prepareData(purchaseValue) });
                // return 0;
                editQuotationPurchase(id, prepareData(purchaseValue), navigate);
            } else {
                addPurchaseData(prepareData(purchaseValue));
                setPurchaseValue(purchaseValue);
            }
        }
    };

    const onBlurInput = (el) => {
        if (el.target.value === "") {
            if (el.target.name === "shipping") {
                setPurchaseValue({ ...purchaseValue, shipping: "0.00" });
            }
            if (el.target.name === "discount") {
                setPurchaseValue({ ...purchaseValue, discount: "0.00" });
            }
            if (el.target.name === "tax_rate") {
                setPurchaseValue({ ...purchaseValue, tax_rate: "0.00" });
            }
        }
    };

    const santionQuotationOptions = sanctionQuotation.length
        ? sanctionQuotation.map((quotation) => {
              return {
                  label: quotation.reference_code,
                  value: quotation.id,
                  items: quotation.quotation_items,
              };
          })
        : [];

    // console.log({
    //     sanctionQuotation,
    //     purchaseValue,
    //     singlePurchase,
    //     santionQuotationOptions,
    // });

    return (
        <div className="card">
            <div className="card-body">
                {/*<Form>*/}
                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label">
                            {getFormattedMessage(
                                "react-data-table.date.column.label"
                            )}
                            :
                        </label>
                        <span className="required" />
                        <div className="position-relative">
                            <ReactDatePicker
                                onChangeDate={handleCallback}
                                newStartDate={purchaseValue.date}
                            />
                        </div>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["date"] ? errors["date"] : null}
                        </span>
                    </div>
                    <div className="col-md-4 mb-3">
                        <ReactSelect
                            data={santionQuotationOptions}
                            onChange={onQuotationChange}
                            defaultValue={purchaseValue.quotation_id}
                            // addSearchItems={singlePurchase}
                            isWarehouseDisable={singlePurchase ? true : false}
                            title="Quotations"
                            errors={errors["quotation_id"]}
                            placeholder="Select Quotations."
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <ReactSelect
                            data={suppliers.map((supplier) => ({
                                label: supplier.attributes.name,
                                value: supplier.id,
                            }))}
                            onChange={onSupplierChange}
                            defaultValue={purchaseValue.supplier_id}
                            title={getFormattedMessage("supplier.title")}
                            errors={errors["supplier_id"]}
                            placeholder={placeholderText(
                                "purchase.select.supplier.placeholder.label"
                            )}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label">
                            {getFormattedMessage(
                                "dashboard.stockAlert.product.label"
                            )}
                            :
                        </label>
                        {/* <PurchaseItemSearch
                            values={purchaseValue}
                            products={quotationItem ? quotationItem : []}
                            isAllProducts={true}
                            handleValidation={handleValidation}
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            customProducts={customQuotationItems}
                        /> */}
                    </div>
                    <div className="col-12 md-12">
                        <label className="form-label">
                            {getFormattedMessage(
                                "purchase.order-item.table.label"
                            )}
                            :
                        </label>
                        <span className="required " />
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>
                                        {getFormattedMessage(
                                            "dashboard.stockAlert.product.label"
                                        )}
                                    </th>
                                    <th>
                                        {getFormattedMessage(
                                            "purchase.order-item.table.net-unit-cost.column.label"
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
                                    {/* <th>
                                        {getFormattedMessage(
                                            "react-data-table.action.column.label"
                                        )}
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {updateProducts &&
                                    updateProducts.map(
                                        (singleProduct, index) => {
                                            return (
                                                <PurchaseProductTableBody
                                                    key={
                                                        index +
                                                        100 * Math.random()
                                                    }
                                                    singleProduct={
                                                        singleProduct
                                                    }
                                                    index={index}
                                                    updateQty={updatedQty}
                                                    updateCost={updateCost}
                                                    updateDiscount={
                                                        updateDiscount
                                                    }
                                                    updateProducts={
                                                        updateProducts
                                                    }
                                                    updateSubTotal={
                                                        updateSubTotal
                                                    }
                                                    frontSetting={frontSetting}
                                                    setUpdateProducts={
                                                        setUpdateProducts
                                                    }
                                                    updateTax={updateTax}
                                                    updatePurchaseUnit={
                                                        updatePurchaseUnit
                                                    }
                                                    purchaseItem={
                                                        singlePurchase &&
                                                        singlePurchase.purchase_items
                                                    }
                                                    isSaleReturn={false}
                                                />
                                            );
                                        }
                                    )}
                                {updateProducts && !updateProducts?.length ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="fs-5 px-3 py-6 custom-text-center"
                                        >
                                            {getFormattedMessage(
                                                "sale.product.table.no-data.label"
                                            )}
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-12">
                        <ProductMainCalculation
                            inputValues={purchaseValue}
                            updateProducts={updateProducts}
                            frontSetting={frontSetting}
                            allConfigData={allConfigData}
                        />
                    </div>
                    {/* <div className="col-md-4 mb-5">
                        <label className="form-label">
                            {getFormattedMessage(
                                "purchase.input.order-tax.label"
                            )}
                            :
                        </label>
                        <InputGroup>
                            <input
                                aria-label="Dollar amount (with dot and two decimal places)"
                                className="form-control"
                                onBlur={(event) => onBlurInput(event)}
                                onFocus={(event) => onFocusInput(event)}
                                value={purchaseValue.tax_rate}
                                type="text"
                                name="tax_rate"
                                onKeyPress={(event) => decimalValidate(event)}
                                onChange={(e) => {
                                    onChangeInput(e);
                                }}
                            />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["orderTax"] ? errors["orderTax"] : null}
                        </span>
                    </div> */}
                    {/* <div className="col-md-4 mb-5">
                        <label className="form-label">
                            {getFormattedMessage(
                                "purchase.order-item.table.discount.column.label"
                            )}
                            :
                        </label>
                        <InputGroup>
                            <input
                                aria-label="Dollar amount (with dot and two decimal places)"
                                className="form-control"
                                onBlur={(event) => onBlurInput(event)}
                                onFocus={(event) => onFocusInput(event)}
                                value={purchaseValue.discount}
                                type="text"
                                name="discount"
                                onKeyPress={(event) => decimalValidate(event)}
                                onChange={(e) => onChangeInput(e)}
                            />
                            <InputGroup.Text>
                                {frontSetting.value &&
                                    frontSetting.value.currency_symbol}
                            </InputGroup.Text>
                        </InputGroup>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["discount"] ? errors["discount"] : null}
                        </span>
                    </div> */}
                    {/* <div className="col-md-4 mb-5">
                        <label className="form-label">
                            {getFormattedMessage(
                                "purchase.input.shipping.label"
                            )}
                            :
                        </label>
                        <InputGroup>
                            <input
                                aria-label="Dollar amount (with dot and two decimal places)"
                                className="form-control"
                                value={purchaseValue.shipping}
                                type="text"
                                name="shipping"
                                onBlur={(event) => onBlurInput(event)}
                                onFocus={(event) => onFocusInput(event)}
                                onKeyPress={(event) => decimalValidate(event)}
                                onChange={(e) => onChangeInput(e)}
                            />
                            <InputGroup.Text>
                                {frontSetting.value &&
                                    frontSetting.value.currency_symbol}
                            </InputGroup.Text>
                        </InputGroup>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["shipping"] ? errors["shipping"] : null}
                        </span>
                    </div> */}
                    <div className="col-md-4">
                        <ReactSelect
                            name="purchase_status"
                            data={status}
                            onChange={onStatusChange}
                            title="Purchase Status"
                            defaultValue={purchaseValue.purchase_status}
                            errors={errors["purchase_status"]}
                            placeholder={placeholderText(
                                "purchase.select.status.placeholder.label"
                            )}
                        />
                    </div>
                    {/* <div className="col-md-4">
                        <ReactSelect
                            name="delivery_status"
                            data={deliveryStatus}
                            onChange={onDeliveryChange}
                            title="Delivery Status"
                            defaultValue={purchaseValue.delivery_status}
                            errors={errors["delivery_status"]}
                            placeholder="Select Delivery Status."
                        />
                    </div> */}
                    <div className="col-md-4">
                        <ReactSelect
                            name="payment_status"
                            data={paymentStatus}
                            onChange={onPaymentStatusChange}
                            title="Payment Status"
                            defaultValue={purchaseValue.payment_status}
                            errors={errors["payment_status"]}
                            placeholder="Select Payment Status."
                        />
                    </div>
                    <div className="col-md-4">
                        <ReactSelect
                            name="payment_type"
                            data={paymentType}
                            onChange={onPaymentTypeChange}
                            title="Payment Type"
                            defaultValue={purchaseValue.payment_type}
                            errors={errors["payment_type"]}
                            placeholder="Select Payment Type."
                        />
                    </div>
                    <div className="col-md-12 mb-5">
                        <label className="form-label">
                            {getFormattedMessage("globally.input.notes.label")}:
                        </label>
                        <textarea
                            name="note"
                            className="form-control"
                            placeholder={placeholderText(
                                "purchase.placeholder.notes.input"
                            )}
                            onChange={(e) => onNotesChangeInput(e)}
                            value={purchaseValue.note}
                        />
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["note"] ? errors["note"] : null}
                        </span>
                    </div>
                    <ModelFooter
                        onEditRecord={singlePurchase}
                        onSubmit={onSubmit}
                        link="/admin/pos/purchases"
                    />
                </div>
                {/*</Form>*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { purchaseProducts, frontSetting, allConfigData } = state;
    return {
        purchaseProducts,
        frontSetting,
        allConfigData,
    };
};

export default connect(mapStateToProps, {
    editQuotationPurchase,
    fetchAllProducts,
    searchPurchaseProduct,
})(PurchaseForm);
