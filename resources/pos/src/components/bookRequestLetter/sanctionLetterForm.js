import React from "react";
import { reduxForm } from "redux-form";
import sanctionLetterValidate from "./sanctionLetterValidate";
import SanctionLetterFormCard from "./sanctionLetterFormCard";
import { connect } from "react-redux";

const SanctionLetterForm = (props) => {
    const { initialValues, change, onSaveBook, initialize, handleSubmit } =
        props;

    const onSave = (formValues) => {
        // formValues.file = file;
        onSaveBook(formValues);
        console.log({ sanctionLetterForm: formValues });
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
    validate: sanctionLetterValidate,
})(SanctionLetterForm);

export default connect((state) => {
    const { initialValues } = state;
    console.log({ initialValues });
    return {
        initialValues,
    };
}, null)(Form);
