import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Books.scss";
import { publicImagePath } from "../../appConstant";
import DeleteBook from "./DeleteBook";
// import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ModalAction from "../../shared/action-buttons/ModalAction";
import { Routes, bookFormatOptions, icon } from "../../constants";
import {
    getFormattedMessage,
    prepareFullNames,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import ReactDataTable from "../../shared/table/ReactDataTable";
import {
    fetchEBooks,
    exportBook,
    exportPopularBook,
    exportPopularBookByGenre,
} from "../../admin/store/actions/bookAction";
import { toggleModal } from "../../store/action/modalAction";
import { toggleImportBookModal } from "../../admin/store/actions/toggleImportBookModal";
import Viewer from "react-viewer";
import ImportBook from "./ImportBook";
import { Dropdown } from "react-bootstrap";
import {
    importBookByFile,
    importBookByXMlFile,
} from "../../admin/store/actions/fileAction";
import { environment } from "../../environment";
import { bookFilterOptions, storageKey } from "../../admin/constants/index";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

import { useNavigate } from "react-router-dom";
import { fetchGenres } from "../../admin/store/actions/genreAction";
import Select from "../../shared/components/Select";
import { Field } from "redux-form";
import ImportBookXml from "./importBookXml";
import ReactSelect from "../../shared/select/reactSelect";
const EBooks = (props) => {
    const navigate = useNavigate();
    const {
        books,
        history,
        isLoading,
        toggleModal,
        totalRecord,
        fetchEBooks,
        toggleImportBookModal,
        exportBook,
        importBookByFile,
        exportPopularBook,
        genres,
        fetchGenres,
        exportPopularBookByGenre,
        importBookByXMlFile,
    } = props;

    const [visible, setVisible] = useState(false);
    const [importBook, setImportBook] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [book, setBook] = useState(null);
    const [genreId, setGenreId] = useState(null);
    const [formatId, setFormatId] = useState(null);
    const [isXmlShow, setIsXmlShow] = useState(false);
    const bookStatusFilter = getFormattedOptions(bookFilterOptions);
    const cardModalProps = {
        book,
        toggleModal,
    };

    const toggleXmlModal = () => setIsXmlShow((prev) => !prev);

    const onChange = (filter) => {
        // console.log("filter-onChange");
        fetchEBooks(filter, navigate, true);
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
    const onClickExportByGenre = useCallback(
        (genreId, formatId) => {
            exportPopularBookByGenre(
                genreId ? genreId.value : null,
                formatId ? formatId.value : null,
                (res) => {
                    if (res.url) {
                        window.open(res.url, "_self");
                    }
                }
            );
        },
        [genreId, formatId]
    );

    const onClickPopularExport = () => {
        setGenreId("");
        exportPopularBook((res) => {
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
        navigate(
            `/admin${Routes.BOOKS + bookId.id}/${bookId.libraryId}/details2`
        );
    };

    const itemsValue = books.length
        ? books.map((book) => {
              let getcount = book?.items.map((ebooksubscriptions) => {
                  return ebooksubscriptions?.ebooksubscriptions?.length + ", ";
              });
              return {
                  genre: book.genres,
                  image_path: book.image_path,
                  isbn: book.isbn,
                  authors_name: book.authors_name,
                  name: book.name,
                  id: book.id,
                  authors: book.authors,
                  count: getcount,
                  libraryId: book.library_id,
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
                    ? row.image_path.replace(
                          /\/(books)(\/|$)/,
                          "/$1/thumbnail$2"
                      )
                    : publicImagePath.BOOK_AVATAR;
                return (
                    <div>
                        <img
                            className="book_cover_img"
                            onClick={() => {
                                openImage(imageUrl);
                            }}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                    "/public/images/book-avatar.png";
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
            sortField: "isbn",
            width: "140px",
            sortable: true,
            cell: (row) => row.isbn,
        },
        {
            name: getFormattedMessage("books.table.book.column"),
            selector: (row) => row.name,
            sortField: "name",
            sortable: true,
            wrap: true,
            cell: (row) => row.name,
        },
        {
            name: getFormattedMessage("authors.title"),
            selector: (row) => row.authors_name,
            sortable: false,
            cell: (row) => {
                const authorsName = row
                    ? row.authors.map((author) => {
                          const firstName = author.first_name
                              ? author.first_name
                              : "";
                          const lastName = author.last_name
                              ? author.last_name
                              : "";
                          return firstName + " " + lastName;
                      })
                    : null;
                return <span>{authorsName}</span>;
            },
        },
        {
            name: "Subscription count",
            selector: (row) => row.count,
            sortable: false,
            cell: (row) => {
                const countvalue = row.count;
                return <span>{countvalue}</span>;
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
                fetchEBooks();
            }
        });
        toggleImportBookModal();
    };
    const onSaveImportXmlData = async (data) => {
        const formData = new FormData();
        formData.append("file", data);
        importBookByXMlFile(formData, (res) => {
            if (res.status) {
                fetchEBooks();
            }
        });
        toggleXmlModal();
    };

    const importBookModalProps = {
        onSaveImportData,
        toggleImportBookModal,
    };
    const importBookXmlModalProps = {
        onSaveImportXmlData,
        toggleXmlModal,
        isXmlShow,
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const genreOnChange = (e) => {
        setGenreId(e);
    };
    const formatOnChange = (e) => {
        setFormatId(e);
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("books.title")} />
            <Row className="animated test fadeIn">
                <Col sm={12} className="mb-2">
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
                                    isShowFilterField={false}
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

EBooks.propTypes = {
    books: PropTypes.array,
    totalRecord: PropTypes.number,
    isLoading: PropTypes.bool,
    fetchEBooks: PropTypes.func,
    exportBook: PropTypes.func,
    toggleModal: PropTypes.func,
    importBookByFile: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { books, isLoading, totalRecord, genres } = state;
    return { books, isLoading, totalRecord, genres };
};

export default connect(mapStateToProps, {
    exportPopularBookByGenre,
    fetchGenres,
    fetchEBooks,
    exportBook,
    toggleModal,
    toggleImportBookModal,
    importBookByFile,
    exportPopularBook,
    importBookByXMlFile,
})(EBooks);
