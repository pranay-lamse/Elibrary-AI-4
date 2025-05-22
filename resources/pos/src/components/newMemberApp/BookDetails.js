import { useState } from "react";
import { useNavigate } from "react-router";

export const BookDetails = (props) => {
    const {
        searchBooks,
        reserveBook,
        member,
        dispatch,
        bookHistory,
        goTo,
        ebookSubscription,
        handleSubscribe,
        subscriptionLimit,
        isAvailable,
        setIsAvailable,
        toggleModal,
        libraryId,
        setLibraryId,
        filteredBook,
        isDisabled,
        formatId,
        setFormatId,
        isFormatDisabled,
    } = props;
    const [isReserved, setReserved] = useState(false);
    const [modal, setModal] = useState(false);
    const [isExpired, setExpired] = useState(false);
    const [isSpinner, setIsSpinner] = useState(true);

    const navigate = useNavigate();

    const libraryOnChange = (e) => {
        setLibraryId(e.target.value);
    };
    const formatOnChange = (e) => {
        setFormatId(e.target.value);
    };

    const toggle = () => setModal(!modal);
    var history = [];
    var ebookSub = null;
    const status = bookHistory.filter((book) => book.status === 1);

    if (ebookSubscription.length && member && filteredBook.length) {
        ebookSub = ebookSubscription.find(
            (ebook) =>
                ebook.member_id === member.id &&
                filteredBook[0].id === ebook.ebook_id &&
                filteredBook[0].book.library_id === ebook.library_id
        );
    }

    if (filteredBook.length && bookHistory.length && filteredBook.length) {
        history = bookHistory.filter(
            (book) => filteredBook[0].id == book.book_item_id
        );
    }

    console.log({
        ebookSubscription,
        ebookSub,
        searchBooks,
        subscriptionLimit,
        isAvailable,
    });
};
