import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import PropTypes from "prop-types";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {
    getFormattedMessage,
    getFormattedOptions,
} from "../../../shared/sharedMethod";
import { createMembershipPaymentSession } from "../../store/actions/MembershipPaymentAction";
import { fetchMembershipPlans } from "../../store/actions/membershipPlanAction";
import { fetchAllSettings } from "../../store/actions/allSettingsAction";
import { fetchCurrentPlanDetails } from "../../store/actions/currentPlanAction";
import { loadStripe } from "@stripe/stripe-js";
import { setLoading } from "../../../store/action/progressBarAction";
import { useNavigate, useParams } from "react-router-dom";
import { openModal } from "../../../shared/custom-hooks";
import OfflinePaymentModal from "./OfflinePaymentModal";
import { toggleModal } from "../../../store/action/modalAction";

const MemberShipPlanMethod = (props) => {
    const {
        membershipPlans,
        match,
        createMembershipPaymentSession,
        paymentSessionId,
        isLoading,
        allSettings,
        currentPlanDetails,
        fetchCurrentPlanDetails,
        fetchAllSettings,
        fetchMembershipPlans,
        toggleModal,
    } = props;
    const [isCreate, isEdit, isDelete, singlePlan, onOpenModal] = openModal();
    const cardModalProps = {
        singlePlan,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
    };
    const params = useParams();
    const dispatch = useDispatch();
    const [pubKey, setPubKey] = useState();
    const navigate = useNavigate();

    const planId = +params.id;
    const plan = membershipPlans.filter((plan) => plan.id === planId)[0];

    // console.log({ plan });

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

    if (!membershipPlans) {
        return <ProgressBar />;
    }

    useEffect(() => {
        fetchMembershipPlans(false, planId);
        // fetchAllSettings();
        // fetchCurrentPlanDetails();
    }, []);

    // useEffect(() => {
    //     if (allSettings) {
    //         setPubKey(
    //             allSettings.stripe_key ? allSettings.stripe_key.value : null
    //         );
    //     }
    // }, [allSettings]);

    // useEffect(() => {
    //     if (paymentSessionId) {
    //         callToStripe(pubKey);
    //     }
    // }, [paymentSessionId]);

    const callToStripe = async (pubKey) => {
        const stripe = await loadStripe(`${pubKey}`);
        const { err } = await stripe.redirectToCheckout({
            sessionId: paymentSessionId,
        });
        dispatch(setLoading(false));
    };

    const clickOnRazorPay = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: process.env.MIX_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: plan.price * 100,
            currency: "INR",
            image: location.origin + "/images/elibrary.png",
            name: "Nagpur Elibrary",
            description: "Test Transaction",

            prefill: {
                name: "Nagpur Elibrary",
                email: "example@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Example Corporate Office",
            },
            prefill: {
                name: "Nagpur Elibrary",
                email: "test@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#61dafb",
            },
            handler: (response) => {
                if (response) {
                    const razorpay_payment_id = response.razorpay_payment_id;
                    const amount = process.env.MIX_AMOUNT;
                    createMembershipPaymentSession(planId, navigate);
                }
            },
        };

        const paymentObject = new window.Razorpay(options);
        if (plan) {
            paymentObject.open();
        }
        /*  createMembershipPaymentSession(planId, navigate); */
    };

    const clickOnOffLine = (isEdit, singlePlan = null, isDelete = false) => {
        onOpenModal(isEdit, singlePlan, isDelete);
        toggleModal();
    };

    return (
        <section className="member_books_request">
            <div className="container">
                <div className="animated fadeIn">
                    <div className="section-title-center text-center">
                        <h2 className="display-6">
                            {getFormattedMessage("membership-plan.title")}
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>
                    <div className="common-container">
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                            <Button
                                onClick={() => clickOnRazorPay()}
                                size="lg"
                                className="px-lg-4 py-lg-2 fs-6"
                                color="primary ml-2 text-white"
                            >
                                Subscribe
                            </Button>

                        </div>

                        {/* <OfflinePaymentModal {...cardModalProps} /> */}
                    </div>
                </div>
            </div>
        </section>
    );
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
    fetchAllSettings,
    toggleModal,
    fetchCurrentPlanDetails,
})(MemberShipPlanMethod);
