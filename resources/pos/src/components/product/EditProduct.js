import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../store/action/productAction";
import ProductForm from "./ProductForm";
import HeaderTitle from "../header/HeaderTitle";
import MasterLayout from "../MasterLayout";
import { productUnitDropdown } from "../../store/action/productUnitAction";
import { fetchUnits } from "../../store/action/unitsAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const EditProduct = (props) => {
    const { fetchProduct, products, fetchUnits, units } = props;
    const { id } = useParams();

    const editSaleUnit =
        products.length === 1 &&
        units.length >= 0 &&
        units.filter(
            (fill) => fill.id.toString() === products[0].attributes.sale_unit
        );
    const editPurchaseUnit =
        products.length === 1 &&
        units.length >= 0 &&
        units.filter(
            (fill) =>
                fill.id.toString() === products[0].attributes.purchase_unit
        );
    const saleUnitLabel = editSaleUnit
        ? editSaleUnit.map((ab) => ab.attributes.name)
        : "";
    const salePurchaseLabel = editPurchaseUnit
        ? editPurchaseUnit.map((ab) => ab.attributes.name)
        : "";
    const saleUnitId = editSaleUnit ? editSaleUnit.map((ab) => ab.id) : "";
    const salePurchaseId = editPurchaseUnit
        ? editPurchaseUnit.map((ab) => ab.id)
        : "";

    const itemsValue =
        products.length === 1 &&
        products.map((product) => ({
            name: product.attributes.name,
            code: product.attributes.code,
            product_category_id: {
                value: product.attributes.product_category_id,
                label: product.attributes.product_category_name,
            },
            brand_id: {
                value: product.attributes.brand_id,
                label: product.attributes.brand_name,
            },
            barcode_symbol: product.attributes.barcode_symbol,
            product_cost: product.attributes.product_cost,
            product_price: product.attributes.product_price,
            product_unit: product.attributes.product_unit,
            sale_unit: {
                value: saleUnitId[0],
                label: saleUnitLabel[0],
            },
            purchase_unit: {
                value: salePurchaseId[0],
                label: salePurchaseLabel[0],
            },
            stock_alert: product.attributes.stock_alert,
            order_tax: product.attributes.order_tax,
            tax_type: product.attributes.tax_type,
            notes: product.attributes.notes,
            images: product.attributes.images,
            id: product.id,
        }));

    useEffect(() => {
        fetchProduct(id);
        fetchUnits();
    }, []);

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("product.edit.title")}
                to="/admin/pos/products"
            />
            {products.length === 1 && (
                <ProductForm singleProduct={itemsValue} id={id} />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { products, units } = state;
    return { products, units };
};

export default connect(mapStateToProps, {
    fetchProduct,
    productUnitDropdown,
    fetchUnits,
})(EditProduct);
