import { bookItemActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { toggleModal } from "../../../store/action/modalAction";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { apiBaseURL } from "../../../constants";
import { setLoading } from "../../../store/action/progressBarAction";
import { fetchBook } from "./bookAction";
export const setBookItems = (bookItems) => async (dispatch) => {
    dispatch({ type: bookItemActionType.SET_BOOKS_ITEMS, payload: bookItems });
};

export const addBookItem =
    (items, bookId, isEdit = false, navigate) =>
    async (dispatch) => {
        dispatch(setLoading(true));
        await apiConfig
            .post(`${apiBaseURL.BOOK}/${+bookId}/items`, items)
            .then((response) => {
                if (response) {
                    navigate(-1);
                    dispatch({
                        type: bookItemActionType.ADD_BOOK_ITEM,
                        payload: response.data.data.items,
                    });
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                isEdit
                                    ? "books.items.success.edit.message"
                                    : "books.items.success.create.message"
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

export const deleteBookItem = (bookItemId) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .delete(apiBaseURL.BOOK_ITEM + "/" + bookItemId)
        .then((response) => {
            if (response) {
                dispatch({
                    type: bookItemActionType.DELETE_BOOK_ITEM,
                    payload: bookItemId,
                });
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "books.items.success.delete.message"
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
