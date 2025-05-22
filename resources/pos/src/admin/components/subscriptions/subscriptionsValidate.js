
export default formValues => {
    const errors = {};
    if (formValues.end_date) {
        errors.end_date = "End date must be Required";
    }
    return errors;
};
