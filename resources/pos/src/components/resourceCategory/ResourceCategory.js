import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import ResourceCategoryModal from "./ResourceCategoryModal";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ModalAction from "../../shared/action-buttons/ModalAction";
// import ProgressBar from "../../shared/progress-bar/ProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { openModal } from "../../shared/custom-hooks";
import { fetchGenres } from "../../admin/store/actions/genreAction";
import { toggleModal } from "../../store/action/modalAction";
import { Filters, icon } from "../../constants";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";
import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
const ResourceCategory = (props) => {
    const {
        resourceCategory,
        fetchResourceCategory,
        toggleModal,
        isLoading,
        totalRecord,
    } = props;
    const [isCreate, isEdit, isDelete, category, onOpenModal] = openModal();
    const cardModalProps = {
        category,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
        totalRecord,
    };

    const onChange = (filter) => {
        fetchResourceCategory(filter, Filters.OBJ, true);
    };

    const onClickModal = (isEdit, genre = null, isDelete = false) => {
        toggleModal();
        onOpenModal(isEdit, genre, isDelete);
    };

    const itemsValue =
        resourceCategory.length > 0
            ? resourceCategory.map((genre) => ({
                  name: genre.name,
                  id: genre.id,
              }))
            : [];

    const columns = [
        {
            name: placeholderText("react-data-table.name.column.label"),
            selector: (row) => row.name,
            sortField: "name",
            sortable: true,
            width: "full",
        },
        {
            name: placeholderText("react-data-table.action.column"),
            selector: (row) => row.id,
            right: true,
            width: "full",
            // minWidth: "auto",
            cell: (row) => (
                <ModalAction onOpenModal={onClickModal} item={row} />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <MasterLayout>
            <TopProgressBar />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <ProgressBar /> */}
                    <HeaderTitle title="Resource Category" />
                    <h5 className="page-heading">Resource Category</h5>
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => onClickModal(false)}
                            size="md"
                            color="primary ml-2 text-white"
                        >
                            {placeholderText(
                                "resource.category.input.new-btn.label"
                            )}
                        </Button>
                    </div>
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <ReactDataTable
                                    items={itemsValue}
                                    columns={columns}
                                    loading={isLoading}
                                    emptyStateMessageId="genres.empty-state.title"
                                    emptyNotFoundStateMessageId="genres.not-found.empty-state.title"
                                    totalRows={totalRecord}
                                    onOpenModal={onOpenModal}
                                    onChange={onChange}
                                    icon={icon.GENRES}
                                />
                                <ResourceCategoryModal {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { resourceCategory, isLoading } = state;
    return { resourceCategory, isLoading };
};

export default connect(mapStateToProps, { fetchResourceCategory, toggleModal })(
    ResourceCategory
);
