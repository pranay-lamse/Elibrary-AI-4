import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Card, CardBody, Col, Container, Form, Row } from "reactstrap";
import loginFormValidate from "./loginFormValidate";
import { environment } from "../../../environment";
import { Routes } from "../../constants/index";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import CustomInputGroup from "../../../shared/components/CustomInputGroup";
import {
    getCurrentMember,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { forgotPassword } from "../../store/actions/authAction";
import Header from "../../../components/newMemberApp/Header";
import Footer from "../../../components/newMemberApp/Footer";

const MemberForgotPassword = (props) => {
    const { handleSubmit, invalid, isSubmitted, forgotPassword } = props;

    const onSubmit = (formValues) => {
        formValues.url = environment.URL + "/#" + Routes.MEMBER_RESET_PASSWORD;
        forgotPassword(formValues);
    };

    return (
        <>
            <Header />
            <div className="login-form flex-row align-items-center">
                <HeaderTitle title="Forgot Password" />
                <Container>
                    <Row className="justify-content-center">
                        <Col md="6" xs="12">
                            <Card className="p-3">
                                <CardBody>
                                    {!isSubmitted ? (
                                        <Form onSubmit={handleSubmit(onSubmit)}>
                                            <h2>
                                                {getFormattedMessage(
                                                    "forgot-password.title"
                                                )}
                                            </h2>
                                            <p className="text-muted">
                                                {getFormattedMessage(
                                                    "forgot-password.note"
                                                )}
                                            </p>
                                            <Field
                                                name="email"
                                                type="email"
                                                placeholder="profile.input.email.label"
                                                groupText="icon-envelope"
                                                component={CustomInputGroup}
                                            />
                                            <div className="d-flex justify-content-center">
                                                <Row>
                                                    <Col className="mt-2 d-flex justify-content-end">
                                                        <Button
                                                            color=""
                                                            disabled={invalid}
                                                            className="frontend-btn"
                                                        >
                                                            <span>
                                                                {" "}
                                                                {getFormattedMessage(
                                                                    "global.input.submit-btn.label"
                                                                )}
                                                            </span>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="d-flex justify-content-center login_links">
                                                <Link
                                                    to={Routes.MEMBER_LOGIN}
                                                    className="px-0 mt-2 text-right text-decoration-none"
                                                >
                                                    {getFormattedMessage(
                                                        "global.input.cancel-btn.label"
                                                    )}
                                                </Link>
                                            </div>
                                        </Form>
                                    ) : (
                                        <div>
                                            <div className="text-center login_links">
                                                <p>
                                                    {getFormattedMessage(
                                                        "forgot-password.email.note"
                                                    )}
                                                </p>
                                                <Link
                                                    to={Routes.MEMBER_LOGIN}
                                                    color="link"
                                                >
                                                    {getFormattedMessage(
                                                        "forgot-password.link.go-back.title"
                                                    )}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
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

MemberForgotPassword.propTypes = {
    invalid: PropTypes.bool,
    isSubmitted: PropTypes.bool,
    forgotPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
};

const form = reduxForm({
    form: "forgotPasswordForm",
    validate: loginFormValidate,
})(MemberForgotPassword);
const mapStateToProps = (state) => {
    return { isSubmitted: !!state.auth.isSubmitted };
};

export default connect(mapStateToProps, { forgotPassword })(form);
