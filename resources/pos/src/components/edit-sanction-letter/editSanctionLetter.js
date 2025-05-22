import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import {
    fetchSanctionLetter,
    addSanctionLetter,
} from "../../store/action/sanctionLetterAction";
import EditSanctionLetterForm from "./editSanctionLetterForm";

function EditSanctionLetter(props) {
    const {
        fetchSanctionLetter,
        sanctionLetters,
        initialValues,
        addSanctionLetter,
    } = props;
    const dispatch = useDispatch();
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const prepareFormData = (formValues) => {
        const { id, subject, pdf_file, letter_status, description } =
            formValues;
        const form = new FormData();
        if (id) form.append("id", id);
        if (subject) form.append("subject", subject);
        if (subject) form.append("subject", subject);
        if (letter_status) form.append("letter_status", letter_status.id);
        if (pdf_file)
            form.append(
                "pdf_file",
                typeof pdf_file === "string" ? pdf_file : pdf_file[0]
            );
        if (description) form.append("description", description);
        return form;
    };

    const onSaveBook = (formValues) => {
        console.log({ formValues });
        addSanctionLetter(
            prepareFormData({ ...formValues, id: params.id }),
            navigate
        );
    };

    const goBack = () => {
        dispatch({ type: "EDIT_SANCTION_LETTER", payload: false });
        navigate(-1);
    };

    useEffect(() => {
        fetchSanctionLetter(params.id);
        dispatch({ type: "EDIT_SANCTION_LETTER", payload: true });
    }, [location.pathname]);

    const prepareFormOption = {
        onSaveBook,
        initialValues,
        onCancel: goBack,
    };

    return (
        <MasterLayout>
            <HeaderTitle
                title="Sanction Letter"
                to="/admin/pos/sanction-letters"
            />
            <EditSanctionLetterForm {...prepareFormOption} />
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const { sanctionLetters, initialValues } = state;
    return {
        sanctionLetters,
        initialValues,
    };
};

export default connect(mapStateToProps, {
    fetchSanctionLetter,
    addSanctionLetter,
})(EditSanctionLetter);
