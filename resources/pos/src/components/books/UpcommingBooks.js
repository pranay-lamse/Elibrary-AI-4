import React, { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Books.scss";
import { publicImagePath } from "../../appConstant";
import DeleteBook from "./DeleteBook";
// import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ModalAction from "../../shared/action-buttons/ModalAction";
import { Routes, icon } from "../../constants";
import {
    getFormattedMessage,
    prepareFullNames,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import ReactDataTable from "../../shared/table/ReactDataTable";
import {
    fetchCommingBooks,
    exportBook,
} from "../../admin/store/actions/bookAction";
import { toggleModal } from "../../store/action/modalAction";
import { toggleImportBookModal } from "../../admin/store/actions/toggleImportBookModal";
import Viewer from "react-viewer";
import ImportBook from "./ImportBook";
import { Dropdown } from "react-bootstrap";
import { importBookByFile } from "../../admin/store/actions/fileAction";
import { environment } from "../../environment";
import { bookFilterOptions, storageKey } from "../../admin/constants/index";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

import { useNavigate } from "react-router-dom";

const UpcommingBooks = (props) => {
    // const { frontSetting } = useSelector((state) => state);
    // const state = useSelector((state) => state);
    // console.log(state);
    const navigate = useNavigate();
    const {
        books,
        history,
        isLoading,
        toggleModal,
        totalRecord,
        fetchCommingBooks,
        toggleImportBookModal,
        exportBook,
        importBookByFile,
    } = props;

    const [visible, setVisible] = useState(false);
    const [importBook, setImportBook] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [book, setBook] = useState(null);
    const bookStatusFilter = getFormattedOptions(bookFilterOptions);
    const cardModalProps = {
        book,
        toggleModal,
    };

    const onChange = (filter) => {
        // console.log("filter-onChange");
        fetchCommingBooks(filter, navigate, true);
    };

    const onClickModal = () => {
        setImportBook(true);
        // console.log("onClickModal");
        toggleImportBookModal();
    };

    const onClickExport = () => {
        exportBook((res) => {
            if (res.url) {
                window.open(res.url, "_self");
            }
        });
    };

    const onOpenModal = (book = null) => {
        setBook(book);
        toggleModal();
    };

    const openImage = (imageUrl) => {
        if (imageUrl !== null && imageUrl !== "") {
            setImageUrl(imageUrl);
            setVisible(true);
        }
    };

    const goToBookDetail = (bookId) => {
        navigate(`/admin${Routes.BOOKS + bookId}/details`);
    };

    const itemsValue =
        books.length >= 0
            ? books.map((book) => {
                  return {
                      image_path: book.image_path,
                      isbn: book.isbn,
                      authors_name: book.authors_name,
                      name: book.name,
                      id: book.id,
                      authors: book.authors,
                  };
              })
            : [];
    const columns = [
        {
            name: getFormattedMessage("books.table.cover.column"),
            selector: (row) => row.image_path,
            width: "100px",
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => {
                const imageUrl = row.image_path
                    ? row.image_path
                    : publicImagePath.BOOK_AVATAR;
                return (
                    <div>
                        <img
                            onClick={() => {
                                openImage(imageUrl);
                            }}
                            src={imageUrl}
                            height="50"
                            alt={imageUrl}
                        />
                    </div>
                );
            },
        },
        {
            name: getFormattedMessage("books.input.isbn.label"),
            selector: (row) => row.isbn,
            width: "140px",
            sortable: true,
            cell: (row) => row.isbn,
        },
        {
            name: getFormattedMessage("books.table.book.column"),
            selector: (row) => row.name,
            sortable: true,
            wrap: true,
            cell: (row) => row.name,
        },
        {
            name: getFormattedMessage("authors.title"),
            selector: (row) => row.authors_name,
            sortable: true,
            cell: (row) => {
                row.authors_name = prepareFullNames(row.authors)
                    .map(({ name }) => name)
                    .join(",  ");
                return <span>{row.authors_name}</span>;
            },
        },
        {
            name: getFormattedMessage("react-data-table.action.column"),
            selector: (row) => row.id,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "100px",
            cell: (row) => (
                <ModalAction
                    isHideEditIcon={true}
                    isHideDetailIcon={false}
                    goToDetailScreen={goToBookDetail}
                    onOpenModal={onOpenModal}
                    item={row}
                    isEditMode={true}
                />
            ),
        },
    ];

    const onSaveImportData = async (data) => {
        const formData = new FormData();
        formData.append("file", data);
        importBookByFile(formData, (res) => {
            if (res.status) {
                fetchCommingBooks();
            }
        });
        toggleImportBookModal();
    };

    const importBookModalProps = {
        onSaveImportData,
        toggleImportBookModal,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("books.title")} />
            <Row className="animated fadeIn">
                <Col sm={12} className="mb-2">
                    <div className="d-flex justify-content-end">
                        <Dropdown>
                            <Dropdown.Toggle
                                className="btn btn-primary ml-2 text-white"
                                id="dropdown-basic"
                            >
                                {placeholderText(
                                    "react-data-table.action.column"
                                )}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="p-0">
                                <Dropdown.Item
                                    href={`#/admin${Routes.BOOKS}new`}
                                    className="header__border"
                                >
                                    {placeholderText(
                                        "books.input.new-btn.label"
                                    )}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    href={`#/admin${Routes.BOOKS}import-book`}
                                    className="header__border"
                                >
                                    {placeholderText(
                                        "books.input.import-btn.label"
                                    )}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => onClickModal()}
                                    className="header__border"
                                >
                                    {placeholderText(
                                        "books.import-file-btn.label"
                                    )}
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => onClickExport()}
                                    className="header__border"
                                >
                                    {placeholderText("books.export-btn.label")}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {importBook ? (
                        <ImportBook {...importBookModalProps} />
                    ) : null}
                    <Viewer
                        drag={false}
                        changeable={false}
                        loop={false}
                        zIndex={1100}
                        scalable={false}
                        noNavbar={true}
                        visible={visible}
                        disableMouseZoom={true}
                        onClose={() => {
                            setVisible(false);
                        }}
                        images={[{ src: imageUrl, alt: "" }]}
                    />
                </Col>
                <Col sm={12}>
                    <div className="sticky-table-container">
                        <Card>
                            <CardBody>
                                <ReactDataTable
                                    items={itemsValue}
                                    columns={columns}
                                    loading={isLoading}
                                    isShowFilterField
                                    emptyStateMessageId="books.empty-state.title"
                                    totalRows={totalRecord}
                                    filterKeyName={storageKey.BOOK}
                                    filterOptions={bookStatusFilter}
                                    emptyNotFoundStateMessageId="book.not-found.empty-state.title"
                                    onChange={onChange}
                                    icon={icon.BOOK}
                                    paginationRowsPerPageOptions={[
                                        10, 100, 200, 500, 1000, 1000000,
                                    ]}
                                />
                                <DeleteBook {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

UpcommingBooks.propTypes = {
    books: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchCommingBooks: PropTypes.func,
    exportBook: PropTypes.func,
    toggleModal: PropTypes.func,
    importBookByFile: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { books, isLoading, totalRecord } = state;
    return { books, isLoading, totalRecord };
};

export default connect(mapStateToProps, {
    fetchCommingBooks,
    exportBook,
    toggleModal,
    toggleImportBookModal,
    importBookByFile,
})(UpcommingBooks);
