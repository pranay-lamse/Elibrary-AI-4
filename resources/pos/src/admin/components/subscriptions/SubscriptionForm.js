import React, {useEffect, useState} from 'react';
import {Col, Row} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import PropTypes from 'prop-types';
import SaveAction from '../../../shared/action-buttons/SaveAction';
import moment from "moment";
import subscriptionsValidate from "./subscriptionsValidate";
import DatePicker from "../../../shared/components/DatePicker";
import {dateFormat} from "../../../constants";
import {getFormattedMessage} from "../../../shared/sharedMethod";
import "../../../shared/components/Component.scss"

const SubscriptionForm = props => {
    const {initialValues, onSaveSubscription, change, handleSubmit} = props;
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        prepareInitialValues();
    }, []);

    const prepareInitialValues = () => {
        if (initialValues.end_date) {
            setSelectedDate(moment(initialValues.end_date).toDate())
        }
    }

    const prepareFormValues = (formValues) => {
        const formData = {
            id: formValues.id,
            subscription: initialValues.subscription
        };
        if (formValues.date_end) {
            formData.end_date = moment(formValues.date_end).format(dateFormat.DEFAULT_MOMENT);
        }
        return formData;
    };

    const onSave = formValues => {
        onSaveSubscription(prepareFormValues(formValues));
    };

    const fieldDatePicker = ({input, placeholder, minDate, maxDate}) => (
        <DatePicker
            // className="plus-icon"
            dateFormat='MMMM d, yyyy'
            selected={input.value || selectedDate}
            onChange={input.onChange}
            minDate={moment(initialValues.end_date).toDate()}
            maxDate={maxDate}
            disabledKeyboardNavigation
            placeholderText={placeholder}
            label={getFormattedMessage("subscription-table.column.end-date.label")}
        />
    );

    return (
        <Row className="animated fadeIn m-3">
            <Col xs={12} sm={12}>
                    <Field name="date_end" label="subscription-table.column.end-date.label" required groupText="list-alt"
                           component={fieldDatePicker}/>
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props}/>
            </Col>
        </Row>
    );
}

SubscriptionForm.propTypes = {
    initialValues: PropTypes.object,
    onSaveSubscription: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default reduxForm({form: 'subscriptionForm', validate: subscriptionsValidate})(SubscriptionForm);
