import React, { useEffect, useState } from "react";
import { Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    dateFormatter,
    getFormattedMessage,
    getFormattedOptions,
} from "../../../shared/sharedMethod";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import { Button } from "react-bootstrap";
import Transactions from "../transactions/Transactions";
import { fetchCurrentPlanDetails } from "../../store/actions/currentPlanAction";
import { Routes } from "../../constants/index";
import { useNavigate } from "react-router-dom";
import { fetchAllSettings } from "../../store/actions/allSettingsAction";
import { membershipPlanFrequencyOptions } from "../../constants";
import currencyFile from "../currencies/currencies.json";
import { fetchTransactions } from "../../store/actions/transactionsAction";
import {
    getCurrentMember,
    getFormattedDate,
} from "../../../shared/sharedMethod";

import { createMembershipPaymentSession4 } from "../../store/actions/MembershipPaymentAction";
const CurrentPlanForm = (props) => {
    const {
        currentPlanDetails,
        fetchCurrentPlanDetails,
        isLoading,
        allSettings,
        fetchAllSettings,
        createMembershipPaymentSession4,
    } = props;
    const navigate = useNavigate();
    const [isLocalLoading, setIsLocalLoading] = useState(true);
    const membershipFrequencyOptions = getFormattedOptions(
        membershipPlanFrequencyOptions
    );

    useEffect(() => {
        fetchCurrentPlanDetails();
        fetchAllSettings();
        setTimeout(() => {
            setIsLocalLoading(false);
        }, 3000);
    }, []);

    const onUpgradeClick = () => {
        navigate(Routes.MEMBER_PLAN);
    };

    const member = getCurrentMember();

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

    const clickOnTryIt = async (id) => {
        console.log("cardCheckboxValues", cardCheckboxValues[id]);

        let subscription_id = currentPlanDetails?.id;
        if (true) {
            let finalPrice = 0; // Initialize final price with the base price

            if (
                cardCheckboxValues[id]?.checkbox1 &&
                !cardCheckboxValues[id]?.checkbox2 &&
                !cardCheckboxValues[id]?.checkbox3
            ) {
                finalPrice += 380;
            }

            if (
                cardCheckboxValues[id]?.checkbox2 &&
                !cardCheckboxValues[id]?.checkbox1 &&
                !cardCheckboxValues[id]?.checkbox3
            ) {
                finalPrice += 300; // Add 500 if checkbox2 is checked
            }

            if (
                cardCheckboxValues[id]?.checkbox3 &&
                !cardCheckboxValues[id]?.checkbox1 &&
                !cardCheckboxValues[id]?.checkbox2
            ) {
                finalPrice += 500; // Add 300 if checkbox3 is checked
            }

            if (
                cardCheckboxValues[id]?.checkbox3 &&
                cardCheckboxValues[id]?.checkbox2 &&
                !cardCheckboxValues[id]?.checkbox1
            ) {
                finalPrice += 800;
            }

            if (
                cardCheckboxValues[id]?.checkbox1 &&
                cardCheckboxValues[id]?.checkbox2 &&
                !cardCheckboxValues[id]?.checkbox3
            ) {
                finalPrice += 680;
            }

            if (
                cardCheckboxValues[id]?.checkbox1 &&
                cardCheckboxValues[id]?.checkbox3 &&
                !cardCheckboxValues[id]?.checkbox2
            ) {
                finalPrice += 880;
            }

            window.final_price = finalPrice;
        }



        let finalPrice = window.final_price; // Replace with actual value
        let checkbox1 = cardCheckboxValues[id]?.checkbox1 !== undefined ? cardCheckboxValues[id]?.checkbox1 : 0;
        let checkbox2 = cardCheckboxValues[id]?.checkbox2 !== undefined ? cardCheckboxValues[id]?.checkbox2 : 0;
        let checkbox3 = cardCheckboxValues[id]?.checkbox3 !== undefined ? cardCheckboxValues[id]?.checkbox3 : 0;

        var memberTokenForPay = localStorage.getItem('memberToken');
        // Construct the URL with parameters
        let url = `${window.location.origin}/test-payment2/${finalPrice}/${checkbox1}/${checkbox2}/${checkbox3}?id=${id}&plan_amount=${finalPrice}&memberTokenForPay=${memberTokenForPay}&subscription_id=${subscription_id}`;


        // Redirect the user to the payment gateway URL
        window.location.href = url;


    };

    const renderMemberShipPlanFrequency = () => {
        const frequency = membershipFrequencyOptions.filter(
            (fre) => fre.id === currentPlanDetails?.plan_frequency
        );
        return frequency[0]?.name ? " /" + frequency[0]?.name : "";
    };

    const getCurrency = () => {
        const cure = allSettings?.currency?.currency_symbol;
        return cure;
    };

    const [cardCheckboxValues, setCardCheckboxValues] = useState([]);

    const handleCheckboxChange = (cardIndex, checkboxName, checked) => {
        setCardCheckboxValues((prevState) => {
            const updatedValues = [...prevState];
            updatedValues[cardIndex] = {
                ...updatedValues[cardIndex],
                [checkboxName]: checked,
            };
            return updatedValues;
        });
    };

    return (
        <div>
            <ProgressBar />
            {currentPlanDetails && !isLocalLoading ? (
                <>
                    <div className="container">
                        <div className="common-container plan-details">
                            <Col xs={12}>
                                <Card>
                                    <CardBody className="p-5">
                                        <div className="row d-flex align-items-center justify-content-between mb-4">
                                            <div className="col-md-6">
                                                <h3>
                                                    {
                                                        currentPlanDetails
                                                            ?.subscription_plan
                                                            ?.name
                                                    }
                                                </h3>
                                                <h5 className="text-success">
                                                    {getFormattedMessage(
                                                        "active-till.title"
                                                    )}{" "}
                                                    {currentPlanDetails?.end_date ===
                                                        "3024-03-01 11:34:58"
                                                        ? "Life Time"
                                                        : dateFormatter(
                                                            currentPlanDetails?.end_date
                                                        )}
                                                </h5>
                                            </div>
                                            {currentPlanDetails.name ===
                                                "BPL Card Holder" ? (
                                                ""
                                            ) : (
                                                <div className="col-md-6 text-right">
                                                    {/* <Button
                                                        className="btn btn-primary mx-auto text-white btn-lg fs-6"
                                                        onClick={onUpgradeClick}
                                                    >
                                                        {getFormattedMessage(
                                                            "upgrade-currentPlanDetails?.title"
                                                        )}
                                                    </Button> */}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="fs-4">
                                                {currentPlanDetails.id &&
                                                    getCurrency(
                                                        currentPlanDetails.id
                                                    )}{" "}
                                                {
                                                    currentPlanDetails
                                                        ?.subscription_plan
                                                        ?.price
                                                }
                                                {/*  {currentPlanDetails ? "/ " : ""} */}
                                                {renderMemberShipPlanFrequency()}
                                            </h4>
                                            <h6 className="text-secondary">
                                                {getFormattedMessage(
                                                    "subscribed-date.title"
                                                )}
                                                :{" "}
                                                {dateFormatter(
                                                    currentPlanDetails?.start_date
                                                )}
                                            </h6>

                                            <h6 className="text-secondary">
                                                {getFormattedMessage(
                                                    "Current Plan Have "
                                                )}
                                                :{" "}
                                            </h6>

                                            {currentPlanDetails?.book_status ===
                                                "1" ? (
                                                <li
                                                    style={{
                                                        listStyleType: "none",
                                                    }}
                                                >
                                                    <i className="fa fa-check-circle fa-lg text-success" />

                                                    <label for="book">
                                                        Access of Books Active
                                                        till{" "}
                                                        {currentPlanDetails?.book_status_created_at
                                                            ? currentPlanDetails?.book_status_created_at ===
                                                                "3024-03-01 11:34:58"
                                                                ? "LifeTime"
                                                                : dateFormatter(
                                                                    currentPlanDetails?.book_status_created_at
                                                                )
                                                            : ""}
                                                    </label>
                                                </li>
                                            ) : (
                                                ""
                                            )}

                                            {currentPlanDetails?.library_status ===
                                                "1" ? (
                                                <li
                                                    style={{
                                                        listStyleType: "none",
                                                    }}
                                                >
                                                    <i className="fa fa-check-circle fa-lg text-success" />

                                                    <label for="book">
                                                        Library Access of Study Room Active
                                                        till{" "}
                                                        {currentPlanDetails?.library_status_created_at
                                                            ? currentPlanDetails?.library_status_created_at ===
                                                                "3024-03-01 11:34:58"
                                                                ? "LifeTime"
                                                                : dateFormatter(
                                                                    currentPlanDetails?.library_status_created_at
                                                                )
                                                            : ""}
                                                    </label>
                                                </li>
                                            ) : (
                                                ""
                                            )}

                                            {currentPlanDetails?.ebook_status ===
                                                "1" ? (
                                                <li
                                                    style={{
                                                        listStyleType: "none",
                                                    }}
                                                >
                                                    <i className="fa fa-check-circle fa-lg text-success" />

                                                    <label for="book">
                                                        Access of E-Books Active
                                                        till{" "}
                                                        {currentPlanDetails?.ebook_status_created_at
                                                            ? currentPlanDetails?.ebook_status_created_at ===
                                                                "3024-03-01 11:34:58"
                                                                ? "LifeTime"
                                                                : dateFormatter(
                                                                    currentPlanDetails?.ebook_status_created_at
                                                                )
                                                            : ""}
                                                    </label>
                                                </li>
                                            ) : (
                                                ""
                                            )}
                                            {console.log(
                                                "here currentpalndetaisl",
                                                currentPlanDetails
                                                    ?.subscription_plan?.id
                                            )}

                                            <ul className="pricing__list">
                                                {currentPlanDetails?.book_status ===
                                                    "1" ? (
                                                    <li></li>
                                                ) : (
                                                    <li>
                                                        <input
                                                            type="checkbox"
                                                            name="checkbox1"
                                                            defaultChecked={
                                                                cardCheckboxValues[
                                                                    currentPlanDetails
                                                                        ?.subscription_plan
                                                                        ?.id
                                                                ]?.checkbox1 ||
                                                                false
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    currentPlanDetails
                                                                        ?.subscription_plan
                                                                        ?.id,
                                                                    "checkbox1",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />

                                                        <label for="book">
                                                            {" "}
                                                            Access of Books{" "}
                                                            {currentPlanDetails?.frequency ==
                                                                3
                                                                ? ""
                                                                : `(₹ 130 /
                                                            Year + ₹ 250 ONE-TIME)`}
                                                        </label>
                                                    </li>
                                                )}

                                                {currentPlanDetails?.library_status ===
                                                    "1" ? (
                                                    <li></li>
                                                ) : (
                                                    <li>
                                                        <input
                                                            type="checkbox"
                                                            name="checkbox2"
                                                            defaultChecked={
                                                                cardCheckboxValues[
                                                                    currentPlanDetails
                                                                        ?.subscription_plan
                                                                        ?.id
                                                                ]?.checkbox2 ||
                                                                false
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    currentPlanDetails
                                                                        ?.subscription_plan
                                                                        ?.id,
                                                                    "checkbox2",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />

                                                        <label for="book">
                                                            {" "}
                                                            Library Access of Study Room (₹
                                                            300 / Month)
                                                        </label>
                                                    </li>
                                                )}

                                                {currentPlanDetails?.ebook_status ===
                                                    "1" ? (
                                                    <li></li>
                                                ) : (
                                                    <li>
                                                        <input
                                                            type="checkbox"
                                                            name="checkbox3"
                                                            defaultChecked={
                                                                cardCheckboxValues[
                                                                    currentPlanDetails
                                                                        ?.subscription_plan
                                                                        ?.id
                                                                ]?.checkbox3 ||
                                                                false
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    currentPlanDetails
                                                                        ?.subscription_plan
                                                                        ?.id,
                                                                    "checkbox3",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                        <label for="book">
                                                            {" "}
                                                            Access of Ebook & Computer for Study (₹
                                                            500 / Month)
                                                        </label>
                                                    </li>
                                                )}
                                            </ul>

                                            {currentPlanDetails?.ebook_status !=
                                                "1" ||
                                                currentPlanDetails?.book_status !=
                                                "1" ||
                                                currentPlanDetails?.library_status !=
                                                "1" ? (
                                                <div>
                                                    <button
                                                        onClick={(e) => {
                                                            clickOnTryIt(
                                                                currentPlanDetails?.plan_id
                                                            );
                                                        }}
                                                        className={`btn frontend-btn `}
                                                    /* onClick={() => handleSubscribe(plan.id)} */
                                                    >
                                                        <span>Upgrade</span>
                                                    </button>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>
                    </div>
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card>
                                <CardBody>
                                    <div className="w-100">
                                        <Transactions />
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </>
            ) : (
                <div className="spinner">
                    <img src="/public/images/301.gif" />
                </div>
            )}
        </div>
    );
};

CurrentPlanForm.propTypes = {
    currentPlanDetails: PropTypes.object,
    fetchCurrentPlanDetails: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { currentPlanDetails, isLoading, allSettings, transactions } = state;
    return { currentPlanDetails, isLoading, allSettings, transactions };
};

export default connect(mapStateToProps, {
    fetchCurrentPlanDetails,
    fetchAllSettings,
    createMembershipPaymentSession4,
})(CurrentPlanForm);
