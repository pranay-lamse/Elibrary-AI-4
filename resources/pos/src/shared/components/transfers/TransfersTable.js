import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";
import { connect } from "react-redux";
import ProductModal from "./ProductModal";
import Form from "react-bootstrap/Form";
import {
    taxAmountMultiply,
    discountAmountMultiply,
    subTotalCount,
    amountBeforeTax,
} from "../../calculation/calculation";
import { productUnitDropdown } from "../../../store/action/productUnitAction";
import { currencySymbolHendling, decimalValidate } from "../../sharedMethod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Barcode from "react-barcode";
import BookItemStatus from "../../../shared/book-item-status/BookItemStatus";
const TransfersTable = (props) => {
    const {
        singleProduct,
        index,
        updateCost,
        updateDiscount,
        updateQty,
        updateProducts,
        setUpdateProducts,
        frontSetting,
        updateTax,
        updateSubTotal,
        productUnitDropdown,
        productUnits,
        updatePurchaseUnit,
        allConfigData,
    } = props;

    const [updateData, setUpdateData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null);

    // useEffect(() => {
    //     if (singleProduct.newItem)
    //         productUnitDropdown(singleProduct.product_unit);
    // }, [singleProduct.product_unit, updateData]);

    const onDeleteCartItem = (id) => {
        const newItem = updateProducts[0].items.filter(
            (item) => item.id !== id
        );
        const tempProduct = [{ ...updateProducts[0], items: newItem }];
        if (newItem.length <= 0) {
            setUpdateProducts([]);
        } else {
            setUpdateProducts(tempProduct);
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        e.stopPropagation();
        productUnitDropdown(singleProduct.product_unit);
        setModalId(singleProduct.id);
    };

    const onProductUpdateInCart = (item) => {
        setUpdateData(item);
    };

    const handleIncrement = () => {
        setUpdateProducts((updateProducts) =>
            updateProducts.map((item) =>
                item.id === singleProduct.id
                    ? { ...item, quantity: item.quantity++ + 1 }
                    : item
            )
        );
    };

    const handleDecrement = () => {
        if (singleProduct.quantity - 1 > 0.0) {
            setUpdateProducts((updateProducts) =>
                updateProducts.map((item) =>
                    item.id === singleProduct.id
                        ? {
                              ...item,
                              quantity:
                                  item.quantity > 0.0 && item.quantity-- - 1,
                          }
                        : item
                )
            );
        }
    };

    const handleChange = (e) => {
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
        setUpdateProducts((updateProducts) =>
            updateProducts.map((item) =>
                item.id === singleProduct.id
                    ? { ...item, quantity: Number(value) }
                    : item
            )
        );
    };

    const renderBookItemStatus = (bookItem) => {
        const statusProps = { status: bookItem.status, item: bookItem };
        return <BookItemStatus {...statusProps} item={bookItem} />;
    };

    return (
        <>
            <tr key={index} className="align-middle">
                <td className="ps-3">
                    {/* <h4 className="product-name">{singleProduct.code}</h4>
                    <div className="d-flex align-items-center">
                        <span className="badge bg-light-success">
                            <span>{singleProduct.book_code}</span>
                        </span>
                        <span className="badge bg-light-primary p-1 ms-1">
                            <FontAwesomeIcon
                                icon={faPencil}
                                onClick={(e) => handleClose(e)}
                                style={{ cursor: "pointer" }}
                            />
                        </span>
                    </div> */}
                    <span className="badge bg-light-success">
                        <span>{singleProduct.book_code}</span>
                    </span>
                </td>
                <td>{singleProduct.edition}</td>
                <td>{singleProduct.language.language_name}</td>
                <td>{singleProduct.price}</td>
                <td className={"book-item__table-book-code"}>
                    {singleProduct.book_code ? (
                        <Barcode value={singleProduct.book_code} />
                    ) : (
                        "Unavailable"
                    )}
                </td>
                <td className={"book-item__table-book-code"}>
                    {singleProduct.rack_number
                        ? singleProduct.rack_number
                        : "Unavailable"}
                </td>
                <td className={"book-item__table-book-code"}>
                    {renderBookItemStatus(singleProduct)}
                </td>
                {/* <td>
                    {singleProduct.isEdit ? (
                        singleProduct.stock.length >= 1 &&
                        singleProduct.stock.map((item, index) => {
                            return (
                                <span
                                    className="badge bg-light-warning"
                                    key={index + 100 * Math.random()}
                                >
                                    <span>
                                        {item.quantity}&nbsp;
                                        {singleProduct.short_name}
                                    </span>
                                </span>
                            );
                        })
                    ) : singleProduct.stock >= 0 ? (
                        <span className="badge bg-light-warning">
                            <span>
                                {singleProduct.stock}&nbsp;
                                {singleProduct.short_name}
                            </span>
                        </span>
                    ) : (
                        ""
                    )}
                </td> */}
                {/* <td>
                    <div className="custom-qty">
                        <InputGroup>
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 pt-2"
                                onClick={() => handleDecrement()}
                            >
                                -
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Product Quantity"
                                onKeyPress={(event) => decimalValidate(event)}
                                className="text-center px-0 py-2 rounded-0 hide-arrow"
                                value={singleProduct.quantity}
                                type="number"
                                step={0.01}
                                min={0.0}
                                onChange={(e) => handleChange(e)}
                            />
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 px-4 pt-2"
                                onClick={(e) => handleIncrement(e)}
                            >
                                +
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                </td> */}
                {/* <td>
                    {currencySymbolHendling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        discountAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHendling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        taxAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHendling(
                        allConfigData,
                        frontSetting.value &&
                            frontSetting.value.currency_symbol,
                        subTotalCount(singleProduct)
                    )}
                </td> */}
                <td className="text-start">
                    <button className="btn px-2 text-danger fs-3">
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => onDeleteCartItem(singleProduct.id)}
                        />
                    </button>
                </td>
            </tr>
            {/* <ProductModal
                handleClose={handleClose}
                setIsOpen={setIsOpen}
                show={isOpen}
                modalId={modalId}
                isOpen={isOpen}
                frontSetting={frontSetting}
                product={singleProduct}
                id={singleProduct.id}
                productUnits={productUnits}
                updatePurchaseUnit={updatePurchaseUnit}
                updateProducts={updateProducts}
                title={singleProduct.name}
                onProductUpdateInCart={onProductUpdateInCart}
                updateSubTotal={updateSubTotal}
                updateCost={updateCost}
                updateDiscount={updateDiscount}
                updateTax={updateTax}
            /> */}
        </>
    );
};

const mapStateToProps = (state) => {
    const { productUnits, frontSetting, allConfigData } = state;
    return { productUnits, frontSetting, allConfigData };
};

export default connect(mapStateToProps, null)(TransfersTable);
