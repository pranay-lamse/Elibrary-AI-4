import { availableBookActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { apiBaseURL } from "../../../constants";

export const fetchAvailableBooksByBookId =
    (bookId, memberId) => async (dispatch) => {
        await apiConfig
            .get(
                apiBaseURL.BOOK +
                    "/available-books-by-bookitem-id/" +
                    bookId +
                    "/" +
                    memberId
            )
            .then((response) => {
                if (response) {
                    dispatch({
                        type: availableBookActionType.FETCH_AVAILABLE_BOOKS_BY_BOOK_ID,
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

export const fetchAvailableBooksByBookIdWithoutMember =
    (bookId) => async (dispatch) => {
        await apiConfig
            .get(apiBaseURL.BOOK + "/available-books-by-bookitem-id/" + bookId)
            .then((response) => {
                if (response) {
                    dispatch({
                        type: availableBookActionType.FETCH_AVAILABLE_BOOKS_BY_BOOK_ID_WITHOUT_MEMBER_ID,
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
