import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DeleteAction from "../../shared/action-buttons/DeleteAction";
import Modal from "../../shared/components/Modal";
import { deleteTestimonial } from "../../admin/store/actions/testimonialAction";

const DeleteTestimonial = (props) => {
    const { testimonialId, deleteTestimonial, toggleModal, totalRecord } =
        props;

    const onDeleteTestimonial = () => {
        deleteTestimonial(testimonialId, totalRecord);
    };
    return (
        <Modal
            {...props}
            actions={
                <DeleteAction
                    onDelete={onDeleteTestimonial}
                    onCancel={toggleModal}
                />
            }
        />
    );
};

DeleteTestimonial.propTypes = {
    testimonialId: PropTypes.number,
    deleteTestimonial: PropTypes.func,
    toggleModal: PropTypes.func,
};

export default connect(null, { deleteTestimonial })(DeleteTestimonial);
