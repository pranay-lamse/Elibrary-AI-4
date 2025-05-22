import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GenreModal from "./GenerModal";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ModalAction from "../../shared/action-buttons/ModalAction";
// import ProgressBar from "../../shared/progress-bar/ProgressBar";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { openModal } from "../../shared/custom-hooks";
import { fetchGenres } from "../../admin/store/actions/genreAction";
import { toggleModal } from "../../store/action/modalAction";
import { Filters, icon } from "../../constants";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const Genres = (props) => {
    const { genres, fetchGenres, toggleModal, isLoading, totalRecord } = props;
    const [isCreate, isEdit, isDelete, genre, onOpenModal] = openModal();
    const cardModalProps = {
        genre,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
        totalRecord,
    };

    const onChange = (filter) => {
        fetchGenres(filter, Filters.OBJ, true);
    };

    const onClickModal = (isEdit, genre = null, isDelete = false) => {
        toggleModal();
        onOpenModal(isEdit, genre, isDelete);
    };

    const itemsValue =
        genres.length > 0
            ? genres.map((genre) => ({
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
            <TabTitle title={placeholderText("genres.title")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <ProgressBar /> */}
                    <HeaderTitle title="Genres" />
                    <h5 className="page-heading">
                        {placeholderText("genres.title")}
                    </h5>
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => onClickModal(false)}
                            size="md"
                            color="primary ml-2 text-white"
                        >
                            {placeholderText("genres.input.new-btn.label")}
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
                                <GenreModal {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

Genres.propTypes = {
    genres: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchGenres: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { genres, isLoading, totalRecord } = state;
    return { genres, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchGenres, toggleModal })(Genres);
