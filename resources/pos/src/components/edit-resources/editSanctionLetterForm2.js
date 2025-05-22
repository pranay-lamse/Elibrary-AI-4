import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import SanctionLetterFormCard from "../bookRequestLetter/sanctionLetterFormCard";
import ResourcesFormCard from "../resources/ResourcesFormCard";
import ResourcesFormCard2 from "../resources/ResourcesFormCard2";

const editSanctionLetterForm2 = (props) => {
    const {
        initialValues,
        change,
        onSaveBook,
        initialize,
        handleSubmit,
        resourceCategory,
    } = props;

    const onSave = (formValues) => {
        onSaveBook(formValues);
    };

    const { invalid, onCancel, pristine } = props;
    const prepareFormOptions = {
        initialValues,
        change,
        initialize,
        resourceCategory,
        onSaveBook: onSave,
        saveActionOptions: { invalid, onCancel, pristine },
        handleSubmit,
    };
    return <ResourcesFormCard2 {...prepareFormOptions} />;
};

const Form = reduxForm({
    form: "editSanctionLetterForm2",
})(editSanctionLetterForm2);

export default connect((state) => {
    const { initialValues } = state;
    return {
        initialValues,
    };
}, null)(Form);
