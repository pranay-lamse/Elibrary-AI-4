import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import QuotationForm from "./QuotationForm";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import { fetchAllCustomer } from "../../store/action/customerAction";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import status from "../../shared/option-lists/quotationStatus.json";
import Spinner from "../../shared/components/loaders/Spinner";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {
    fetchQuotation,
    editQuotation,
} from "../../store/action/quotationAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { fetchSanctionQuotation } from "../../store/action/sanctionQuotationAction ";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import { fetchSanctionLetters } from "../../store/action/sanctionLetterAction";
const EditQuotation = (props) => {
    const {
        singleSanctionQuotation,
        fetchAllSuppliers,
        suppliers,
        sanctionQuotation,
        fetchQuotation,
        quotations,
        customers,
        fetchAllCustomer,
        warehouses,
        fetchAllWarehouses,
        isLoading,
        fetchSanctionQuotation,
        sanctionLetters,
    } = props;
    const { id } = useParams();

    useEffect(() => {
        fetchSanctionQuotation(id);
    }, []);

    const selectedStatus =
        singleSanctionQuotation &&
        status.find((item) => item.value === singleSanctionQuotation.status);

    const selectedSanctionLetter = sanctionLetters.find(
        (letter) => letter.id === singleSanctionQuotation.sanction_letter_id
    );

    const selectedSupplier = suppliers.find(
        (supplier) => supplier.id === singleSanctionQuotation.supplier_id
    );

    console.log({ selectedSanctionLetter, selectedSupplier });

    const itemsValue = !_.isEmpty(singleSanctionQuotation) && {
        date: singleSanctionQuotation.date,
        sanction_letter_id: {
            value: selectedSanctionLetter.id,
            label: selectedSanctionLetter.subject,
            item: selectedSanctionLetter.items,
        },
        supplier_id: {
            value: selectedSupplier.id,
            label: selectedSupplier.attributes.name,
            attributes: selectedSupplier.attributes,
        },
        // tax_rate: quotations.attributes.tax_rate,
        // tax_amount: quotations.attributes.tax_amount,
        discount: singleSanctionQuotation.discount,
        shipping: singleSanctionQuotation.shipping,
        grand_total: singleSanctionQuotation.grand_total,
        quotation_items: singleSanctionQuotation.quotation_items.map(
            (item) => ({
                id: item.id,
                quotation_id: item.quotation_id,
                sanction_letter_id: item.sanction_letter_id,
                sanction_letter_item_id: item.sanction_letter_item_id,
                price: item.price,
                category: item.category,
                name: item.name,
                quantity: item.quantity,
                notes: item.notes,
                // net_unit_price: item.product_price,
                // tax_type: item.tax_type,
                // tax_value: item.tax_value,
                // tax_amount: item.tax_amount,
                // discount_type: item.discount_type,
                // discount_value: item.discount_value,
                // discount_amount: item.discount_amount,
                isEdit: true,
                // stock:
                //     item.product &&
                //     item.product.stocks.filter(
                //         (item) =>
                //             item.warehouse_id === quotations.attributes.warehouse_id
                //     ),
                sub_total: item.price * item.quantity,
                quotation_item_id: item.id,
                newItem: "",
            })
        ),
        isEdit: true,
        created_by: singleSanctionQuotation.created_by,
        modified_by: singleSanctionQuotation.modified_by,
        quotation_pdf_file: singleSanctionQuotation.quotation_pdf_file,
        id: singleSanctionQuotation.id,
        note: singleSanctionQuotation.note,
        status_id: {
            label: selectedStatus.label,
            value: selectedStatus.value,
        },
    };

    console.log({ sanctionQuotation, itemsValue });

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("edit-quotation.title")}
                to="/admin/pos/quotations"
            />
            {/* {JSON.stringify(sanctionQuotation)} */}
            {isLoading ? (
                <Spinner />
            ) : (
                <QuotationForm
                    sanctionLetters={sanctionLetters}
                    singleQuotation={itemsValue}
                    id={id}
                    customers={customers}
                    warehouses={warehouses}
                />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        customers,
        warehouses,
        isLoading,
        quotations,
        singleSanctionQuotation,
        suppliers,
        sanctionLetters,
    } = state;
    return {
        customers,
        warehouses,
        isLoading,
        quotations,
        suppliers,
        singleSanctionQuotation,
        sanctionLetters,
    };
};

export default connect(mapStateToProps, {
    fetchQuotation,
    editQuotation,
    fetchAllCustomer,
    fetchAllWarehouses,
    fetchAllSuppliers,
    fetchSanctionQuotation,
})(EditQuotation);
