import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import prepareFormData from "./prepareFormData";
import MemberProfileForm from "./MemberProfileForm";
import "./MemberProfile.scss";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {
    getFormattedMessage,
    prepareProfileData,
} from "../../../shared/sharedMethod";
import { fetchMember, editMember } from "../../store/actions/memberAction";
import { fetchCountries } from "../../store/actions/countryAction";
import { useNavigate } from "react-router-dom";

const MemberProfile = (props) => {
    const {
        countries,
        member,
        history,
        fetchMember,
        fetchCountries,
        editMember,
    } = props;
    const navigate = useNavigate();
    useEffect(() => {
        fetchMember();
        fetchCountries();
    }, []);

    const onSaveMemberProfile = (formValues) => {
        editMember(prepareFormData(formValues), navigate);
    };

    const prepareFormOption = {
        initialValues: prepareProfileData(member),
        countries,
        history,
        onSaveMemberProfile,
    };

    if (!member || !member.id) {
        return <ProgressBar />;
    }

    return (

        <section id="profile" className="section-padding profile">
            <div className="container">
                <div className="section-title-center text-center">

                    <h2 className="display-6">
                        {getFormattedMessage("profile.title")}  </h2>
                    <div className="section-divider divider-traingle">

                    </div>
                </div>

                <MemberProfileForm {...prepareFormOption} />

            </div>
        </section>

    );
};

MemberProfile.propTypes = {
    member: PropTypes.object,
    history: PropTypes.object,
    countries: PropTypes.array,
    fetchMember: PropTypes.func,
    fetchCountries: PropTypes.func,
    editMember: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { member, countries } = state;
    return { member, countries };
};
export default connect(mapStateToProps, {
    fetchMember,
    fetchCountries,
    editMember,
})(MemberProfile);
