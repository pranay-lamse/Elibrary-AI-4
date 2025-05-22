import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteAction from "../../shared/action-buttons/DeleteAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import Modal from "../../shared/components/Modal";
import { deleteBook } from "../../admin/store/actions/bookAction";
import { Filters } from "../../constants";
import { deleteContact } from "../../member/store/actions/frontendContactAction";

const DeleteContact = (props) => {
    const { deleteContact, contact, toggleModal, id } = props;

    const content = contact ? (
        <>
            {getFormattedMessage("modal.delete.message")}&nbsp;"
            {`${contact.name}`}" ?
        </>
    ) : null;
    const title = getFormattedMessage("books.modal.delete.title");

    const onDeleteBook = () => {
        deleteContact(contact.id);
        toggleModal();
    };

    return (
        <Modal
            {...props}
            actions={
                <DeleteAction onDelete={onDeleteBook} onCancel={toggleModal} />
            }
            content={content}
            title={title}
        />
    );
};

export default connect(null, { deleteContact })(DeleteContact);
