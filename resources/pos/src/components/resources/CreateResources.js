import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import ResourcesForm from "./ResourcesForm";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

import { useNavigate } from "react-router";
import { addResources } from "../../store/action/resourcesAction";
import prepareResourceFormData from "./prepareResourceFormData";
import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
const Resources = (props) => {
    const { isLoading, addResources, fetchResourceCategory, resourceCategory } =
        props;
    const navigate = useNavigate();

    const onSaveBook = (formValues) => {
        addResources(prepareResourceFormData(formValues), navigate);
    };

    const goBack = () => {
        navigate(-1);
    };

    const prepareFormOption = {
        isLoading,
        onSaveBook,
        resourceCategory,
        onCancel: goBack,
    };

    useEffect(() => {
        fetchResourceCategory();
    }, []);

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={"New Resources"} />
            <div className="animated fadeIn">
                {isLoading ? <ProgressBar /> : null}
                <HeaderTitle title="New Book" />
                <Row>
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card>
                                <CardBody>
                                    <ResourcesForm {...prepareFormOption} />
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { isLoading, resourceCategory } = state;
    return {
        isLoading,
        resourceCategory,
    };
};

export default connect(mapStateToProps, {
    addResources,
    fetchResourceCategory,
})(Resources);
