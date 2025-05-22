import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Card, CardBody, Col, Container, Form, Row } from "reactstrap";
import loginFormValidate from "./loginFormValidate";
import { Routes } from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import CustomInputGroup from "../../../shared/components/CustomInputGroup";
import {
    getCurrentMember,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { resetPassword } from "../../store/actions/authAction";
import Header from "../../../components/newMemberApp/Header";
import Footer from "../../../components/newMemberApp/Footer";

const MemberResetPassword = (props) => {
    const { handleSubmit, invalid, history, resetPassword } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const onSubmit = (formValues) => {
        delete formValues.confirm_password;
        formValues.token = params.get("token");
        resetPassword(formValues, navigate);
    };

    return (
        <>
            <Header />
            <div className="c-app flex-row align-items-center login-form">
                <HeaderTitle title="Reset Password" />
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" xs="12">
                            <Card className="p-3">
                                <CardBody>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <h2>
                                            {getFormattedMessage(
                                                "reset-password.title"
                                            )}
                                        </h2>
                                        <p className="text-muted">
                                            {getFormattedMessage(
                                                "reset-password.note"
                                            )}
                                        </p>
                                        <Field
                                            name="password"
                                            type="password"
                                            placeholder="profile.input.password.label"
                                            groupText="icon-lock"
                                            component={CustomInputGroup}
                                        />
                                        <Field
                                            name="confirm_password"
                                            type="password"
                                            placeholder="profile.input.confirm-password.label"
                                            groupText="icon-lock"
                                            component={CustomInputGroup}
                                        />
                                        <Row>
                                            <Col className="mt-2 d-flex justify-content-center">
                                                <Button
                                                    color="primary"
                                                    disabled={invalid}
                                                    className="px-4"
                                                >
                                                    {getFormattedMessage(
                                                        "global.input.reset-btn.label"
                                                    )}
                                                </Button>
                                                <Link
                                                    to={"#/lms/login"}
                                                    className="btn btn-secondary ml-2"
                                                >
                                                    {getFormattedMessage(
                                                        "global.input.back-btn.label"
                                                    )}
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
};

MemberResetPassword.propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    invalid: PropTypes.bool,
    resetPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const form = reduxForm({
    form: "resetPasswordForm",
    validate: loginFormValidate,
})(MemberResetPassword);

export default connect(null, { resetPassword })(form);
