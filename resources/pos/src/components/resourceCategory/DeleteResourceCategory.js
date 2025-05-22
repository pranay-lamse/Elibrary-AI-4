import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../../shared/components/Modal";
import DeleteAction from "../../shared/action-buttons/DeleteAction";
import { deleteResourceCategory } from "../../store/action/resourceCategoryAction";
import { Filters } from "../../constants";

const DeleteGenre = (props) => {
    const { categoryId, deleteResourceCategory, toggleModal, totalRecord } =
        props;
    console.log({ toggleModal });

    const onDeleteGenre = () => {
        deleteResourceCategory(categoryId, Filters.OBJ, totalRecord);
        toggleModal();
    };

    return (
        <Modal
            {...props}
            actions={
                <DeleteAction onDelete={onDeleteGenre} onCancel={toggleModal} />
            }
        />
    );
};

export default connect(null, { deleteResourceCategory })(DeleteGenre);
