import { getFormattedMessage } from "../../../../shared/sharedMethod";

export default (formValues) => {
    const errors = {};
    if (!formValues.first_name) {
        errors.first_name = getFormattedMessage(
            "registration.input.first-name.validate.label"
        );
    }
    if (!formValues.last_name) {
        errors.last_name = getFormattedMessage(
            "registration.input.last-name.validate.label"
        );
    }
    if (!formValues.email) {
        errors.email = getFormattedMessage(
            "registration.input.email-required.validate.label"
        );
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,9}$/i.test(formValues.email)
    ) {
        errors.email = "Please Enter valid email address.";
    }
    if (!formValues.password) {
        errors.password = getFormattedMessage(
            "registration.input.password-required.validate.label"
        );
    } else if (/\s/g.test(formValues.password)) {
        errors.password = getFormattedMessage(
            "registration.input.password-required.validate.label"
        );
    }
    if (formValues.password && formValues.password.length < 8) {
        errors.password = getFormattedMessage(
            "registration.input.password-invalid.validate.label"
        );
    }
    if (formValues.confirm_password !== formValues.password) {
        errors.confirm_password = getFormattedMessage(
            "registration.input.confirm-password.validate.label"
        );
    }
    if (formValues.phone) {
        if (formValues.phone.length < 10 || formValues.phone.length > 10) {
            errors.phone = "Phone number should be atleast 10 characters.";
        }
    }
    return errors;
};
