import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Field, formValueSelector } from "redux-form";
import { Button, Table } from "reactstrap";
import CustomInput from "../../../src/shared/components/CustomInput";
import InputFile from "../../admin/components/book-items/inputFile";
import SelectCreatable from "../../../src/shared/components/SelectCreatable";
import {
    getFormattedMessage,
    getFormattedOptions,
    mapCurrencyCode,
} from "../../shared/sharedMethod";

import { connect, useDispatch } from "react-redux";
import { toggleModal } from "../../store/action/modalAction";
import Modal from "../../shared/components/Modal";
import SanctionLetterItemForm from "./sanctionLetterItemForm";
import _, { forEach } from "lodash";
import { fetchAllProductCategories } from "../../store/action/productCategoryAction";
import {
    addSanctionLetterItem,
    deleteLetterItem,
    fetchSanctionLetter,
    updateSanctionLetterItem,
} from "../../store/action/sanctionLetterAction";
import { useLocation, useParams } from "react-router";
import { param } from "jquery";

const SantionLetterItemCard = (props) => {
    const {
        updateSanctionLetterItem,
        fetchSanctionLetter,
        deleteLetterItem,
        filteredItems,
        editSanctionLetter,
        addSanctionLetterItem,
        fetchAllProductCategories,
        productCategories,
        initialize,
        initialValues,
        fields,
        meta: { error, submitFailed },
        toggleModal,
    } = props;
    const [addItems, setAddItems] = useState(
        editSanctionLetter ? filteredItems : []
    );
    const params = useParams();
    const [editItems, setEditItems] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const [isEditAdd, setIsEditAdd] = useState(false);

    const onSaveBookItems = async (formValues) => {
        const editAddItems = {
            ...formValues,
            letter_id: params.id,
            category: formValues.category.id,
        };
        console.log({ editAddItems });

        if (editSanctionLetter && isEditAdd) {
            await addSanctionLetterItem(editAddItems);
            fetchSanctionLetter(params.id);
            toggleModal();
        } else {
            setAddItems((prev) => [...prev, formValues]);
            fields.push(formValues);
            toggleModal();
        }
    };

    const onEditBookItems = async (formValues) => {
        const data = {
            ...formValues,
            category: formValues.category.id,
            letter_id: params.id,
        };
        console.log({ formValues, data, addItems });
        await updateSanctionLetterItem(data);
        fetchSanctionLetter(data.letter_id);
        toggleModal();
        // const editedItem = addItems.map((item, i) =>
        //     item.id === formValues?.id ? formValues : item
        // );
        // editedItem.map((item, i) => fields.push(item));
        // setAddItems(editedItem);
    };

    const cardModalProps = {
        initialize,
        addItems,
        onSaveBookItems,
        onCancel: toggleModal,
    };
    const editCardModalProps = {
        isEditAdd,
        initialize,
        addItems,
        editItems,
        onSaveBookItems,
        onEditBookItems,
        formValueSelector,
        onCancel: toggleModal,
    };

    const onAddSubFields = () => {
        // dispatch({ type: "EDIT_SANCTION_LETTER", payload: false });
        if (editSanctionLetter) setIsEditAdd(true);
        toggleModal();
    };

    const onRemoveSubFields = (index, item) => {
        deleteLetterItem(item);
        // const tempArray = [...addItems];
        // tempArray.splice(index, 1);
        // setAddItems(tempArray);
    };

    const onEditSubFields = (item) => {
        setEditItems(item);
        dispatch({ type: "EDIT_SANCTION_LETTER", payload: true });
        toggleModal();
    };

    const prepareModalOption = {
        title: "Add Product Item",
        toggleModal,
    };
    const prepareEditModalOption = {
        title: "Edit Product Item",
        toggleModal,
    };

    // const renderFields = useCallback(() => {
    //     return (
    //         addItems &&
    //         addItems.map((item, index) => {
    //             return (
    //                 <tr key={index}>
    //                     <td>{item.category ? item.category.name : ""}</td>
    //                     <td className="book-items-card__format">{item.name}</td>
    //                     <td className="book-items-card__publisher">
    //                         {item.quantity}
    //                     </td>
    //                     <td className="book-items-card__language">
    //                         {item.price ? item.price : "0.00"}
    //                     </td>
    //                     <td className="book-items-card__publisher">
    //                         {item.notes}
    //                     </td>
    //                     <td className="d-flex flex-row text-center">
    //                         <Button
    //                             size="sm"
    //                             color="primary"
    //                             className="book-items-card__action-btn"
    //                             onClick={() => onEditSubFields(item)}
    //                         >
    //                             <i className="fas fa-pen font-md icon text-white" />
    //                         </Button>

    //                         <Button
    //                             size="sm"
    //                             color="danger"
    //                             className="book-items-card__action-btn"
    //                             onClick={() => onRemoveSubFields(index, item)}
    //                         >
    //                             <i className="fas fa-trash-alt font-md icon text-white" />
    //                         </Button>
    //                     </td>
    //                 </tr>
    //             );
    //         })
    //     );
    // }, [initialValues, editItems]);

    useEffect(() => {
        fetchAllProductCategories();
    }, []);

    useEffect(() => {
        if (editSanctionLetter) {
            setAddItems(filteredItems);
        }
    }, [filteredItems]);

    // useEffect(() => {
    //     if (!_.isEmpty(initialValues) && editSanctionLetter) {
    //         const items = initialValues.items;
    //         const tempItems = [];
    //         console.log({ items });
    //         items.length > 0 &&
    //             productCategories.length > 0 &&
    //             productCategories.map((category, i, array) => {
    //                 items.map((item, j, array) => {
    //                     if (category.id === parseInt(item.category))
    //                         tempItems.push({ ...item, category: category });
    //                 });
    //             });
    //         console.log({ tempItems });
    //         // setAddItems([...addItems, tempItems]);
    //         // setAddItems(tempItems);
    //     }
    // }, [initialValues.items, editSanctionLetter]);

    useEffect(() => {
        initialize
            ? initialize({
                  items: addItems,
              })
            : null;
    }, [initialValues.items]);

    // console.log({
    //     initialValues,
    //     addItems,
    //     editSanctionLetter,
    //     filteredItems,
    //     isEditAdd,
    // });

    return (
        <div className="book-items-card overflow-auto">
            <Table
                responsive
                size="md"
                className="table-multi-item-responsive table-bordered"
            >
                <thead>
                    <tr>
                        <th className="book-items-card__item-header book-items-card__responsive">
                            CATEGORY
                        </th>
                        <th className="book-items-card__item-header book-items-card__responsive">
                            PRODUCT NAME
                        </th>
                        <th className="book-items-card__responsive">
                            QUANTITY
                        </th>
                        <th className="book-items-card__item-header book-items-card__responsive">
                            PRICE
                        </th>
                        <th className="book-items-card__responsive">NOTES</th>
                        <th className="text-center">
                            {getFormattedMessage(
                                "react-data-table.action.column"
                            )}
                        </th>
                    </tr>
                </thead>
                {/* <tbody>{renderFields()}</tbody> */}
                <tbody>
                    {addItems &&
                        addItems.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.category
                                            ? item.category.name
                                            : ""}
                                    </td>
                                    <td className="book-items-card__format">
                                        {item.name}
                                    </td>
                                    <td className="book-items-card__publisher">
                                        {item.quantity}
                                    </td>
                                    <td className="book-items-card__language">
                                        {item.price ? item.price : "0.00"}
                                    </td>
                                    <td className="book-items-card__publisher">
                                        {item.notes}
                                    </td>
                                    <td className="d-flex flex-row text-center">
                                        <Button
                                            size="sm"
                                            color="primary"
                                            className="book-items-card__action-btn"
                                            onClick={() =>
                                                onEditSubFields(item)
                                            }
                                        >
                                            <i className="fas fa-pen font-md icon text-white" />
                                        </Button>

                                        <Button
                                            size="sm"
                                            color="danger"
                                            className="book-items-card__action-btn"
                                            onClick={() =>
                                                onRemoveSubFields(index, item)
                                            }
                                        >
                                            <i className="fas fa-trash-alt font-md icon text-white" />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>

            <button
                type="button"
                className="btn btn-outline-primary add-item "
                onClick={() => onAddSubFields()}
            >
                {getFormattedMessage("books.items.input.add-item-btn.label")}
            </button>
            {editSanctionLetter ? (
                <Modal
                    {...prepareEditModalOption}
                    content={<SanctionLetterItemForm {...editCardModalProps} />}
                />
            ) : (
                <Modal
                    {...prepareModalOption}
                    content={<SanctionLetterItemForm {...cardModalProps} />}
                />
            )}
            {submitFailed && error && (
                <div className="text-danger mt-3">{error}</div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    const { initialValues, productCategories, editSanctionLetter } = state;

    const filteredProductCategories =
        productCategories.length > 0
            ? productCategories.map((category) => {
                  return {
                      id: category.id,
                      name: category.attributes.name,
                  };
              })
            : [];

    console.log({ filteredProductCategories });

    const filteredItems = [];
    !_.isEmpty(initialValues) &&
        filteredProductCategories.length > 0 &&
        filteredProductCategories.map((category, i, array) => {
            initialValues.items.map((item, j, array) => {
                if (category.id == item.category) {
                    filteredItems.push({ ...item, category: category });
                }
            });
        });
    return {
        initialValues,
        productCategories: filteredProductCategories,
        editSanctionLetter,
        filteredItems,
    };
};

export default connect(mapStateToProps, {
    fetchAllProductCategories,
    toggleModal,
    addSanctionLetterItem,
    deleteLetterItem,
    fetchSanctionLetter,
    updateSanctionLetterItem,
})(SantionLetterItemCard);
