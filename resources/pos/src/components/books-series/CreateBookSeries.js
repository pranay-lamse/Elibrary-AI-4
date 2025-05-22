import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import BookSeriesForm from "./BookSeriesForm";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { addBookSeries } from "../../admin/store/actions/bookSeriesAction";
import { useNavigate } from "react-router-dom";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const CreateBookSeries = (props) => {
    const { history, addBookSeries } = props;

    const navigate = useNavigate();

    const onSaveBookSeries = (formValues) => {
        addBookSeries(formValues, navigate);
    };

    const goBack = () => {
        navigate(-1);
    };

    const prepareFormOption = {
        onSaveBookSeries,
        onCancel: goBack,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("books-series.title")} />
            <div className="animated fadeIn">
                <ProgressBar />
                <HeaderTitle title="New Books Series" />
                <Row>
                    <Col
                        sm={12}
                        className="mb-2 d-flex justify-content-between"
                    >
                        <h5 className="pull-left text-dark">
                            {" "}
                            {getFormattedMessage(
                                "books-series.input.new-btn.label"
                            )}
                        </h5>
                    </Col>
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card>
                                <CardBody>
                                    <BookSeriesForm {...prepareFormOption} />
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </MasterLayout>
    );
};

CreateBookSeries.propTypes = {
    history: PropTypes.object,
    books: PropTypes.array,
    addBookSeries: PropTypes.func,
    fetchBooks: PropTypes.func,
};

export default connect(null, { addBookSeries })(CreateBookSeries);
