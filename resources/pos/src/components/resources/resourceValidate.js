export default (formValues) => {
    // console.log({ formValues });
    const errors = {};
    if (!formValues.title) {
        errors.title = "Title is required";
    }
    if (!formValues.category) {
        errors.category = "Category is Required";
    }

    return errors;
};
