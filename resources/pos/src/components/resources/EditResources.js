import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import ResourcesForm2 from "./ResourcesForm2";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

import { useNavigate, useParams } from "react-router";
import { addResources } from "../../store/action/resourcesAction";
import prepareResourceFormData from "./prepareResourceFormData";
import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
import axios from "axios";
const EditResources = (props) => {
    const { isLoading, addResources, fetchResourceCategory, resourceCategory } =
        props;
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
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
        details,
    };

    useEffect(() => {
        fetchResourceCategory();
    }, []);

    const { id } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`/api/resources/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch resource details");
                }
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error("Error fetching resource details:", error);
            }
        };

        fetchDetails();
    }, [id]);

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={"New EditResources"} />
            <div className="animated fadeIn">
                {isLoading ? <ProgressBar /> : null}
                <HeaderTitle title="New Book" />
                <Row>
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card>
                                <CardBody>
                                    <ResourcesForm2 {...prepareFormOption} />
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
})(EditResources);
