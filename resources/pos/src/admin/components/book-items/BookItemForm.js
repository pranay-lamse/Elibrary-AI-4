import React, { createRef, useEffect, useRef, useState } from "react";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import { Button, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import bookItemValidate from "./bookItemValidate";
import "../book-details/BookDetails.scss";
import SaveAction from "../../../shared/action-buttons/SaveAction";
import InputGroup from "../../../shared/components/InputGroup";
import Select from "../../../shared/components/Select";
import {
    enableDisableUserInput,
    generateRandomNumber,
    getFormattedOptions,
} from "../../../shared/sharedMethod";
import {
    bookItemStatusOptions,
    bookFormatOptions,
    bookItemStatusConstants,
    maxDigits,
} from "../../constants";
import {
    prepareBookLanguage,
    prepareCreatableObject,
} from "../../shared/prepareArray";
import { fetchPublishers } from "../../store/actions/publisherAction";
import { fetchBookLanguages } from "../../store/actions/bookLanguageAction";
import InputFile from "./inputFile";
import { Tokens } from "../../../constants";
import { prepareProductCreatableObject } from "../../../shared/prepareArray";
import { fetchProducts } from "../../../store/action/productAction";
import ChunkedUploady, { useChunkFinishListener } from "@rpldy/chunked-uploady";
import { asUploadButton } from "@rpldy/upload-button";
import { isEmpty } from "lodash";
import SelectCreatable from "../../../shared/components/SelectCreatable";
import {
    bookCreationWarning,
    bookITemCreationWarning,
} from "../../../shared/custom-hooks";

const BookItemForm = (props) => {
    const {
        change,
        bookLanguages,
        publishers,
        onSaveBookItems,
        initialValues,
        currency,
        fetchBookLanguages,
        fetchPublishers,
        handleSubmit,
        newBookItem = false,
        e_book_url = "",
        products,
        fetchProducts,
        file_name,
    } = props;

    const [onChangePublisher] = bookCreationWarning(change);
    const [isDisabledStatus, setDisabledStatus] = useState(false);
    const inputRef = createRef();
    const bookItemsStatusOptions = getFormattedOptions(bookItemStatusOptions);
    const booksFormatOptions = getFormattedOptions(bookFormatOptions);
    const [formateOptions, setFormatOptions] = useState(
        initialValues ? initialValues.format : null
    );
    const [pdfUrl, setPdfUrl] = useState(`${window.location.origin}api/upload`);
    const [ebookText, setEbookText] = useState(false);
    const spanRef = useRef(null);
    useEffect(() => {
        fetchBookLanguages();
        fetchPublishers();
        prepareInitialValues();
        if (e_book_url) {
            props.change("file", "false");
        }
        fetchProducts();
        setPdfUrl(`${window.location.origin}/api/upload`);
    }, []);
    const prepareInitialValues = () => {
        console.log("initialValues", initialValues);
        if (!initialValues) {
            props.change("status", { ...bookItemsStatusOptions[0] });
            props.change("book_code", Number(generateRandomNumber(10)));
        } else {
            if (
                initialValues.status &&
                initialValues.status.id === bookItemStatusConstants.UNAVAILABLE
            ) {
                setDisabledStatus(true);
            }
        }
        // inputRef.current.focus();
    };

    const regenerate = () => {
        props.change("book_code", Number(generateRandomNumber(10)));
    };

    const onSave = (formValues) => {

        const {
            book_code,
            edition,
            format,
            language,
            publisher,
            location,
            price,
            status,
            file,
            product_id,
            rack_number,
            accession_number,
            pdf_preview_file,
            publisher_id,
        } = formValues;
        {
            newBookItem
                ? onSaveBookItems({
                    book_code,
                    edition,
                    format,
                    language,
                    publisher,
                    status,
                    location,
                    price,
                    file,
                    product_id,
                    rack_number,
                    accession_number,
                    pdf_preview_file,
                    publisher_id,
                })
                : onSaveBookItems({
                    book_code,
                    edition,
                    format: format.id,
                    language_id: language.id,
                    publisher_id: publisher_id ? publisher_id.value : null,
                    status: status.id,
                    accession_number: accession_number,
                    location,
                    price,
                    file: e_book_url ? "" : file,
                    product_id: product_id ? product_id.id : null,
                    rack_number: rack_number,
                    pdf_preview_file: e_book_url ? "" : pdf_preview_file,
                });
        }
    };

    const onChangeFormat = (options) => {
        setFormatOptions(options);
    };

    useEffect(() => {
        document
            .querySelector(".inputBox")
            .addEventListener("keypress", function (evt) {
                if (
                    (evt.which != 8 && evt.which != 0 && evt.which < 48) ||
                    evt.which > 57
                ) {
                    evt.preventDefault();
                }
            });
    }, []);

    const onClickOpenEBook = (e_book_url) => {
        const api =
            location.origin +
            "/uploads/ebooks/" +
            e_book_url.split(".")[0] +
            "/" +
            e_book_url;
        window.open(api, "_blank");
    };

    const DivUploadButton = asUploadButton(
        React.forwardRef((props, ref) => {
            return (
                <div
                    {...props}
                    style={{ cursor: "pointer" }}
                    className="form-control"
                >
                    <span>
                        {ebookText ? "File Selected." : "Select Pdf File."}
                    </span>
                </div>
            );
        })
    );

    useEffect(() => {
        let inputEle = null;
        let interval;
        if (isEmpty(inputEle)) {
            interval = setInterval(() => {
                inputEle = document.querySelector('input[name="pdf_file"]');
                if (!isEmpty(inputEle)) {
                    inputEle.addEventListener("change", (e) => {
                        if (e.target.files.length) {
                            setEbookText(true);
                        }
                    });
                }
            }, 1000);
        }

        if (!isEmpty(inputEle)) {
            clearInterval(interval);
        }
    }, []);

    return (
        <Row className="animated fadeIn book-form m-3">
            <Col xs={12} sm={6}>
                <Field
                    name="book_code"
                    className="inputBox"
                    label="books.items.input.book-code.label"
                    min="1"
                    inputRef={inputRef}
                    required
                    // onChange={(e) =>
                    //     enableDisableUserInput(e, maxDigits.BOOK_CODE)
                    // }
                    type="number"
                    groupText="file-text"
                    component={InputGroup}
                />
                <Button onClick={regenerate} size="md">
                    Generate
                </Button>
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    name="product_id"
                    label="books.select.product.title"
                    options={products}
                    placeholder="books.select.product.placeholder"
                    groupText="user-circle-o"
                    component={Select}
                />
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    name="edition"
                    label="books.items.input.edition.label"
                    required
                    groupText="file-text"
                    component={InputGroup}
                />
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    name="format"
                    label="books.items.select.format.label"
                    required
                    options={booksFormatOptions}
                    placeholder="books.items.select.format.placeholder"
                    groupText="wpforms"
                    component={Select}
                    onChange={(options) => onChangeFormat(options)}
                />
            </Col>
            {formateOptions && formateOptions.id === 3 && e_book_url ? (
                <Col xs={12} sm={6} className="pt-4">
                    View your PDF{" "}
                    <i
                        className="fa fa-download fa-md cursor-pointer text-info ml-2"
                        onClick={() => onClickOpenEBook(file_name)}
                    />
                </Col>
            ) : formateOptions && formateOptions.id === 3 ? (
                <Col xs={12} sm={6} className="pt-4">
                    <Field name="file" type="file" component={InputFile} />

                </Col>
            ) : null}

            {formateOptions && formateOptions.id !== 3 ? (
                <Col xs={12} sm={6}>
                    <Field
                        name="price"
                        min="1"
                        type="number"
                        label="books.items.input.price.label"
                        groupText={currency}
                        isDefaultCurrency={true}
                        component={InputGroup}
                    />
                </Col>
            ) : null}
            <Col xs={12} sm={6}>
                <Field
                    name="language"
                    label="books.items.select.language.label"
                    required
                    options={bookLanguages}
                    placeholder="books.items.select.language.placeholder"
                    groupText="language"
                    component={Select}
                    isSearchable={true}
                />
            </Col>
            <Col>
                <Field
                    name="publisher_id"
                    label="books.items.select.publisher.label"
                    options={publishers}
                    onChange={(options) =>
                        onChangePublisher(options, publishers, "new_publisher")
                    }
                    placeholder="books.items.select.publisher.placeholder"
                    groupText="user-circle-o"
                    component={SelectCreatable}
                    isSearchable={true}
                    required
                />
            </Col>
            <Col xs={12} sm={6}>
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
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    name="rack_number"
                    label="books.items.select.rack.number.label"
                    groupText="user-circle-o"
                    component={InputGroup}
                    isSearchable={true}
                />
            </Col>
            <Col xs={12} sm={6}>
                <Field
                    name="accession_number"
                    label="books.items.select.accession.number.label"
                    groupText="user-circle-o"
                    component={InputGroup}
                    isSearchable={true}
                />
            </Col>
            <Col xs={12} sm={6} className="pt-4">
                <label htmlFor="pdf-preview" className="form-label">
                    PDF Preview
                </label>
                <Field
                    name="pdf_preview_file"
                    type="file"
                    required
                    component={InputFile}
                />
            </Col>
            <Col xs={12}>
                <SaveAction onSave={handleSubmit(onSave)} {...props} />
            </Col>
        </Row>
    );
};

BookItemForm.propTypes = {
    initialValues: PropTypes.object,
    currency: PropTypes.string,
    bookLanguages: PropTypes.array,
    publishers: PropTypes.array,
    fetchPublishers: PropTypes.func,
    fetchBookLanguages: PropTypes.func,
    handleSubmit: PropTypes.func,
    onSaveBookItems: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { publishers, bookLanguages, products } = state;

    return {
        bookLanguages: prepareBookLanguage(bookLanguages),
        publishers: prepareCreatableObject(publishers),
        products: prepareProductCreatableObject(products),
    };
};
const bookItemForm = reduxForm({
    form: "bookItemForm",
    validate: bookItemValidate,
    enableReinitialize: true, // important!
})(BookItemForm);

export default connect(mapStateToProps, {
    fetchPublishers,
    fetchBookLanguages,
    fetchProducts,
})(bookItemForm);
