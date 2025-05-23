import { fileActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { apiBaseURL } from "../../../constants";

export const importBookByFile = (file, cb) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.BOOKS_IMPORT, file)
        .then((response) => {
            if (response) {
                dispatch({
                    type: fileActionType.ADD_FILE,
                    payload: response.data.data,
                });
                dispatch(addToast({ text: response.data.message }));
                cb({ status: response.data.success });
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
export const ImportMemberByFile = (file, cb) => async (dispatch) => {
    await apiConfig
        .post("member-import", file)
        .then((response) => {
            if (response) {
                dispatch({
                    type: fileActionType.ADD_FILE,
                    payload: response.data.data,
                });
                dispatch(addToast({ text: response.data.message }));
                cb({ status: response.data.success });
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
export const importBookByXMlFile = (file, cb) => async (dispatch) => {
    await apiConfig
        .post("/xml-import", file)
        .then((response) => {
            if (response) {
                dispatch({
                    type: fileActionType.ADD_FILE,
                    payload: response.data.data,
                });
                dispatch(addToast({ text: response.data.message }));
                cb({ status: response.data.success });
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
