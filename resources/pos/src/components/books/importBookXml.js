import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImportBookForm from "./ImportBookForm";
import { getFormattedMessage } from "../../shared/sharedMethod";

const ImportBookXml = (props) => {
    const { onSaveImportXmlData, toggleXmlModal, isXmlShow } = props;

    const onSaveImportFile = (data) => {
        onSaveImportXmlData(data);
    };

    const prepareFormOption = {
        onSaveImportData: onSaveImportFile,
    };

    return (
        <Modal
            isOpen={isXmlShow}
            toggle={toggleXmlModal}
            className={"modal-primary modal-config--small"}
        >
            <ModalHeader toggle={toggleXmlModal} className="modal-header">
                Import MARC21 XML
            </ModalHeader>
            <ModalBody>
                <ImportBookForm {...prepareFormOption} />
            </ModalBody>
        </Modal>
    );
};

export default connect(null)(ImportBookXml);
