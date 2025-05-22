import React from "react";
import { connect } from "react-redux";
import DeleteModel from "../../shared/action-buttons/DeleteModel";
import { deleteExpense } from "../../store/action/incomesAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

const DeleteIncome = (props) => {
    const { deleteExpense, onDelete, deleteModel, onClickDeleteModel } = props;

    const deleteUserClick = () => {
        deleteExpense(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && (
                <DeleteModel
                    onClickDeleteModel={onClickDeleteModel}
                    deleteModel={deleteModel}
                    deleteUserClick={deleteUserClick}
                    name={getFormattedMessage("income.title")}
                />
            )}
        </div>
    );
};

export default connect(null, { deleteExpense })(DeleteIncome);
