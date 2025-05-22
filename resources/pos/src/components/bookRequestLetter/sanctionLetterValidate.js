import { getFormattedMessage } from "../../shared/sharedMethod";

export default (formValues) => {
    const errors = {};
    if (!formValues.subject) {
        errors.subject = "Please enter subject.";
    }
    

    if (!formValues.items || !formValues.items.length) {
        errors.items = {
            _error: getFormattedMessage(
                "redux-form.field-array.no-item.message.validate"
            ),
        };
    }
    const booksArrayErrors = [];
    if (formValues.items && formValues.items.length) {
        formValues.items.forEach((item, index) => {
            const bookErrors = {};
            if (!item || !item.category) {
                bookErrors.category = "Please select category";
                booksArrayErrors[index] = bookErrors;
            }
            if (!item || !item.name) {
                bookErrors.format = "Please enter name.";
                booksArrayErrors[index] = bookErrors;
            }
            if (!item || !item.price) {
                bookErrors.price = "Please enter price.";
                booksArrayErrors[index] = bookErrors;
            }
            if (!item || !item.quantity) {
                bookErrors.quantity = "Please enter quantity.";
                booksArrayErrors[index] = bookErrors;
            }
            if (!item || !item.notes) {
                bookErrors.notes = "Please enter notes.";
                booksArrayErrors[index] = bookErrors;
            }
            // if (!item || !item.price) {
            //     bookErrors.price = getFormattedMessage('books.items.input.price.validate.label');
            //     booksArrayErrors[index] = bookErrors
            // }
        });
        if (booksArrayErrors.length) {
            errors.items = booksArrayErrors;
        }
    }
    return errors;
};
