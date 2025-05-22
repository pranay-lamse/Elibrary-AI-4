import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import CurrentPlanForm from "./CurrentPlanForm";

const CurrentPlan = (props) => {
    const { currentPlanDetails, allSettings } = props;
    const [isSpinner, setIsSpinner] = useState(true);
    if (!currentPlanDetails && !allSettings) {
        return <ProgressBar />;
    }
    // sds
    useEffect(() => {
        setTimeout(() => setIsSpinner(false), 2000);
    }, []);
    return (
        <div className="animated fadeIn current_plan">
            <div>
                <div className="section-title-center text-center">
                    <h2 className="display-6">
                        {getFormattedMessage("membership-plan.title")}
                    </h2>
                    <div className="section-divider divider-traingle"></div>
                </div>
                <CurrentPlanForm />
            </div>
        </div>
    );
};

CurrentPlan.propTypes = {
    history: PropTypes.object,
    currentPlanDetails: PropTypes.object,
};

const mapStateToProps = (state) => {
    const { currentPlanDetails, allSettings } = state;
    return { currentPlanDetails, allSettings };
};

export default connect(mapStateToProps)(CurrentPlan);
