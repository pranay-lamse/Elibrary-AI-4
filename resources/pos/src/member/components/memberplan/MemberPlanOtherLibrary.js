import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import MemberPlanFormOtherLibrary from "./MemberPlanFormOtherLibrary";
import { useParams } from "react-router";

const MemberPlanOtherLibrary = (props) => {
    const params = useParams();
    const { libraryIdNew } = params;

    if (libraryIdNew == 111) {
        var libray_name = "Dindayal Upadhyay Library";
    } else if (libraryIdNew == 222) {
        var libray_name = "Kundanlal Gupta Library";
    } else if (libraryIdNew == 333) {
        var libray_name = "Rashtramata Kasturba Library";
    } else {
    }

    const { membershipPlans } = props;
    if (!membershipPlans) {
        return <ProgressBar />;
    }

    return (
        <div className="animated fadeIn">
            <section id="pricing" className="section-padding pricing">
                <div className="container">
                    <div className="section-title-center text-center">
                        <span>LIBRARY</span>
                        <h2 className="display-6">
                            Membership Plan For {libray_name}
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>

                    <MemberPlanFormOtherLibrary />
                </div>
            </section>
        </div>
    );
};

MemberPlanOtherLibrary.propTypes = {
    history: PropTypes.object,
    fetchMembershipPlans: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { membershipPlans } = state;
    return { membershipPlans };
};

export default connect(mapStateToProps, null)(MemberPlanOtherLibrary);
