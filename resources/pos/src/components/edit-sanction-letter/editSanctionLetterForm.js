import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import SanctionLetterFormCard from "../bookRequestLetter/sanctionLetterFormCard";

const EditSanctionLetterForm = (props) => {
    const { initialValues, change, onSaveBook, initialize, handleSubmit } =
        props;

    const onSave = (formValues) => {
        onSaveBook(formValues);
    };

    const { invalid, onCancel, pristine } = props;
    const prepareFormOptions = {
        initialValues,
        change,
        initialize,
        onSaveBook: onSave,
        saveActionOptions: { invalid, onCancel, pristine },
        handleSubmit,
    };
    return <SanctionLetterFormCard {...prepareFormOptions} />;
};

const Form = reduxForm({
    form: "sanctionLetterForm",
})(EditSanctionLetterForm);

export default connect((state) => {
    const { initialValues } = state;
    return {
        initialValues,
    };
}, null)(Form);
