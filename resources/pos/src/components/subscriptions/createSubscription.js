import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";
import { fetchMembershipPlans } from "../../member/store/actions/membershipPlanAction";
import { useLocation, useNavigate } from "react-router";
import { fetchAllSettings } from "../../member/store/actions/allSettingsAction";
import OfflinePaymentForm from "../../member/components/memberplan/OfflinePaymentForm";
import { createOfflinePayment } from "../../member/store/actions/OfflinePaymentAction";
import { fetchMembers } from "../../admin/store/actions/memberAction";

const CreateSubscription = (props) => {
    const location = useLocation();
    const {
        membershipPlans,
        fetchMembershipPlans,
        fetchAllSettings,
        fetchMembers,
        currency,
        members,
        createOfflinePayment,
    } = props;
    const [selectMember, setSelectMember] = useState([]);
    const [selectPlan, setSelectPlan] = useState([]);
    const navigate = useNavigate();

    const onSavePayment = (formValues) => {
        createOfflinePayment(
            {
                ...formValues,
                memberId: selectMember,
                plan_name: selectPlan?.name,
                amount_to_pay: selectPlan?.price,
                plan_id: selectPlan?.id,
            },
            navigate
        );
    };

    const prepareFormOption = useCallback(() => {
        return {
            onSavePayment,
            currency,
            initialValues: {
                plan_name: selectPlan?.name
                    ? selectPlan.name
                    : membershipPlans[0]?.name,
                amount_to_pay: selectPlan?.price
                    ? selectPlan.price
                    : membershipPlans[0]?.price,
                payment_method: "Offline",
                notes: membershipPlans?.show_on_landing_page
                    ? membershipPlans.show_on_landing_page
                    : null,
                plan_id: selectPlan?.id
                    ? selectPlan.id
                    : membershipPlans[0]?.id,
            },
        };
    }, [selectPlan]);

    useEffect(() => {
        fetchMembers();
        fetchMembershipPlans(false, 1);
        fetchAllSettings();
        setSelectPlan(membershipPlans[0]);
        setSelectMember(members[0]?.id);
    }, [selectPlan, selectMember, location.pathname]);

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("books.title")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <HeaderTitle title="Subscription" />
                    <ProgressBar /> */}
                    <h5 className="page-heading">
                        {placeholderText("subscription.title")}
                    </h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Row className="animated fadeIn m-3">
                            <Col xs={6}>
                                <label htmlFor="member">Member</label>
                                <select
                                    className="form-control"
                                    onChange={(e) =>
                                        setSelectMember(
                                            parseInt(e.target.value)
                                        )
                                    }
                                >
                                    <option disabled={true} selected={true}>
                                        Select Member
                                    </option>
                                    {members.map((member, i) => {
                                        return (
                                            <option
                                                key={i}
                                                value={member.id}
                                                defaultValue={members[0].id}
                                            >
                                                {member.first_name +
                                                    " " +
                                                    member.last_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </Col>
                            <Col xs={6}>
                                <label htmlFor="memberShipPlan">
                                    MemberShip Plan
                                </label>
                                <select
                                    className="form-control"
                                    onChange={(e) =>
                                        setSelectPlan((prev) => {
                                            prev = membershipPlans.filter(
                                                (plan) =>
                                                    plan.id ===
                                                    parseInt(e.target.value)
                                            );
                                            return prev;
                                        })
                                    }
                                >
                                    <option disabled={true} selected={true}>
                                        Select Plan
                                    </option>
                                    {membershipPlans &&
                                        membershipPlans.length > 0 &&
                                        membershipPlans.map((plan, i) => {
                                            return (
                                                <option key={i} value={plan.id}>
                                                    {plan.name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </Col>
                        </Row>
                        <OfflinePaymentForm {...prepareFormOption()} />
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { membershipPlans, allSettings, members } = state;
    return {
        membershipPlans: Object.values(membershipPlans),
        currency: allSettings?.currency?.currency_symbol,
        allSettings,
        members,
    };
};

export default connect(mapStateToProps, {
    fetchMembershipPlans,
    fetchAllSettings,
    fetchMembers,
    createOfflinePayment,
})(CreateSubscription);
