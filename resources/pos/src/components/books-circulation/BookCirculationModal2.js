import React from "react";
import PropTypes from "prop-types";
import CreateBookCirculation2 from "./CreateBookCirculation2";
import EditBookCirculation from "./EditBookCirculation";
import DeleteBookCirculation from "./DeleteBookCirculation";
import { getModalTitle } from "../../shared/sharedMethod";
import ModalConfig from "../../shared/modal-config/ModalConfig";

export const BookCirculationModal2 = (props) => {
    const { bookCirculation, filterObject, isCreate, isEdit, isDelete } = props;
    const editConfig = { bookCirculation, filterObject };
    const delConfig = {
        bookCirculationId: bookCirculation ? bookCirculation.id : null,
    };
    const modalOptions = {
        modalTitle: getModalTitle(
            isCreate,
            isEdit,
            isDelete,
            "books-circulation.input.new-btn.label",
            "books-circulation.modal.edit.title",
            "books-circulation.modal.delete.title"
        ),
        NewComponent: CreateBookCirculation2,
        EditComponent: EditBookCirculation,
        DeleteComponent: DeleteBookCirculation,
        deleteKey: bookCirculation ? bookCirculation.name : null,
        editConfig,
        delConfig,
        props,
    };

    return <ModalConfig {...modalOptions} />;
};

BookCirculationModal2.propTypes = {
    bookCirculation: PropTypes.object,
    filterObject: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default BookCirculationModal2;
