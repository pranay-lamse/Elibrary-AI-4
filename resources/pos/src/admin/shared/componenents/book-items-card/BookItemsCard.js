import React, { useCallback, useState } from "react";
import { Field } from "redux-form";
import { Button, Table } from "reactstrap";
import PropTypes from "prop-types";
import "./BookItemsCard.scss";
import CustomInput from "../../../../../src/shared/components/CustomInput";
import InputFile from "../../../../admin/components/book-items/inputFile";
import { bookFormatOptions } from "../../../constants";
import { prepareCreatableObject } from "../../prepareArray";
import SelectCreatable from "../../../../../src/shared/components/SelectCreatable";
import {
    getFormattedMessage,
    getFormattedOptions,
    mapCurrencyCode,
} from "../../../../shared/sharedMethod";
import {
    bookITemCreationWarning,
    bookCreationWarning,
} from "../../../../../src/shared/custom-hooks";
import { connect } from "react-redux";
import { toggleModal } from "../../../../store/action/modalAction";
import BookItemForm from "../../../../admin/components/book-items/BookItemForm";
import Modal from "../../../../../src/shared/components/Modal";
import { bookFormatConstant } from "../../../constants";

const BookItemsCard = (props) => {
    const {
        fields,
        meta: { error, submitFailed },
        toggleModal,
        currency,
        change,
    } = props;
    const [items, setItems] = useState({});
    const [addItems, setAddItems] = useState([]);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);
    const [itemIndex, setItemIndex] = useState([]);
    const [bookItems, setbookItems] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const onSaveBookItems = useCallback(
        (formValues) => {
            if (isEdit) {
                fields.remove(currentIndex);
                fields.insert(currentIndex, formValues);
                addItems[currentIndex] = formValues;
                setAddItems([...addItems]);
                toggleModal();
                setIsEdit(false);
            } else {
                setAddItems([...addItems, formValues]);
                toggleModal();
                setbookItems(false);
                fields.push(formValues);
            }
        },
        [isEdit, currentIndex, items]
    );

    const cardModalProps = {
        change,
        onSaveBookItems,
        onCancel: toggleModal,
        newBookItem: true,
        currency,
        initialValues: items,
    };

    const onAddSubFields = () => {
        setItems({});
        setbookItems(true);
        toggleModal();
        setIsEdit(false);
    };
    const onEditSubFields = useCallback(
        (index, item) => {
            setbookItems(true);
            toggleModal();
            setItems(item);
            setCurrentIndex(index);
            setIsEdit(true);
        },
        [isEdit, currentIndex, items]
    );

    const onRemoveSubFields = (index) => {
        const tempArray = [...addItems];
        tempArray.splice(index, 1);
        fields.remove(index);
        setAddItems(tempArray);
    };

    const prepareModalOption = {
        title: getFormattedMessage("books.items.input.new-btn.label"),
        toggleModal,
    };

    const onChangeBookFormate = (index, option) => {
        if (option.value === 3) {
            setItemIndex([...itemIndex, index]);
        } else if (itemIndex.includes(index)) {
            setItemIndex(itemIndex.filter((item) => item !== index));
        }
    };

    const renderFields = () => {
        return (
            addItems &&
            addItems.map((item, index) => (
                <tr key={index}>
                    <td>{item.book_code}</td>
                    <td>{item.edition}</td>
                    <td className="book-items-card__format">
                        {item.format.name}
                    </td>
                    <td className="book-items-card__language">
                        {item.price ? item.price : "0.00"}
                    </td>
                    <td className="book-items-card__publisher">
                        {item.language.name}
                    </td>
                    <td className="book-items-card__publisher">
                        {item.publisher_id.label
                            ? item.publisher_id.label
                            : "N/A"}
                    </td>
                    <td className="book-items-card__publisher">
                        {item.rack_number ? item.rack_number : "N/A"}
                    </td>
                    {/* <td className="book-items-card__publisher">
                        {item.preview_pdf_file ? item.preview_pdf_file : "N/A"}
                    </td> */}
                    <td className="text-center d-flex flex-row">
                        {/* <Button
                            size="sm"
                            color="primary"
                            className="book-items-card__action-btn"
                            onClick={() => onEditSubFields(index, item)}
                        >
                            <i className="fas fa-pencil-alt font-md icon text-white" />
                        </Button> */}
                        <Button
                            size="sm"
                            color="danger"
                            className="book-items-card__action-btn"
                            onClick={() => onRemoveSubFields(index, item)}
                        >
                            <i className="fas fa-trash-alt font-md icon text-white" />
                        </Button>
                    </td>
                </tr>
            ))
        );
    };

    return (
        <div className="book-items-card overflow-auto">
            <Table responsive size="md" className="table-multi-item-responsive">
                <thead>
                    <tr>
                        <th className="book-items-card__item-header book-items-card__responsive">
                            BOOK CODE
                        </th>
                        <th className="book-items-card__item-header book-items-card__responsive">
                            {getFormattedMessage(
                                "books.items.input.edition.label"
                            )}
                        </th>
                        <th className="book-items-card__item-header book-items-card__responsive">
                            {getFormattedMessage(
                                "books.items.select.format.label"
                            )}
                        </th>
                        <th className="book-items-card__responsive">
                            {getFormattedMessage(
                                "books.items.input.price.label"
                            )}
                        </th>
                        <th className="book-items-card__item-header book-items-card__responsive">
                            {getFormattedMessage(
                                "books.items.select.language.label"
                            )}
                        </th>
                        <th className="book-items-card__responsive">
                            {getFormattedMessage(
                                "books.items.select.publisher.label"
                            )}
                        </th>
                        <th className="book-items-card__responsive">
                            {getFormattedMessage(
                                "books.items.select.rack.number.label"
                            )}
                        </th>
                        {/* <th className="book-items-card__responsive">
                            {getFormattedMessage(
                                "books.items.pdf.preview.label"
                            )}
                        </th> */}
                        <th className="text-center">
                            {getFormattedMessage(
                                "react-data-table.action.column"
                            )}
                        </th>
                    </tr>
                </thead>
                <tbody>{renderFields()}</tbody>
            </Table>
            <button
                type="button"
                className="btn btn-outline-primary add-item "
                onClick={() => onAddSubFields()}
            >
                {getFormattedMessage("books.items.input.add-item-btn.label")}
            </button>
            {bookItems ? (
                <Modal
                    {...prepareModalOption}
                    content={<BookItemForm {...cardModalProps} />}
                />
            ) : null}
            {submitFailed && error && (
                <div className="text-danger mt-3">{error}</div>
            )}
        </div>
    );
};

BookItemsCard.propTypes = {
    fields: PropTypes.object,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.array,
    toggleModal: PropTypes.func,
};

export default connect(null, { toggleModal })(BookItemsCard);
