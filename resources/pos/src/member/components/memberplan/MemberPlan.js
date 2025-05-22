import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import MemberPlanForm from "./MemberPlanForm";

const MemberPlan = (props) => {
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
                        <h2 className="display-6">Membership Plan</h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>

                    <MemberPlanForm />
                </div>
            </section>
        </div>
    );
};

MemberPlan.propTypes = {
    history: PropTypes.object,
    fetchMembershipPlans: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { membershipPlans } = state;
    return { membershipPlans };
};

export default connect(mapStateToProps, null)(MemberPlan);
