import { getFormattedMessage } from "../../shared/sharedMethod";

export default (formValues) => {
    const errors = {};
    if (!formValues.name) {
        errors.name = "Resource Category Name is Required.";
    }

    return errors;
};
