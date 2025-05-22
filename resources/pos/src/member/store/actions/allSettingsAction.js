import { settingActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../constants";
import { apiBaseURL } from "../../../constants";

export const fetchAllSettings = () => async (dispatch) => {
    await apiConfig
        .get(apiBaseURL.ALL_SETTINGS)
        .then((response) => {
            if (response) {
                dispatch({
                    type: settingActionType.FETCH_ALL_SETTINGS,
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
