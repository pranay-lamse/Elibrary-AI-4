import React from "react";
import PropTypes from "prop-types";
import CreateBookCirculation from "./CreateBookCirculation";
import EditBookCirculation from "./EditBookCirculation";
import DeleteBookCirculation from "./DeleteBookCirculation";
import { getModalTitle } from "../../shared/sharedMethod";
import ModalConfig from "../../shared/modal-config/ModalConfig";

export const MemberAttendanceModal = (props) => {
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
            "Add Attendance",
            "books-circulation.modal.edit.title",
            "books-circulation.modal.delete.title"
        ),
        NewComponent: CreateBookCirculation,
        EditComponent: EditBookCirculation,
        DeleteComponent: DeleteBookCirculation,
        deleteKey: bookCirculation ? bookCirculation.name : null,
        editConfig,
        delConfig,
        props,
    };

    return <ModalConfig {...modalOptions} />;
};

MemberAttendanceModal.propTypes = {
    bookCirculation: PropTypes.object,
    filterObject: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default MemberAttendanceModal;
