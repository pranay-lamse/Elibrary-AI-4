import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import memberValidate from "./memberProfileValidate";
import "./MemberProfile.scss";
import SaveAction from "../../../shared/action-buttons/SaveAction";
import InputGroup from "../../../shared/components/InputGroup";
import ImagePicker from "../../../shared/lms-image-picker/ImagePicker";
import Select from "../../../shared/components/Select";
import {
    enableDisableUserInput,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { imagePicker } from "../../../shared/custom-hooks";
import { maxDigits } from "../../../admin/constants";

import { useNavigate } from "react-router-dom";

const MemberProfileForm = (props) => {
    const navigate = useNavigate();
    const {
        initialValues,
        change,
        countries,
        history,
        onSaveMemberProfile,
        handleSubmit,
    } = props;
    const [isPasswordHidden, setPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] =
        imagePicker(
            change,
            !!initialValues.image_path ? initialValues.image_path : null,
            null,
            !!!initialValues.image_path
        );

    const onSave = (formValues) => {
        formValues.file = file;
        onSaveMemberProfile(formValues);
    };

    const goToHomePage = () => {
        navigate(-1);
    };

    const onclickPassword = (password) => {
        if (password) setPasswordHidden(!isPasswordHidden);
    };

    const onclickConfirmPassword = (password) => {
        if (password) setConfirmPasswordHidden(!isConfirmPasswordHidden);
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        setDisable(false);
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === "image/jpeg" || file.type === "image/png") {
                setSelectImg(file);
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    setImagePreviewUrl(fileReader.result);
                };
                if (file) {
                    fileReader.readAsDataURL(file);
                }
                setErrors("");
            }
        }
    };

    const imagePickerOptions = {
        user: {
            name: initialValues
                ? initialValues.first_name + " " + initialValues.last_name
                : null,
        },
        image,
        isDefaultImage,
        onRemovePhoto,
        onFileChange,
        handleImageChange,
    };

    return (
        <div className="contact-form-box">
            <div className="row">
                <div className="form-group mb13 col-sm-6">
                    <Field
                        name="first_name"
                        label="profile.input.first-name.label"
                        required
                        component={InputGroup}
                    />
                </div>
                <div className="form-group mb13 col-sm-6">
                    <Field
                        name="last_name"
                        label="profile.input.last-name.label"
                        required
                        component={InputGroup}
                    />
                </div>
                <div className="form-group mb13 col-sm-6">
                    <Field
                        name="email"
                        label="profile.input.email.label"
                        readOnly
                        required
                        component={InputGroup}
                    />
                </div>
                <div className="form-group mb30 col-sm-6">
                    <Field
                        name="phone"
                        type="number"
                        label="profile.input.phone.label"
                        onChange={(e) =>
                            enableDisableUserInput(e, maxDigits.PHONE_NUMBER)
                        }
                        component={InputGroup}
                    />
                </div>
                <div className="form-group mb30 col-sm-12">
                    <label>
                        {getFormattedMessage("profile.member-profile")}
                    </label>
                    <Field
                        name="file_name"
                        type="hidden"
                        component={InputGroup}
                    />
                    <ImagePicker {...imagePickerOptions} />
                </div>

                <div className="form-group mb30 col-sm-6">
                    <Field
                        name="address_1"
                        label="profile.input.address1.label"
                        component={InputGroup}
                    />
                </div>
                <div className="form-group mb30 col-sm-6">
                    <Field
                        name="address_2"
                        label="profile.input.address2.label"
                        component={InputGroup}
                    />
                </div>
                {/* <div className="form-group mb30 col-sm-6">
                    <Field
                        name="country"
                        label="profile.select.country.label"
                        options={countries}
                        placeholder="profile.select.country.placeholder"
                        component={Select}
                        isSearchable={true}
                        isMini={true}
                        menuPlacement="top"
                    />
                </div> */}
                <div className="form-group mb30 col-sm-6">
                    <Field
                        name="state"
                        label="profile.input.state.label"
                        component={InputGroup}
                    />
                </div>
                <div className="form-group mb30 col-sm-6">
                    <Field
                        name="city"
                        label="profile.input.city.label"
                        component={InputGroup}
                    />
                </div>
                <div className="form-group mb30 col-sm-6">
                    <Field
                        name="zip"
                        label="profile.input.zip.label"
                        component={InputGroup}
                    />
                </div>
                <div className="d-flex col-sm-12">
                    <SaveAction
                        onSave={handleSubmit(onSave)}
                        onCancel={goToHomePage}
                        {...props}
                    />
                </div>
            </div>
        </div>
    );
};

MemberProfileForm.propTypes = {
    initialValues: PropTypes.object,
    history: PropTypes.object,
    countries: PropTypes.array,
    onSaveMemberProfile: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
};

export default reduxForm({ form: "memberForm", validate: memberValidate })(
    MemberProfileForm
);
