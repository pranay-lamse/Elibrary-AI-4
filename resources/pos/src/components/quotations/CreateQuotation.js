import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuotationForm from "./QuotationForm";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import { fetchAllCustomer } from "../../store/action/customerAction";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { addSanctionQuotation } from "../../store/action/sanctionQuotationAction ";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import { fetchSanctionLetters } from "../../store/action/sanctionLetterAction";

const CreateQuotation = (props) => {
    const {
        sanctionLetters,
        fetchSanctionLetters,
        fetchAllSuppliers,
        customers,
        fetchAllCustomer,
        warehouses,
        fetchAllWarehouses,
        addSanctionQuotation,
        suppliers,
    } = props;
    const navigate = useNavigate();

    useEffect(() => {
        fetchSanctionLetters();
        fetchAllSuppliers();
        fetchAllCustomer();
        fetchAllWarehouses();
    }, []);

    // console.log({ sanctionLetters });

    const addQuoationData = (formValue) => {
        addSanctionQuotation(formValue, navigate);
    };

    return (
        <MasterLayout>
            <HeaderTitle
                title={getFormattedMessage("create-quotation.title")}
                to="/admin/pos/quotations"
            />
            <QuotationForm
                addQuoationData={addQuoationData}
                customers={customers}
                suppliers={suppliers}
                warehouses={warehouses}
                sanctionLetters={sanctionLetters}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { customers, warehouses, totalRecord, suppliers, sanctionLetters } =
        state;
    return {
        customers,
        warehouses,
        totalRecord,
        suppliers,
        sanctionLetters: sanctionLetters.length
            ? sanctionLetters
                  .filter((letter) => letter.letter_status != 2)
                  .map((item, i) => {
                      return {
                          label: item.subject,
                          value: item.id,
                          items: item.items,
                      };
                  })
            : [],
    };
};

export default connect(mapStateToProps, {
    fetchSanctionLetters,
    fetchAllSuppliers,
    fetchAllCustomer,
    fetchAllWarehouses,
    addSanctionQuotation,
})(CreateQuotation);
