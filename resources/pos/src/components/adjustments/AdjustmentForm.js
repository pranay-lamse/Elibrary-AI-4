import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { connect, useDispatch } from "react-redux";
import { fetchProductsByWarehouse } from "../../store/action/productAction";
import { editAdjustment } from "../../store/action/adjustMentAction";
import ProductSearch from "../../shared/components/product-cart/search/ProductSearch";
import AdjustmentRowTable from "../../shared/components/adjustments/AdjustmentRowTable";
import {
    placeholderText,
    getFormattedMessage,
} from "../../shared/sharedMethod";
import ReactDatePicker from "../../shared/datepicker/ReactDatePicker";
import { prepareSaleProductArray } from "../../shared/prepareArray/prepareSaleArray";
import ModelFooter from "../../shared/components/modelFooter";
import { addToast } from "../../store/action/toastAction";
import { toastType } from "../../constants";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import ReactSelect from "../../shared/select/reactSelect";

const AdjustmentForm = (props) => {
    const {
        addAdjustmentData,
        editAdjustment,
        id,
        warehouses,
        singleAdjustMent,
        customProducts,
        products,
        fetchProductsByWarehouse,
        fetchFrontSetting,
        frontSetting,
    } = props;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateProducts, setUpdateProducts] = useState([]);
    const [libraryName, setLibraryName] = useState(0);

    const [quantity, setQuantity] = useState(0);
    const [adjustMentValue, setAdjustMentValue] = useState({
        date: new Date(),
        warehouse_id: "",
        notes: singleAdjustMent ? singleAdjustMent.notes : "",
        AdjustmentType: { label: "Addition", value: 1 },
    });
    const [errors, setErrors] = useState({
        date: "",
        warehouse_id: "",
        AdjustmentType: "",
    });

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

    useEffect(() => {
        setUpdateProducts(updateProducts);
    }, [updateProducts, quantity]);

    useEffect(() => {
        updateProducts.length >= 1
            ? dispatch({ type: "DISABLE_OPTION", payload: true })
            : dispatch({ type: "DISABLE_OPTION", payload: false });
    }, [updateProducts]);

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    useEffect(() => {
        adjustMentValue.warehouse_id.value &&
            fetchProductsByWarehouse(adjustMentValue?.warehouse_id?.value);
    }, [adjustMentValue.warehouse_id.value]);

    useEffect(() => {
        if (singleAdjustMent) {
            setAdjustMentValue({
                date: singleAdjustMent
                    ? moment(singleAdjustMent.date).toDate()
                    : "",
                warehouse_id: singleAdjustMent
                    ? singleAdjustMent.warehouse_id
                    : "",
                AdjustmentType: singleAdjustMent
                    ? singleAdjustMent.AdjustmentType
                    : "",
            });
        }
    }, [singleAdjustMent]);

    useEffect(() => {
        if (singleAdjustMent) {
            setUpdateProducts(singleAdjustMent.adjustment_items);
        }
    }, []);

    const handleValidation = () => {
        let error = {};
        let isValid = false;
        const qtyCart = updateProducts.filter((a) => a.quantity === 0);
        if (!adjustMentValue.date) {
            error["date"] = getFormattedMessage("globally.date.validate.label");
        } else if (!adjustMentValue.warehouse_id) {
            error["warehouse_id"] = getFormattedMessage(
                "product.input.warehouse.validate.label"
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
        } else {
            isValid = true;
        }
        setErrors(error);
        return isValid;
    };

    const onWarehouseChange = (obj) => {
        setAdjustMentValue((inputs) => ({ ...inputs, warehouse_id: obj }));
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
        setAdjustMentValue((inputs) => ({
            ...inputs,
            [e.target.name]: value && value,
        }));
    };

    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const handleCallback = (date) => {
        setAdjustMentValue((previousState) => {
            return { ...previousState, date: date };
        });
        setErrors("");
    };

    const prepareFormData = (prepareData) => {
        const formValue = {
            date: moment(prepareData.date).toDate(),
            warehouse_id: prepareData.warehouse_id.value
                ? prepareData.warehouse_id.value
                : prepareData.warehouse_id,
            note: prepareData.notes,
            adjustment_items: updateProducts.map((item) => {
                return {
                    product_id: item.product_id,
                    quantity: item.quantity,
                    method_type: item.adjustMethod,
                    adjustment_item_id: item.adjustment_item_id,
                };
            }),
        };
        return formValue;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            if (singleAdjustMent) {
                editAdjustment(id, prepareFormData(adjustMentValue), navigate);
            } else {
                addAdjustmentData(prepareFormData(adjustMentValue));
                setAdjustMentValue(adjustMentValue);
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                {/*<Form>*/}
                <div className="row">
                    <div className="col-md-6">
                        <ReactSelect
                            name="warehouse_id"
                            data={filteredWarehouses}
                            onChange={onWarehouseChange}
                            title={getFormattedMessage("warehouse.title")}
                            errors={errors["warehouse_id"]}
                            defaultValue={filteredWarehouses.warehouse_id}
                            value={adjustMentValue.warehouse_id}
                            addSearchItems={singleAdjustMent}
                            isWarehouseDisable={true}
                            placeholder={placeholderText(
                                "purchase.select.warehouse.placeholder.label"
                            )}
                        />
                    </div>
                    <div className="col-md-6">
                        <div class="form-group w-100">
                            <label className="form-label fs-6 text-gray-700">
                                {getFormattedMessage(
                                    "react-data-table.date.column.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <div className="position-relative">
                                <ReactDatePicker
                                    onChangeDate={handleCallback}
                                    newStartDate={adjustMentValue.date}
                                />
                            </div>
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["date"] ? errors["date"] : null}
                            </span>
                        </div>
                    </div>
                    <div className="mb-10">
                        <label className="form-label">
                            {getFormattedMessage("product.title")}:
                        </label>
                        <ProductSearch
                            values={adjustMentValue}
                            products={products}
                            handleValidation={handleValidation}
                            updateProducts={updateProducts}
                            isAllProducts={true}
                            setUpdateProducts={setUpdateProducts}
                            customProducts={customProducts}
                        />
                    </div>
                    <div>
                        <label className="form-label">
                            {getFormattedMessage(
                                "purchase.order-item.table.label"
                            )}
                            :
                        </label>
                        <span className="required" />
                        <AdjustmentRowTable
                            updateProducts={updateProducts}
                            setUpdateProducts={setUpdateProducts}
                            updatedQty={updatedQty}
                            frontSetting={frontSetting}
                            /* warehouse={filteredWarehouses.warehouse_id} */
                        />
                    </div>
                    <ModelFooter
                        onEditRecord={singleAdjustMent}
                        onSubmit={onSubmit}
                        link="/admin/pos/adjustments"
                    />
                </div>
                {/*</Form>*/}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { purchaseProducts, products, frontSetting } = state;
    return {
        customProducts: prepareSaleProductArray(products),
        purchaseProducts,
        products,
        frontSetting,
    };
};

export default connect(mapStateToProps, {
    editAdjustment,
    fetchProductsByWarehouse,
    fetchFrontSetting,
})(AdjustmentForm);
