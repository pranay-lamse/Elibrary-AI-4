import React, { useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { connect } from "react-redux";
import ModalAction from "../../shared/action-buttons/ModalAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { useNavigate } from "react-router-dom";
import { fetchContacts } from "../../member/store/actions/frontendContactAction";
import DeleteContact from "./DeleteContact";
import { toggleModal } from "../../store/action/modalAction";
import HeaderTitle from "../header/HeaderTitle";

const DisplayContact = (props) => {
    const navigate = useNavigate();
    const {
        isLoading,
        fetchContacts,
        frontendContact,
        totalRecord,
        toggleModal,
    } = props;

    const [contact, setContact] = useState(null);

    const cardModalProps = {
        contact,
        toggleModal,
    };

    const onChange = (filter) => {
        fetchContacts(filter, navigate, true);
    };

    const onOpenModal = (contact = null) => {
        setContact(contact);
        toggleModal();
    };

    const onClickExport = () => {
        exportBook((res) => {
            if (res.url) {
                window.open(res.url, "_self");
            }
        });
    };

    const itemsValue =
        frontendContact.length >= 0
            ? frontendContact.map((contact) => {
                  return {
                      name: contact.name,
                      email: contact.email,
                      subject: contact.subject,
                      notes: contact.notes,
                      id: contact.id,
                  };
              })
            : [];

    const columns = [
        {
            name: "NAME",
            selector: (row) => row.name,
            width: "140px",
            sortable: true,
            cell: (row) => row.name,
        },
        {
            name: "EMAIL",
            selector: (row) => row.email,
            sortable: true,
            wrap: true,
            cell: (row) => row.email,
        },
        {
            name: "SUBJECT",
            selector: (row) => row.subject,
            sortable: true,
            cell: (row) => row.subject,
        },
        {
            name: "MESSAGE",
            selector: (row) => row.notes,
            sortable: true,
            cell: (row) => row.notes,
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
                    isHideDeleteIcon={false}
                    isHideEditIcon={true}
                    isHideDetailIcon={true}
                    // goToDetailScreen={goToBookDetail}
                    onOpenModal={onOpenModal}
                    item={row}
                    isEditMode={true}
                />
            ),
        },
    ];

    return (
        <>
            <Row className="animated test fadeIn">
                <Col sm={12}>
                    <HeaderTitle title="User Contacted" />
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
                                    filterKeyName={"name"}
                                    emptyNotFoundStateMessageId="contact.not-found.empty-state.title"
                                    onChange={onChange}
                                />
                                <DeleteContact {...cardModalProps} />
                            </CardBody>
                        </Card>
                    </div>
                </Col>
            </Row>
        </>
    );
};

const mapStateToProps = (state) => {
    const { frontendContact, isLoading, totalRecord } = state;
    return { frontendContact, isLoading, totalRecord };
};

export default connect(mapStateToProps, { fetchContacts, toggleModal })(
    DisplayContact
);
