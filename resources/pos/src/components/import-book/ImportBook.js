import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import ProgressBar from "../../shared/progress-bar/ProgressBar";
import ImportBookForm from "./ImportBookForm";
import prepareFormData from "../../shared/prepareBookFormData";
import HeaderTitle from "../../shared/header-title/HeaderTitle";
import {
    getFormattedMessage,
    prepareFullNames,
} from "../../shared/sharedMethod";
import { prepareBookLanguage } from "../../shared/prepareArray";
import { fetchBookLanguages } from "../../admin/store/actions/bookLanguageAction";
import { fetchPublishers } from "../../admin/store/actions/publisherAction";
import { fetchTags } from "../../admin/store/actions/tagAction";
import { clearImportBook } from "../../admin/store/actions/importBookAction";
import { addBook } from "../../admin/store/actions/bookAction";
import { prepareCreatableObject } from "../../shared/prepareArray";
import { fetchAuthors } from "../../admin/store/actions/authorAction";
import { fetchGenres } from "../../admin/store/actions/genreAction";

import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import MasterLayout from "../MasterLayout";
import { useSelector } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { placeholderText } from "../../shared/sharedMethod";

import { useNavigate } from "react-router";

const ImportBook = (props) => {
    const navigate = useNavigate();
    const {
        authors,
        publishers,
        tags,
        bookLanguages,
        genres,
        isLoading,
        clearImportBook,
        history,
        addBook,
        fetchAuthors,
        fetchPublishers,
        fetchGenres,
        fetchBookLanguages,
        fetchTags,
    } = props;

    useEffect(() => {
        clearImportBook();
        fetchAuthors();
        fetchPublishers();
        fetchGenres();
        fetchBookLanguages(true);
        fetchTags();
    }, []);

    const onImportBook = (formValues) => {
        addBook(prepareFormData(formValues), navigate);
    };

    const goBack = () => {
        navigate(-1);
    };

    const prepareFormOption = {
        authors,
        publishers,
        tags,
        genres,
        bookLanguages,
        onImportBook,
        onCancel: goBack,
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={"Create Book"} />
            <div className="animated fadeIn">
                {/* {isLoading ? <ProgressBar /> : null}
                <HeaderTitle title="Import Book" /> */}
                <Row>
                    <Col
                        sm={12}
                        className="mb-2 d-flex justify-content-between"
                    >
                        <h5 className="page-heading">Create Book</h5>
                    </Col>
                    <Col sm={12}>
                        <div className="sticky-table-container">
                            <Card>
                                <CardBody>
                                    <ImportBookForm {...prepareFormOption} />
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </MasterLayout>
    );
};

ImportBook.propTypes = {
    history: PropTypes.object,
    authors: PropTypes.array,
    genres: PropTypes.array,
    tags: PropTypes.array,
    publishers: PropTypes.array,
    bookLanguages: PropTypes.array,
    isLoading: PropTypes.bool,
    addBook: PropTypes.func,
    fetchAuthors: PropTypes.func,
    fetchGenres: PropTypes.func,
    fetchTags: PropTypes.func,
    fetchBookLanguages: PropTypes.func,
    fetchPublishers: PropTypes.func,
    clearImportBook: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { isLoading, authors, publishers, tags, bookLanguages, genres } =
        state;
    return {
        isLoading,
        authors: prepareCreatableObject(prepareFullNames(authors)),
        publishers: prepareCreatableObject(publishers),
        tags: prepareCreatableObject(tags),
        bookLanguages: prepareCreatableObject(
            prepareBookLanguage(Object.values(bookLanguages))
        ),
        genres: prepareCreatableObject(genres),
    };
};

export default connect(mapStateToProps, {
    addBook,
    fetchAuthors,
    fetchGenres,
    fetchTags,
    fetchBookLanguages,
    fetchPublishers,
    clearImportBook,
})(ImportBook);
