import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import { openModal } from "../../../shared/custom-hooks";
import { toggleModal } from "../../../store/action/modalAction";
import { setActiveInactiveSubs } from "../../store/actions/subscriptionsAction";
import SubscriptionsTable from "./SubscriptionsTable";
import { fetchSubscriptions } from "../../store/actions/subscriptionsAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import SubscriptionModal from "./SubscriptionsModal";

const Subscriptions = (props) => {
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
        <>
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    <HeaderTitle title="Subscription" />
                    <ProgressBar />
                    <h5 className="page-heading">
                        {getFormattedMessage("subscription.title")}
                    </h5>
                    <div className="float-right">
                        <Button
                            onClick={() => onClickModal(false)}
                            size="md"
                            color="primary text-white"
                        >
                            {placeholderText(
                                "membership-plans.input.new-btn.label"
                            )}
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
            <OfflinePaymentModal {...cardModalProps} />
        </>
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
    const { subscriptions, isLoading, totalRecord } = state;
    return { subscriptions, isLoading, totalRecord };
};

export default connect(mapStateToProps, {
    toggleModal,
    fetchSubscriptions,
    setActiveInactiveSubs,
})(Subscriptions);
