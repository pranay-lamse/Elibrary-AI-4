import React from "react";
import { connect } from "react-redux";
import {
    deleteQuotationToPurchase,
    fetchQuotationPurchases,
} from "../../store/action/quotationToPurchaseAction";
import DeleteModel from "../../shared/action-buttons/DeleteModel";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { useNavigate } from "react-router";

const DeletePurchase = (props) => {
    const {
        fetchQuotationPurchases,
        deleteQuotationToPurchase,
        onDelete,
        deleteModel,
        onClickDeleteModel,
    } = props;

    const navigate = useNavigate();

    const deleteUserClick = () => {
        deleteQuotationToPurchase(onDelete.id);
        onClickDeleteModel(false);
        // navigate("/admin/pos/purchases");
    };

    return (
        <div>
            {deleteModel && (
                <DeleteModel
                    onClickDeleteModel={onClickDeleteModel}
                    deleteModel={deleteModel}
                    deleteUserClick={deleteUserClick}
                    name={getFormattedMessage("purchase.title")}
                />
            )}
        </div>
    );
};

export default connect(null, {
    deleteQuotationToPurchase,
    fetchQuotationPurchases,
})(DeletePurchase);
