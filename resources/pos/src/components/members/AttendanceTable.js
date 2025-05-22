import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Spinner } from "reactstrap";
import "./Members.scss";
import { publicImagePathURL } from "../../appConstant";
import { Routes, icon } from "../../constants";
import { storageKey } from "../../constants";
import ModalAction from "../../shared/action-buttons/ModalAction";
import ToggleSwitch from "../../shared/components/ToggleSwitch";
import ReactDataTable from "../../shared/table/ReactDataTable";
import {
    getFormattedMessage,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import { getAvatarName } from "../../shared/sharedMethod";
import { meberSendMail } from "../../admin/store/actions/memberAction";
import { useNavigate } from "react-router-dom";
import Viewer from "react-viewer";

const AttendanceTable = (props) => {
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = useState("");
    const [visible, setVisible] = useState(false);

    const {
        members,
        membershipPlans,
        onClickModal,
        setActiveInactive,
        setActiveInactiveBookStatus,
        setActiveInactiveLibraryStatus,
        setActiveInactiveEbookStatus,
        isLoading,
        totalRecord,
        onChangeData,
        meberSendMail,
    } = props;

    const membershipPlansOptions = getFormattedOptions(membershipPlans);

    const onClickSendMail = (id) => {
        meberSendMail(id);
    };

    const openImage = (imageUrl) => {
        if (imageUrl) {
            setImageUrl(imageUrl);
            setVisible(true);
        }
    };

    const itemsValue = members.length
        ? members.map((member) => ({
            id: member.id,
            image_path: member.image_path,
            first_name: member.first_name,
            last_name: member.last_name,
            email: member.email,
            phone: member.phone,
            email_verified_at: member?.email_verified_at,
            membership_plan_name: member.membership_plan_name,
            status: member.status,
            is_active: member.is_active,
            aadhaar: member.aadhaar ? member.aadhaar : "N/A",
            subscriptions: member.subscriptions || "",
        }))
        : [];

    const columns = [
        {
            name: getFormattedMessage("profile.title"),
            selector: (row) => row.image_path,
            width: "95px",
            cell: (row) => {
                const imageUrl = row.image_path || null;
                return imageUrl ? (
                    <img
                        src={imageUrl}
                        className="member-table-row__profile-img"
                        alt={imageUrl}
                    />
                ) : (
                    <div className="user__avatar">
                        <span>{getAvatarName(`${row.first_name} ${row.last_name}`)}</span>
                    </div>
                );
            },
        },
        {
            name: getFormattedMessage("react-data-table.name.column.label"),
            selector: (row) => row.first_name,
            sortField: "first_name",
            sortable: true,
            cell: (row) => <span>{`${row.first_name} ${row.last_name}`}</span>,
        },
        {
            name: getFormattedMessage("profile.input.email.label"),
            selector: (row) => row.email,
            sortField: "email",
            sortable: true,
        },
        {
            name: getFormattedMessage("profile.input.phone.label"),
            selector: (row) => row.phone,
            sortField: "phone",
            sortable: true,
            cell: (row) => <span>{row.phone || "N/A"}</span>,
        },
        {
            name: getFormattedMessage("members.select.plan.label"),
            selector: (row) => row.membership_plan_name,
            sortField: "membership_plan_name",
            sortable: true,
            cell: (row) => {
                const membershipPlanName = row.membership_plan_name || "N/A";
                const imageUrl = row.subscriptions[0]?.pdf_preview_file
                    ? `/public/uploads/${row.subscriptions[0].pdf_preview_file}`
                    : null;

                return (
                    <>
                        <span style={{ marginRight: "10px" }}>{membershipPlanName}</span>
                        {imageUrl && (
                            <span style={{ marginRight: "10px" }}>
                                <img
                                    className="book_cover_img"
                                    onClick={() => openImage(imageUrl)}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = imageUrl;
                                    }}
                                    src={imageUrl}
                                    height="50"
                                    alt={imageUrl}
                                />
                            </span>
                        )}
                    </>
                );
            },
        }/* ,
        {
            name: getFormattedMessage("react-data-table.action.column"),
            selector: (row) => row.id,
            center: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "120px",
            cell: (row) => (
                <button
                    type="button"
                    className="ml-2 btn btn-primary btn-sm"
                    onClick={() => goToMemberDetailPage(row.id)} // Assuming you have a function to handle the button click
                >
                    <i className="fa fa-eye fa-sm text-white"></i>
                </button>
            ),
        } */

    ];



    const goToMemberDetailPage = (memberId) => {
        navigate(`/admin/attendance${Routes.MEMBERS + memberId}/details`);
    };

    const getStoredFilterKey = () => {
        const item = JSON.parse(localStorage.getItem(storageKey.MEMBERS));
        if (item) {
            const membershipPlan = membershipPlansOptions.find(
                (membershipPlan) => membershipPlan.id === item.id
            );
            if (membershipPlan) {
                return membershipPlan;
            }
        }
        return membershipPlansOptions[0];
    };

    return (
        <>
            <Viewer
                drag={false}
                changeable={false}
                loop={false}
                zIndex={1100}
                scalable={false}
                noNavbar={true}
                visible={visible}
                disableMouseZoom={true}
                onClose={() => setVisible(false)}
                images={[{ src: imageUrl, alt: "" }]}
            />

            <ReactDataTable
                items={itemsValue}
                columns={columns}
                emptyStateMessageId="members.empty-state.title"
                emptyNotFoundStateMessageId="member.not-found.empty-state.title"
                isShowFilterField={false}
                filterOptions={membershipPlansOptions}
                filterKey={getStoredFilterKey()}
                loading={isLoading}
                totalRows={totalRecord}
                onChange={onChangeData}
                filterKeyName={storageKey.MEMBERS}
                icon={icon.MEMBER}
                selectableRows={false}
                handleSelectedRows={(row) => console.log(row)}
            />
        </>
    );
};

AttendanceTable.propTypes = {
    history: PropTypes.object,
    members: PropTypes.array,
    membershipPlans: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    onChangeData: PropTypes.func,
    onClickModal: PropTypes.func,
    setActiveInactive: PropTypes.func,
};

export default connect(null, { meberSendMail })(reduxForm({ form: "memberForm" })(AttendanceTable));
