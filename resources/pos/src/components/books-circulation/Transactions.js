import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, dateFormatter } from "../../shared/sharedMethod";
import { fetchTransactions } from "../../admin/store/actions/transactionAction";
import { toggleModal } from "../../store/action/modalAction";
import { icon } from "../../constants";
/* import { fetchAllSettings } from "../../../src/member/store/actions/allSettingsAction"; */

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const Transactions = (props) => {
    const {
        transactions,
        fetchTransactions,
        toggleModal,
        isLoading,
        totalRecord,
        currency,
        /* fetchAllSettings, */
        allSettings
    } = props;



    const onChange = (filter) => {
        fetchTransactions(filter, true);
    };
    const goToDetailScreen = (id) => {
        window.open(`#/receipt/${id}`, '_blank');
    };

    /* const getCurrency = () => {
        const cure = allSettings?.currency?.currency_symbol;
        return cure;
    }; */
    console.log('transactions', transactions)
    const itemsValue =
        transactions.length >= 0 &&
        transactions.map((trans) => ({
            name: trans.member?.full_name,
            plan_name: trans.subscription_plan?.name,
            amount: trans?.amount,
            date: dateFormatter(trans?.created_at),
            id: trans?.id,
            currency: '₹',
            payment_response: trans?.payment_response,
            pay_mode: trans?.payment_mode == 1 ? 'Online' : 'Offline',
        }));

    const columns = [
        {
            name: getFormattedMessage(
                "Name"
            ),
            selector: (row) => row.name,

            sortable: true,
            cell: (row) => row.name,
        },
        {
            name: getFormattedMessage(
                "Plan Name"
            ),
            selector: (row) => row.plan_name,

            sortable: true,
            cell: (row) => row.plan_name,
        },
        {
            name: getFormattedMessage("Amount"),
            selector: (row) => row.amount,

            sortable: true,
            cell: (row) => <span>{'₹' + " " + row.amount}</span>,
        },
        {
            name: getFormattedMessage(
                "Transaction Id "
            ),
            selector: (row) => row.payment_response,

            sortable: true,
            cell: (row) => <span>{row.payment_response}</span>,
        },
        {
            name: getFormattedMessage(
                "Pay Mode"
            ),
            selector: (row) => row.pay_mode,

            sortable: true,
            cell: (row) => <span>{row.pay_mode}</span>,
        },
        {
            name: getFormattedMessage("Created at"),
            selector: (row) => row.created_at,

            sortable: true,
            cell: (row) => row.date,
        },
        {
            name: getFormattedMessage("Receipt"),
            selector: (row) => row.id,

            sortable: true,
            cell: (row) => (
                <div>

                    <Button
                        className="ml-2"
                        color="primary"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            goToDetailScreen(row.id); // Assuming `row.id` is the identifier you need
                        }}
                    >
                        <i className="fa fa-eye fa-sm text-white" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("Subscription Transactions")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <ProgressBar />
                    <HeaderTitle title="Penalties" /> */}
                    <h5 className="page-heading">
                        {getFormattedMessage("Subscription Transactions")}
                    </h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <ReactDataTable
                                    items={itemsValue}
                                    columns={columns}
                                    loading={isLoading}
                                    emptyStateMessageId="transaction.empty-state.title"
                                    emptyNotFoundStateMessageId="transaction.not-found.empty-state.title"
                                    totalRows={totalRecord}
                                    onChange={onChange}
                                    icon={icon.RUPEE}
                                    pagination={itemsValue?.length >= 10 ? true : false}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

Transactions.propTypes = {
    transactions: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchTransactions: PropTypes.func,
    toggleModal: PropTypes.func,


};

const mapStateToProps = (state) => {

    const { transactions, isLoading, totalRecord, currency } = state;
    return { transactions, isLoading, totalRecord, currency };
};

export default connect(mapStateToProps, { fetchTransactions, toggleModal })(
    Transactions
);
