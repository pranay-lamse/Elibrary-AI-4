import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import {
    getCurrentMember,
    getFormattedMessage,
    getFormattedOptions,
} from "../../../shared/sharedMethod";
/* import { fetchEBookRequests } from "../../store/actions/ebookAction"; */
import { fetchEbookSubscription } from "../../store/actions/ebookSubscriptionAction";
import { icon, Tokens } from "../../../constants";
import "./ebook.scss";
import PDFviewerModal from "../../../components/book-details/PDFviewerModal";
import moment from "moment";
import { useLocation, useNavigate } from "react-router";

const Ebooks = (props) => {
    const {
        /* ebooks, */
        ebookSubscription,
        isLoading,
        /* fetchEBookRequests, */
        fetchEbookSubscription,
        pagination,
        totalRecordMember,
    } = props;


    console.log("📘 Total Records:", totalRecordMember); // ✅ Log here

    const [modal, setModal] = useState(false);
    const [filePath, setFilePath] = useState("");
    const [isSpinner, setIsSpinner] = useState(true);
    const member = getCurrentMember();

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        /* fetchEBookRequests(); */
    }, [location.pathname]);

    const toggle = () => setModal(!modal);
    /*  const handleRead = () => {
        setModal(!modal);
        const ebook =
            ebookSubscription.length > 0 &&
            ebooks.length > 0 &&
            ebookSubscription.filter((ebook, i) =>
                ebookSubscription.find((esub) =>
                    ebook.id === esub.ebook_id ? ebook : null
                )
            );
    }; */

    const onChange = (filter) => {
        /* fetchEBookRequests(filter, true); */
        fetchEbookSubscription(member.id + "?page=" + filter.page, true);
    };

    const onClickBookDownload = (e_book_url) => {
        const api =
            e_book_url + "?token=" + localStorage.getItem(Tokens.MEMBER);
        window.open(api, "_blank");
    };
    const itemsValue = ebookSubscription.length
        ? ebookSubscription.toReversed()
        : [];

    console.log("iitemsValue", itemsValue);
    const columns = [
        /* {
            sortable: true,
            wrap: true,
            selector: (row) =>
                row.book_item.book ? row.book_item.book.library_id : "N/A",
            name: "LIBRARY",
            cell: (row) =>
                row.book_item.book
                    ? libraryStatus.find(
                          (status) =>
                              row.book_item.book.library_id === status.id
                      ).name
                    : "N/A",
        }, */

        {
            name: getFormattedMessage("e-books.input.name.label"),
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => <span className="book-name">{row.name}</span>,
        },
        {
            name: getFormattedMessage("e-books.input.isbn.label"),
            selector: (row) => row.isbn_no,

            sortable: true,
            cell: (row) => <span>{row.isbn_no}</span>,
        },

        /* {
            name: getFormattedMessage("e-books.input.language.label"),
            selector: (row) => row.language_name,
            sortable: true,
            cell: (row) => <span>{row.language_name}</span>,
        }, */
        {
            name: getFormattedMessage("e-books.input.author.label"),
            selector: (row) => row.authors,

            sortable: true,
            cell: (row) => <span>{row.authors}</span>,
        },
        // {
        //     name: "EXPIRY DATE",
        //     selector: (row) => row.returned_on,
        //     width: "300px",
        //     sortable: true,
        //     cell: (row) => <span>{row.returned_on}</span>,
        // },

        {
            sortable: true,
            wrap: true,
            selector: (row) => row.library_id,
            name: "LIBRARY",
            cell: (row) =>
                row.library_id == 111 ? (
                    <span className="text-wrap text-center">
                        Dindayal Upadhyay Digital Library
                    </span>
                ) : row.library_id == 222 ? (
                    <span className="text-wrap text-center">
                        Kundanlal Gupta Digital Library
                    </span>
                ) : (
                    <span className="text-wrap text-center">
                        Rashtramata Kasturba Digital Library
                    </span>
                ),
        },
        {
            name: "Action",
            selector: (row) => row.authors,

            sortable: true,
            cell: (row) => (
                <Button
                    size="sm"
                    color="danger text-white"
                    onClick={(e) => {
                        setFilePath(row.file_name);
                        row.format === 3
                            ? navigate("/view-book/" + row.file_name)
                            : toggle();
                    }}
                >
                    Read
                </Button>
            ),
        },
    ];

    const pdfModalOptions = {
        modal,
        toggle,
        filePath: filePath,
    };

    // useEffect(() => {
    //     setTimeout(() => setIsSpinner(false), 500);
    // }, []);

    //added
    useEffect(() => {
        fetchEbookSubscription(member.id);
        setTimeout(() => setIsSpinner(false), 500);
    }, [location.pathname]);

    console.log("📘 Total Records  2:", totalRecordMember); // ✅ Log here
    return (
        <section className="member_ebooks">
            <div className="container">
                <div className="animated fadeIn">
                    <div className="section-title-center text-center">
                        <h2 className="display-6">
                            {getFormattedMessage("e-book.title")}
                        </h2>
                        <div className="section-divider divider-traingle"></div>
                    </div>

                    <div className="common-container">
                        <ReactDataTable
                            items={itemsValue}
                            // items={ebooks}
                            className={"table-bordered table-striped mt-2"}
                            columns={columns}
                            loading={isLoading}
                            totalRows={totalRecordMember}
                            // totalRows={totalRecordMember}
                            emptyStateMessageId="e-book.empty-state.title"
                            emptyNotFoundStateMessageId="e-books.not-found.empty-state.title"
                            onChange={onChange}
                            icon={icon.BOOK}
                        />
                    </div>
                </div>
            </div>

            <PDFviewerModal {...pdfModalOptions} />
        </section>
    );
};

Ebooks.propTypes = {
    /* ebooks: PropTypes.array, */
    isLoading: PropTypes.bool,
    /* fetchEBookRequests: PropTypes.func, */
    totalRecordMember: PropTypes.number,
};

const mapStateToProps = (state) => {
    const { /* ebooks, */totalAmount, isLoading, totalRecordMember, ebookSubscription } =
        state;
    console.log("📘 Total totalAmount 3:", totalAmount); // ✅ Log here

    return {
        /* ebooks, */
        totalAmount,

        ebookSubscription,
        isLoading,
        totalRecordMember,
    };
};

export default connect(mapStateToProps, {
    /* fetchEBookRequests, */
    fetchEbookSubscription,
})(Ebooks);
