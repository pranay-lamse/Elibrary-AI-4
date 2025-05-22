import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import {
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import TabTitle from "../../shared/tab-title/TabTitle";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { fetchSanctionLetters } from "../../store/action/sanctionLetterAction";
import { toggleModal } from "../../store/action/modalAction";
import ModalAction from "../../shared/action-buttons/ModalAction";
import LetterModal from "./letterModal";
import DeleteLetter from "./deleteLetter";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import statusOptions from "./statusOptions.json";
import PDFviewerModal from "./PDFviewerModal";

function SanctionLetters(props) {
    const {
        toggleModal,
        isLoading,
        totalRecord,
        sanctionLetters,
        fetchSanctionLetters,
        editSanctionLetter,
    } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const [filteredItem, setFilteredItem] = useState({});
    const [letter, setLetter] = useState({});
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const dispatch = useDispatch();

    const handleClose = () => setShow(!show);

    const cardModalProps = {
        letter,
        toggleModal,
    };

    const onOpenModal = (letter = null) => {
        // alert(JSON.stringify(letter));
        setLetter(letter);
        toggleModal();
    };

    const goToBookDetail = (item) => {
        toggle();
        setFilteredItem(item.pdf_file);
        // handleClose();
    };

    const goToEditItem = (id) => {
        dispatch({ type: "EDIT_SANCTION_LETTER", payload: true });
        navigate("/admin/pos/sanction-letters/edit/" + id);
    };

    const itemsValue =
        sanctionLetters.length > 0
            ? sanctionLetters.map((item, i) => {
                  return {
                      id: item.id,
                      subject: item.subject,
                      status: statusOptions.find(
                          (stat) => stat.id === parseInt(item.letter_status)
                      )?.id,
                      pdf_file: item.pdf_file,
                      description: item.description,
                  };
              })
            : [];

    const onChange = (filter) => {
        fetchSanctionLetters(filter, navigate, true);
    };

    // console.log({ itemsValue, sanctionLetters, editSanctionLetter });

    const columns = [
        {
            name: "SUBJECT",
            width: "200px",
            selector: (row) => row.subject,
            ignoreRowClick: true,
            sortable: true,
            allowOverflow: true,
            button: true,
            cell: (row) => {
                return <div>{row.subject}</div>;
            },
        },
        {
            name: "DESCRIPTION",
            width: "300px",
            selector: (row) => row.description,
            sortable: true,
            cell: (row) => {
                return <div>{row.description}</div>;
            },
        },

        {
            name: "STATUS",
            selector: (row) => row.purchase_status,
            sortable: true,
            width: "300px",
            cell: (row) => {
                return row.status === 1 ? (
                    <div className="bg-success p-2 rounded">Sanctioned</div>
                ) : (
                    <div className="bg-warning p-2 rounded">Pending</div>
                );
            },
        },
        {
            name: "ACTION",
            selector: (row) => row.id,
            ignoreRowClick: true,
            allowOverflow: true,
            width: "auto",
            button: true,
            cell: (row) => (
                <ModalAction
                    isHideEditIcon={false}
                    isHideDetailIcon={false}
                    goToDetailScreen={goToBookDetail}
                    goToEditItem={goToEditItem}
                    onOpenModal={onOpenModal}
                    item={row}
                    isEditMode={true}
                />
            ),
        },
    ];

    useEffect(() => {
        fetchSanctionLetters();
    }, [location.pathname]);

    const pdfModalOptions = {
        modal,
        toggle,
        filePath: filteredItem ? filteredItem : null,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("sanction.letter.details")} />
            <Row className="animated test fadeIn">
                <Col sm={12} className="mb-2">
                    {/* <TopProgressBar /> */}
                    {/*  <HeaderTitle title={"Sanction Letters"} settings={"here"} /> */}
                    {/* <h5 className="page-heading">
                        {getFormattedMessage("books.title")}
                    </h5> */}
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: "EDIT_SANCTION_LETTER",
                                    payload: false,
                                });
                                navigate("create");
                            }}
                            size="md"
                            color="primary ml-2 text-white"
                        >
                            New Request
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
                                    emptyStateMessageId="books.empty-state.title"
                                    totalRows={totalRecord}
                                    emptyNotFoundStateMessageId="book.not-found.empty-state.title"
                                    onChange={onChange}
                                />
                                <DeleteLetter {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
            {/* <LetterModal
                handleClose={handleClose}
                bookRequestLetter={filteredItem}
                show={show}
                title="Letter Head"
            /> */}
            <PDFviewerModal {...pdfModalOptions} />
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const { sanctionLetters, editSanctionLetter } = state;
    return {
        sanctionLetters,
        editSanctionLetter,
    };
};

export default connect(mapStateToProps, {
    fetchSanctionLetters,
    toggleModal,
})(SanctionLetters);
