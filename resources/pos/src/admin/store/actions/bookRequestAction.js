import { bookRequestActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import requestParam from "../../../shared/lms-requestParam";
import { setTotalRecord } from "./totalRecordAction";
import _ from "lodash";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";

export const fetchBookRequests =
    (filter = {}, isLoading = false) =>
    async (dispatch) => {
        let url = apiBaseURL.BOOK_REQUEST;
        if (
            !_.isEmpty(filter) &&
            (filter.pageSize ||
                filter.limit ||
                filter.order_By ||
                filter.search ||
                filter.direction)
        ) {
            url += requestParam(filter);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookRequestActionType.FETCH_ADMIN_BOOKS_REQUEST,
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

export const addBookRequest = (bookRequest) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .post(apiBaseURL.BOOK_REQUEST, bookRequest)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookRequestActionType.ADD_ADMIN_BOOK_REQUEST,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "book-request.success.create.message"
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

export const editBookRequest = (bookRequest, status) => async (dispatch) => {
    await apiConfig
        .put(
            apiBaseURL.BOOK_REQUEST +
                "/" +
                bookRequest.id +
                "/status/" +
                status,
            {}
        )
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookRequestActionType.EDIT_ADMIN_BOOK_REQUEST,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "book-request.success.edit.message"
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
            }
        });
};

export const deleteBookRequest = (bookRequestId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete(apiBaseURL.BOOK_REQUEST + "/" + bookRequestId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookRequestActionType.DELETE_ADMIN_BOOK_REQUEST,
                    payload: bookRequestId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "book-request.success.delete.message"
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
