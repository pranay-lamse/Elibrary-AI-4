import { bookLanguageActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import apiConfigWithout from "../../config/apiConfigwithoutTokenWithRoot";
import { setLoading } from "../../../store/action/progressBarAction";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";

export const fetchBookLanguages =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        let url = apiBaseURL.BOOK_LANGUAGE;
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
                        type: bookLanguageActionType.FETCH_BOOK_LANGUAGES,
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
export const fetchBookLanguagesWithout =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        let url = apiBaseURL.BOOK_LANGUAGE;
        dispatch(setLoading(true));
        if (
            !_.isEmpty(filter) &&
            (filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.pageSize)
        ) {
            url += requestParam(filter);
        }
        await apiConfigWithout
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookLanguageActionType.FETCH_BOOK_LANGUAGES,
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

export const addBookLanguage = (language, filterObj) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.BOOK_LANGUAGE, language)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookLanguageActionType.ADD_BOOK_LANGUAGE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "book-languages.success.create.message"
                        ),
                    })
                );
                dispatch(toggleModal());
                dispatch(fetchBookLanguages(filterObj));
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

export const editBookLanguage =
    (bookLanguageId, language) => async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .put(apiBaseURL.BOOK_LANGUAGE + "/" + bookLanguageId, language)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookLanguageActionType.EDIT_BOOK_LANGUAGE,
                        payload: response.data.data,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "book-languages.success.edit.message"
                            ),
                        })
                    );
                    dispatch(toggleModal());
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

export const deleteBookLanguage = (bookLanguageId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete(apiBaseURL.BOOK_LANGUAGE + "/" + bookLanguageId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookLanguageActionType.DELETE_BOOK_LANGUAGE,
                    payload: bookLanguageId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "book-languages.success.delete.message"
                        ),
                    })
                );
                dispatch(toggleModal());
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
