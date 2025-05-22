import { settingActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../constants";
import { apiBaseURL } from "../../../constants";

export const fetchSettings = () => async (dispatch) => {
    await apiConfig
        .get(apiBaseURL.SETTING)
        .then((response) => {
            if (response) {
                dispatch({
                    type: settingActionType.FETCH_SETTING,
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
