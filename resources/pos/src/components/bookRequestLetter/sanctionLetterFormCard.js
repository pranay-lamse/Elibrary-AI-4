import React, { useState, useEffect, createRef } from "react";
import { Field, FieldArray } from "redux-form";
import { Col, Row } from "reactstrap";
import SaveAction from "../../shared/action-buttons/SaveAction";
import InputGroup from "../../shared/components/InputGroup";
import TextArea from "../../shared/components/TextArea";
import ToggleSwitch from "../../shared/components/ToggleSwitch";
import SelectCreatable from "../../shared/components/SelectCreatable";
import {
    getFormattedMessage,
    getFormattedOptions,
    placeholderText,
} from "../../shared/sharedMethod";
import { bookCreationWarning } from "../../shared/custom-hooks";
import SanctionLetterItemCard from "./santionLetterItemCard";
import InputFile from "./inputFile";
import { connect } from "react-redux";
import Select from "../../shared/components/Select";
import statusOptions from "./statusOptions.json";

const SanctionLetterFormCard = (props) => {
    const {
        editSanctionLetter,
        initialValues,
        change,
        onSaveBook,
        handleSubmit,
        initialize,
        saveActionOptions,
    } = props;

    // const pdf_file = readFileSync(
    //     "public/uploads/SanctionLetters/" + initialValues.pdf_file
    // );

    // console.log({ pdf_file });

    useEffect(() => {
        editSanctionLetter
            ? initialize({
                  subject: initialValues.subject,
                  description: initialValues.description,
                  pdf_file: initialValues.pdf_file,
                  letter_status:
                      initialValues &&
                      statusOptions.find(
                          (status) =>
                              status.id ===
                              parseInt(initialValues.letter_status)
                      ),
              })
            : initialize({
                  subject: "",
                  description: "",
              });
        // change({
        //     subject: initialValues.subject,
        //     description: initialValues.description,
        //     items: initialValues?.items,
        // });
    }, [initialValues, editSanctionLetter]);

    // console.log({ initialValues });

    const onSave = (formValues) => {
        onSaveBook(formValues);
    };

    // console.log({ prestine: saveActionOptions.prestine, saveActionOptions });

    return (
        <Row className="animated fadeIn book-form-card m-none">
            <Col xs={12} className="book-form-card__primary-details">
                <div className="d-flex justify-content-between">
                    <h5>
                        {editSanctionLetter
                            ? "Edit Product Details"
                            : "Product Details"}
                    </h5>
                    {/* <div className="d-flex">
                        <div>
                            <Field
                                name="is_featured"
                                checked={isFeatured}
                                label={getFormattedMessage(
                                    "books.toggle.is-featured.label"
                                )}
                                onChange={onChecked}
                                component={ToggleSwitch}
                            />
                        </div>
                    </div> */}
                </div>
                <hr className="book-form-card__hr" />
            </Col>
            <Col xs={12}>
                <Row>
                    <Col xs={12}>
                        <Field
                            name="subject"
                            label="sanction.letter.subject"
                            required
                            groupText="file-text"
                            component={InputGroup}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Field
                            name="description"
                            cols={90}
                            rows={3}
                            label="books.input.description.label"
                            component={TextArea}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6}>
                        <Field
                            name="letter_status"
                            label="sanction.letter.status"
                            required
                            options={statusOptions}
                            placeholder="sanction.letter.status.placeholder"
                            component={Select}
                            isSearchable={true}
                            defaultValue={
                                initialValues &&
                                statusOptions.find(
                                    (status) =>
                                        status.id == initialValues.letter_status
                                )
                            }
                        />
                    </Col>
                </Row>
                {editSanctionLetter ? (
                    <Row>
                        <Col xs={12} sm={6} className="pt-4">
                            <label htmlFor="pdf-preview" className="form-label">
                                Sanction Letter
                            </label>
                            <Field
                                name="pdf_file"
                                type="file"
                                required
                                component={InputFile}
                            />
                        </Col>
                    </Row>
                ) : null}
            </Col>
            <Col xs={12} className="mt-3">
                <h5>Product Items</h5>
                <hr className="book-form-card__hr" />
                <FieldArray
                    name="items"
                    component={SanctionLetterItemCard}
                    change={change}
                />
            </Col>
            <Col xs={12}>
                <SaveAction
                    onSave={handleSubmit(onSave)}
                    {...saveActionOptions}
                />
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    const { editSanctionLetter } = state;
    return {
        editSanctionLetter,
    };
};

export default connect(mapStateToProps, null)(SanctionLetterFormCard);
