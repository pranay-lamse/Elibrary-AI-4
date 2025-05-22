import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { publicImagePath } from "../../appConstant";
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
    fetchBooks,
    exportBook,
    exportPopularBook,
    exportPopularBookByGenre,
} from "../../admin/store/actions/bookAction";
import { toggleModal } from "../../store/action/modalAction";
import { toggleImportBookModal } from "../../admin/store/actions/toggleImportBookModal";
import Viewer from "react-viewer";
import { importBookByFile } from "../../admin/store/actions/fileAction";
import { bookFilterOptions, storageKey } from "../../admin/constants/index";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../admin/store/actions/genreAction";
import { Field } from "redux-form";
import { deleteResource } from "../../store/action/resourcesAction";

import { fetchResources } from "../../store/action/resourcesAction";

import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
import category from "./category.json";
import { Link } from "react-router-dom";

const Resources = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when component mounts
    }, []);

    const navigate = useNavigate();
    const {
        isLoading,
        fetchResources,
        resources,
        deleteResource,
        fetchResourceCategory,
        resourceCategory,
        totalRecord,
    } = props;

    const [visible, setVisible] = useState(false);
    const [importBook, setImportBook] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [resource, setResource] = useState(null);
    const [genreId, setGenreId] = useState("");
    const bookStatusFilter = getFormattedOptions(bookFilterOptions);
    const cardModalProps = {
        resource,
        toggleModal,
    };

    const onChange = (filter) => {
        fetchResourceCategory();

        /* fetchResourceCategory(filter); */

        fetchResources(filter, navigate, true);
    };

    const onClickModal = () => {
        setImportBook(true);

        toggleImportBookModal();
    };

    const onClickExport = () => {
        exportBook((res) => {
            if (res.url) {
                window.open(res.url, "_self");
            }
        });
    };
    const onClickExportByGenre = (genreId) => {
        exportPopularBookByGenre(genreId, (res) => {
            if (res.url) {
                window.open(res.url, "_self");
            }
        });
    };
    const dispatch = useDispatch();
    const goToEditItem = (id) => {
        navigate("/admin/pos/resources/edit/" + id);
    };

    const onClickPopularExport = () => {
        setGenreId("");
        exportPopularBook((res) => {
            if (res.url) {
                window.open(res.url, "_self");
            }
        });
    };

    const onOpenModal = (resource = null) => {
        deleteResource(resource.id, navigate);
    };

    const goToBookDetail = (bookId) => {
        navigate(
            `/admin${Routes.BOOKS + bookId.id}/${bookId.libraryId}/details`
        );
    };

    const itemsValue = resources.length
        ? resources.map((resource) => {
              return {
                  id: resource.id,
                  title: resource.title,
                  categoryName: resourceCategory.length
                      ? resourceCategory.find(
                            (category) => category.id == resource.category_id
                        )?.name
                      : "",
                  note: resource.note ? resource.note : "N/A",
                  url: resource.url,
              };
          })
        : [];

    const columns = [
        {
            name: "Title",
            selector: (row) =>
                row.title.length > 20
                    ? row.title.slice(0, 20) + "..."
                    : row.title,

            width: "240px",
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: "Category",
            selector: (row) => row.categoryName,
            sortField: "categoryName",
            width: "140px",
            sortable: false,
            cell: (row) => {
                return <div>{row.categoryName}</div>;
            },
        },
        {
            name: "URL",
            selector: (row) => row.url,
            sortField: "url",
            width: "auto",
            sortable: false,
            cell: (row) => {
                return (
                    <span>
                        {row.url ? (
                            <a target="_blank" href={row.url}>
                                {row.url}
                            </a>
                        ) : (
                            "N/A"
                        )}
                    </span>
                );
            },
        },
        {
            name: "Description",
            selector: (row) =>
                row.note.length > 30 ? row.note.slice(0, 30) + "..." : row.note,

            sortField: "note",
            sortable: true,
            wrap: true,
            cell: (row) => <span>{row.note}</span>,
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
                    isHideEditIcon={false}
                    isHideDetailIcon={true}
                    goToDetailScreen={goToBookDetail}
                    goToEditItem={goToEditItem}
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
                fetchBooks();
            }
        });
        toggleImportBookModal();
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("books.title")} />
            <Row className="animated test fadeIn">
                <Col sm={12} className="mb-2">
                    <div className="d-flex justify-content-end gap-2">
                        <Link
                            to={`/admin/pos/resources/new`}
                            size="md"
                            className="btn btn-primary ml-2 text-white"
                        >
                            New E-Resource
                        </Link>
                    </div>

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
                                    totalRows={totalRecord}
                                    isShowFilterField={false}
                                    emptyStateMessageId="books.empty-state.title"
                                    filterKeyName={storageKey.BOOK}
                                    filterOptions={bookStatusFilter}
                                    emptyNotFoundStateMessageId="book.not-found.empty-state.title"
                                    onChange={onChange}
                                    icon={icon.BOOK}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { resources, resourceCategory, totalRecord } = state;
    return { resources, resourceCategory, totalRecord };
};

export default connect(mapStateToProps, {
    exportPopularBook,
    fetchResources,
    deleteResource,
    fetchResourceCategory,
})(Resources);
