import React, { useEffect, useState } from "react";
import { decimalValidate } from "../../shared/sharedMethod";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import _uniqueId from "lodash/uniqueId";

const PrintTable = (props) => {
    const { singleProduct, setUpdateProducts, index } = props;
    const [qty, setQty] = useState(10);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setQty(e.target.value);
        dispatch({ type: "UPDATE_PRINT_QTY", payload: e.target.value });
    };

    const onDeleteCartItem = (id) => {
        setUpdateProducts((updateProducts) =>
            updateProducts.filter((item) => item.id !== id)
        );
    };

    useEffect(() => {
        setUpdateProducts((updateProducts) =>
            updateProducts.map((item) =>
                item.id === singleProduct.id
                    ? { ...item, quantity: Number(qty) }
                    : item
            )
        );
    }, [qty]);

    return (
        <tr className="align-middle">
            <td className="ps-3">
                <h4 className="fs-6 mb-1">{singleProduct.code}</h4>
                <div className="d-flex align-items-center">
                    <span className="badge bg-light-success">
                        <span>{singleProduct.name}</span>
                    </span>
                </div>
            </td>
            <td>
                <input
                    aria-label="Product Quantity"
                    className="form-control width-320"
                    value={qty}
                    onKeyPress={(event) => decimalValidate(event)}
                    onChange={(e) => handleChange(e)}
                />
            </td>
            <td className="text-start">
                <button className="btn px-4 text-danger fs-3">
                    <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => onDeleteCartItem(singleProduct.id)}
                    />
                </button>
            </td>
        </tr>
    );
};
export default PrintTable;
