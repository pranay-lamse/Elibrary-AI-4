import React, { createRef, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { membershipPlanFrequencyOptions } from "../../constants";
import membershipPlanValidate from "./membershipPlanValidate";
import InputGroup from "../../shared/components/InputGroup";
import SaveAction from "../../shared/action-buttons/SaveAction";
import TextArea from "../../shared/components/TextArea";
import Select from "../../shared/components/Select";
import { getFormattedOptions } from "../../shared/sharedMethod";
import CheckboxField from "./CheckboxField";

const MembershipPlanForm = (props) => {
    const { onSaveMembershipPlan, handleSubmit, currency } = props;
    const inputRef = createRef();
    const membershipFrequencyOptions = getFormattedOptions(
        membershipPlanFrequencyOptions
    );

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        document
            .querySelector(".inputBox")
            .addEventListener("keypress", function (evt) {
                if (evt.which < 48 || evt.which > 57) {
                    evt.preventDefault();
                }
            });
    }, []);

    const onSave = (formValues) => {
        const {
            description,
            frequency,
            name,
            price,
            deposit,
            renewal_price,
            book_status,
            ebook_status,
            library_status,
            // stripe_plan_id
        } = formValues;
        onSaveMembershipPlan({
            description,
            frequency: frequency.id,
            name,
            price: parseInt(price),
            deposit: parseInt(deposit),
            renewal_price: parseInt(renewal_price),
            book_status: book_status,
            ebook_status: ebook_status,
            library_status: library_status,
            // stripe_plan_id
        });
    };

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12}>
                <Field
                    name="name"
                    label="membership-plans.input.name.label"
                    required
                    inputRef={inputRef}
                    groupText="tasks"
                    component={InputGroup}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="price"
                    className="inputBox"
                    label="membership-plans.input.price.label"
                    type="number"
                    min="0"
                    required
                    groupText={currency}
                    component={InputGroup}
                    isDefaultCurrency={true}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="deposit"
                    className="inputBox"
                    label="membership-plans.input.deposit.label"
                    type="number"
                    min="0"
                    required
                    groupText={currency}
                    component={InputGroup}
                    isDefaultCurrency={true}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="renewal_price"
                    className="inputBox"
                    label="membership-plans.input.renewal.price.label"
                    type="number"
                    min="0"
                    required
                    groupText={currency}
                    component={InputGroup}
                    isDefaultCurrency={true}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="frequency"
                    label="membership-plans.select.frequency.label"
                    required
                    options={membershipFrequencyOptions}
                    placeholder="membership-plans.select.frequency.placeholder"
                    groupText="clock-o"
                    component={Select}
                />
            </Col>
            {/*<Col xs={12}>*/}
            {/*    <Field name="stripe_plan_id" label="membership-plans.input.stripe-plan-id.label" required*/}
            {/*           groupText="stripe" component={InputGroup}/>*/}
            {/*</Col>*/}
            <Col xs={12}>
                <Field
                    name="description"
                    label="membership-plans.input.description.label"
                    component={TextArea}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="ebook_status"
                    label="E-book Access"
                    type="checkbox"
                    component={CheckboxField}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="library_status"
                    label="Library Access"
                    type="checkbox"
                    component={CheckboxField}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="book_status"
                    label="Books Access"
                    type="checkbox"
                    component={CheckboxField}
                />
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props} />
            </Col>
        </Row>
    );
};

MembershipPlanForm.propTypes = {
    initialValues: PropTypes.object,
    currency: PropTypes.string,
    onSaveMembershipPlan: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({
    form: "MembershipPlanForm",
    validate: membershipPlanValidate,
})(MembershipPlanForm);
