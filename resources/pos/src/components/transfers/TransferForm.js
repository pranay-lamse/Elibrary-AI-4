import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { InputGroup, Table } from "react-bootstrap-v5";
import { editTransfer } from "../../store/action/transfersAction";
import TransferStatusType from "../../shared/option-lists/TransferStatusType.json";
import { fetchAllProducts } from "../../store/action/productAction";
import TransfersTable from "../../shared/components/transfers/TransfersTable";
import { prepareTransferArray } from "../../shared/prepareArray/prepareTransferArray";
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
import ProductMainCalculation from "../sales/ProductMainCalculation";
import ReactSelect from "../../shared/select/reactSelect";
import { fetchProductsByWarehouse } from "../../store/action/productAction";

const TransferForm = (props) => {
    const {
        addTtansferData,
        id,
        editTransfer,
        customProducts,
        singleTransfer,
        warehouses,
        fetchAllProducts,
        fetchProductsByWarehouse,
        products,
        frontSetting,
        allConfigData,
        books,
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

    // console.log({ books, customProducts, singleTransfer, updateProducts });

    const [transferValue, setTransferValue] = useState({
        date: singleTransfer
            ? moment(singleTransfer.date).toDate()
            : new Date(),
        from_warehouse_id: singleTransfer
            ? singleTransfer.from_warehouse_id
            : "",
        to_warehouse_id: singleTransfer ? singleTransfer.to_warehouse_id : "",
        warehouse_id: undefined,
        // supplier_id: singleTransfer ? singleTransfer.supplier_id : "",
        // tax_rate: singleTransfer ? singleTransfer.tax_rate.toFixed(2) : "0.00",
        // tax_amount: singleTransfer
        //     ? singleTransfer.tax_amount.toFixed(2)
        //     : "0.00",
        // discount: singleTransfer ? singleTransfer.discount.toFixed(2) : "0.00",
        // shipping: singleTransfer ? singleTransfer.shipping.toFixed(2) : "0.00",
        // grand_total: singleTransfer ? singleTransfer.grand_total : "0.00",
        notes: singleTransfer ? singleTransfer.notes : "",
        status_id: singleTransfer
            ? singleTransfer.status_id
            : {
                  label: "Completed",
                  value: 1,
              },
    });

    console.log({ transferValue });

    const [errors, setErrors] = useState({
        date: "",
        from_warehouse_id: "",
        to_warehouse_id: "",
        supplier_id: "",
        details: "",
        tax_rate: "",
        discount: "",
        shipping: "",
        status_id: "",
    });

    useEffect(() => {
        const url = "https://dindayalupadhyay.smartcitylibrary.com";
        if (warehouses.length) {
            const warehouse = warehouses.find((warehous) =>
                url.includes(warehous.attributes.name)
            );
            // onWarehouseChangeOne(warehouse);
            setTransferValue((inputs) => ({
                ...inputs,
                from_warehouse_id: {
                    value: warehouse.id,
                    label: warehouse.attributes.name,
                    attributes: warehouse.attributes,
                },
            }));
        }
    }, [warehouses]);

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
        if (singleTransfer) {
            setUpdateProducts(singleTransfer.transfer_items);
        }
    }, []);

    useEffect(() => {
        updateProducts.length >= 1
            ? dispatch({ type: "DISABLE_OPTION", payload: true })
            : dispatch({ type: "DISABLE_OPTION", payload: false });
    }, [singleTransfer]);

    useEffect(() => {
        // transferValue.from_warehouse_id.value
        //     ? fetchProductsByWarehouse(transferValue.from_warehouse_id.value)
        //     : null;
        transferValue.from_warehouse_id.value
            ? setTransferValue((inputs) => ({
                  ...inputs,
                  warehouse_id: transferValue.from_warehouse_id,
              }))
            : null;
    }, [transferValue.from_warehouse_id]);

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        const qtyCart = updateProducts.filter((a) => a.quantity === 0);
        if (!transferValue.date) {
            errorss["date"] = getFormattedMessage(
                "globally.date.validate.label"
            );
        } else if (!transferValue.from_warehouse_id) {
            errorss["from_warehouse_id"] = getFormattedMessage(
                "purchase.select.warehouse.validate.label"
            );
        } else if (!transferValue.to_warehouse_id) {
            errorss["to_warehouse_id"] = getFormattedMessage(
                "purchase.select.warehouse.validate.label"
            );
        } else if (
            transferValue.from_warehouse_id.value ===
            transferValue.to_warehouse_id.value
        ) {
            errorss["to_warehouse_id"] = getFormattedMessage(
                "transfer.select.warehouse.validate.message"
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
        } else if (!transferValue.status_id) {
            errorss["status_id"] = getFormattedMessage(
                "globally.status.validate.label"
            );
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onWarehouseChangeOne = (obj) => {
        setTransferValue((inputs) => ({ ...inputs, from_warehouse_id: obj }));
        setErrors("");
    };

    const onWarehouseChangeTow = (obj) => {
        setTransferValue((inputs) => ({ ...inputs, to_warehouse_id: obj }));
        setErrors("");
    };

    const onStatusChange = (obj) => {
        setTransferValue((inputs) => ({ ...inputs, status_id: obj }));
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
        setTransferValue((inputs) => ({
            ...inputs,
            [e.target.name]: value && value,
        }));
    };

    const onNotesChangeInput = (e) => {
        e.preventDefault();
        setTransferValue((inputs) => ({ ...inputs, notes: e.target.value }));
    };

    const handleCallback = (date) => {
        setTransferValue((previousState) => {
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
        console.log("preparedata", prepareData);
        const formValue = {
            from_warehouse_id: prepareData.from_warehouse_id.value
                ? prepareData.from_warehouse_id.value
                : prepareData.from_warehouse_id,
            to_warehouse_id: prepareData.to_warehouse_id.value
                ? prepareData.to_warehouse_id.value
                : prepareData.to_warehouse_id,
            date: moment(prepareData.date).toDate(),
            transfer_items: updateProducts,
            note: prepareData.notes,
            status: prepareData.status_id.value
                ? prepareData.status_id.value
                : prepareData.status_id,
        };
        return formValue;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            if (singleTransfer) {
                editTransfer(id, prepareData(transferValue), navigate);
            } else {
                addTtansferData(prepareData(transferValue));
                setTransferValue(transferValue);
            }
        }
    };

    const onBlurInput = (el) => {
        if (el.target.value === "") {
            if (el.target.name === "shipping") {
                setTransferValue({ ...transferValue, shipping: "0.00" });
            }
            if (el.target.name === "discount") {
                setTransferValue({ ...transferValue, discount: "0.00" });
            }
            if (el.target.name === "tax_rate") {
                setTransferValue({ ...transferValue, tax_rate: "0.00" });
            }
        }
    };

    if (
        window.location.origin.toString() ==
        "https://dindayalupadhyay.smartcitylibrary.com"
    ) {
        var current_library_id = 1;
    } else if (
        window.location.origin.toString() ==
        "https://kundanlalgupta.smartcitylibrary.com"
    ) {
        var current_library_id = 2;
    } else if (
        window.location.origin.toString() ==
        "https://rashtramatakasturba.smartcitylibrary.com"
    ) {
        var current_library_id = 3;
    } else {
        var current_library_id = 1;
    }

    const filteredWarehouses = warehouses.filter(
        (warehouse) => warehouse.id == current_library_id
    );

    const filteredWarehousestwo = warehouses.filter(
        (warehouse) => warehouse.id != current_library_id
    );

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
                                newStartDate={transferValue.date}
                            />
                        </div>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["date"] ? errors["date"] : null}
                        </span>
                    </div>
                    <div className="col-md-4 mb-3">
                        <ReactSelect
                            data={filteredWarehouses}
                            onChange={onWarehouseChangeOne}
                            value={transferValue.from_warehouse_id}
                            addSearchItems={singleTransfer}
                            isWarehouseDisable={true}
                            title={"From Library"}
                            errors={errors["from_warehouse_id"]}
                            placeholder={"Choose Library"}
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <ReactSelect
                            data={filteredWarehousestwo}
                            onChange={onWarehouseChangeTow}
                            defaultValue={transferValue.to_warehouse_id}
                            addSearchItems={singleTransfer}
                            isWarehouseDisable={true}
                            title={"To Library"}
                            errors={errors["to_warehouse_id"]}
                            placeholder={"Choose Library"}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Book :</label>
                        <ProductSearch
                            values={transferValue}
                            products={books}
                            isAllProducts={false}
                            handleValidation={handleValidation}
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            customProducts={customProducts}
                        />
                    </div>
                    <div className="col-12 md-12">
                        <label className="form-label">Book Item :</label>
                        <span className="required " />
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>
                                        {getFormattedMessage(
                                            "books.items.input.book-code.label"
                                        )}
                                    </th>
                                    <th>
                                        {getFormattedMessage(
                                            "books.items.input.edition.label"
                                        )}
                                    </th>
                                    <th>
                                        {getFormattedMessage(
                                            "books.items.select.language.label"
                                        )}
                                    </th>
                                    <th>price</th>
                                    <th>barcode</th>
                                    <th>Rack Number</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updateProducts.length
                                    ? updateProducts[0].items.map(
                                          (singleProduct, index) => {
                                              return (
                                                  <TransfersTable
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
                                                      frontSetting={
                                                          frontSetting
                                                      }
                                                      setUpdateProducts={
                                                          setUpdateProducts
                                                      }
                                                      updateTax={updateTax}
                                                      updatePurchaseUnit={
                                                          updatePurchaseUnit
                                                      }
                                                      transferItem={
                                                          singleTransfer &&
                                                          singleTransfer.purchase_items
                                                      }
                                                  />
                                              );
                                          }
                                      )
                                    : null}
                                {!updateProducts.length && (
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
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-12">
                        {/* <ProductMainCalculation
                            inputValues={transferValue}
                            updateProducts={updateProducts}
                            frontSetting={frontSetting}
                            allConfigData={allConfigData}
                        /> */}
                    </div>
                    <div className="col-md-4 mb-3">
                        <ReactSelect
                            name="status"
                            data={TransferStatusType}
                            onChange={onStatusChange}
                            title={getFormattedMessage(
                                "purchase.select.status.label"
                            )}
                            defaultValue={transferValue.status_id}
                            errors={errors["status_id"]}
                            placeholder={placeholderText(
                                "purchase.select.status.placeholder.label"
                            )}
                        />
                    </div>
                    <div className="col-md-12 mb-5">
                        <label className="form-label">
                            {getFormattedMessage("globally.input.notes.label")}:
                        </label>
                        <textarea
                            name="notes"
                            className="form-control"
                            placeholder={placeholderText(
                                "purchase.placeholder.notes.input"
                            )}
                            onChange={(e) => onNotesChangeInput(e)}
                            //   value={purchaseValue.notes}
                        />
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["notes"] ? errors["notes"] : null}
                        </span>
                    </div>
                    <ModelFooter
                        onEditRecord={singleTransfer}
                        onSubmit={onSubmit}
                        link="/admin/pos/transfers"
                    />
                </div>
                {/*</Form>*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { products, frontSetting, allConfigData, books } = state;

    return {
        customProducts: books,
        products,
        frontSetting,
        allConfigData,
        books,
    };
};

export default connect(mapStateToProps, {
    editTransfer,
    fetchProductsByWarehouse,
    fetchAllProducts,
})(TransferForm);
