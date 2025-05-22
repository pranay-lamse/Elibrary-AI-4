import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import BookItemForm from "./BookItemForm";
import prepareFormData from "../../admin/shared/prepareBookItemData";
import Modal from "../../shared/components/Modal";
import { addBookItem } from "../../admin/store/actions/bookItemAction";
import { fetchPublishers } from "../../admin/store/actions/publisherAction";
import { fetchBookLanguages } from "../../admin/store/actions/bookLanguageAction";
import Uploady from "@rpldy/uploady";
const CreateBookItem = (props) => {
    const { bookItems, toggleModal, addBookItem, bookId, currency } = props;

    const onSaveBookItems = (formValues) => {
        addBookItem(prepareFormData(formValues), bookId);
    };

    const prepareFormOption = {
        onSaveBookItems,
        onCancel: toggleModal,
        currency,
    };

    return (
        <Modal
            {...props}
            content={
                <Uploady>
                    <BookItemForm {...prepareFormOption} />
                </Uploady>
            }
        />
    );
};

CreateBookItem.propTypes = {
    bookItems: PropTypes.array,
    bookId: PropTypes.number,
    addBookItem: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, {
    addBookItem,
    fetchPublishers,
    fetchBookLanguages,
})(CreateBookItem);
