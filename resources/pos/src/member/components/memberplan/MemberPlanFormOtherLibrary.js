import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import "./MemberPlan.scss";
import { fetchMembershipPlans } from "../../store/actions/membershipPlanAction";
import { connect, useDispatch } from "react-redux";
import {
    createMembershipPaymentSession,
    createMembershipPaymentSession2,
    createMembershipPaymentSession3,
} from "../../store/actions/MembershipPaymentAction";
import {
    getFormattedMessage,
    getFormattedOptions,
} from "../../../shared/sharedMethod";
import { loadStripe } from "@stripe/stripe-js";
import { setLoading } from "../../../store/action/progressBarAction";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import { fetchAllSettings } from "../../store/actions/allSettingsAction";
import { fetchCurrentPlanDetails } from "../../store/actions/currentPlanAction";
import { membershipPlanFrequencyOptions } from "../../constants";
import { Routes } from "../../constants/index";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCurrentMember,
    getFormattedDate,
} from "../../../shared/sharedMethod";

import {
    fetchMemberStatus,
    registerMemberToLibrary,
} from "../../../member/store/actions/isMemberRegisteredAction";

const MemberPlanFormOtherLibrary = (props) => {
    const {
        membershipPlans,
        fetchMembershipPlans,
        createMembershipPaymentSession,
        createMembershipPaymentSession2,
        createMembershipPaymentSession3,
        paymentSessionId,
        isLoading,
        fetchAllSettings,
        allSettings,
        fetchCurrentPlanDetails,
        currentPlanDetails,
        registerMemberToLibrary,
    } = props;
    const params = useParams();
    const { libraryIdNew } = params;

    const [Month, setMonthly] = useState(false);
    const dispatch = useDispatch();
    const [pubKey, setPubKey] = useState();
    const frequency = getFormattedOptions(membershipPlanFrequencyOptions);
    const navigate = useNavigate();

    const [memberOne, setMemberOne] = useState("");
    const [memberTwo, setMemberTwo] = useState("");
    const [memberThree, setMemberThree] = useState("");

    useEffect(() => {
        fetchAllSettings();
        fetchCurrentPlanDetails();
        fetchMembershipPlans();
    }, [Month]);

    const onSwitchChange = (e) => {
        const value = e.target.checked;
        setMonthly(value);
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

    const [pdfFile, setPdfFile] = useState(null);

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    /* family function  */
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [finalPriceCheck, setFinalPriceCheck] = useState(0);

    const openVideo = (plan_id) => {
        console.log("plan_id", plan_id);
        setIsVideoOpen(true);
    };

    const closeVideo = () => {
        setIsVideoOpen(false);
    };

    const member = getCurrentMember();

    const clickOnTryIt = async (id) => {

        registerMemberToLibrary(member, libraryIdNew);


        membershipPlans.toReversed().map((plan) => {
            if (id === plan.id) {
                let finalPrice = plan.price + plan.deposit; // Initialize final price with the base price

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
        });



        let finalPrice = window.final_price;

        let checkbox1 = cardCheckboxValues[id]?.checkbox1 !== undefined ? cardCheckboxValues[id]?.checkbox1 : 0;
        let checkbox2 = cardCheckboxValues[id]?.checkbox2 !== undefined ? cardCheckboxValues[id]?.checkbox2 : 0;
        let checkbox3 = cardCheckboxValues[id]?.checkbox3 !== undefined ? cardCheckboxValues[id]?.checkbox3 : 0;

        var memberTokenForPay = localStorage.getItem('memberToken');


        // Construct the URL with parameters
        let url = `${window.location.origin}/test-payment/${finalPrice}/${checkbox1}/${checkbox2}/${checkbox3}?id=${id}&plan_amount=${finalPrice}&memberTokenForPay=${memberTokenForPay}&libraryIdNew=${libraryIdNew}`;

        window.location.href = url;

    };

    const clickOnTryIt2 = async (id) => {


        createMembershipPaymentSession2(
            id,
            true,
            pdfFile,
            libraryIdNew,
            navigate
        );
    };

    const clickOnTryIt3 = async (id) => {
        if (!memberOne || !memberTwo || !memberThree) {
            alert("All fields are required");
            return;
        }

        registerMemberToLibrary(member, libraryIdNew);


        membershipPlans.toReversed().map((plan) => {
            if (2 === plan.id) {
                let finalPrice = plan.price + plan.deposit; // Initialize final price with the base price

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
        });




        let finalPrice = window.final_price;

        let checkbox1 = cardCheckboxValues[2]?.checkbox1 !== undefined ? cardCheckboxValues[2]?.checkbox1 : 0;
        let checkbox2 = cardCheckboxValues[2]?.checkbox2 !== undefined ? cardCheckboxValues[2]?.checkbox2 : 0;
        let checkbox3 = cardCheckboxValues[2]?.checkbox3 !== undefined ? cardCheckboxValues[2]?.checkbox3 : 0;


        var memberTokenForPay = localStorage.getItem('memberToken');
        // Construct the URL with parameters
        let url = `${window.location.origin}/test-payment3/${finalPrice}/${checkbox1}/${checkbox2}/${checkbox3}/${memberOne}/${memberTwo}/${memberThree}?id=${id}&memberTokenForPay=${memberTokenForPay}&plan_amount=${finalPrice}&libraryIdNew=${libraryIdNew}`;

        window.location.href = url;
    };

    const handleClick = (id) => {
        // Check if a PDF file is selected
        if (pdfFile) {
            // Call the function with the plan ID and the selected PDF file
            clickOnTryIt2(id);
        } else {
            // Handle case when no file is selected
            console.log("Please select a PDF file.");
        }
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

        membershipPlans.toReversed().map((plan) => {
            if (cardIndex === plan.id) {
                let finalPrice = plan.price + plan.deposit; // Initialize final price with the base price

                if (
                    cardCheckboxValues[cardIndex]?.checkbox1 &&
                    !cardCheckboxValues[cardIndex]?.checkbox2 &&
                    !cardCheckboxValues[cardIndex]?.checkbox3
                ) {
                    finalPrice += 300; // Add 500 if checkbox2 is checked
                }

                if (
                    cardCheckboxValues[cardIndex]?.checkbox2 &&
                    !cardCheckboxValues[cardIndex]?.checkbox1 &&
                    !cardCheckboxValues[cardIndex]?.checkbox3
                ) {
                    finalPrice += 300; // Add 500 if checkbox2 is checked
                }

                if (
                    cardCheckboxValues[cardIndex]?.checkbox3 &&
                    !cardCheckboxValues[cardIndex]?.checkbox1 &&
                    !cardCheckboxValues[cardIndex]?.checkbox2
                ) {
                    finalPrice += 500; // Add 300 if checkbox3 is checked
                }

                if (
                    (cardCheckboxValues[cardIndex]?.checkbox3 &&
                        cardCheckboxValues[cardIndex]?.checkbox2 &&
                        !cardCheckboxValues[cardIndex]?.checkbox1) ||
                    (cardCheckboxValues[cardIndex]?.checkbox1 &&
                        cardCheckboxValues[cardIndex]?.checkbox2 &&
                        !cardCheckboxValues[cardIndex]?.checkbox3) ||
                    (cardCheckboxValues[cardIndex]?.checkbox1 &&
                        cardCheckboxValues[cardIndex]?.checkbox3 &&
                        !cardCheckboxValues[cardIndex]?.checkbox2)
                ) {
                    finalPrice += 800;
                }

                window.final_price = finalPrice;
            }
        });
    };

    /*  const handleSubscribe = (cardIndex) => {
        // Fetch the values of checkboxes for this card
        console.log("Card:", cardIndex);
        console.log("Checkbox Values:", cardCheckboxValues[cardIndex]);
        // You can perform further actions here, such as sending the data to the server
    }; */

    const callToStripe = async (pubKey) => {
        const stripe = await loadStripe(`${pubKey}`);
        const { err } = await stripe.redirectToCheckout({
            sessionId: paymentSessionId,
        });
        dispatch(setLoading(false));
    };

    const planDate = currentPlanDetails?.end_date;
    const d1 = new Date();
    const d2 = new Date(planDate);
    return (
        <div>
            <ProgressBar />

            {isVideoOpen && (
                <div
                    className="modalcss"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 9999,
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            maxWidth: "400px",
                            width: "90%",
                        }}
                    >
                        <span
                            style={{
                                position: "absolute",
                                top: "2px",
                                right: "15px",
                                cursor: "pointer",
                                color: "#aaa",
                                fontSize: "24px",
                            }}
                            onClick={closeVideo}
                        >
                            ×
                        </span>
                        <div>
                            <input
                                type="text"
                                style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                                value={
                                    member
                                        ? member.first_name +
                                        " " +
                                        member.last_name
                                        : ""
                                }
                                readOnly
                            />
                            <input
                                type="text"
                                placeholder="Member Two"
                                onChange={(e) => setMemberOne(e.target.value)}
                                required
                                style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Member Three"
                                onChange={(e) => setMemberTwo(e.target.value)}
                                required
                                style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Member Four"
                                onChange={(e) => setMemberThree(e.target.value)}
                                required
                                style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc",
                                }}
                            />

                            <button
                                onClick={(e) => {
                                    if (
                                        !memberOne ||
                                        !memberTwo ||
                                        !memberThree
                                    ) {
                                        alert("All fields are required");
                                        return;
                                    }
                                    clickOnTryIt3(2);
                                }}
                                className="btn frontend-btn"
                            >
                                <span>Subscribe</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="row  justify-content-center">
                {membershipPlans.length ? (
                    membershipPlans.toReversed().map((plan) => {
                        if (plan.frequency == 1) {
                            var plan_name = "Month";
                        } else if (plan.frequency == 2) {
                            var plan_name = "Year";
                        } else {
                            var plan_name = "LifeTime";
                        }

                        if (plan.name == "BPL Card Holder") {
                            return (
                                <>
                                    <div
                                        className="col-md-6 col-lg-4 mb-4 mb-lg-0 aos-init bpl"
                                        key={plan.id}
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="150"
                                    >
                                        <div className="pricing__item test translateEffect1 active">
                                            <h3 className="pricing__title">
                                                {plan.name}
                                            </h3>

                                            {plan.description ? (
                                                <p>{plan.description}</p>
                                            ) : (
                                                ""
                                            )}
                                            <div className="pricing__list">
                                                <label htmlFor="pdf_preview_file">
                                                    Upload BPL Document
                                                    (jpg,png)
                                                </label>

                                                <input
                                                    name="pdf_preview_file"
                                                    type="file"
                                                    required
                                                    onChange={handleFileChange}
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                />
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    handleClick(plan.id);
                                                }}
                                                /* onClick={() => handleSubscribe(plan.id)} */
                                                className={`btn frontend-btn ${currentPlanDetails?.plan_id ===
                                                    plan.id
                                                    ? ""
                                                    : ""
                                                    }`}
                                            /* disabled={
                                                d1.getTime() < d2.getTime()
                                            } */
                                            >
                                                <span>
                                                    {currentPlanDetails?.plan_id ===
                                                        plan.id
                                                        ? "Active"
                                                        : getFormattedMessage(
                                                            "membership-plan.choose-it.title"
                                                        )}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            );
                        } else {
                            return (
                                <div
                                    className="col-md-6 col-lg-4 mb-4 mb-lg-0 aos-init"
                                    key={plan.id}
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="150"
                                >
                                    <div className="pricing__item test translateEffect1 active">
                                        <h3 className="pricing__title">
                                            {plan.name}
                                        </h3>

                                        {plan.description ? (
                                            <p>{plan.description}</p>
                                        ) : (
                                            ""
                                        )}

                                        <div class="pricing">
                                            <h3 class="pricing__price test2">
                                                {allSettings.currency
                                                    ? allSettings.currency
                                                        .currency_symbol
                                                    : "₹"}{" "}
                                                {plan.price}
                                            </h3>
                                            <span>
                                                / {plan_name}
                                                {plan.deposit !== 0 && ( // Check if plan.deposit is available
                                                    <>
                                                        {" + "}
                                                        {allSettings.currency
                                                            ? allSettings
                                                                .currency
                                                                .currency_symbol
                                                            : " ₹"}{" "}
                                                        {plan.deposit} Deposit
                                                    </>
                                                )}
                                            </span>
                                        </div>

                                        <ul className="pricing__list">
                                            {plan.book_status === "1" ? (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        name="checkbox1"
                                                        checked
                                                    />

                                                    <label for="book">
                                                        {" "}
                                                        Access of Books{" "}
                                                        {plan.frequency == 3
                                                            ? ""
                                                            : `(₹ 130 /
                                                            Year + ₹ 250 ONE-TIME)`}
                                                    </label>
                                                </li>
                                            ) : (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        name="checkbox1"
                                                        defaultChecked={
                                                            cardCheckboxValues[
                                                                plan.id
                                                            ]?.checkbox1 ||
                                                            false
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                plan.id,
                                                                "checkbox1",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />

                                                    <label for="book">
                                                        {" "}
                                                        Access of Books{" "}
                                                        {plan.frequency == 3
                                                            ? ""
                                                            : `(₹ 130 /
                                                            Year + ₹ 250 ONE-TIME)`}
                                                    </label>
                                                </li>
                                            )}

                                            {plan.library_status === "1" ? (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        name="checkbox2"
                                                        checked
                                                    />
                                                    <label for="book">
                                                        {" "}
                                                        Library Access of Study Room
                                                    </label>
                                                </li>
                                            ) : (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        name="checkbox2"
                                                        defaultChecked={
                                                            cardCheckboxValues[
                                                                plan.id
                                                            ]?.checkbox2 ||
                                                            false
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                plan.id,
                                                                "checkbox2",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />

                                                    <label for="book">
                                                        {" "}
                                                        Library Access of Study Room (₹ 300
                                                        / Month)
                                                    </label>
                                                </li>
                                            )}

                                            {plan.ebook_status === "1" ? (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        name="checkbox3"
                                                        checked
                                                    />
                                                    <label for="book">
                                                        {" "}
                                                        Access of Ebook & Computer  For Study
                                                    </label>
                                                </li>
                                            ) : (
                                                <li>
                                                    <input
                                                        type="checkbox"
                                                        name="checkbox3"
                                                        defaultChecked={
                                                            cardCheckboxValues[
                                                                plan.id
                                                            ]?.checkbox3 ||
                                                            false
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                plan.id,
                                                                "checkbox3",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <label for="book">
                                                        {" "}
                                                        Access of Ebook & Computer  For Study (₹ 500 /
                                                        Month)
                                                    </label>
                                                </li>
                                            )}
                                        </ul>
                                        <div class="pricing_bottom">
                                            {plan.name ==
                                                "Family Plan (4 Member)" ? (
                                                <button
                                                    onClick={(e) => {
                                                        openVideo(plan.id);
                                                    }}
                                                    /* onClick={() => handleSubscribe(plan.id)} */
                                                    className={`btn frontend-btn ${currentPlanDetails?.plan_id ===
                                                        plan.id
                                                        ? ""
                                                        : ""
                                                        }`}
                                                /* disabled={
                                                    d1.getTime() <
                                                    d2.getTime()
                                                } */
                                                >
                                                    <span>
                                                        {currentPlanDetails?.plan_id ===
                                                            plan.id
                                                            ? "Active"
                                                            : getFormattedMessage(
                                                                "membership-plan.choose-it.title"
                                                            )}
                                                    </span>
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        clickOnTryIt(plan.id);
                                                    }}
                                                    /* onClick={() => handleSubscribe(plan.id)} */
                                                    className={`btn frontend-btn ${currentPlanDetails?.plan_id ===
                                                        plan.id
                                                        ? ""
                                                        : ""
                                                        }`}
                                                /* disabled={
                                                    d1.getTime() <
                                                    d2.getTime()
                                                } */
                                                >
                                                    <span>
                                                        {currentPlanDetails?.plan_id ===
                                                            plan.id
                                                            ? "Active"
                                                            : getFormattedMessage(
                                                                "membership-plan.choose-it.title"
                                                            )}
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })
                ) : (
                    <div className="empty-plan">
                        {!isLoading ? (
                            <i className="fa fa-2x fa-ban mb-2" />
                        ) : (
                            <div className="spinner">
                                <img src="/public/images/301.gif" />
                            </div>
                        )}
                        {!isLoading && (
                            <span className="empty-component__title">
                                <h5 className="ms-1">
                                    {getFormattedMessage(
                                        "membership-plan-not-available-title"
                                    )}
                                </h5>
                            </span>
                        )}
                    </div>
                )}
            </div>
            {/*   {console.log("showModal", showModal)} */}
        </div>
    );
};

MemberPlanFormOtherLibrary.propTypes = {
    membershipPlans: PropTypes.array,
    paymentSessionId: PropTypes.string,
};

const mapStateToProps = (state) => {
    const {
        membershipPlans,
        paymentSessionId,
        isLoading,
        allSettings,
        currentPlanDetails,
    } = state;
    return {
        membershipPlans,
        paymentSessionId,
        isLoading,
        allSettings,
        currentPlanDetails,
    };
};

export default connect(mapStateToProps, {
    fetchMembershipPlans,
    createMembershipPaymentSession,
    createMembershipPaymentSession2,
    createMembershipPaymentSession3,
    fetchAllSettings,
    fetchCurrentPlanDetails,
    registerMemberToLibrary,
})(MemberPlanFormOtherLibrary);
