import React, { useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HeaderTitle from "../header/HeaderTitle";
import MasterLayout from "../MasterLayout";
import PurchaseForm from "./PurchaseForm";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import status from "../../shared/option-lists/status.json";
import { editPrepareArray } from "../../shared/prepareArray/editPrepareArray";
import { getFormattedMessage } from "../../shared/sharedMethod";
import Spinner from "../../shared/components/loaders/Spinner";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {
    fetchQuotationPurchase,
    fetchQuotationPurchases,
} from "../../store/action/quotationToPurchaseAction";
import { fetchSanctionLetters } from "../../store/action/sanctionLetterAction";
import { fetchSanctionQuotations } from "../../store/action/sanctionQuotationAction ";
import CreateExpense from "../expense/CreateExpense";
import { fetchAllExpenseCategories } from "../../store/action/expenseCategoryAction";
import ExpenseForm from "../expense/ExpenseForm";
import { addExpense } from "../../store/action/expenseAction";

const EditPurchase = (props) => {
    const {
        addExpense,
        fetchQuotationPurchases,
        sanctionQuotation,
        sanctionLetters,
        suppliers,
        fetchSanctionQuotations,
        fetchSanctionLetters,
        quotationPurchase,
        fetchAllSuppliers,
        isLoading,
        fetchQuotationPurchase,
    } = props;
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addExpenseData = (formValue) => {
        addExpense(formValue, navigate);
    };

    useEffect(() => {
        fetchQuotationPurchase(id);
    }, []);

    useEffect(() => {
        fetchQuotationPurchases();
        fetchAllSuppliers();
        fetchSanctionQuotations();
        fetchSanctionLetters();
    }, []);

    const selectedStatus =
        quotationPurchase &&
        status.find((item) => item.value === quotationPurchase.purchase_status);

    const supplierId = quotationPurchase && quotationPurchase.supplier_id;
    const quotationId = quotationPurchase && quotationPurchase.quotation_id;
    const supplier =
        suppliers.length &&
        suppliers.filter((supplier) => supplier.id === supplierId);
    const supplierName =
        supplier[0] && supplier[0].attributes && supplier[0].attributes.name;
    const quotation =
        sanctionQuotation.length &&
        sanctionQuotation.find((quotation) =>
            quotation.id === quotationId ? quotation : null
        );

    const quotationName = quotation ? quotation.reference_code : "";

    // purchases &&
    //     purchases.attributes &&
    //     purchases.attributes.purchase_items.forEach((item) => {
    //         item.fix_net_unit = item.product_cost;
    //         item.stock_alert = item.product && item.product.stock_alert;
    //         item.short_name = item.purchase_unit.short_name;
    //         item.newItem = "";
    //         item.purchase_item_id = item.id;
    //         item.code = item.product && item.product.code;
    //         item.name = item.product && item.product.name;
    //     });

    const purchasesItemsId =
        quotationPurchase &&
        quotationPurchase.purchase_items &&
        quotationPurchase.purchase_items.map((item) => item.id);

    const itemsValue = useMemo(() => {
        if (!_.isEmpty(quotationPurchase)) {
            return {
                // delivery_status: quotationPurchase.delivery_status,
                ...quotationPurchase,
                date: quotationPurchase.date,
                payment_status: quotationPurchase.payment_status,
                payment_type: quotationPurchase.payment_type,
                date: quotationPurchase.date,
                quotation_id: {
                    value: quotationPurchase.quotation_id,
                    label: quotationName,
                },
                supplier_id: {
                    value: quotationPurchase.supplier_id,
                    label: supplierName,
                },
                discount: quotationPurchase.discount,
                // tax_rate: quotationPurchase.tax_rate,
                shipping: quotationPurchase.shipping,
                note: quotationPurchase.note,
                purchase_items: editPrepareArray(
                    quotationPurchase.purchase_items,
                    quotationPurchase.quotation_id
                ),
                newItem: "",
                purchase_item_id: purchasesItemsId ? purchasesItemsId[0] : "",
                id: quotationPurchase.id,
                purchase_status: selectedStatus,
                created_at: quotationPurchase.created_at,
            };
        }
    }, [quotationPurchase]);

    // console.log({
    //     itemsValue,
    //     quotationPurchase,
    //     quotation,
    //     sanctionQuotation,
    // });

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle
                title={getFormattedMessage("purchase.edit.title")}
                to="/admin/pos/purchases"
            />
            {isLoading ? (
                <Spinner />
            ) : (
                <PurchaseForm
                    singlePurchase={itemsValue}
                    id={id}
                    sanctionQuotation={sanctionQuotation}
                    suppliers={suppliers}
                />
            )}
            {/* <div className="d-flex align-items-center mt-4">
                <h1>Create Expense</h1>
                <p>(optional)</p>
            </div> */}
            {/* <ExpenseForm
                addExpenseData={addExpenseData}
                warehouses={warehouses}
                expenseCategories={expenseCategories}
                // quotationPurchase={quotationPurchase.map((purchase) => ({
                //     value: purchase.id,
                //     label: purchase.reference_code,
                //     grand_total: purchase.grand_total,
                // }))}
            /> */}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        suppliers,
        isLoading,
        sanctionLetters,
        sanctionQuotation,
        warehouses,
        expenseCategories,
        singlePurchaseOrder,
    } = state;
    return {
        sanctionQuotation,
        quotationPurchase: singlePurchaseOrder,
        suppliers,
        isLoading,
        sanctionLetters,
        warehouses,
        expenseCategories,
    };
};

export default connect(mapStateToProps, {
    fetchAllSuppliers,
    fetchQuotationPurchase,
    fetchSanctionLetters,
    fetchSanctionQuotations,
    fetchQuotationPurchases,
    addExpense,
})(EditPurchase);
