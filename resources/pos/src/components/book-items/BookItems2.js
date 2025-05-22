import React, { useEffect, Fragment } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BookItemModal from "../../admin/components/book-items/BookItemModal";
import BookItem2 from "./BookItemTable2";
import "./BookItems.scss";
import EmptyComponent from "../../shared/empty-component/EmptyComponent";
import searchFilter from "../../shared/searchFilter";
import sortFilter from "../../shared/sortFilter";
import {
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import { openModal } from "../../shared/custom-hooks";
import { sortAction } from "../../store/action/sortAction";
import { toggleModal } from "../../store/action/modalAction";
import { setBookItems } from "../../admin/store/actions/bookItemAction";
import { useLocation } from "react-router";
const BookItems2 = (props) => {
    const {
        bookLanguages,
        publishers,
        bookItemList,
        bookItems,
        sortAction,
        sortObject,
        toggleModal,
        setIsToggle,
        setBookItems,
        bookId,
        isParentToggle,
        setIsParentToggle,
        currency,
    } = props;
    const location = useLocation();
    const [isCreate, isEdit, isDelete, bookItem, onOpenModal] = openModal();
    const cardModalProps = {
        bookItem,
        bookLanguages,
        publishers,
        isCreate,
        isEdit,
        isDelete,
        toggleModal,
        bookItems,
        bookId,
        currency,
    };

    useEffect(() => {
        setBookItems([]);
        setBookItems([...bookItemList]);
    }, [location.pathname]);

    const onClickModal = (isEdit, bookItem = null, isDelete = false) => {
        onOpenModal(isEdit, bookItem, isDelete);
        setIsParentToggle(false);
        setIsToggle(false);
        toggleModal();
    };

    const cardBodyProps = {
        sortAction,
        sortObject,
        bookItems: bookItemList,
        bookLanguages,
        publishers,
        onClickModal,
        currency,
    };
    return (
        <Fragment>
            {bookItems.length ? (
                <BookItem2 {...cardBodyProps} />
            ) : (
                <EmptyComponent
                    isShort={true}
                    title={placeholderText("books.items.empty-state.title")}
                />
            )}
            <Button
                className="pull-right mt-3 text-white"
                onClick={() => onClickModal(false)}
                size="md"
                color="primary"
            >
                {placeholderText("books.items.input.new-btn.label")}
            </Button>
            {!isParentToggle ? <BookItemModal {...cardModalProps} /> : null}
        </Fragment>
    );
};

BookItems2.propTypes = {
    bookItem: PropTypes.object,
    sortObject: PropTypes.object,
    bookItemList: PropTypes.array,
    bookItems: PropTypes.array,
    bookLanguages: PropTypes.array,
    publishers: PropTypes.array,
    bookId: PropTypes.number,
    searchText: PropTypes.string,
    currency: PropTypes.string,
    isLoading: PropTypes.bool,
    isParentToggle: PropTypes.bool,
    setBookItems: PropTypes.func,
    sortAction: PropTypes.func,
    toggleModal: PropTypes.func,
    setIsParentToggle: PropTypes.func,
};

const mapStateToProps = (state) => {
    const { bookItems, searchText, sortObject, isLoading, currency } = state;
    let bookItemsArray = Object.values(bookItems);
    if (searchText) {
        bookItemsArray = searchFilter(bookItemsArray, searchText);
    }
    if (sortObject) {
        bookItemsArray = sortFilter(bookItemsArray, sortObject);
    }
    return { bookItems: bookItemsArray, sortObject, isLoading, currency };
};

export default connect(mapStateToProps, {
    setBookItems,
    sortAction,
    toggleModal,
})(BookItems2);
