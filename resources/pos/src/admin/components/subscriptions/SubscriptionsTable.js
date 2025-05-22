import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ModalAction from "../../../shared/action-buttons/ModalAction";
import ToggleSwitch from "../../../shared/components/ToggleSwitch";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import {
    dateFormatter,
    getFormattedMessage,
    getFormattedOptions,
} from "../../../shared/sharedMethod";
import { addToast } from "../../../store/action/toastAction";
import { icon } from "../../../constants";
import "../members/Members.scss";
import { storageKey, typeFilterOptions } from "../../constants";

const SubscriptionsTable = (props) => {
    const {
        subscriptions,
        onClickModal,
        setActiveInactive,
        history,
        isLoading,
        totalRecord,
        onChangeData,
    } = props;
    const typeFilter = getFormattedOptions(typeFilterOptions);

    const onChecked = (row) => {
        setActiveInactive(row.id, { status: !row.status }, !row.status, row);
    };

    const columns = [
        {
            name: getFormattedMessage("react-data-table.name.column"),
            selector: "member_name",
            sortable: true,
            cell: (row) => {
                row.member_name =
                    row.member.first_name + " " + row.member.last_name;
                return <span>{row.member_name}</span>;
            },
        },
        {
            name: getFormattedMessage(
                "subscription-table.column.subscription-plan.label"
            ),
            selector: "plan_name",
            sortable: true,
            cell: (row) => {
                row.plan_name = row.subscription_plan.name;
                return <span>{row.plan_name}</span>;
            },
        },
        {
            name: getFormattedMessage(
                "subscription-table.column.start-date.label"
            ),
            selector: "start_date",
            sortable: true,
            cell: (row) => <span>{dateFormatter(row.start_date)}</span>,
        },
        {
            name: getFormattedMessage(
                "subscription-table.column.end-date.label"
            ),
            selector: "end_date",
            sortable: true,
            cell: (row) => <span>{dateFormatter(row.end_date)}</span>,
        },
        {
            name: getFormattedMessage("type.label"),
            selector: "type",
            sortable: true,
            cell: (row) => (
                <span>
                    {row.type === 1
                        ? "RazorPay"
                        : getFormattedMessage("Offline_label")}
                </span>
            ),
        },
        {
            name: getFormattedMessage("react-data-table.status.column"),
            selector: "status",
            width: "90px",
            center: true,
            cell: (row) => (
                <div className="member-form__switch">
                    <Field
                        name="is_active"
                        checked={row.status}
                        component={ToggleSwitch}
                        onChange={() => onChecked(row)}
                    />
                </div>
            ),
        },
        {
            name: getFormattedMessage("react-data-table.action.column"),
            selector: "id",
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "120px",
            cell: (row) => (
                <ModalAction
                    onOpenModal={onClickModal}
                    item={row}
                    isHideDeleteIcon={true}
                />
            ),
        },
    ];

    return (
        <ReactDataTable
            items={subscriptions}
            columns={columns}
            emptyStateMessageId="users.empty-state.title"
            emptyNotFoundStateMessageId="users.not-found.empty-state.title"
            isShowFilterField
            isTypeFilter={true}
            filterOptions={typeFilter}
            loading={isLoading}
            totalRows={totalRecord}
            onChange={onChangeData}
            icon={icon.USERS}
        />
    );
};

SubscriptionsTable.propTypes = {
    history: PropTypes.object,
    subscriptions: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    onChangeData: PropTypes.func,
    onClickModal: PropTypes.func,
    setActiveInactive: PropTypes.func,
};

const subscriptionForm = reduxForm({ form: "subscriptionForm" })(
    SubscriptionsTable
);
export default connect(null, { addToast })(subscriptionForm);
