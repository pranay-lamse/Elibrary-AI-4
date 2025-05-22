import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Row, Col, Card, CardBody, Button, Form } from "reactstrap";

import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import { getCurrentMember, getFormattedDate } from "../../shared/sharedMethod";

import { fetchEBookRequests } from "../../member/store/actions/ebookAction";

import Header from "./Header";
import Footer from "./Footer";
import { useNavigate, useParams } from "react-router";
import CustomInputGroup from "../../shared/components/CustomInputGroup";
import { Field, reduxForm } from "redux-form";
import {
    ebookSubscribe,
    fetchEbookSubscription,
} from "../../member/store/actions/ebookSubscriptionAction";
import moment from "moment";

const EbookSubscription = (props) => {
    const {
        fetchEBookRequests,
        ebooks,
        ebookSubscribe,
        fetchEbookSubscription,
        ebookSubscription,
    } = props;
    const dispatch = useDispatch();
    const member = getCurrentMember();
    const navigate = useNavigate();
    const { id } = useParams();

    const { library_id } = useParams();

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

    const onEbookSub = async () => {
       
        const esubMember =
            ebookSubscription.length &&
            ebookSubscription.find(
                (esub) => esub.member_id === member.id && esub.ebook_id === id
            );
        ebookSubscribe(
            {
                issued_on: moment().format("YYYY-MM-DD"),
                returned_on: moment().add(10, "days").format("YYYY-MM-DD"),
                member_id: member.id,
                ebook_id: id,
                library_id: library_id,
                email: member.email,
                // razorpay_payment_id: response.razorpay_payment_id,
                razorpay_payment_id: "NA",
                amount: 10,
                renew:
                    esubMember &&
                    esubMember.returned_on < moment().format("YYYY-MM-DD")
                        ? true
                        : false,
            },
            navigate
        );
    };

    useEffect(() => {
        fetchEBookRequests();
        fetchEbookSubscription();
    }, []);
    // console.log({ ebooks, member, from });

    return (
        <>
            <ProgressBar />
            <Header />
            <section className="ebook_subscription">
                <div className="container">
                    <div className="animated fadeIn">
                        <div className="section-title-center text-center">
                            <h2 className="display-6">E-Book Subscription</h2>
                            <div className="section-divider divider-traingle"></div>
                        </div>

                        <div className="common-container">
                            <h4
                                style={{
                                    textAlign: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                The Book Will be Subscribed from{" "}
                                <strong>{moment().format("MMM Do YY")}</strong>{" "}
                                to{" "}
                                <strong>
                                    {moment()
                                        .add(10, "days")
                                        .format("MMM Do YY")}
                                </strong>
                            </h4>

                            <Button
                                style={{
                                    margin: "0 auto",
                                    display: "block",
                                    minWidth: "115px",
                                }}
                                className="frontend-btn btn btn-info"
                                onClick={() => onEbookSub()}
                            >
                                <span>Subscribe</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => {
    const { ebooks, ebookSubscription } = state;

    return { ebooks, ebookSubscription };
};

export default connect(mapStateToProps, {
    fetchEBookRequests,
    fetchEbookSubscription,
    ebookSubscribe,
})(EbookSubscription);
