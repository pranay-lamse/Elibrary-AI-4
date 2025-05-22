import { bookActionType, toastType } from "../../constants";
import apiConfigwithoutToken from "../../config/apiConfigwithoutTokenWithRoot";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { setLoading } from "../../../store/action/progressBarAction";
import { apiBaseURL } from "../../../constants";
import { getFormattedMessage } from "../../../shared/sharedMethod";

export const findBooksWithout = (params) => async (dispatch) => {
    await apiConfigwithoutToken
        .get(`${apiBaseURL.SEARCH_BOOK}?${params}`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.SEARCH_BOOKS,
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
export const findBooks = (params) => async (dispatch) => {
    await apiConfig
        .get(`${apiBaseURL.SEARCH_BOOK}?${params}`)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookActionType.SEARCH_BOOKS,
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

export const resetSearchBooks = () => (dispatch) => {
    dispatch({ type: bookActionType.RESET_SEARCH_BOOKS });
};

export const reserveBook =
    (bookItemId, index, library_id) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.BOOK + "/" + bookItemId + "/reserve-book ", {
                library_id: library_id,
                book_item_id: bookItemId,
            })
            .then((response) => {
                if (response) {
                    dispatch({
                        type: bookActionType.RESERVE_BOOK,
                        payload: {
                            status: response.data.data.book_item.status,
                            index,
                            expectedAvailableDate:
                                response.data.data.expected_available_date,
                        },
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "books.success.reserve.message"
                            ),
                        })
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
