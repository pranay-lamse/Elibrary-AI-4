import React, { createRef, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import genreValidate from "../../../admin/components/genres/genreValidate";
import InputGroup from "../../../shared/components/InputGroup";
import SaveAction from "../../../shared/action-buttons/SaveAction";
import TextArea from "../../../shared/components/TextArea";
import ToggleSwitch from "../../../shared/components/ToggleSwitch";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import Select from "../../../shared/components/Select";

const OfflinePaymentForm = (props) => {
    const { initialValues, onSavePayment, handleSubmit, currency } = props;
    const inputRef = createRef();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const onSave = (formValues) => {
        onSavePayment(formValues);
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={6}>
                <Field
                    name="plan_name"
                    label="react-data-table.name.column"
                    inputRef={inputRef}
                    readOnly={true}
                    groupText="tasks"
                    component={InputGroup}
                />
            </Col>

            <Col xs={6}>
                <Field
                    name="amount_to_pay"
                    label="input.price.label"
                    type="number"
                    min="0"
                    required
                    inputRef={inputRef}
                    readOnly={true}
                    groupText={currency}
                    component={InputGroup}
                    isDefaultCurrency={true}
                />
            </Col>
            <Col xs={6}>
                <Field
                    name="payment_method"
                    className="inputBox"
                    label="input.payment-method.label"
                    readOnly={true}
                    groupText="circle"
                    component={InputGroup}
                />
            </Col>
            <Col xs={6}>
                <Field
                    name="reference"
                    label="input.reference.label"
                    type="number"
                    min="0"
                    groupText="list-alt"
                    component={InputGroup}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="notes"
                    label="input.notes.label"
                    component={TextArea}
                />
            </Col>
            <Col xs={12}>
                <SaveAction
                    isCreateInEdit={true}
                    onSave={handleSubmit(onSave)}
                    {...props}
                />
            </Col>
        </Row>
    );
};

export default reduxForm({ form: "genreForm", validate: genreValidate })(
    OfflinePaymentForm
);
