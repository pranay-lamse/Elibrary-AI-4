import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage, dateFormatter } from "../../shared/sharedMethod";
import { fetchPenalties } from "../../admin/store/actions/penaltyAction";
import { toggleModal } from "../../store/action/modalAction";
import { icon } from "../../constants";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const Penalties = (props) => {
    const {
        penalties,
        fetchPenalties,
        toggleModal,
        isLoading,
        totalRecord,
        currency,
    } = props;

    const onChange = (filter) => {
        fetchPenalties(filter, true);
    };

    const itemsValue =
        penalties.length > 0
            ? penalties.map((penalty) => ({
                  member_name: penalty.member_name,
                  book_item_name: penalty.book_item_name,
                  collected_by_name: penalty.collected_by_name,
                  collected_at: penalty.collected_at,
                  actual_penalty: penalty.actual_penalty,
                  collected_penalty: penalty.collected_penalty,
              }))
            : [];

    const columns = [
        {
            name: placeholderText("react-data-table.member.column"),
            selector: (row) => row.member_name,
            sortField: "member_name",
            sortable: true,
            cell: (row) => <span>{row.member_name}</span>,
        },
        {
            name: placeholderText("react-data-table.book-name.column"),
            selector: (row) => row.book_item_name,
            sortField: "book_item_name",
            // width: "330px",
            sortable: true,
            cell: (row) => <span>{row.book_item_name}</span>,
        },
        {
            name: placeholderText("react-data-table.collected_by.column"),
            selector: (row) => row.collected_by_name,
            sortField: "collected_by_name",
            // width: "330px",
            sortable: true,
            cell: (row) => <span>{row.collected_by_name}</span>,
        },
        {
            name: placeholderText("react-data-table.date.column"),
            selector: (row) => row.collected_at,
            sortField: "collected_at",
            // width: "250px",
            sortable: true,
            cell: (row) => <span>{dateFormatter(row.collected_at)}</span>,
        },
        {
            name: placeholderText("react-data-table.actual_penalty.column"),
            selector: (row) => row.actual_penalty,
            sortField: "actual_penalty",
            // width: "230px",
            sortable: true,
            cell: (row) => (
                <span>
                    {currency}
                    {row.actual_penalty}
                </span>
            ),
        },
        {
            name: placeholderText("react-data-table.collected_penalty.column"),
            selector: (row) => row.collected_penalty,
            sortField: "collected_penalty",
            // width: "230px",
            sortable: true,
            cell: (row) => (
                <span>
                    {currency}
                    {row.collected_penalty}
                </span>
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("penalties.title")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <ProgressBar />
                    <HeaderTitle title="Penalties" /> */}
                    <h5 className="page-heading">
                        {getFormattedMessage("penalties.title")}
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
                                    emptyStateMessageId="penalties.empty-state.title"
                                    emptyNotFoundStateMessageId="penalties.not-found.empty-state.title"
                                    totalRows={totalRecord}
                                    onChange={onChange}
                                    icon={icon.RUPEE}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

Penalties.propTypes = {
    penalties: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchPenalties: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { penalties, isLoading, totalRecord, currency } = state;
    return { penalties, isLoading, totalRecord, currency };
};

export default connect(mapStateToProps, { fetchPenalties, toggleModal })(
    Penalties
);
