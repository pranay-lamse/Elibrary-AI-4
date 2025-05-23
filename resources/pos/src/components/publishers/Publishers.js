import React from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PublisherModal from "./PublisherModal";
// import ProgressBar from "../../shared/progress-bar/ProgressBar";
// import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../shared/table/ReactDataTable";
import ModalAction from "../../shared/action-buttons/ModalAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { openModal } from "../../shared/custom-hooks";
import { fetchPublishers } from "../../admin/store/actions/publisherAction";
import { toggleModal } from "../../store/action/modalAction";
import { icon } from "../../constants";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const Publishers = (props) => {
    const { publishers, fetchPublishers, toggleModal, totalRecord, isLoading } =
        props;
    const [isCreate, isEdit, isDelete, publisher, onOpenModal] = openModal();
    const cardModalProps = {
        publisher,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
    };

    const onChange = (filter) => {
        fetchPublishers(filter, true);
    };

    const onClickModal = (isEdit, publisher = null, isDelete = false) => {
        onOpenModal(isEdit, publisher, isDelete);
        toggleModal();
    };

    const itemsValue =
        publishers.length > 0
            ? publishers.map((publisher) => ({
                  name: publisher.name,
                  id: publisher.id,
              }))
            : [];

    const columns = [
        {
            name: placeholderText("react-data-table.name.column.label"),
            selector: (row) => row.name,
            sortField: "name",
            sortable: true,
            minWidth: "400px",
        },
        {
            name: placeholderText("react-data-table.action.column"),
            selector: (row) => row.id,
            right: true,
            cell: (row) => (
                <ModalAction onOpenModal={onClickModal} item={row} />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={"Publishers"} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <HeaderTitle title="Publishers" /> */}
                    {/* <ProgressBar /> */}
                    <h5 className="page-heading">
                        {placeholderText("publishers.title")}
                    </h5>
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => onClickModal(false)}
                            size="md"
                            color="primary ml-2 text-white"
                        >
                            {placeholderText("publishers.input.new-btn.label")}
                        </Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <ReactDataTable
                                    items={publishers}
                                    columns={columns}
                                    emptyStateMessageId="publishers.empty-state.title"
                                    emptyNotFoundStateMessageId="publishers.not-found.empty-state.title"
                                    loading={isLoading}
                                    icon={icon.PUBLISHER}
                                    totalRows={totalRecord}
                                    onOpenModal={onOpenModal}
                                    onChange={onChange}
                                />
                                <PublisherModal {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

Publishers.propTypes = {
    publishers: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchPublishers: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { publishers, isLoading, totalRecord } = state;
    return { publishers, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchPublishers, toggleModal })(
    Publishers
);
