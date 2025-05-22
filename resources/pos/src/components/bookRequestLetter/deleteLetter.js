import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteAction from "../../shared/action-buttons/DeleteAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import Modal from "../../shared/components/Modal";
import { Filters } from "../../constants";
import { deleteLetter } from "../../store/action/sanctionLetterAction";

const DeleteLetter = (props) => {
    const { letter, deleteLetter, toggleModal } = props;
    const content = letter ? (
        <>
            {getFormattedMessage("modal.delete.message")}&nbsp;"
            {`${letter.subject}`}" ?
        </>
    ) : null;
    const title = getFormattedMessage("books.modal.delete.title");

    const onDeleteLetter = () => {
        toggleModal();
        deleteLetter(props.letter.id, Filters.OBJ);
    };

    return (
        <Modal
            {...props}
            actions={
                <DeleteAction
                    onDelete={onDeleteLetter}
                    onCancel={toggleModal}
                />
            }
            content={content}
            title={title}
        />
    );
};

DeleteLetter.propTypes = {
    book: PropTypes.object,
    deleteLetter: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteLetter })(DeleteLetter);
