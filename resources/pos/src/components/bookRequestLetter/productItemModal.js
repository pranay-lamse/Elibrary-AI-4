import React, { useState, createRef } from "react";
import { connect } from "react-redux";
import { Form, Modal } from "react-bootstrap-v5";
import { editBrand, fetchBrand } from "../../store/action/brandsAction";
import ImagePicker from "../../shared/image-picker/ImagePicker";
import user from "../../assets/images/brand_logo.png";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { placeholderText } from "../../shared/sharedMethod";
import ModelFooter from "../../shared/components/modelFooter";
import Select from "react-select";
import { statusOptions } from "../../constants";

const LetterModal = (props) => {
    const { handleClose, show, title, bookRequestLetter, suppliers } = props;
    const innerRef = createRef();
    const [data, setData] = useState({
        email: "",
        status: "",
    });
    const [errors, setErrors] = useState({ name: "" });

    const emailsOption = suppliers.map((supplier) => {
        return {
            label: supplier.attributes.email,
            value: supplier.attributes.email,
        };
    });

    const statusOptions = [
        {
            label: "Sent",
            value: 1,
        },
        {
            label: "Pending",
            value: 2,
        },
        {
            label: "Sanctioned",
            value: 3,
        },
    ];

    const onChangeMail = (obj) => {
        setData({ ...data, email: obj });
        setErrors("");
    };

    const onChangeStatus = (obj) => {
        setData({ ...data, status: obj });
        setErrors("");
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!data["email"]) {
            errorss["email"] = "Please enter Email id of reciever.";
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onSubmit = (event) => {
        const valid = handleValidation();
        if (valid) alert(JSON.stringify(bookRequestLetter));
    };

    const clearField = () => {
        setErrors("");
        handleClose(false);
    };

    console.log({ data, suppliers, emailsOption, bookRequestLetter });

    return (
        <Modal
            show={show}
            onHide={clearField}
            keyboard={true}
            onShow={() =>
                setTimeout(() => {
                    innerRef.current.focus();
                }, 1)
            }
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>hello</Modal.Body>
            <ModelFooter
                onEditRecord={{}}
                onSubmit={onSubmit}
                addDisabled={true}
                clearField={clearField}
            />
        </Modal>
    );
};

export default connect(null, {})(LetterModal);
