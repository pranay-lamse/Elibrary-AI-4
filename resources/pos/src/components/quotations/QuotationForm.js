import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, InputGroup } from "react-bootstrap-v5";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { fetchProductsByWarehouse } from "../../store/action/productAction";
import { editSale } from "../../store/action/salesAction";
import LetterItemSearch from "./LetterItemSearch";
import {
    placeholderText,
    getFormattedMessage,
    decimalValidate,
    onFocusInput,
} from "../../shared/sharedMethod";
import status from "../../shared/option-lists/quotationStatus.json";
import ReactDatePicker from "../../shared/datepicker/ReactDatePicker";
import ProductMainCalculation from "./ProductMainCalculation";
// import {
//     calculateCartTotalAmount,
//     calculateCartTotalTaxAmount,
// } from "../../shared/calculation/calculation";
import { prepareSaleProductArray } from "../../shared/prepareArray/prepareSaleArray";
import ModelFooter from "../../shared/components/modelFooter";
import { addToast } from "../../store/action/toastAction";
import { toastType } from "../../constants";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import ReactSelect from "../../shared/select/reactSelect";
import { editQuotation } from "../../store/action/sanctionQuotationAction ";
import LetterProductRowTable from "./tables/LetterProductRowTable";
import { calculateCartTotalAmount } from "./calculations/calculation";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import { fetchSanctionLetters } from "../../store/action/sanctionLetterAction";
import { object } from "prop-types";

const QuotationForm = (props) => {
    const {
        fetchSanctionLetters,
        fetchAllSuppliers,
        addQuoationData,
        id,
        suppliers,
        sanctionLetters,
        singleQuotation,
        fetchFrontSetting,
        frontSetting,
        editQuotation,
        allConfigData,
    } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateProducts, setUpdateProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [newCost, setNewCost] = useState("");
    const [newDiscount, setNewDiscount] = useState("");
    const [newTax, setNewTax] = useState("");
    const [subTotal, setSubTotal] = useState("");
    const [newSaleUnit, setNewSaleUnit] = useState("");
    const [letterItems, setLetterItems] = useState([]);

    const member = JSON.parse(localStorage.getItem("loginUserArray"));

    // const [file, setFile] = useState(null);

    const customletterItems = [];
    if (sanctionLetters.length) {
        sanctionLetters.map((letter, i) => {
            if (letter?.items?.length) {
                letter.items.map((item) => customletterItems.push(item));
            }
        });
    }

    const onInputChange = (e) => {
        // e.preventDefault();
        // setFile(e.target.files[0]);
        // input.onChange(e.target.files);
        // console.log({ file });
        setSaleValue((inputs) => ({
            ...inputs,
            quotation_pdf_file: e.target.files[0],
        }));
    };

    const [saleValue, setSaleValue] = useState({
        date: new Date(),
        supplier_id: "",
        sanction_letter_id: "",
        tax_rate: "0.00",
        tax_amount: 0.0,
        discount: "0.00",
        shipping: "0.00",
        grand_total: 0.0,
        note: "",
        received_amount: 0,
        paid_amount: 0,
        status_id: { label: "Sent", value: 1 },
    });

    const [errors, setErrors] = useState({
        date: "",
        supplier_id: "",
        sanction_letter_id: "",
        status_id: "",
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
        newSaleUnit,
    ]);

    useEffect(() => {
        updateProducts.length >= 1
            ? dispatch({ type: "DISABLE_OPTION", payload: true })
            : dispatch({ type: "DISABLE_OPTION", payload: false });
    }, [updateProducts]);

    useEffect(() => {
        Promise.all([fetchFrontSetting(), fetchAllSuppliers()]);
    }, []);

    // console.log({ sanctionLetters, suppliers });

    useEffect(() => {
        if (singleQuotation) {
            setSaleValue({
                date: moment(singleQuotation.date).toDate(),
                supplier_id: singleQuotation.supplier_id,
                sanction_letter_id: singleQuotation.sanction_letter_id,
                quotation_pdf_file: singleQuotation.quotation_pdf_file,
                // tax_rate: singleQuotation
                //     ? singleQuotation.tax_rate.toFixed(2)
                //     : "0.00",
                // tax_amount: singleQuotation
                //     ? singleQuotation.tax_amount.toFixed(2)
                //     : "0.00",
                discount: singleQuotation.discount,
                shipping: singleQuotation.shipping,
                grand_total: singleQuotation.grand_total,
                status_id: singleQuotation.status_id,
                isEdit: singleQuotation.isEdit,
                note: singleQuotation.note,
            });
        }
    }, []);

    useEffect(() => {
        if (singleQuotation) {
            setUpdateProducts(singleQuotation.quotation_items);
            setLetterItems(singleQuotation.sanction_letter_id.items);
        }
    }, []);

    useEffect(() => {
        if (!_.isEmpty(saleValue.sanction_letter_id)) {
            setLetterItems(saleValue.sanction_letter_id.item);
        }
    }, [saleValue.sanction_letter_id]);

    const handleValidation = () => {
        let error = {};
        let isValid = false;
        const qtyCart = updateProducts.filter((a) => a.quantity === 0);
        if (!saleValue.date) {
            error["date"] = getFormattedMessage("globally.date.validate.label");
        } else if (!saleValue.sanction_letter_id) {
            error["sanction_letter_id"] = "Select Sanction Letter Request";
        } else if (!saleValue.supplier_id) {
            error["supplier_id"] = "Select Suppliers.";
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
        } else if (!saleValue.status_id) {
            error["status_id"] = getFormattedMessage(
                "globally.status.validate.label"
            );
        } else {
            isValid = true;
        }
        setErrors(error);
        return isValid;
    };

    const onSanctionLetterChange = (obj) => {
        setSaleValue((inputs) => ({ ...inputs, sanction_letter_id: obj }));
        setUpdateProducts(obj.item);
        setErrors("");
    };

    const onSupplierChange = (obj) => {
        setSaleValue((inputs) => ({ ...inputs, supplier_id: obj }));
        setErrors("");
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
        setSaleValue((inputs) => ({
            ...inputs,
            [e.target.name]: value && value,
        }));
    };

    const onNotesChangeInput = (e) => {
        e.preventDefault();
        setSaleValue((inputs) => ({ ...inputs, note: e.target.value }));
    };

    const onStatusChange = (obj) => {
        setSaleValue((inputs) => ({ ...inputs, status_id: obj }));
    };

    const onPaymentStatusChange = (obj) => {
        setSaleValue((inputs) => ({ ...inputs, payment_status: obj }));
    };

    const onPaymentTypeChange = (obj) => {
        setSaleValue((inputs) => ({ ...inputs, payment_type: obj }));
    };

    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const updateCost = (cost) => {
        setNewCost(cost);
    };

    const updateDiscount = (discount) => {
        setNewDiscount(discount);
    };

    const updateTax = (tax) => {
        setNewTax(tax);
    };

    const updateSubTotal = (subTotal) => {
        setSubTotal(subTotal);
    };

    const updateSaleUnit = (saleUnit) => {
        setNewSaleUnit(saleUnit);
    };

    const handleCallback = (date) => {
        setSaleValue((previousState) => {
            return { ...previousState, date: date };
        });
        setErrors("");
    };

    const prepareFormData = (prepareData) => {
        const formValue = {
            date: moment(prepareData.date).toDate(),
            sanction_letter_id: prepareData.sanction_letter_id.value
                ? prepareData.sanction_letter_id.value
                : prepareData.sanction_letter_id,
            supplier_id: prepareData.supplier_id.value
                ? prepareData.supplier_id.value
                : prepareData.supplier_id,
            discount: prepareData.discount,
            quotation_pdf_file: prepareData.quotation_pdf_file
                ? prepareData.quotation_pdf_file
                : null,
            created_by: singleQuotation
                ? singleQuotation.created_by
                : member.id,
            modified_by: singleQuotation ? member.id : null,

            // tax_rate: prepareData.tax_rate,
            // tax_amount: calculateCartTotalTaxAmount(updateProducts, saleValue),
            quotation_items: updateProducts,
            // shipping: prepareData.shipping,
            grand_total:
                updateProducts.length &&
                updateProducts.reduce((total, item) => {
                    return total + item.price * item.quantity;
                }, 0),
            // received_amount: 0,
            // paid_amount: 0,
            note: prepareData.note,
            status: prepareData.status_id.value
                ? prepareData.status_id.value
                : prepareData.status_id,
        };

        const formData = new FormData();
        for (const [key1, value1] of Object.entries(formValue)) {
            if (key1 === "quotation_items") {
                value1.map((item, index) => {
                    formData.append(
                        `quotation_items[${index}][letter_id]`,
                        item.letter_id
                            ? item.letter_id
                            : item.sanction_letter_id
                            ? item.sanction_letter_id
                            : ""
                    );
                    if (item.isEdit) {
                        formData.append(
                            `quotation_items[${index}][isEdit]`,
                            item.isEdit ? item.isEdit : ""
                        );
                    }
                    formData.append(
                        `quotation_items[${index}][id]`,
                        item.id ? item.id : ""
                    );
                    // formData.append(
                    //     `quotation_items[${index}][sanction_letter_item_id]`,
                    //     item.sanction_letter_item_id
                    //         ? item.sanction_letter_item_id
                    //         : ""
                    // );
                    formData.append(
                        `quotation_items[${index}][price]`,
                        item.price ? item.price : ""
                    );
                    formData.append(
                        `quotation_items[${index}][category]`,
                        item.category ? item.category : ""
                    );
                    formData.append(
                        `quotation_items[${index}][name]`,
                        item.name ? item.name : ""
                    );
                    formData.append(
                        `quotation_items[${index}][quantity]`,
                        item.quantity ? item.quantity : ""
                    );
                    formData.append(
                        `quotation_items[${index}][notes]`,
                        item.notes ? item.notes : ""
                    );
                });
            } else {
                formData.append(key1, value1);
            }
        }
        return formData;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            if (singleQuotation) {
                console.log({ formvalues: saleValue });
                // return 0;
                editQuotation(id, prepareFormData(saleValue), navigate);
            } else {
                // console.log({ formvalues: prepareFormData(saleValue) });
                // return 0;
                addQuoationData(prepareFormData(saleValue));
                setSaleValue(saleValue);
            }
        }
    };

    // const onBlurInput = (el) => {
    //     if (el.target.value === "") {
    //         if (el.target.name === "shipping") {
    //             setSaleValue({ ...saleValue, shipping: "0.00" });
    //         }
    //         if (el.target.name === "discount") {
    //             setSaleValue({ ...saleValue, discount: "0.00" });
    //         }
    //         if (el.target.name === "tax_rate") {
    //             setSaleValue({ ...saleValue, tax_rate: "0.00" });
    //         }
    //     }
    // };

    // console.log({ updateProducts, saleValue, singleQuotation, letterItems });

    return (
        <div className="card">
            <div className="card-body">
                {/*<Form>*/}
                <div className="row">
                    <div className="col-md-4">
                        <div class="form-group w-100">
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
                                    newStartDate={saleValue.date}
                                />
                            </div>
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["date"] ? errors["date"] : null}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <ReactSelect
                            name="sanction_letter_id"
                            data={sanctionLetters}
                            onChange={onSanctionLetterChange}
                            title={"Sanction Letters"}
                            errors={errors["sanction_letter_id"]}
                            defaultValue={saleValue.sanction_letter_id}
                            value={saleValue.sanction_letter_id}
                            addSearchItems={singleQuotation}
                            isWarehouseDisable={true}
                            placeholder={"Select Sanction Letter."}
                        />
                    </div>
                    <div className="col-md-4">
                        <ReactSelect
                            name="supplier_id"
                            data={suppliers}
                            onChange={onSupplierChange}
                            title={"Suppliers"}
                            errors={errors["supplier_id"]}
                            defaultValue={saleValue.supplier_id}
                            value={saleValue.supplier_id}
                            placeholder={"Select Suppliers."}
                        />
                    </div>
                    {/* <div className="mb-5">
                        <label className="form-label">
                            {getFormattedMessage("product.title")}:
                        </label>
                        <LetterItemSearch
                            values={saleValue}
                            products={letterItems ? letterItems : []}
                            handleValidation={handleValidation}
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            customProducts={customletterItems}
                        />
                    </div> */}
                    <div className="col-md-12">
                        <div class="form-group w-100">
                            <label className="form-label">
                                {getFormattedMessage(
                                    "purchase.order-item.table.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <LetterProductRowTable
                                updateProducts={updateProducts}
                                setUpdateProducts={setUpdateProducts}
                                updatedQty={updatedQty}
                                frontSetting={frontSetting}
                                updateCost={updateCost}
                                updateDiscount={updateDiscount}
                                updateTax={updateTax}
                                updateSubTotal={updateSubTotal}
                                updateSaleUnit={updateSaleUnit}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <ProductMainCalculation
                            inputValues={saleValue}
                            allConfigData={allConfigData}
                            updateProducts={updateProducts}
                            frontSetting={frontSetting}
                        />
                    </div>
                    {/* <div className="col-md-4 mb-3">
                        <label className="form-label">
                            {getFormattedMessage(
                                "purchase.input.order-tax.label"
                            )}
                            :{" "}
                        </label>
                        <InputGroup>
                            <input
                                aria-label="Dollar amount (with dot and two decimal places)"
                                className="form-control"
                                type="text"
                                name="tax_rate"
                                value={saleValue.tax_rate}
                                onBlur={(event) => onBlurInput(event)}
                                onFocus={(event) => onFocusInput(event)}
                                onKeyPress={(event) => decimalValidate(event)}
                                onChange={(e) => {
                                    onChangeInput(e);
                                }}
                            />
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup>
                    </div> */}
                    {/* <div className="col-md-4 mb-3">
                        <Form.Label className="form-label">
                            {getFormattedMessage(
                                "purchase.order-item.table.discount.column.label"
                            )}
                            :{" "}
                        </Form.Label>
                        <InputGroup>
                            <input
                                aria-label="Dollar amount (with dot and two decimal places)"
                                className="form-control"
                                type="text"
                                name="discount"
                                value={saleValue.discount}
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
                    </div> */}
                    {/* <div className="col-md-4 mb-3">
                        <label className="form-label">
                            {getFormattedMessage(
                                "purchase.input.shipping.label"
                            )}
                            :{" "}
                        </label>
                        <InputGroup>
                            <input
                                aria-label="Dollar amount (with dot and two decimal places)"
                                type="text"
                                className="form-control"
                                name="shipping"
                                value={saleValue.shipping}
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
                    </div> */}
                    <div className="col-md-12">
                        <div class="form-group w-100">
                            <label
                                htmlFor="pdf-preview"
                                style={{ width: "100%" }}
                                className="form-label"
                            >
                                Quotation Letter
                            </label>
                            <input
                                type="file"
                                name="quotation_pdf_file"
                                onChange={onInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <ReactSelect
                            name="status_id"
                            data={status}
                            onChange={onStatusChange}
                            title={getFormattedMessage(
                                "purchase.select.status.label"
                            )}
                            value={saleValue.status_id}
                            errors={errors["status_id"]}
                            placeholder={placeholderText(
                                "purchase.select.status.placeholder.label"
                            )}
                        />
                    </div>
                    <div className="mb-3 mt-2">
                        <label className="form-label">
                            {getFormattedMessage("globally.input.notes.label")}:{" "}
                        </label>
                        <textarea
                            name="note"
                            className="form-control"
                            value={saleValue.note}
                            placeholder={placeholderText(
                                "globally.input.notes.placeholder.label"
                            )}
                            onChange={(e) => onNotesChangeInput(e)}
                        />
                    </div>
                    <ModelFooter
                        onEditRecord={singleQuotation}
                        onSubmit={onSubmit}
                        link="/admin/pos/quotations"
                    />
                </div>
                {/*</Form>*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { frontSetting, allConfigData, suppliers } = state;

    return {
        frontSetting,
        allConfigData,
        suppliers,
    };
};

export default connect(mapStateToProps, {
    editSale,
    editQuotation,
    fetchFrontSetting,
    fetchAllSuppliers,
    fetchSanctionLetters,
})(QuotationForm);
