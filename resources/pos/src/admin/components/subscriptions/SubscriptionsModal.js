import React from 'react';
import PropTypes from 'prop-types';
import EditSubscriptions from "./EditSubscriptions";
import ModalConfig from "../../../shared/modal-config/ModalConfig";
import {getModalTitle} from "../../../shared/sharedMethod";

export const SubscriptionModal = (props) => {
    const {subscription, isCreate, isEdit, isDelete, totalRecord} = props;
    const editConfig = {subscription};
    // const delConfig = { genreId: subscription ? subscription.id : null, totalRecord };
    const modalOptions = {
        modalTitle: getModalTitle(isCreate, isEdit, isDelete, null,
            "subscription.edit.modal.title", null),
        EditComponent: EditSubscriptions,
        DeleteComponent: null,
        // deleteKey: genre ? genre.name : null,
        editConfig,
        // delConfig,
        props
    };

    return <ModalConfig {...modalOptions}/>;
};

SubscriptionModal.propTypes = {
    genre: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default SubscriptionModal;
