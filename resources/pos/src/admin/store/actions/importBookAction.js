import { importActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { apiBaseURL } from "../../../constants";
import { getFormattedMessage } from "../../../shared/sharedMethod";
import { setLoading } from "./loadingAction";

export const clearImportBook = () => async (dispatch) => {
    dispatch({ type: importActionType.CLEAR_IMPORT_BOOK, payload: {} });
};

export const fetchImportBook = (isbn) => async (dispatch) => {
    dispatch(setLoading(true));
    await apiConfig
        .get(apiBaseURL.BOOK_DETAILS, { params: { isbn: isbn } })
        .then((response) => {
            if (response) {
                dispatch({
                    type: importActionType.FETCH_IMPORT_BOOK,
                    payload: response.data,
                });
                if (response.data.isbn === null) {
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "books.error.import.message"
                            ),
                            type: toastType.ERROR,
                        })
                    );
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
