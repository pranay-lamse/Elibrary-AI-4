import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import BookItemForm from "./BookItemForm";
import { bookFormatOptions, bookItemStatusOptions } from "../../constants";
import Modal from "../../shared/components/Modal";
import { addBookItem } from "../../admin/store/actions/bookItemAction";
import { getFormattedOptions } from "../../shared/sharedMethod";
import prepareFormData from "../../admin/shared/prepareBookItemData";

const EditBookItem = (props) => {
    const {
        bookLanguages,
        publishers,
        bookItems,
        bookItem,
        currency,
        toggleModal,
        addBookItem,
        bookId,
    } = props;
    const {
        id,
        book_code,
        edition,
        format,
        location,
        price,
        language,
        publisher,
        status,
        e_book_url,
        rack_number,
        accession_number,
        file_name,
    } = bookItem;
    const bookItemsStatusOptions = getFormattedOptions(bookItemStatusOptions);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);

    const changeAbleFields = {
        book_code,
        edition,
        location,
        price,
        language: { id: language.id, name: language.language_name },
        publisher,
        format: booksFormatOptions.find(
            (bookFormat) => bookFormat.id === format
        ),
        status: bookItemsStatusOptions.find(
            (bookItemStatus) => bookItemStatus.id === +status
        ),
        rack_number,
        accession_number,
    };

    const onSaveBookItems = (formValues) => {
        formValues.id = id;
        addBookItem(prepareFormData(formValues), bookId, true);
    };

    const prepareFormOption = {
        onSaveBookItems,
        currency,
        onCancel: toggleModal,
        bookLanguages,
        publishers,
        e_book_url,
        initialValues: changeAbleFields,
        file_name,
    };
    return (
        <Modal {...props} content={<BookItemForm {...prepareFormOption} />} />
    );
};

EditBookItem.propTypes = {
    bookItem: PropTypes.object,
    bookItems: PropTypes.array,
    bookLanguages: PropTypes.array,
    publishers: PropTypes.array,
    bookId: PropTypes.number,
    addBookItem: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addBookItem })(EditBookItem);
