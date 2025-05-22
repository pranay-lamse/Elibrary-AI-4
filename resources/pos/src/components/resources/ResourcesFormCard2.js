import React, { useState, useEffect, createRef } from "react";
import { Field, FieldArray, formValues } from "redux-form";
import { Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import "../../shared/book-form-card/BookFormCard.scss";
import SaveAction from "../../shared/action-buttons/SaveAction";
import InputGroup from "../../shared/components/InputGroup";
import TextArea from "../../shared/components/TextArea";
import ToggleSwitch from "../../shared/components/ToggleSwitch";
import ImagePicker from "../../shared/lms-image-picker/ImagePicker";
import SelectCreatable from "../../shared/components/SelectCreatable";
import {
    getFormattedMessage,
    getFormattedOptions,
    placeholderText,
} from "../../shared/sharedMethod";
import { bookCreationWarning } from "../../shared/custom-hooks";
import InputFile from "../../admin/components/book-items/inputFile";
import categoryOptions from "./category.json";
import Select from "../../shared/components/Select";
import { fetchResourceCategory } from "../../store/action/resourceCategoryAction";
import { useLocation } from "react-router";
const ResourcesFormCard2 = (props) => {
    const {
        initialValues,
        change,
        onSaveBook,
        handleSubmit,
        initialize,
        onSearchISBN,
        saveActionOptions,
        resourceCategory,
        details,
    } = props;
    const [isFeatured, setIsFeatured] = useState(
        !!(initialValues && initialValues.is_featured)
    );

    const inputRef = createRef();
    const [onChangeResourceCategory] = bookCreationWarning(change);
    const location = useLocation();

    /* useEffect(() => {
        inputRef.current.focus();
        initialize ? initialize({ items: [] }) : null;
    }, []); */
    console.log("initialValues resources form card2", initialValues);
    useEffect(() => {
        initialValues
            ? initialize({
                  title: initialValues.title,
                  file_content: initialValues.file_content,
                  url: initialValues.url,
                  note: initialValues.note,

                  category:
                      initialValues &&
                      resourceCategory.find(
                          (category) =>
                              category.id ===
                              parseInt(initialValues.category_id)
                      ),
              })
            : initialize({
                  /* subject: "",
                  description: "", */
              });
    }, [initialValues]);

    const onFocusChangeISBN = (event) => {
        if (event.target.value) {
            onSearchISBN(event.target.value);
        }
    };

    const onSave = (formValues) => {
        const { file_content, url } = formValues;

        // Check if both file_content and url are present
        if (file_content && url) {
            alert("Both file and URL are not allowed simultaneously.");
            // Optionally dispatch an action to show an error message to the user
            // dispatch(setErrorMessage("Both file and URL are not allowed simultaneously."));
            return;
        }

        if (!file_content && !url) {
            alert("Please Add Url or File.");
            // Optionally dispatch an action to show an error message to the user
            // dispatch(setErrorMessage("Both file and URL are not allowed simultaneously."));
            return;
        }

        // Check if file_content is present and url is empty
        if (file_content && !url) {
            onSaveBook(formValues);
        } else if (url && !file_content) {
            onSaveBook(formValues);
        }
    };

    const onChecked = () => {
        setIsFeatured(!isFeatured);
    };

    return (
        <Row className="animated fadeIn book-form-card m-none m-sm-3">
            <Col xs={12} className="book-form-card__primary-details">
                <div className="d-flex justify-content-between">
                    <h5>Resources Form</h5>
                </div>
                <hr className="book-form-card__hr" />
                <Row>
                    <Col xs={12} sm={6}>
                        <Field
                            name="title"
                            label="resources.title.label"
                            required
                            inputRef={inputRef}
                            groupText="id-card"
                            component={InputGroup}
                        />
                    </Col>

                    <Col xs={12} sm={6}>
                        <Col>
                            <Field
                                name="category"
                                label={placeholderText(
                                    "resource.form.category.input.label"
                                )}
                                options={resourceCategory.map((category) => ({
                                    id: category.id,
                                    name: category.name,
                                }))}
                                onChange={(options) =>
                                    onChangeResourceCategory(
                                        options,
                                        resourceCategory.map((category) => ({
                                            id: category.id,
                                            name: category.name,
                                        })),
                                        "new_category"
                                    )
                                }
                                placeholder="resource.select.category"
                                groupText="user-circle-o"
                                component={Select}
                                isSearchable={true}
                                defaultValue={
                                    initialValues &&
                                    resourceCategory.find(
                                        (category) =>
                                            category.id ==
                                            initialValues.category
                                    )
                                }
                                required
                            />
                        </Col>
                    </Col>

                    <p> Both File and URL are not allowed simultaneously.*</p>

                    <Col xs={12} sm={6} className="pt-4">
                        <div className="form-group">
                            <label className="control-label">File</label>
                            <Field
                                name="file_content"
                                type="file"
                                component={InputFile}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xs={12} className="mt-2">
                <Row>
                    <Col xs={12}>
                        <Field
                            name="url"
                            label="books.input.url.label"
                            groupText="link"
                            component={InputGroup}
                        />
                    </Col>
                    <Col xs={12}>
                        <Field
                            name="note"
                            cols={90}
                            rows={3}
                            label="books.input.description.label"
                            component={TextArea}
                        />
                    </Col>
                </Row>
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

ResourcesFormCard2.propTypes = {
    initialValues: PropTypes.object,
    imagePickerOptions: PropTypes.object,
    saveActionOptions: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    currency: PropTypes.string,
    isImportBook: PropTypes.bool,
    change: PropTypes.func,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
    onSaveBook: PropTypes.func,
    onSearchISBN: PropTypes.func,
};

export default ResourcesFormCard2;
