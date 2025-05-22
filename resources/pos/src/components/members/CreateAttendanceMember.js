import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MemberForm from "./MemberForm";
import prepareFormData from "../../shared/prepareUserFormData";
import { addMember } from "../../admin/store/actions/memberAction";
import { Card, CardBody, Col, Row } from "reactstrap";
// import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import { getFormattedMessage } from "../../shared/sharedMethod";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";
import { useNavigate } from "react-router-dom";

const CreateAttendanceMember = (props) => {
    const navigate = useNavigate();
    const { addMember, history } = props;

    const onSaveMember = (formValues) => {
        addMember(prepareFormData(formValues), navigate);
    };

    const goBack = () => {
        navigate(-1);
    };

    const prepareFormOption = {
        initialValues: { is_active: true, isCreate: true },
        onSaveMember,
        onCancel: goBack,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("Add Attendance")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <ProgressBar /> */}
                    <HeaderTitle title="Add Attendance" />
                    <h5 className="page-heading">
                        {getFormattedMessage("Add Attendance")}
                    </h5>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <MemberForm {...prepareFormOption} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

CreateAttendanceMember.propTypes = {
    history: PropTypes.object,
    addMember: PropTypes.func,
};

export default connect(null, { addMember })(CreateAttendanceMember);
