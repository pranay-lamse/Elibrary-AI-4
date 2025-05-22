import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {
    getFormattedMessage,
    getDynamicFormattedMessage,
    priceFormatter,
} from "../../../shared/sharedMethod";
import { reduxForm } from "redux-form";
import "../../../shared/action-buttons/ActionButtons.scss";

const PenaltyWarningModal = (props) => {
    const [getamount, setGetAmount] = useState(0);

    const loadScript = (url) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };


    const {
        lateDays,
        collectedPenalty,
        isReturnDueDateModal,
        toggleDueBookModal,
        currency,
    } = props;
    console.log(currency);
    const renderMessage = () => {
        const amount = priceFormatter(collectedPenalty, currency);

        setGetAmount(amount);
        return getDynamicFormattedMessage(
            "books-circulation.penalties.customer-return-book.message",
            {
                lateDays: lateDays,
                amount: amount,
            }
        );
    };

    const clickOnTryIt = async (price) => {


        let url = `${window.location.origin}/test-payment-penalty/${price}`;

        window.location.href = url;
    };

    return (
        <Modal
            isOpen={isReturnDueDateModal}
            toggle={toggleDueBookModal}
            className={"modal-primary modal-config--small"}
        >
            <ModalHeader toggle={toggleDueBookModal}>
                {getFormattedMessage(
                    "books-circulation.return.modal.penalties-warning.label"
                )}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs={12}>{renderMessage()}</Col>
                    <Col xs={12}>
                        <Button
                            onClick={(e) => {
                                clickOnTryIt(getamount);
                            }}
                            color="primary"
                            size="md"
                            className="save-action__save-btn text-white"
                        >
                            Pay
                        </Button>

                        <Button
                            onClick={toggleDueBookModal}
                            color="primary"
                            size="md"
                            className="save-action__save-btn text-white"
                        >
                            {getFormattedMessage("global.input.ok-btn.label")}
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    const { isReturnDueDateModal, lmsSettings } = state;
    return {
        currency: lmsSettings.currency.value.toLowerCase(),
        isReturnDueDateModal,
    };
};

const penaltyWarningModal = reduxForm({
    form: "penaltiesWarningForms",
})(PenaltyWarningModal);

export default connect(mapStateToProps)(penaltyWarningModal);
