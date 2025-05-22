import { bookActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWithoutToken from "../../config/apiConfigwithoutTokenWithRoot";
import { addToast } from "../../../store/action/toastAction";
import { setLoading } from "../../../store/action/progressBarAction";
import { apiBaseURL } from "../../../constants";
import axios from "axios";
import { environment } from "../../../environment";
import { setTotalRecord } from "./totalRecordAction";

export const fetchBooksAll = () => async (dispatch) => {
    await apiConfigWithoutToken
        .get(apiBaseURL.BOOK)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.FETCH_BOOKS,
                    payload: response.data.data,
                });
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

export const fetchBooksAllTransfer = () => async (dispatch) => {
    await apiConfigWithoutToken
        .get(apiBaseURL.BOOK + "?library_id=111&format=1")
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.FETCH_BOOKS,
                    payload: response.data.data,
                });
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

export const fetchBooksAll2 = () => async (dispatch) => {
    await apiConfigWithoutToken
        .get(apiBaseURL.BOOK2)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.FETCH_BOOKS,
                    payload: response.data.data,
                });
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

export const fetchSingleBook = (id) => async (dispatch) => {
    await apiConfigWithoutToken
        .get(apiBaseURL.BOOK + "/" + id)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.FETCH_BOOKS,
                    payload: response.data.data,
                });
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

export const fetchBooks = () => async (dispatch) => {
    await apiConfig
        .get(apiBaseURL.BOOK)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.FETCH_BOOKS,
                    payload: response.data.data,
                });
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

export const fetchFeaturedBooks = () => async (dispatch) => {
    await axios
        .get(environment.URL + "/api/" + apiBaseURL.BOOK + "?is_featured=1")
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.FETCH_FEATURED_BOOKS,
                    payload: response.data.data.books,
                });
                dispatch({
                    type: bookActionType.FETCH_FEATURED_GENRES,
                    payload: response.data.data.genres,
                });
                dispatch({
                    type: bookActionType.FETCH_FEATURED_CARDS,
                    payload: response.data.data.aboutUsCard,
                });
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

export const fetchBooksByNameOrAuthors = (param) => async (dispatch) => {
    await axios
        .get(environment.URL + "/api/" + apiBaseURL.BOOK + param)
        .then((response) => {
            if (response) {
                dispatch({
                    type: "NEW_BOOK_SEARCH",
                    payload: response.data.data.books,
                });
                if (response.data.totalRecords === 0) {
                    dispatch(addToast({ text: "Sorry!! Books not found." }));
                }
                dispatch(setTotalRecord(response.data.totalRecords));
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
