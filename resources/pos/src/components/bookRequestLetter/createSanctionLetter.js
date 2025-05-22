import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import { getFormattedMessage } from "../../shared/sharedMethod";
import SanctionLetterForm from "./sanctionLetterForm";
import prepareFormData from "./prepareFormData";
import { addSanctionLetter } from "../../store/action/sanctionLetterAction";
function CreateSanctionLetter(props) {
    const { addSanctionLetter } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSaveBook = (formValues) => {
        addSanctionLetter(prepareFormData(formValues), navigate);
    };

    const goBack = () => {
        navigate(-1);
    };

    const prepareFormOption = {
        onSaveBook,
        onCancel: goBack,
    };

    useDispatch(() => {
        dispatch({ type: "EDIT_SANCTION_LETTER", payload: false });
    }, []);

    return (
        <MasterLayout>
            <HeaderTitle
                title="Sanction Letter"
                to="/admin/pos/sanction-letters"
            />
            <SanctionLetterForm {...prepareFormOption} />
        </MasterLayout>
    );
}

export default connect(null, {
    addSanctionLetter,
})(CreateSanctionLetter);
