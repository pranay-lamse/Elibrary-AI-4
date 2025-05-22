import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import {
    fetchSanctionLetter2,
    addSanctionLetter2,
} from "../../store/action/sanctionLetterAction";
import EditSanctionLetterForm2 from "./editSanctionLetterForm2";
import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
function EditSanctionLetter2(props) {
    const {
        fetchSanctionLetter2,
        sanctionLetters,
        initialValues,
        resourceCategory,
        addSanctionLetter2,
        fetchResourceCategory,
    } = props;

    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const prepareFormData = (formValues) => {
        const { id, category_id, title, file_content, url, note, category } =
            formValues;

        console.log("formValues", formValues);
        const form = new FormData();
        if (id) form.append("id", id);

        if (category) form.append("category_id", JSON.stringify(category.id));
        /*    formData. */
        if (title) form.append("title", title);

        if (file_content) {
            form.append("file_content", file_content[0]);
        } else {
            // Handle the case where file_content is empty
            /* formData.append("file_content", null); */
        }

        if (url) form.append("url", url);
        if (note) form.append("note", note);

        return form;
    };

    const onSaveBook = (formValues) => {
        console.log("formValues", formValues);
        addSanctionLetter2(
            params.id,
            prepareFormData({ ...formValues, id: params.id }),
            navigate
        );
    };

    const goBack = () => {
        dispatch({ type: "EDIT_SANCTION_LETTER", payload: false });
        navigate(-1);
    };

    useEffect(() => {
        fetchSanctionLetter2(params.id);
        dispatch({ type: "SANCTION_LETTER2", payload: true });
    }, [location.pathname]);

    const prepareFormOption = {
        onSaveBook,
        initialValues,
        resourceCategory,
        onCancel: goBack,
    };

    return (
        <MasterLayout>
            <EditSanctionLetterForm2 {...prepareFormOption} />
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const { sanctionLetters, initialValues, resourceCategory } = state;

    return {
        resourceCategory,
        sanctionLetters,
        initialValues,
    };
};

export default connect(mapStateToProps, {
    fetchSanctionLetter2,
    addSanctionLetter2,
    fetchResourceCategory,
})(EditSanctionLetter2);
