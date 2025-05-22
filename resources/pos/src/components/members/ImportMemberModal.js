import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFormattedMessage } from "../../shared/sharedMethod";
import ImportMemberForm from "./ImportMemberForm";

const ImportMemberModal = (props) => {
    const { onSaveImportData, toggleModalX, isModalShow } = props;

    const onSaveImportFile = (data) => {
        onSaveImportData(data);
    };

    const prepareFormOption = {
        onSaveImportData: onSaveImportFile,
    };

    return (
        <Modal
            isOpen={isModalShow}
            toggle={toggleModalX}
            className={"modal-primary modal-config--small"}
        >
            <ModalHeader toggle={toggleModalX} className="modal-header">
                Import Excel File
                {/* <button
                    onClick={toggleModal}
                    type="button"
                    class="close"
                    aria-label="Close"
                >
                    <span aria-hidden="true">×</span>
                </button> */}
            </ModalHeader>
            <ModalBody>
                <ImportMemberForm {...prepareFormOption} />
            </ModalBody>
        </Modal>
    );
};

export default connect(null)(ImportMemberModal);
