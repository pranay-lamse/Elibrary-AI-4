import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    Col,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import PropTypes from "prop-types";
import "./BookDetails.scss";
import BookDetailsModal from "./BookDetailsModal";
import BookItems from "../book-items/BookItems";
import { publicImagePath, publicImagePathURL } from "../../appConstant";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import {
    getFormattedMessage,
    prepareFullNames,
} from "../../shared/sharedMethod";
import { fetchBook } from "../../admin/store/actions/bookAction";
import { toggleModal } from "../../store/action/modalAction";
import Viewer from "react-viewer";

import { useLocation, useParams } from "react-router-dom";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";
import { useNavigate } from "react-router-dom";

import PDFviewerModal from "./PDFviewerModal";

const BookDetail = (props) => {
    const { book, toggleModal, history, fetchBook, match, isPdfToggle } = props;
    const [isParentToggle, setIsParentToggle] = useState(false);
    const [isToggle, setIsToggle] = useState(false);
    const cardModalProps = { book, toggleModal, isToggle };
    const [visible, setVisible] = useState(false);

    const params = useParams();
    const location = useLocation();
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const pdfModalOptions = {
        modal,
        toggle,
        filePath: book ? book?.items[0]?.pdf_preview_file : null,
        libraryId: params.library_id,
    };
    const navigate = useNavigate();

    useEffect(() => {
        fetchBook(params.id);
    }, [location.pathname]);

    if (!book) {
        return null;
    }

    const onOpenModal = () => {
        setIsToggle(true);
        setIsParentToggle(true);
        toggleModal();
    };
    // console.log({ isToggle, isParentToggle });

    const onOpenPdfModal = () => {
        toggle();
    };

    const goBack = () => {
        navigate(-1);
    };

    const bookItemFormOptions = {
        bookItemList: book.items,
        bookId: book.id,
        goBack,
        isParentToggle,
        setIsParentToggle,
        isToggle,
        setIsToggle,
        toggleModal,
    };

    const imageUrl = book.image_path
        ? book.image_path.replace(/\/(books)(\/|$)/, "/$1/thumbnail$2")
        : publicImagePath.BOOK_AVATAR;

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle
                title={placeholderText("book-circulation-details.title")}
            />
            <div className="animated fadeIn">
                <Row>
                    <Col
                        sm={12}
                        className="mb-2 d-block d-sm-flex justify-content-between"
                    >
                        <h5 className="page-heading w-100">{book.name}</h5>
                        <div className="d-block d-sm-flex">
                            <Button
                                className="mr-2"
                                color="primary text-white"
                                onClick={() => onOpenPdfModal()}
                            >
                                {placeholderText(
                                    "books.edit-book-details.pdf.preview"
                                )}
                            </Button>
                            <Button
                                className="mr-2"
                                color="primary text-white"
                                onClick={() => onOpenModal()}
                            >
                                {placeholderText(
                                    "books.edit-book-details.title"
                                )}
                            </Button>
                            <Button
                                className="float-right"
                                onClick={() => goBack()}
                            >
                                {placeholderText("global.input.back-btn.label")}
                            </Button>
                        </div>
                    </Col>
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card className="px-0 py-2">
                                <CardBody>
                                    <div className="book-detail-row d-flex">
                                        <div className="book-image-container">
                                            <div className="book-image-holder">
                                                <div>
                                                    <img
                                                        className="book-img"
                                                        onClick={() => {
                                                            setVisible(true);
                                                        }}
                                                        src={imageUrl}
                                                        height="250"
                                                        alt={imageUrl}
                                                    />
                                                    <Viewer
                                                        changeable={false}
                                                        drag={false}
                                                        disableMouseZoom={true}
                                                        loop={false}
                                                        zIndex={1100}
                                                        scalable={false}
                                                        noNavbar={true}
                                                        visible={visible}
                                                        onClose={() => {
                                                            setVisible(false);
                                                        }}
                                                        images={[
                                                            {
                                                                src: imageUrl,
                                                                alt: "",
                                                            },
                                                        ]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="book-detail">
                                            <div className="book-detail__item-container">
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-isbn-heading">
                                                        {placeholderText(
                                                            "books.edit-book-details.table.isbn.column"
                                                        )}
                                                    </span>
                                                    <span>{book.isbn}</span>
                                                </div>
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-genre-heading">
                                                        {placeholderText(
                                                            "books.edit-book-details.table.genres.column"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {book.genres &&
                                                            book.genres
                                                                .map(
                                                                    ({
                                                                        name,
                                                                    }) => name
                                                                )
                                                                .join(",  ")}
                                                    </span>
                                                </div>
                                                <div className="book-detail__item">
                                                    <span className="book-detail__item-authors-heading">
                                                        {placeholderText(
                                                            "books.edit-book-details.table.authors.column"
                                                        )}
                                                    </span>
                                                    <span>
                                                        {book
                                                            ? book.authors.map(
                                                                  (author) => {
                                                                      const firstName =
                                                                          author.first_name
                                                                              ? author.first_name
                                                                              : "";
                                                                      const lastName =
                                                                          author.last_name
                                                                              ? author.last_name
                                                                              : "";
                                                                      return (
                                                                          firstName +
                                                                          " " +
                                                                          lastName
                                                                      );
                                                                  }
                                                              )
                                                            : null}
                                                    </span>
                                                </div>
                                                {book.tags && (
                                                    <div className="book-detail__item">
                                                        <span className="book-detail__item-tags-heading">
                                                            {placeholderText(
                                                                "books.edit-book-details.table.tags.column"
                                                            )}
                                                        </span>
                                                        <span>
                                                            {book.tags
                                                                .map(
                                                                    ({
                                                                        name,
                                                                    }) => name
                                                                )
                                                                .join(",  ")}
                                                        </span>
                                                    </div>
                                                )}
                                                {book.url ? (
                                                    <div className="book-detail__item">
                                                        <span className="book-detail__item-url-heading">
                                                            {placeholderText(
                                                                "books.input.url.label"
                                                            )}
                                                        </span>
                                                        <span>
                                                            <a
                                                                target="_blank"
                                                                href={book.url}
                                                            >
                                                                {book.url}
                                                            </a>
                                                        </span>
                                                    </div>
                                                ) : null}
                                                {book.description ? (
                                                    <div className="book-detail__item">
                                                        <span className="book-detail__item-desc-heading">
                                                            {placeholderText(
                                                                "books.input.description.label"
                                                            )}
                                                        </span>
                                                        <span className="book-detail__item-desc-text">
                                                            {book.description}
                                                        </span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            book.description ? "mt-5" : "mt-5"
                                        }
                                    >
                                        <h5 className="mb-3">
                                            {placeholderText(
                                                "books.items.title"
                                            )}
                                        </h5>

                                        <BookItems {...bookItemFormOptions} />
                                    </div>
                                    {isToggle ? (
                                        <BookDetailsModal {...cardModalProps} />
                                    ) : null}

                                    <PDFviewerModal {...pdfModalOptions} />
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </MasterLayout>
    );
};

BookDetail.propTypes = {
    book: PropTypes.object,
    history: PropTypes.object,
    match: PropTypes.object,
    isLoading: PropTypes.bool,
    isToggle: PropTypes.bool,
    fetchBook: PropTypes.func,
    toggleModal: PropTypes.func,
};

const mapStateToProps = (state, ownProp) => {
    const { books, isToggle } = state;
    return {
        book: books.find((book) => book),
        // book: books,
        isToggle,
    };
};
export default connect(mapStateToProps, {
    fetchBook,
    toggleModal,
})(BookDetail);
