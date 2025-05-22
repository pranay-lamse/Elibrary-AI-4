import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const BookLoader = (props) => {
    const { isLoading } = props;

    return isLoading ? (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "100vw",
                minHeight: "100vh",
            }}
        >
            <img src="images/bookLoading.gif" alt="book-loading" />
        </div>
    ) : null;
};

BookLoader.propTypes = {
    isLoading: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
    return {
        isLoading: state.isLoading || ownProps.isLoading,
    };
};

export default connect(mapStateToProps)(BookLoader);
