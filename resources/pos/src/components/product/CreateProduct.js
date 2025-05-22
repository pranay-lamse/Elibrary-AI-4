import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import { addProduct } from "../../store/action/productAction";
import ProductForm from "./ProductForm";
import HeaderTitle from "../header/HeaderTitle";
import { getFormattedMessage } from "../../shared/sharedMethod";

const CreateProduct = (props) => {
    const { addProduct } = props;
    const navigate = useNavigate();

    const addProductData = (formValue) => {
        addProduct(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle
                title={getFormattedMessage("product.create.title")}
                to="/admin/pos/products"
            />
            <ProductForm addProductData={addProductData} />
        </MasterLayout>
    );
};

export default connect(null, { addProduct })(CreateProduct);
