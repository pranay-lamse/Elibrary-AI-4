import React, { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../../../shared/components/Modal";
import { Filters } from "../../../constants";
import OfflinePaymentForm from "./OfflinePaymentForm";
import { fetchAllSettings } from "../../store/actions/allSettingsAction";
import { createOfflinePayment } from "../../store/actions/OfflinePaymentAction";
import { useNavigate } from "react-router-dom";

const CreateOfflinePayment = (props) => {
    const {
        singlePlan,
        createOfflinePayment,
        toggleModal,
        fetchAllSettings,
        currency,
        allSettings,
    } = props;
    const navigate = useNavigate();
    useEffect(() => {
        fetchAllSettings();
    }, []);

    const onSavePayment = (formValues) => {
        createOfflinePayment(formValues, toggleModal, navigate);
    };

    const prepareFormOption = {
        onSavePayment,
        onCancel: toggleModal,
        currency,
        initialValues: {
            plan_name: singlePlan.name,
            amount_to_pay: 0,
            payment_method: "Offline",
            notes: singlePlan.show_on_landing_page,
            plan_id: singlePlan.id,
        },
    };

    return (
        <Modal
            {...props}
            content={<OfflinePaymentForm {...prepareFormOption} />}
        />
    );
};

const mapStateToProps = (state) => {
    const { allSettings } = state;
    return { currency: allSettings?.currency?.currency_symbol, allSettings };
};

export default connect(mapStateToProps, {
    createOfflinePayment,
    fetchAllSettings,
})(CreateOfflinePayment);
