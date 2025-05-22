import React, { useEffect, useState } from "react";

const PaymentFailed = (props) => {
    return (
        <div>
            <div className="container"></div>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="message-box _success _failed">
                        <i className="fa fa-times-circle" ></i>
                        <h2> Your payment failed </h2>
                        <p>  Try again later </p>

                    </div>
                </div>
            </div>
        </div>


    );
};
export default PaymentFailed;
