import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../../shared/components/Modal";
import SubscriptionForm from "./SubscriptionForm";
import { editSubscription } from "../../admin/store/actions/subscriptionsAction";

const EditSubscription = (props) => {
    const { subscription, editSubscription, toggleModal } = props;

    const onSaveSubscription = (formValues) => {
        editSubscription(subscription.id, formValues, subscription);
    };
    const prepareFormOption = {
        onSaveSubscription,
        onCancel: toggleModal,
        initialValues: {
            end_date: subscription.end_date,
            id: subscription.id,
            subscription: subscription,
        },
    };
    return (
        <Modal
            {...props}
            content={<SubscriptionForm {...prepareFormOption} />}
        />
    );
};

EditSubscription.propTypes = {
    subscription: PropTypes.object,
    editSubscription: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editSubscription })(EditSubscription);
