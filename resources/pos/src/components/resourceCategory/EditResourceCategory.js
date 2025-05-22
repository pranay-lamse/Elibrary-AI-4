import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResourceCategoryForm from "./ResourceCategoryForm";
import Modal from "../../shared/components/Modal";

import { editResourceCategory } from "../../store/action/resourceCategoryAction";
const EditGenre = (props) => {
    const { category, editResourceCategory, toggleModal } = props;

    const onSaveGenre = (formValues) => {
        editResourceCategory(category.id, formValues);
        toggleModal();
    };

    const prepareFormOption = {
        onSaveGenre,
        onCancel: toggleModal,
        initialValues: {
            name: category.name,
        },
    };

    return (
        <Modal
            {...props}
            content={<ResourceCategoryForm {...prepareFormOption} />}
        />
    );
};

EditGenre.propTypes = {
    genre: PropTypes.object,
    editGenre: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { editResourceCategory })(EditGenre);
