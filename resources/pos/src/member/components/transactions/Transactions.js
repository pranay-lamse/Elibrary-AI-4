import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {
    dateFormatter,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { icon } from "../../../constants";
import { fetchTransactions } from "../../store/actions/transactionsAction";
import { fetchAllSettings } from "../../store/actions/allSettingsAction";

const Transactions = (props) => {
    const {
        transactions,
        totalRecordMember,
        isLoading,
        fetchTransactions,
        fetchAllSettings,
        allSettings,
    } = props;

    const [isSpinner, setIsSpinner] = useState(true);

    const onChange = (filter) => {
        fetchTransactions(filter, true);
    };

    useEffect(() => {
        fetchAllSettings();
    }, []);

    useEffect(() => {
        setTimeout(() => setIsSpinner(false), 1500);
    }, []);

    const getCurrency = () => {
        const cure = allSettings?.currency?.currency_symbol;
        return cure;
    };

    // Example function for navigation, you should replace it with your actual function
    const goToDetailScreen = (id) => {
        window.open(`#/receipt/${id}`, '_blank');
    };

    const itemsValue =
        transactions.length >= 0 &&
        transactions.map((trans) => ({
            plan_name: trans.subscription_plan.name,
            amount: trans.amount,
            date: dateFormatter(trans.created_at),
            id: trans.id,
            currency: getCurrency(),
        }));

    const columns = [
        {
            name: getFormattedMessage(
                "transaction.table.plan-name.column.title"
            ),
            selector: (row) => row.plan_name,
            width: "600px",
            sortable: true,
            cell: (row) => row.plan_name,
        },
        {
            name: getFormattedMessage("transaction.table.amount.column.title"),
            selector: (row) => row.amount,
            width: "400px",
            sortable: true,
            cell: (row) => <span>{row.currency + " " + row.amount}</span>,
        },
        {
            name: getFormattedMessage(
                "transaction.table.transcation_id.column.title"
            ),
            selector: (row) => row.id,
            width: "400px",
            sortable: true,
            cell: (row) => <span>{row.id}</span>,
        },
        {
            name: getFormattedMessage("transaction.table.date.column.title"),
            selector: (row) => row.created_at,
            width: "400px",
            sortable: true,
            cell: (row) => row.date,
        },
        {
            name: getFormattedMessage("transaction.table.date.column.receipt"),
            selector: (row) => row.id,
            width: "400px",
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
        <section className="member_books_transactions">
            <div className="container">
                <div className="animated fadeIn">
                    <div className="section-title-center text-center">
                        <h2 className="display-6">
                            {getFormattedMessage("transaction.title")}
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>

                    <div className="common-container">
                        <ReactDataTable
                            items={itemsValue}
                            columns={columns}
                            loading={isLoading}
                            totalRows={totalRecordMember}
                            emptyStateMessageId="transaction.empty-state.title"
                            emptyNotFoundStateMessageId="transaction.not-found.empty-state.title"
                            onChange={onChange}
                            icon={icon.BOOK}
                            pagination={itemsValue?.length >= 10 ? true : false}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

Transactions.propTypes = {
    fetchTransactions: PropTypes.func,
    totalRecordMember: PropTypes.number,
    isLoading: PropTypes.bool,
    transactions: PropTypes.array,
};

const mapStateToProps = (state) => {
    const { transactions, isLoading, totalRecordMember, allSettings } = state;
    return { transactions, isLoading, totalRecordMember, allSettings };
};

export default connect(mapStateToProps, {
    fetchTransactions,
    fetchAllSettings,
})(Transactions);
