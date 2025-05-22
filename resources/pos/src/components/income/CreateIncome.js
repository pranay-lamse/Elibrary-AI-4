import React, { useEffect } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import { useNavigate } from "react-router-dom";
import IncomeForm from "./IncomeForm";

import { addIncome } from "../../store/action/expenseAction";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { fetchAllExpenseCategories } from "../../store/action/expenseCategoryAction";
import { fetchQuotationPurchases } from "../../store/action/quotationToPurchaseAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const CreateIncome = (props) => {
    const {
        quotationPurchase,

        addIncome,
        warehouses,
        fetchAllWarehouses,
        fetchAllExpenseCategories,
        fetchQuotationPurchases,
        expenseCategories,
    } = props;
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllWarehouses();
        fetchQuotationPurchases();
        fetchAllExpenseCategories();
    }, []);

    const addExpenseData = (formValue) => {
        addIncome(formValue, navigate);
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("income.create.title")}
                to="/admin/pos/income"
            />
            <IncomeForm
                addExpenseData={addExpenseData}
                warehouses={warehouses}
                expenseCategories={expenseCategories}
                quotationPurchase={quotationPurchase.map((purchase) => ({
                    value: purchase.id,
                    label: purchase.reference_code,
                    grand_total: purchase.grand_total,
                }))}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { warehouses, expenseCategories, totalRecord, quotationPurchase } =
        state;
    return {
        warehouses,
        expenseCategories: expenseCategories.map((category) => {
            return {
                id: category.id,
                attributes: category,
            };
        }),
        totalRecord,
        quotationPurchase: quotationPurchase.filter(
            (purchase) => purchase.purchase_status == 1
        ),
    };
};

export default connect(mapStateToProps, {
    addIncome,
    fetchAllWarehouses,
    fetchAllExpenseCategories,
    fetchQuotationPurchases,
})(CreateIncome);
