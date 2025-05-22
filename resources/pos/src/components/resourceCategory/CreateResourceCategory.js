import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "../../shared/components/Modal";
import { addResourceCategory } from "../../store/action/resourceCategoryAction";
import ResourceCategoryForm from "./ResourceCategoryForm";
import { Filters } from "../../constants";

const CreateGenre = (props) => {
    const { addResourceCategory, toggleModal } = props;

    const onSaveGenre = (formValues) => {
        addResourceCategory(formValues, Filters.OBJ);
        toggleModal();
    };

    const prepareFormOption = {
        onSaveGenre,
        onCancel: toggleModal,
    };

    return (
        <Modal
            {...props}
            content={<ResourceCategoryForm {...prepareFormOption} />}
        />
    );
};

CreateGenre.propTypes = {
    addGenre: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { addResourceCategory })(CreateGenre);
