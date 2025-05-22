import React from "react";
import { Row, Col, Button, Card, CardBody } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BookLanguageModal from "./BookLanguageModal";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ModalAction from "../../shared/action-buttons/ModalAction";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { openModal } from "../../shared/custom-hooks";
import { toggleModal } from "../../store/action/modalAction";
import { fetchBookLanguages } from "../../admin/store/actions/bookLanguageAction";
import { icon } from "../../constants";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

const BookLanguages = (props) => {
    const {
        bookLanguages,
        toggleModal,
        totalRecord,
        isLoading,
        fetchBookLanguages,
    } = props;
    const [isCreate, isEdit, isDelete, bookLanguage, onOpenModal] = openModal();
    const cardModalProps = {
        bookLanguage,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
    };

    const onChange = (filter) => {
        fetchBookLanguages(filter, true);
    };

    const onClickModal = (isEdit, bookLanguage = null, isDelete = false) => {
        onOpenModal(isEdit, bookLanguage, isDelete);
        toggleModal();
    };

    const itemsValue =
        bookLanguages.length > 0
            ? bookLanguages.map((bookLanguage) => ({
                  language_code: bookLanguage.language_code,
                  language_name: bookLanguage.language_name,
                  id: bookLanguage.id,
              }))
            : [];

    const columns = [
        {
            name: placeholderText("book-languages.input.code.label"),
            selector: (row) => row.language_code,
            sortField: "language_code",
            sortable: true,
            cell: (row) => <span>{row.language_code}</span>,
            minWidth: "150px",
        },
        {
            name: placeholderText("react-data-table.name.column.label"),
            selector: (row) => row.language_name,
            sortField: "language_name",
            sortable: true,
            cell: (row) => <span>{row.language_name}</span>,
            minWidth: "250px",
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
            <TabTitle title={placeholderText("books.title")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <HeaderTitle title="Book Languages" />
                    <ProgressBar /> */}
                    <h5 className="page-heading">
                        {placeholderText("book-languages.title")}
                    </h5>
                    <div className="float-right">
                        <Button
                            onClick={() => onClickModal(false)}
                            size="md"
                            color="primary text-white"
                        >
                            {placeholderText(
                                "book-languages.input.new-btn.label"
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
                                    emptyStateMessageId="book-languages.empty-state.title"
                                    emptyNotFoundStateMessageId="book-languages.not-found.empty-state.title"
                                    totalRows={totalRecord}
                                    onChange={onChange}
                                    icon={icon.BOOK_LANGUAGE}
                                />
                                <BookLanguageModal {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

BookLanguages.propTypes = {
    bookLanguages: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchBookLanguages: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { bookLanguages, isLoading, totalRecord } = state;
    return { bookLanguages, totalRecord, isLoading };
};

export default connect(mapStateToProps, { fetchBookLanguages, toggleModal })(
    BookLanguages
);
