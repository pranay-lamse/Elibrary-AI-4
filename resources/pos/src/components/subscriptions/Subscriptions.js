import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import { openModal } from "../../shared/custom-hooks";
import { toggleModal } from "../../store/action/modalAction";
import { setActiveInactiveSubs } from "../../admin/store/actions/subscriptionsAction";
import SubscriptionsTable from "./SubscriptionsTable";
import { fetchSubscriptions } from "../../admin/store/actions/subscriptionsAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import SubscriptionModal from "./SubscriptionsModal";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";
import OfflinePaymentModal from "../../member/components/memberplan/OfflinePaymentModal";
import { fetchMembershipPlans } from "../../member/store/actions/membershipPlanAction";
import { useNavigate } from "react-router";

const Subscriptions = (props) => {
    const navigate = useNavigate();
    const {
        subscriptions,
        toggleModal,
        history,
        isLoading,
        totalRecord,
        setActiveInactiveSubs,
        fetchSubscriptions,
    } = props;
    const [isCreate, isEdit, isDelete, subscription, onOpenModal] = openModal();

    const cardModalProps = {
        subscription,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
    };

    const onChangeData = (filter) => {
        fetchSubscriptions(filter, true);
    };

    const onClickModal = (isEdit, subscription = null, isDelete = false) => {
        onOpenModal(isEdit, subscription, isDelete);
        toggleModal();
    };

    const setActiveInactive = (id, status, isActive, subscription) => {
        if (id) setActiveInactiveSubs(id, status, isActive, subscription);
    };

    const cardBodyProps = {
        subscriptions,
        setActiveInactive,
        onClickModal,
        history,
        isLoading,
        totalRecord,
        onChangeData,
    };

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
                    <div className="float-right">
                        <Button
                            onClick={() =>
                                navigate("/admin/pos/create-subscription")
                            }
                            size="md"
                            color="primary text-white"
                        >
                            Create Subscription
                        </Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <SubscriptionsTable {...cardBodyProps} />
                                <SubscriptionModal {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

Subscriptions.propTypes = {
    history: PropTypes.object,
    subscriptions: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchSubscriptions: PropTypes.func,
    activeInactiveUser: PropTypes.func,
    fetchRoles: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { subscriptions, isLoading, totalRecord, membershipPlans } = state;
    return { subscriptions, isLoading, totalRecord, membershipPlans };
};

export default connect(mapStateToProps, {
    toggleModal,
    fetchSubscriptions,
    setActiveInactiveSubs,
})(Subscriptions);
