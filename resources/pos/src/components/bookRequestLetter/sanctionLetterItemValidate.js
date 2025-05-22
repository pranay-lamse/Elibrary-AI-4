import { getFormattedMessage } from "../../shared/sharedMethod";

export default (formValues) => {
    const errors = {};
    const bookCodeExpression = /^\d{8}$/;
    if (!formValues.category) {
        errors.category = "Please select product category.";
    }
    if (!formValues.name) {
        errors.name = "Please enter product name.";
    }
    if (!formValues.price) {
        errors.price = "Please enter product price.";
    }
    if (!formValues.quantity) {
        errors.quantity = "Please enter product quantity.";
    }
    return errors;
};
