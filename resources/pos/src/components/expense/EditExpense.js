import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchWarehouses } from "../../store/action/warehouseAction";
import HeaderTitle from "../header/HeaderTitle";
import MasterLayout from "../MasterLayout";
import ExpenseForm from "./ExpenseForm";
import { fetchExpense } from "../../store/action/expenseAction";
import { fetchExpenseCategories } from "../../store/action/expenseCategoryAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchQuotationPurchases } from "../../store/action/quotationToPurchaseAction";

const EditExpense = (props) => {
    const {
        fetchQuotationPurchases,
        quotationPurchase,
        fetchExpense,
        expenses,
        warehouses,
        fetchExpenseCategories,
        expenseCategories,
        fetchWarehouses,
    } = props;
    const { id } = useParams();

    useEffect(() => {
        fetchExpense(id);
        fetchWarehouses();
        fetchExpenseCategories();
        fetchQuotationPurchases();
    }, []);

    const itemsValue =
        expenses.length &&
        quotationPurchase.length &&
        expenses.map((expense) => {
            const filteredOrder = quotationPurchase.filter((order) =>
                order.id === expenses[0].attributes.purchase_id ? order : null
            );

            console.log({ filteredOrder });
            return {
                date: expense.attributes.date,
                title: expense.attributes.title,
                warehouse_id: {
                    value: expense.attributes.warehouse_id,
                    label: expense.attributes.warehouse_name,
                },
                purchase_id: filteredOrder
                    ? filteredOrder.map((order) => ({
                          label: order.reference_code,
                          value: order.id,
                          grand_total: order.grand_total,
                      }))
                    : null,
                expense_category_id: {
                    value: expense.attributes.expense_category_id,
                    label: expense.attributes.expense_category_name,
                },
                amount: expense.attributes.amount,
                details: expense.attributes.details,
                id: expense.id,
            };
        });

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("expense.edit.title")}
                to="/admin/pos/expenses"
            />
            {expenses.length === 1 && (
                <ExpenseForm
                    singleExpense={itemsValue}
                    id={id}
                    warehouses={warehouses}
                    quotationPurchase={quotationPurchase.map((order) => ({
                        label: order.reference_code,
                        value: order.id,
                        grand_total: order.grand_total,
                    }))}
                    expenseCategories={expenseCategories}
                />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { expenses, warehouses, expenseCategories, quotationPurchase } =
        state;
    return { expenses, warehouses, expenseCategories, quotationPurchase };
};

export default connect(mapStateToProps, {
    fetchExpense,
    fetchWarehouses,
    fetchExpenseCategories,
    fetchQuotationPurchases,
})(EditExpense);
