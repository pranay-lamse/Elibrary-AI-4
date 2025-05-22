import { bookSeriesActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";
import apiConfigWithoutToken from "../../config/apiConfigwithoutTokenWithRoot";

export const fetchBooksSeries = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get(apiBaseURL.BOOK_SERIES)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookSeriesActionType.FETCH_BOOKS_SERIES,
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

export const fetchBooksSeriesWithoutToken = () => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfigWithoutToken
        .get(apiBaseURL.BOOK_SERIES)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookSeriesActionType.FETCH_BOOKS_SERIES,
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

export const fetchBookSeries = (bookSeriesId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get(apiBaseURL.BOOK_SERIES + "/" + bookSeriesId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookSeriesActionType.FETCH_BOOK_SERIES,
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

export const addBookSeries = (bookSeries, navigate) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.BOOK_SERIES, bookSeries)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookSeriesActionType.ADD_BOOK_SERIES,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "books-series.success.create.message"
                        ),
                    })
                );
                dispatch(setLoading(false));
                navigate("/admin/pos/books-series");
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

export const editBookSeries =
    (bookSeriesId, bookSeries, navigate) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .post(apiBaseURL.BOOK_SERIES + "/" + bookSeriesId, bookSeries)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookSeriesActionType.EDIT_BOOK_SERIES,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "books-series.success.edit.message"
                            ),
                        })
                    );
                    dispatch(setLoading(false));
                    navigate("/admin/pos/books-series");
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

export const deleteBookSeries = (bookSeriesId) => async (dispatch) => {
    await apiConfig
        .delete(apiBaseURL.BOOK_SERIES + "/" + bookSeriesId)
        .then(() => {
            dispatch({
                type: bookSeriesActionType.DELETE_BOOK_SERIES,
                payload: bookSeriesId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "books-series.success.delete.message"
                    ),
                })
            );
            dispatch(toggleModal());
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
