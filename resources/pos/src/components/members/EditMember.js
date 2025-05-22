import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MemberForm from "./MemberForm";
import prepareFormData from "../../shared/prepareUserFormData";
import {
    editMember,
    fetchMember,
} from "../../admin/store/actions/memberAction";
import {
    getFormattedMessage,
    prepareProfileData,
} from "../../shared/sharedMethod";
import { Card, CardBody, Col, Row } from "reactstrap";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import { useParams, useNavigate } from "react-router";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";
import MemberFormEdit from "./MemberFormEdit";

const EditMember = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const { member, match, editMember, history, fetchMember, isLoading } =
        props;

    console.log('membertest', member?.subscription)

    useEffect(() => {
        fetchMember(params.id, true);
    }, []);

    if (!member) {
        return <ProgressBar />;
    }

    const onSaveMember = (formValues) => {
        formValues.roles = [];
        editMember(member.id, prepareFormData(formValues), navigate);
    };

    const goBack = () => {
        navigate(-1);
    };

    const prepareFormOption = {
        memberSubscription: member?.subscription,

        onSaveMember,
        onCancel: goBack,
        initialValues: prepareProfileData(member),
    };

    if (isLoading) {
        return <TopProgressBar />;
    }
    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("members.modal.edit.title")} />
            <Row className="animated fadeIn">
                {/* <Col sm={12} className="mb-2">
                    <ProgressBar />
                    <HeaderTitle title="Members" />
                    <h5 className="page-heading">
                        {getFormattedMessage("members.modal.edit.title")}
                    </h5>
                </Col> */}
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <MemberFormEdit {...prepareFormOption} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

EditMember.propTypes = {
    member: PropTypes.object,
    editMember: PropTypes.func,
    fetchMember: PropTypes.func,
    history: PropTypes.object,
};

const mapStateToProps = (state, ownProp) => {
    const { members, isLoading } = state;
    return {
        member: members.find((member) => member),
        isLoading,
    };
};
export default connect(mapStateToProps, { editMember, fetchMember })(
    EditMember
);
