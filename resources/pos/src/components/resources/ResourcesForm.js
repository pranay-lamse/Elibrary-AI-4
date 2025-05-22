import React from "react";
import { reduxForm } from "redux-form";
import resourceValidate from "./resourceValidate";
import "../books/Books.scss";
import ResourcesFormCard from "./ResourcesFormCard";
import { publicImagePath } from "../../appConstant";
import { imagePicker } from "../../shared/custom-hooks";

const ResourcesForm = (props) => {
    const {
        initialValues,
        change,
        onSaveBook,
        initialize,
        handleSubmit,
        isLoading,
        resourceCategory,
    } = props;

    const [image, isDefaultImage, file, onFileChange, onRemovePhoto] =
        imagePicker(
            change,
            publicImagePath.BOOK_AVATAR,
            publicImagePath.BOOK_AVATAR
        );

    const onSave = (formValues) => {
        onSaveBook(formValues);
    };

    const imagePickerOptions = {
        image,
        buttonName: "image-picker.dropdown.cover.label",
        isDefaultImage,
        onRemovePhoto,
        onFileChange,
    };
    const { invalid, onCancel, pristine } = props;

    const prepareFormOptions = {
        resourceCategory,
        isLoading,
        initialValues,
        change,
        initialize,
        imagePickerOptions,
        onSaveBook: onSave,
        saveActionOptions: { invalid, onCancel, pristine, isLoading },
        handleSubmit,
    };

    return <ResourcesFormCard {...prepareFormOptions} />;
};

export default reduxForm({
    form: "resourceForm",
    validate: resourceValidate,
})(ResourcesForm);
