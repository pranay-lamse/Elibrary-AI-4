import React from "react";
import { connect } from "react-redux";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        0: " #fff",
        "1.0": "#6571FF",
    },
    shadowBlur: 0,
    barThickness: 4,
});

const TopProgressBar = (props) => {
    const { isLoading } = props;
    return isLoading ? <TopBarProgress /> : null;
};

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.isLoading || ownProps.isLoading,
    };
};

export default connect(mapStateToProps, null)(TopProgressBar);
