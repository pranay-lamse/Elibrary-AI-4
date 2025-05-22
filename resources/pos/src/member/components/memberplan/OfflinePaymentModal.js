import React from 'react';
import PropTypes from 'prop-types';
import CreateGenre from "../../../admin/components/genres/CreateGenre";
import EditGenre from "../../../admin/components/genres/EditGenre";
import DeleteGenre from "../../../admin/components/genres/DeleteGenre";
import ModalConfig from "../../../shared/modal-config/ModalConfig";
import {getModalTitle} from "../../../shared/sharedMethod";
import createOfflinePayment from "./createOfflinePayment";

export const OfflinePaymentModal =  (props) => {
    const { singlePlan, isCreate, isEdit, isDelete, totalRecord , toggleModal} = props;
    const editConfig = {singlePlan};
    const delConfig = { genreId: singlePlan ? singlePlan.id : null, totalRecord };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, 'genres.input.new-btn.label',
            "offline-payment.modal.create.title", 'genres.modal.delete.title'),
        NewComponent: CreateGenre,
        EditComponent: createOfflinePayment,
        DeleteComponent: DeleteGenre,
        deleteKey: singlePlan ? singlePlan.name : null,
        editConfig,
        delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};


export default OfflinePaymentModal;
