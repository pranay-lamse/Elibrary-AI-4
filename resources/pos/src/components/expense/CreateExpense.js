import React, { useEffect } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { addExpense } from "../../store/action/expenseAction";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { fetchAllExpenseCategories } from "../../store/action/expenseCategoryAction";
import { fetchQuotationPurchases } from "../../store/action/quotationToPurchaseAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const CreateExpense = (props) => {
    const {
        quotationPurchase,
        addExpense,
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
        addExpense(formValue, navigate);
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("expense.create.title")}
                to="/admin/pos/expenses"
            />
            <ExpenseForm
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
    addExpense,
    fetchAllWarehouses,
    fetchAllExpenseCategories,
    fetchQuotationPurchases,
})(CreateExpense);
