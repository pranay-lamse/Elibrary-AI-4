import React from "react";
import PropTypes from "prop-types";
import CreateResourceCategory from "./CreateResourceCategory";
import EditResourceCategory from "./EditResourceCategory";
import DeleteResourceCategory from "./DeleteResourceCategory";
import ModalConfig from "../../shared/modal-config/ModalConfig";
import { getModalTitle } from "../../shared/sharedMethod";

export const GenreModal = (props) => {
    const { category, isCreate, isEdit, isDelete, totalRecord, toggleModal } =
        props;
    const editConfig = { category };
    const delConfig = {
        categoryId: category ? category.id : null,
        totalRecord,
        toggleModal,
    };
    const modalOptions = {
        modalTitle: getModalTitle(
            isCreate,
            isEdit,
            isDelete,
            "resource.category.input.new-btn.label",
            "resource.category.modal.edit.title",
            "resource.category.modal.delete.title"
        ),
        NewComponent: CreateResourceCategory,
        EditComponent: EditResourceCategory,
        DeleteComponent: DeleteResourceCategory,
        deleteKey: category ? category.name : null,
        editConfig,
        delConfig,
        props,
    };

    return <ModalConfig {...modalOptions} />;
};

export default GenreModal;
