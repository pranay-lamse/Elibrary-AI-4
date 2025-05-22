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
            <Modal.Body>
                <div className="col-xxl-7">
                    {/* <table className="table table-responsive gy-7">
                        <tbody>
                            <tr>
                                <th className="py-4" scope="row">
                                    Purchase Request ID :
                                </th>
                                <td className="py-4">
                                    {bookRequestLetter.quantity}
                                </td>
                            </tr>
                            <tr>
                                <th className="py-4" scope="row">
                                    Title :
                                </th>
                                <td className="py-4">
                                    {bookRequestLetter.title}
                                </td>
                            </tr>
                            <tr>
                                <th className="py-4" scope="row">
                                    Book Title :
                                </th>
                                <td className="py-4">
                                    {bookRequestLetter.book_title}
                                </td>
                            </tr>
                            <tr>
                                <th className="py-4" scope="row">
                                    Edition :
                                </th>
                                <td className="py-4">
                                    {bookRequestLetter.edition}
                                </td>
                            </tr>
                            <tr>
                                <th className="py-4" scope="row">
                                    Author :
                                </th>
                                <td className="py-4">
                                    {bookRequestLetter.author}
                                </td>
                            </tr>
                            <tr>
                                <th className="py-4" scope="row">
                                    Publisher :
                                </th>
                                <td className="py-4">
                                    {bookRequestLetter.publisher}
                                </td>
                            </tr>
                            <tr>
                                <th className="py-4" scope="row">
                                    Quantity :
                                </th>
                                <td className="py-4">
                                    {bookRequestLetter.quantity}
                                </td>
                            </tr>
                        </tbody>
                    </table> */}
                    <div className="col-md-12 border border-4 border-primary p-2 mt-3">
                        <div className="d-flex justify-content-center">
                            <h1>Book Request Letter</h1>
                        </div>
                        <div>
                            <div className="d-flex align-content-center">
                                <h3>Purchase Request ID :</h3>
                                <p> {bookRequestLetter.purchase_request_id}</p>
                            </div>
                            <div className="d-flex align-content-center">
                                <h3>Title:</h3>
                                <p> {bookRequestLetter.title}</p>
                            </div>
                            <div className="d-flex align-content-center">
                                <h3>Book Title :</h3>
                                <p> {bookRequestLetter.book_title}</p>
                            </div>
                            <div className="d-flex align-content-center">
                                <h3>Edition :</h3>
                                <p> {bookRequestLetter.edition}</p>
                            </div>
                            <div className="d-flex align-content-center">
                                <h3>Author :</h3>
                                <p> {bookRequestLetter.author}</p>
                            </div>
                            <div className="d-flex align-content-center">
                                <h3>Publisher :</h3>
                                <p> {bookRequestLetter.publisher}</p>
                            </div>
                            <div className="d-flex align-content-center">
                                <h3>Quantity :</h3>
                                <p> {bookRequestLetter.quantity}</p>
                            </div>
                            <div className="d-flex align-content-center">
                                <h3>Description :</h3>
                                <p> {bookRequestLetter.notes}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <span className="required" />
                    <Select
                        ref={innerRef}
                        placeholder="Select emails."
                        name="email"
                        isMulti={true}
                        options={emailsOption}
                        onChange={onChangeMail}
                        noOptionsMessage={() =>
                            getFormattedMessage("no-option.label")
                        }
                        isOptionDisabled={(option) => option.disabled}
                    />
                    <span className="text-danger d-block fw-400 fs-small mt-2">
                        {errors["email"] ? errors["email"] : null}
                    </span>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <span className="required" />
                    <Select
                        placeholder="Select status."
                        name="status"
                        options={statusOptions}
                        onChange={onChangeStatus}
                        noOptionsMessage={() =>
                            getFormattedMessage("no-option.label")
                        }
                        isOptionDisabled={(option) => option.disabled}
                    />
                    <span className="text-danger d-block fw-400 fs-small mt-2">
                        {errors["email"] ? errors["email"] : null}
                    </span>
                </div>
            </Modal.Body>
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
