import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Member from "./MemberTable";
import "./Members.scss";
import { FilterOption, Routes } from "../../constants";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { toggleModal } from "../../store/action/modalAction";
import {
    activeInactiveMember,
    activeInactiveMemberLibraryStatus,
    activeInactiveMemberEbookStatus,
    activeInactiveMemberBookStatus,
    fetchMembers,
    exportMembers,
    exportUserCard,
} from "../../admin/store/actions/memberAction";
import { fetchMembershipPlans } from "../../admin/store/actions/membershipPlanAction";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ImportMemberByFile } from "../../admin/store/actions/fileAction";
import ImportMemberModal from "./ImportMemberModal";
import UserIdModal from "./UserIdModal";
import { setLoading } from "../../store/action/loadingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import DeleteMember from "./DeleteMember";
import { placeholderText } from "../../shared/sharedMethod";
import AttendanceTable from "./AttendanceTable";

const Attendance = (props) => {
    const dispatch = useDispatch();
    const [isUserIdModal, setUserIsIdModal] = useState(false);
    const navigate = useNavigate();
    const {
        members,
        fetchMembers,
        toggleModal,
        isLoading,
        totalRecord,
        membershipPlans,
        activeInactiveMember,
        activeInactiveMemberBookStatus,
        activeInactiveMemberLibraryStatus,
        activeInactiveMemberEbookStatus,
        fetchMembershipPlans,
        exportMembers,
        ImportMemberByFile,
        exportUserCard,
    } = props;

    const [member, setMember] = useState(null);
    const [isModalShow, setIsShow] = useState(false);
    const intl = useIntl();

    const toggleModalX = () => setIsShow((prev) => !prev);
    const toggle = () => setUserIsIdModal((prev) => !prev);

    const onSaveImportData = async (data) => {
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("file", data);
        ImportMemberByFile(formData, (res) => {
            if (res.status) {
                fetchMembers();
            }
        });
        toggleModalX();
        dispatch(setLoading(false)); // Fix duplicate setLoading call
    };

    useEffect(() => {
        fetchMembershipPlans();
    }, [fetchMembershipPlans]); // Add dependencies to avoid unnecessary rerenders

    const onChangeData = (filter) => {
        fetchMembers(filter, true);
    };

    const setActiveInactive = (id, isActive) => {
        if (id) activeInactiveMember(id, isActive);
    };
    const setActiveInactiveBookStatus = (id, isActive) => {
        if (id) activeInactiveMemberBookStatus(id, isActive);
    };
    const setActiveInactiveLibraryStatus = (id, isActive) => {
        if (id) activeInactiveMemberLibraryStatus(id, isActive);
    };
    const setActiveInactiveEbookStatus = (id, isActive) => {
        if (id) activeInactiveMemberEbookStatus(id, isActive);
    };

    const onClickModal = (isEdit, member = null, isDelete = false) => {
        if (isDelete) {
            setMember(member);
            toggleModal();
        } else {
            navigate(`/admin${Routes.MEMBERS}${member.id}/edit`);
        }
    };

    const onClickExport = () => {
        exportMembers((res) => {
            if (res.url) {
                window.open(res.url, "_self");
            }
        });
    };

    const cardBodyProps = {
        members,
        setActiveInactive,
        setActiveInactiveBookStatus,
        setActiveInactiveLibraryStatus,
        setActiveInactiveEbookStatus,
        onClickModal,
        isLoading,
        totalRecord,
        onChangeData,
        membershipPlans: [
            {
                id: 0,
                name: intl.formatMessage({ id: FilterOption.ALL }),
                defaultValue: "",
            },
            ...membershipPlans,
        ],
    };

    const importMemberModalProps = {
        onSaveImportData,
        toggleModalX,
        isModalShow,
    };

    const userIdModalOptions = {
        isUserIdModal,
        toggle,
        members,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("Attendance")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    <h5 className="page-heading">
                        {getFormattedMessage("Attendance")}
                    </h5>

                    <div className="d-flex justify-content-end">
                        <div className="d-flex gap-2">
                            <Button
                                type="button"
                                className="btn-primary text-white"
                                onClick={() =>
                                    navigate(`/admin/pos/attendance/new`)
                                }
                            >
                                {placeholderText("Add")}
                            </Button>
                            {/* <Button
                                type="button"
                                className="btn-light-primary"
                                onClick={onClickExport}
                            >
                                {getFormattedMessage(
                                    "books-circulation.export-excel.label"
                                )}
                            </Button> */}
                        </div>

                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <AttendanceTable {...cardBodyProps} />
                                {/* <DeleteMember member={member} toggleModal={toggleModal} /> */}
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
            <ImportMemberModal {...importMemberModalProps} />
            <UserIdModal {...userIdModalOptions} />
        </MasterLayout>
    );
};

Attendance.propTypes = {
    history: PropTypes.object,
    members: PropTypes.array,
    membershipPlans: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchMembers: PropTypes.func,
    activeInactiveMember: PropTypes.func,
    activeInactiveMemberLibraryStatus: PropTypes.func,
    activeInactiveMemberEbookStatus: PropTypes.func,
    activeInactiveMemberBookStatus: PropTypes.func,
    fetchMembershipPlans: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { members, isLoading, totalRecord, membershipPlans } = state;
    return {
        members,
        isLoading,
        totalRecord,
        membershipPlans: [],
    };
};

export default connect(mapStateToProps, {
    fetchMembers,
    activeInactiveMember,
    activeInactiveMemberLibraryStatus,
    activeInactiveMemberEbookStatus,
    activeInactiveMemberBookStatus,
    fetchMembershipPlans,
    toggleModal,
    exportMembers,
    ImportMemberByFile,
    exportUserCard,
})(Attendance);
