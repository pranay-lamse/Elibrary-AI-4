import React, { createRef, useEffect, useState } from "react";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import sanctionLetterItemValidate from "./sanctionLetterItemValidate";
import SaveAction from "../../shared/action-buttons/SaveAction";
import InputGroup from "../../shared/components/InputGroup";
import Select from "../../shared/components/Select";
import SelectCreatable from "../../shared/components/SelectCreatable";
import SelectSeries from "../../shared/components/SelectSeries";
import {
    enableDisableUserInput,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import {
    bookItemStatusOptions,
    bookFormatOptions,
    bookItemStatusConstants,
    maxDigits,
} from "../../constants";
import InputFile from "./inputFile";
import { Tokens } from "../../constants";
import { fetchAllProductCategories } from "../../store/action/productCategoryAction";
import TextArea from "../../shared/components/TextArea";

const SanctionLetterItemForm = (props) => {
    const {
        isEditAdd,
        editSanctionLetter,
        initialize,
        addItems,
        editItems,
        onSaveBookItems,
        onEditBookItems,
        handleSubmit,
        fetchAllProductCategories,
        productCategories,
    } = props;

    const inputRef = createRef();

    useEffect(() => {
        editSanctionLetter
            ? initialize({
                  name: editItems.name,
                  category: editItems.category,
                  price: editItems.price,
                  quantity: editItems.quantity,
                  notes: editItems.notes,
              })
            : initialize({
                  items: [],
              });
    }, [editItems]);

    console.log({ editItems, productCategories });

    useEffect(() => {
        fetchAllProductCategories();
    }, []);

    const onSave = (formValues) => {
        const { category, name, price, quantity, notes } = formValues;

        if (isEditAdd) {
            onSaveBookItems({
                category,
                name,
                price,
                quantity,
                notes,
            });
        } else if (editSanctionLetter && addItems.length > 0) {
            onEditBookItems({
                ...editItems,
                category: category,
                name: name,
                price: price,
                quantity: quantity,
                notes: notes,
            });
        } else {
            onSaveBookItems({
                category,
                name,
                price,
                quantity,
                notes,
            });
        }
    };

    useEffect(() => {
        const element = document.querySelector(".inputBox");
        if (element) {
            element.addEventListener("keypress", function (evt) {
                if (
                    (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
                    evt.which > 57
                ) {
                    evt.preventDefault();
                }
            });
        }
    }, []);

    const onClickOpenEBook = (e_book_url) => {
        const api = e_book_url + "?token=" + localStorage.getItem(Tokens.ADMIN);
        window.open(api, "_blank");
    };

    return (
        <Row className="animated fadeIn book-form">
            <Col xs={12} sm={6}>
                <Field
                    name="category"
                    label="sanction.letter.input.product.category"
                    required
                    options={productCategories}
                    placeholder="sanction.letter.input.product.category.placeholder"
                    component={Select}
                    isSearchable={true}
                    defaultValue={editItems && editItems.category}
                />
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    name="name"
                    label="sanction.letter.input.product.name"
                    placeholder="sanction.letter.input.product.name.placeholder"
                    groupText="user-circle-o"
                    component={InputGroup}
                />
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    name="price"
                    type="number"
                    label="sanction.letter.input.product.price"
                    placeholder="sanction.letter.input.product.price.placeholder"
                    required
                    groupText="rupee-sign"
                    component={InputGroup}
                />
            </Col>

            <Col xs={12} sm={6}>
                <Field
                    name="quantity"
                    type="number"
                    label="sanction.letter.input.product.quantity"
                    placeholder="sanction.letter.input.product.quantity.placeholder"
                    groupText="user-circle-o"
                    component={InputGroup}
                />
            </Col>
            <Col xs={12}>
                <Field
                    name="notes"
                    cols={90}
                    rows={3}
                    label="books.input.description.label"
                    component={TextArea}
                />
            </Col>
            {/* <Col xs={12} sm={6}>
                <Field
                    name="status"
                    label="books.items.select.status.label"
                    disabled={!initialValues || isDisabledStatus}
                    options={bookItemsStatusOptions}
                    placeholder="books.items.select.status.placeholder"
                    groupText="user-circle-o"
                    component={Select}
                    isSearchable={true}
                />
            </Col> */}

            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props} />
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { productCategories, editSanctionLetter } = state;
    return {
        productCategories:
            productCategories.length > 0
                ? productCategories.map((category) => {
                      return {
                          id: category.id,
                          name: category.attributes.name,
                      };
                  })
                : [],
        editSanctionLetter,
    };
};
const sanctionItemForm = reduxForm({
    form: "items",
    validate: sanctionLetterItemValidate,
})(SanctionLetterItemForm);

export default connect(mapStateToProps, {
    fetchAllProductCategories,
})(sanctionItemForm);
