import React, { useEffect } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import { useNavigate } from "react-router-dom";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import PurchaseForm from "./PurchaseForm";
import { addPurchase } from "../../store/action/purchaseAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { fetchSanctionQuotations } from "../../store/action/sanctionQuotationAction ";

const CreatePurchase = (props) => {
    const {
        fetchSanctionQuotations,
        addPurchase,
        sanctionQuotation,
        fetchAllWarehouses,
        fetchAllSuppliers,
        suppliers,
    } = props;
    const navigate = useNavigate();

    useEffect(() => {
        fetchSanctionQuotations();
        fetchAllSuppliers();
    }, []);

    const addPurchaseData = (formValue) => {
        console.log({ formValue });
        return 0;
        addPurchase(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle
                title={getFormattedMessage("purchase.create.title")}
                to="/admin/pos/purchases"
            />
            <PurchaseForm
                addPurchaseData={addPurchaseData}
                sanctionQuotation={sanctionQuotation}
                suppliers={suppliers}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { sanctionQuotation, suppliers, totalRecord } = state;
    const filteredQuotation =
        sanctionQuotation.length &&
        sanctionQuotation.filter((quotation) => quotation.status === 3);
    return {
        sanctionQuotation: filteredQuotation,
        suppliers,
        totalRecord,
    };
};

export default connect(mapStateToProps, {
    addPurchase,
    fetchAllWarehouses,
    fetchAllSuppliers,
    fetchSanctionQuotations,
})(CreatePurchase);
