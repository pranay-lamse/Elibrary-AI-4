import React from "react";

const PaymentSuccess = (props) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="message-box success">
                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                        <h2>Your payment was successful</h2>
                        <p>
                            Thank you for your payment. We will
                            <br />
                            be in contact with more details shortly.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PaymentSuccess;
