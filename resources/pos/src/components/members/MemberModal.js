import React from "react";
import PropTypes from "prop-types";
import CreateMember from "./CreateMember";
import EditMember from "./EditMember";
import DeleteMember from "./DeleteMember";
import { getModalTitle } from "../../shared/sharedMethod";
import ModalConfig from "../../shared/modal-config/ModalConfig";

export const MemberModal = (props) => {
    const { member, isCreate, isEdit, isDelete } = props;
    const editConfig = { member };
    const delConfig = { member };
    const modalOptions = {
        modalTitle: getModalTitle(
            isCreate,
            isEdit,
            isDelete,
            "members.modal.add.title",
            "members.modal.edit.title",
            "members.modal.delete.title"
        ),
        NewComponent: CreateMember,
        EditComponent: EditMember,
        DeleteComponent: DeleteMember,
        deleteKey: member ? member.first_name + " " + member.last_name : null,
        editConfig,
        delConfig,
        isWide: true,
        props,
    };

    return <ModalConfig {...modalOptions} />;
};

MemberModal.propTypes = {
    member: PropTypes.object,
    isCreate: PropTypes.bool,
    isEdit: PropTypes.bool,
    isDelete: PropTypes.bool,
};

export default MemberModal;
