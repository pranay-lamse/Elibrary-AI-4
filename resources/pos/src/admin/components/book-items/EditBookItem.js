import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import BookItemForm from "./BookItemForm";
import { bookFormatOptions, bookItemStatusOptions } from "../../constants";
import Modal from "../../../shared/components/Modal";
import { addBookItem } from "../../store/actions/bookItemAction";
import { getFormattedOptions } from "../../../shared/sharedMethod";
import prepareFormData from "../../shared/prepareBookItemData";
import { useNavigate } from "react-router";

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
        file_name,
        accession_number,
    } = bookItem;
    const bookItemsStatusOptions = getFormattedOptions(bookItemStatusOptions);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);
    const navigate = useNavigate();

    const changeAbleFields = {
        book_code,
        rack_number: bookItem.rack_number,
        accession_number,
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
        publisher_id: { value: publisher?.id, label: publisher?.name },
    };

    const onSaveBookItems = (formValues) => {
        formValues.id = id;
        addBookItem(prepareFormData(formValues), bookId, true, navigate);
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
