import { configActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { apiBaseURL } from "../../../constants";

export const fetchConfig = () => async (dispatch) => {
    await apiConfig
        .get(apiBaseURL.CONFIG)
        .then((response) => {
            if (response) {
                dispatch({
                    type: configActionType.FETCH_CONFIG,
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
