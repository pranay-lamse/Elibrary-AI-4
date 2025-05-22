import React from "react";
import { ProgressBar } from "react-bootstrap";

const Loader = () => {
    return (
        <div
            id="loader"
            className="d-flex justify-content-center align-items-center flex-column"
        >
            <div className="spinner">
                <img src="/public/images/301.gif" />
            </div>
        </div>
    );
};

export default Loader;
