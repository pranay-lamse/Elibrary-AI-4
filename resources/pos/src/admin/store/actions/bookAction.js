import { bookActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWthFormData from "../../config/apiConfigWthFormData";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { apiBaseURL, Routes } from "../../../constants";
import { getFormattedMessage } from "../../../shared/sharedMethod";

export const fetchBooks =
    (filter = {}, history = null, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.BOOK;
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.pageSize)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_BOOKS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };

export const fetchBooks2 =
    (filter = {}, history = null, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));

        let url = `${window.location.origin.toString()}/api/v1/books?order_by=name&search=&genre=&library_id=111&author=&publisher=&language=0&format=1`;
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.pageSize)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_BOOKS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };

export const fetchSubscribeEBooks =
    (filter = {}, history = null, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.SUBSCRIPTIONEBOOK;
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.pageSize)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_BOOKS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };
export const fetchEBooks =
    (filter = {}, history = null, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.E_BOOK2;
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.pageSize)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_BOOKS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };
export const fetchCommingBooks =
    (filter = {}, history = null, isLoading = false) =>
    async (dispatch) => {
        let url = apiBaseURL.UPCOMMING_BOOKS;
        if (
            !_.isEmpty(filter) &&
            (filter.limit || filter.order_By || filter.search)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_UPCOMMING_BOOKS,
                        payload: response.data.data,
                    });
                    dispatch(
                        setTotalRecord(response.data.message.totalRecords)
                    );
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                }
            });
    };

export const fetchBook =
    (bookId, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .get(apiBaseURL.BOOK + "/" + bookId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.FETCH_BOOK,
                        payload: response.data.data,
                    });
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };

export const addBook = (book, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWthFormData
        .post(apiBaseURL.BOOK, book)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.ADD_BOOK,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "books.success.create.message"
                        ),
                    })
                );
                // history("/admin" + Routes.BOOKS);
                dispatch(setLoading(false));
                navigate(-1);
            }
        })
        .catch(({ response }) => {
            if (response) {
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
                dispatch(setLoading(false));
            }
        });
};

export const editBook =
    (bookId, book, history = null) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfigWthFormData
            .post(apiBaseURL.BOOK + "/" + bookId, book)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.EDIT_BOOK,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "books.success.edit.message"
                            ),
                        })
                    );
                    if (history) {
                        history(Routes.BOOKS);
                    } else {
                        dispatch(toggleModal());
                    }
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };

export const deleteBook =
    (bookId, filterObj = {}) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .delete(apiBaseURL.BOOK + "/" + bookId)
            .then((response) => {
                if (response) {
                    dispatch(fetchBooks(filterObj));
                    dispatch({
                        type: bookActionType.DELETE_BOOK,
                        payload: bookId,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "books.success.delete.message"
                            ),
                        })
                    );
                    dispatch(toggleModal());
                    dispatch(setLoading(true));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(true));
                }
            });
    };

export const exportBook =
    (cb, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.BOOKS_EXPORT;
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.EXPORT_BOOK,
                        payload: response.data.data,
                    });
                    dispatch(addToast({ text: response.data.message }));
                    cb({ url: response.data.data });
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };
export const exportPopularBook =
    (cb, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = "popular-books-export";
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    // dispatch({
                    //     type: bookActionType.EXPORT_BOOK,
                    //     payload: response.data.data,
                    // });
                    dispatch(addToast({ text: response.data.message }));
                    cb({ url: response.data.data });
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };
export const exportPopularBookByGenre =
    (genreId = null, formatId = null, cb, isLoading = true) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = `popular-books-by-genre-export/?genreId=${genreId}&formatId=${formatId}`;
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    // dispatch({
                    //     type: bookActionType.EXPORT_BOOK,
                    //     payload: response.data.data,
                    // });
                    dispatch(addToast({ text: response.data.message }));
                    cb({ url: response.data.data });
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (response) {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                    dispatch(setLoading(false));
                }
            });
    };
