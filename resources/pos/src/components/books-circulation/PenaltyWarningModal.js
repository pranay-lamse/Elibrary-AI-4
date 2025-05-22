import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import {
    getFormattedMessage,
    getDynamicFormattedMessage,
    priceFormatter,
} from "../../shared/sharedMethod";
import { reduxForm } from "redux-form";
import "../../shared/action-buttons/ActionButtons.scss";
import { default as CustomSelect } from 'react-select';

const PenaltyWarningModal = (props) => {

    const paymodeArray = [
        { id: 1, name: 'Online', value: 'Online', label: 'Online' },
        { id: 2, name: 'Offline', value: 'Offline', label: 'Offline' }
    ];
    const [paymode, setPayMode] = useState('Online');


    const handleOptionChange2 = (selectedOption) => {
        setPayMode(selectedOption.value);
    };
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


    const clickOnTryIt = async (price) => {


        let url = `${window.location.origin}/test-payment-penalty/${price}?paymode=${paymode}`;

        window.location.href = url;
    };

    const renderMessage = () => {
        const amount = priceFormatter(collectedPenalty, currency);

        return getDynamicFormattedMessage(
            "books-circulation.penalties.customer-return-book.message",
            {
                lateDays: lateDays,
                amount: amount,
            }
        );
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

                        {/* <CustomSelect
                            name="Pay Mode"
                            label="Pay Mode"
                            options={paymodeArray.map(plan => ({ value: plan.id, label: plan.name, ...plan }))}
                            placeholder="Pay Mode"
                            onChange={handleOptionChange2}
                            menuPlacement="top"
                            required


                        /> */}
                        <Button
                            onClick={(e) => {
                                clickOnTryIt(collectedPenalty);
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
    console.log({ lmsSettings });
    return {
        currency: lmsSettings.currency.value.toLowerCase(),
        isReturnDueDateModal,
    };
};

const penaltyWarningModal = reduxForm({
    form: "penaltiesWarningForms",
})(PenaltyWarningModal);

export default connect(mapStateToProps)(penaltyWarningModal);
